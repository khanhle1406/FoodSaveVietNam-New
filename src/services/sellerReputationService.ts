import { ERROR_CODES } from "../constants/errors";
import { HTTP_STATUS } from "../constants/http";
import { emitStoreStatusChanged } from "../realtime/socketServer";
import type { UserRole } from "../types/domain";
import type { SellerReputation, SellerReputationStatus, StoreStatusChangedPayload } from "../types/sellerReputation";
import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";
import { handleSupabaseError, supabaseAdmin } from "./supabaseService";

type TimestampValue = Date | string | null;

interface SellerReputationRow {
  seller_id: string;
  trust_score: number;
  rating_avg: string | number;
  status: SellerReputationStatus;
  restricted_until: TimestampValue;
  created_at: Date | string;
  updated_at: Date | string;
}

const CANCELLATION_PENALTY_POINTS = 15;
const NORMAL_ORDER_RECOVERY_POINTS = 5;
const CHARITY_ORDER_RECOVERY_POINTS = 5;
const BAN_THRESHOLD = 40;
const RESTRICTION_TRUST_THRESHOLD = 85;

const toIsoString = (value: Date | string): string => {
  return value instanceof Date ? value.toISOString() : value;
};

const nullableTimestampToIso = (value: TimestampValue): string | null => {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
};

const mapReputation = (row: SellerReputationRow): SellerReputation => ({
  seller_id: row.seller_id,
  trust_score: Number(row.trust_score),
  rating_avg: Number(row.rating_avg),
  status: row.status,
  restricted_until: nullableTimestampToIso(row.restricted_until),
  created_at: toIsoString(row.created_at),
  updated_at: toIsoString(row.updated_at)
});

const buildStatusPayload = (
  reputation: SellerReputation,
  reason: string,
  message: string
): StoreStatusChangedPayload => ({
  sellerId: reputation.seller_id,
  status: reputation.status,
  trustScore: reputation.trust_score,
  ratingAverage: reputation.rating_avg,
  restrictedUntil: reputation.restricted_until,
  reason,
  message,
  emittedAt: new Date().toISOString()
});

const ensureSellerReputation = async (sellerId: string): Promise<void> => {
  const { data: existing } = await supabaseAdmin
    .from("seller_reputation")
    .select("seller_id")
    .eq("seller_id", sellerId)
    .maybeSingle();

  if (!existing) {
    const { data: store } = await supabaseAdmin
      .from("stores")
      .select("id,rating")
      .eq("id", sellerId)
      .maybeSingle();

    await supabaseAdmin.from("seller_reputation").upsert({
      seller_id: sellerId,
      rating_avg: store?.rating ? Number(store.rating) : 5.0
    }, { onConflict: "seller_id", ignoreDuplicates: true });
  }
};

const fetchReputation = async (sellerId: string): Promise<SellerReputation> => {
  const { data, error } = await supabaseAdmin
    .from("seller_reputation")
    .select("seller_id, trust_score, rating_avg, status, restricted_until, created_at, updated_at")
    .eq("seller_id", sellerId)
    .maybeSingle();

  if (error) handleSupabaseError(error, "Failed to load seller reputation");
  if (!data) {
    throw new AppError("Không tìm thấy hồ sơ danh tiếng của seller", HTTP_STATUS.NOT_FOUND, ERROR_CODES.RESOURCE_NOT_FOUND);
  }

  return mapReputation(data as unknown as SellerReputationRow);
};

const assertSellerReadableByActor = async (sellerId: string, actorId: string, actorRole: UserRole): Promise<void> => {
  if (actorRole === "admin") return;

  const { data, error } = await supabaseAdmin
    .from("stores")
    .select("id")
    .eq("id", sellerId)
    .eq("owner_id", actorId)
    .maybeSingle();

  if (error || !data) {
    throw new AppError("Bạn không có quyền xem danh tiếng của seller này", HTTP_STATUS.FORBIDDEN, ERROR_CODES.AUTH_FORBIDDEN);
  }
};

