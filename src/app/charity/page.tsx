'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalDb, DonationItem } from '@/context/LocalDbContext';
import { QrHandoverModal } from '@/components/qr/QrHandoverModal';
import { LogisticsModal } from '@/components/logistics/LogisticsModal';
import { UrgentRedBanner } from '@/components/alerts/UrgentRedBanner';
import {
  Heart,
  Truck,
  QrCode,
  ShieldCheck,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Filter,
  Calendar,
  Building2
} from 'lucide-react';

export default function CharityPortalPage() {
  const { donations, completeHandover } = useLocalDb();

  // Active Charity Profile
  const charityName = 'Mái Ấm Tre Xanh (Thảo Đàn)';
  const charityAddress = '40/34 Calmette, P. Nguyễn Thái Bình, Quận 1, TP.HCM';

  // State for Modals
  const [selectedDonationForLogistics, setSelectedDonationForLogistics] = useState<DonationItem | null>(null);
  const [selectedDonationForQr, setSelectedDonationForQr] = useState<DonationItem | null>(null);
  const [filterUrgency, setFilterUrgency] = useState<'all' | 'red' | 'yellow' | 'green'>('all');

  // Urgent Red Donations for Banner
  const urgentRedDonations = donations.filter((d) => d.urgency === 'red' && d.status === 'new');

  // Filtered Donations
  const filteredDonations = donations.filter((d) => {
    if (filterUrgency === 'all') return true;
    return d.urgency === filterUrgency;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-20">
      {/* Urgent Red Banner */}
      <UrgentRedBanner
        urgentDonations={urgentRedDonations}
        onSelect={(donation) => setSelectedDonationForLogistics(donation)}
      />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="wrap h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-neutral-800 transition p-1.5 rounded-xl hover:bg-neutral-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                  {charityName}
                  <span className="inline-flex items-center gap-1 text-[11px] bg-green-100 text-green-800 font-extrabold px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-700" /> TỔ CHỨC ĐÃ XÁC MINH
                  </span>
                </h1>
                <div className="text-xs text-neutral-500 font-medium">
                  {charityAddress} · Quyết định thành lập: QĐ-93/2021/UBND-Q1
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/partner"
              className="btn btn-outline text-xs font-bold py-2 px-3.5 hidden sm:flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-green-700" /> Sang Cổng Cửa Hàng
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="wrap pt-8">
        {/* Controls & Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-neutral-950 tracking-tight">Thực Phẩm Cần Tiếp Nhận</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Chọn lô hàng cứu trợ và điều phối xe giữ nhiệt AhaMove/Grab hoặc Tình nguyện viên
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-neutral-200 text-xs font-bold">
            <button
              onClick={() => setFilterUrgency('all')}
              className={`px-3 py-1.5 rounded-xl transition ${filterUrgency === 'all' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
            >
              Tất cả ({donations.length})
            </button>
            <button
              onClick={() => setFilterUrgency('red')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${filterUrgency === 'red' ? 'bg-red-600 text-white' : 'text-red-700 hover:bg-red-50'}`}
            >
              🔴 Khẩn cấp ({donations.filter((d) => d.urgency === 'red').length})
            </button>
            <button
              onClick={() => setFilterUrgency('yellow')}
              className={`px-3 py-1.5 rounded-xl transition ${filterUrgency === 'yellow' ? 'bg-yellow-400 text-neutral-950 font-black' : 'text-yellow-700 hover:bg-yellow-50'}`}
            >
              🟡 Cận date ({donations.filter((d) => d.urgency === 'yellow').length})
            </button>
          </div>
        </div>

        {/* Donations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((d) => {
            const isNew = d.status === 'new';
            const isClaimed = d.status === 'claimed' || d.status === 'in_route';
            const isCompleted = d.status === 'completed';

            return (
              <div
                key={d.id}
                className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm hover:border-neutral-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="font-mono text-xs font-bold text-neutral-400">{d.donation_code}</span>
                    {d.urgency === 'red' && (
                      <span className="badge-urgent-red animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> KHẨN CẤP
                      </span>
                    )}
                    {d.urgency === 'yellow' && (
                      <span className="badge-urgent-yellow">
                        <Clock className="w-3 h-3" /> CẬN DATE
                      </span>
                    )}
                    {d.urgency === 'green' && (
                      <span className="badge-urgent-green">TIÊU CHUẨN</span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-neutral-950 leading-snug">{d.items}</h3>

                  <div className="mt-2 text-xs font-medium text-neutral-600">
                    Đơn vị: <strong className="text-neutral-900">{d.store}</strong>
                  </div>

                  <div className="mt-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Khối lượng:</span>
                      <strong className="text-neutral-900">{d.weight_kg}kg ({d.amount})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hạn sử dụng:</span>
                      <strong className="text-red-700">{d.exp}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Khung giờ lấy:</span>
                      <strong className="text-neutral-900">{d.pickup_start} - {d.pickup_end}</strong>
                    </div>
                    {d.logistics_method && (
                      <div className="flex justify-between text-blue-700 font-semibold pt-1 border-t border-neutral-200/60">
                        <span>Vận chuyển:</span>
                        <span>{d.logistics_method}</span>
                      </div>
                    )}
                  </div>

                  {d.note && (
                    <p className="mt-3 text-xs text-neutral-500 italic bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
                      &ldquo;{d.note}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                  {isNew ? (
                    <button
                      onClick={() => setSelectedDonationForLogistics(d)}
                      className="w-full btn btn-primary py-3 text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-green-700/20"
                    >
                      <Truck className="w-4 h-4" /> Tiếp Nhận & Gọi Xe
                    </button>
                  ) : (
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDonationForQr(d)}
                        className="flex-1 btn btn-dark py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-4 h-4 text-green-400" /> Mã Đối Soát QR
                      </button>
                      {isCompleted && (
                        <span className="p-2 bg-green-100 text-green-800 rounded-xl text-xs font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" /> Xong
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Logistics Dispatch Modal */}
      {selectedDonationForLogistics && (
        <LogisticsModal
          donation={selectedDonationForLogistics}
          charityName={charityName}
          onClose={() => setSelectedDonationForLogistics(null)}
          onSuccess={() => setSelectedDonationForLogistics(null)}
        />
      )}

      {/* QR Handover & Verification Modal */}
      {selectedDonationForQr && (
        <QrHandoverModal
          donation={selectedDonationForQr}
          onClose={() => setSelectedDonationForQr(null)}
        />
      )}
    </div>
  );
}