export const sellerReputationService = {
  async getSellerReputation(sellerId: string): Promise<SellerReputation> {
    await ensureSellerReputation(sellerId);
    return fetchReputation(sellerId);
  },

  async getSellerReputationForActor(sellerId: string, actorId: string, actorRole: UserRole): Promise<SellerReputation> {
    await assertSellerReadableByActor(sellerId, actorId, actorRole);
    return sellerReputationService.getSellerReputation(sellerId);
  },

  async handleSellerCancellation(sellerId: string, orderId?: string): Promise<SellerReputation> {
    await ensureSellerReputation(sellerId);
    const current = await fetchReputation(sellerId);
    const trustScoreBefore = Number(current.trust_score);
    const newTrustScore = Math.max(trustScoreBefore - CANCELLATION_PENALTY_POINTS, 0);

    const { data: updated, error } = await supabaseAdmin
      .from("seller_reputation")
      .update({
        trust_score: newTrustScore,
        updated_at: new Date().toISOString()
      })
      .eq("seller_id", sellerId)
      .select("seller_id, trust_score, rating_avg, status, restricted_until, created_at, updated_at")
      .single();

    if (error || !updated) {
      throw new AppError("Không thể cập nhật điểm uy tín của seller", HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    if (orderId) {
      await supabaseAdmin.from("seller_violations").insert({
        seller_id: sellerId,
        order_id: orderId,
        violation_type: "SELLER_CANCELLED_ORDER",
        reason: "Seller hủy đơn do hết hàng ảo",
        point_delta: -CANCELLATION_PENALTY_POINTS,
        trust_score_before: trustScoreBefore,
        trust_score_after: newTrustScore,
        rating_avg_snapshot: Number(updated.rating_avg),
        status_after: updated.status,
        metadata: { source: "handleSellerCancellation", orderId }
      });
    }

    logger.info("Đã trừ điểm seller vì hủy đơn", {
      sellerId,
      orderId,
      trustScoreBefore,
      trustScoreAfter: newTrustScore
    });

    return sellerReputationService.checkAndApplyPenalties(sellerId);
  },

  async checkAndApplyPenalties(sellerId: string): Promise<SellerReputation> {
    let realtimePayload: StoreStatusChangedPayload | null = null;
    await ensureSellerReputation(sellerId);
    const current = await fetchReputation(sellerId);
    const trustScore = Number(current.trust_score);
    if (current.status === "Banned") {
      return current;
    }

    if (trustScore < BAN_THRESHOLD) {
      const { data: banned, error } = await supabaseAdmin
        .from("seller_reputation")
        .update({
          status: "Banned",
          restricted_until: null,
          updated_at: new Date().toISOString()
        })
        .eq("seller_id", sellerId)
        .select("seller_id, trust_score, rating_avg, status, restricted_until, created_at, updated_at")
        .single();

      if (error || !banned) {
        throw new AppError("Không thể khóa seller vi phạm", HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR);
      }

      const reputation = mapReputation(banned as unknown as SellerReputationRow);
      realtimePayload = buildStatusPayload(
        reputation,
        "TRUST_SCORE_BELOW_40",
        "Tài khoản cửa hàng đã bị khóa vĩnh viễn do điểm uy tín dưới 40."
      );
      emitStoreStatusChanged(realtimePayload);
      return reputation;
    }

    if (trustScore < RESTRICTION_TRUST_THRESHOLD) {
      const restrictedUntilDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
      const { data: restricted, error } = await supabaseAdmin
        .from("seller_reputation")
        .update({
          status: "Restricted",
          restricted_until: restrictedUntilDate,
          updated_at: new Date().toISOString()
        })
        .eq("seller_id", sellerId)
        .select("seller_id, trust_score, rating_avg, status, restricted_until, created_at, updated_at")
        .single();

      if (error || !restricted) {
        throw new AppError("Không thể áp dụng chế tài seller", HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR);
      }

      const reputation = mapReputation(restricted as unknown as SellerReputationRow);
      realtimePayload = buildStatusPayload(
        reputation,
        "TRUST_SCORE_BELOW_85",
        "Cửa hàng tạm thời bị chặn đăng món mới trong 48 giờ do điểm uy tín từ 40 đến dưới 85."
      );
      emitStoreStatusChanged(realtimePayload);
      return reputation;
    }

    return current;
  },

  async handleOrderSuccess(sellerId: string, isCharityOrder?: boolean): Promise<SellerReputation> {
    let realtimePayload: StoreStatusChangedPayload | null = null;
    const recoveryPoints = isCharityOrder ? CHARITY_ORDER_RECOVERY_POINTS : NORMAL_ORDER_RECOVERY_POINTS;

    await ensureSellerReputation(sellerId);
    const current = await fetchReputation(sellerId);
    const newTrustScore = Math.min(Number(current.trust_score) + recoveryPoints, 100);
    const shouldRestoreToActive =
      current.status === "Restricted" &&
      newTrustScore >= RESTRICTION_TRUST_THRESHOLD;

    const { data: updated, error } = await supabaseAdmin
      .from("seller_reputation")
      .update({
        trust_score: newTrustScore,
        ...(shouldRestoreToActive ? { status: "Active", restricted_until: null } : {}),
        updated_at: new Date().toISOString()
      })
      .eq("seller_id", sellerId)
      .select("seller_id, trust_score, rating_avg, status, restricted_until, created_at, updated_at")
      .single();

    if (error || !updated) {
      throw new AppError("Không thể cộng điểm phục hồi cho seller", HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    const reputation = mapReputation(updated as unknown as SellerReputationRow);
    realtimePayload = buildStatusPayload(
      reputation,
      shouldRestoreToActive ? "SELLER_REPUTATION_RECOVERED" : "SUCCESSFUL_ORDER_REPUTATION_REWARD",
      shouldRestoreToActive
        ? "Chúc mừng, cửa hàng đã phục hồi uy tín và được mở lại tính năng đăng món mới."
        : `Cửa hàng được cộng ${recoveryPoints} điểm uy tín nhờ hoàn tất đơn hàng.`
    );

    if (realtimePayload) {
      emitStoreStatusChanged(realtimePayload);
    }

    return reputation;
  },

  async updateSellerRatingAverage(sellerId: string, ratingAverage: number): Promise<SellerReputation> {
    await ensureSellerReputation(sellerId);
    const { error: repError } = await supabaseAdmin
      .from("seller_reputation")
      .update({
        rating_avg: ratingAverage,
        updated_at: new Date().toISOString()
      })
      .eq("seller_id", sellerId);

    if (repError) {
      throw new AppError("Không thể cập nhật sao trung bình của seller", HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    await supabaseAdmin
      .from("stores")
      .update({
        rating: ratingAverage,
        updated_at: new Date().toISOString()
      })
      .eq("id", sellerId);

    return sellerReputationService.checkAndApplyPenalties(sellerId);
  }
};
