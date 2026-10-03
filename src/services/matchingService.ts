/**
 * FoodSave Việt Nam - Multi-Source Auto-Matching Engine (Sprint 1)
 * Thuật toán ghép nối đa điểm giữa Nhu cầu từ thiện (Demands) và Nguồn cung cửa hàng (Donations)
 */

export interface CharityDemand {
  id: string;
  demand_code: string;
  charity_id: string;
  charity_name: string;
  charity_address: string;
  category: 'bakery' | 'cooked_meals' | 'fresh_produce' | 'dairy_beverages' | 'general';
  item_name: string;
  target_quantity: number;
  unit: string;
  urgency: 'green' | 'yellow' | 'red';
  deadline: string;
  matched_quantity: number;
  status: 'open' | 'partially_matched' | 'fulfilled' | 'expired';
  notes?: string;
  created_at: string;
}

export interface StoreDonationCandidate {
  id: string;
  donation_code: string;
  store_id: string;
  store_name: string;
  store_address: string;
  category: 'bakery' | 'cooked_meals' | 'fresh_produce' | 'dairy_beverages' | 'general';
  items: string;
  quantity: number;
  unit: string;
  weight_kg: number;
  urgency: 'green' | 'yellow' | 'red';
  exp: string;
  distance_km: number;
  rating?: number;
}

export interface StoreMatchAllocation {
  donation_id: string;
  donation_code: string;
  store_id: string;
  store_name: string;
  store_address: string;
  items: string;
  available_quantity: number;
  allocated_quantity: number;
  unit: string;
  weight_kg: number;
  urgency: 'green' | 'yellow' | 'red';
  exp: string;
  distance_km: number;
  stop_order: number;
  assigned_volunteer?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
  };
}

export interface DemandMatchResult {
  demand_id: string;
  demand_code: string;
  charity_name: string;
  item_name: string;
  target_quantity: number;
  unit: string;
  total_matched_quantity: number;
  is_fully_matched: boolean;
  allocations: StoreMatchAllocation[];
  suggested_routes: {
    volunteer_id: string;
    volunteer_name: string;
    phone: string;
    vehicle: string;
    stops: {
      stop_number: number;
      store_name: string;
      address: string;
      pickup_items: string;
      quantity: number;
      unit: string;
    }[];
    final_destination: string;
  }[];
}

export const matchingService = {
  /**
   * Thuật toán ghép nối tham lam (Greedy Multi-Source Matcher)
   * Ưu tiên 1: Lô hàng cận date nhất (urgency: red > yellow > green)
   * Ưu tiên 2: Cự ly gần nhất (distance_km tăng dần)
   * Ưu tiên 3: Điểm đánh giá đối tác (rating cao hơn)
   */
  matchDemand(
    demand: CharityDemand,
    availableDonations: StoreDonationCandidate[],
    availableVolunteers: { id: string; name: string; phone: string; vehicle: string }[] = []
  ): DemandMatchResult {
    // 1. Lọc các lô hàng cùng phân loại danh mục hoặc từ khóa tương đồng
    const candidates = availableDonations.filter((d) => {
      const matchCat = d.category === demand.category || demand.category === 'general';
      const matchText = d.items.toLowerCase().includes(demand.item_name.toLowerCase()) ||
                        demand.item_name.toLowerCase().includes(d.items.toLowerCase());
      return matchCat || matchText;
    });

    // 2. Trọng số ưu tiên (Cận date cao nhất = 1000 điểm, Khoảng cách càng gần càng tốt)
    const urgencyScore = { red: 300, yellow: 200, green: 100 };

    candidates.sort((a, b) => {
      // Ưu tiên độ khẩn cấp (đỏ > vàng > xanh)
      const uDiff = (urgencyScore[b.urgency] || 0) - (urgencyScore[a.urgency] || 0);
      if (uDiff !== 0) return uDiff;

      // Ưu tiên cự ly gần nhất
      const dDiff = a.distance_km - b.distance_km;
      if (Math.abs(dDiff) > 0.5) return dDiff;

      // Ưu tiên đánh giá uy tín
      return (b.rating || 5) - (a.rating || 5);
    });

    // 3. Gom hàng từ các cửa hàng cho đến khi đủ số lượng
    let remainingNeeded = demand.target_quantity;
    const allocations: StoreMatchAllocation[] = [];
    let stopCounter = 1;

    for (const donor of candidates) {
      if (remainingNeeded <= 0) break;

      const takeQty = Math.min(remainingNeeded, donor.quantity);
      if (takeQty > 0) {
        allocations.push({
          donation_id: donor.id,
          donation_code: donor.donation_code,
          store_id: donor.store_id,
          store_name: donor.store_name,
          store_address: donor.store_address,
          items: donor.items,
          available_quantity: donor.quantity,
          allocated_quantity: takeQty,
          unit: donor.unit || demand.unit,
          weight_kg: Number(((donor.weight_kg / donor.quantity) * takeQty).toFixed(1)),
          urgency: donor.urgency,
          exp: donor.exp,
          distance_km: donor.distance_km,
          stop_order: stopCounter++
        });

        remainingNeeded -= takeQty;
      }
    }

    const totalMatched = demand.target_quantity - remainingNeeded;
    const isFullyMatched = totalMatched >= demand.target_quantity;

    // 4. Phân công tình nguyện viên (TNV) phụ trách các chặng
    // Nếu có 1-2 điểm dừng: 1 TNV gom hết.
    // Nếu có >= 3 điểm dừng: chia cho 2 TNV để tối ưu thời gian.
    const defaultVolunteers = [
      { id: 'tnv-hung-01', name: 'Nguyễn Văn Hùng', phone: '0903 888 112', vehicle: 'Honda Wave (59-P1 839.22)' },
      { id: 'tnv-mai-02', name: 'Trần Thị Mai', phone: '0918 442 331', vehicle: 'Yamaha Grande (59-L2 491.03)' },
      { id: 'tnv-dung-03', name: 'Lê Tiến Dũng', phone: '0982 773 664', vehicle: 'Honda Winner (59-K1 228.19)' }
    ];

    const volunteerPool = availableVolunteers.length > 0 ? availableVolunteers : defaultVolunteers;
    const suggestedRoutes: DemandMatchResult['suggested_routes'] = [];

    if (allocations.length <= 2) {
      const v = volunteerPool[0] || defaultVolunteers[0]!;
      suggestedRoutes.push({
        volunteer_id: v.id,
        volunteer_name: v.name,
        phone: v.phone,
        vehicle: v.vehicle,
        stops: allocations.map((a, idx) => {
          a.assigned_volunteer = v;
          return {
            stop_number: idx + 1,
            store_name: a.store_name,
            address: a.store_address,
            pickup_items: a.items,
            quantity: a.allocated_quantity,
            unit: a.unit
          };
        }),
        final_destination: `${demand.charity_name} (${demand.charity_address})`
      });
    } else {
      // Chia 2 TNV: Chặng 1 lấy 2 điểm đầu, Chặng 2 lấy điểm còn lại
      const v1 = volunteerPool[0] || defaultVolunteers[0]!;
      const v2 = volunteerPool[1] || defaultVolunteers[1]!;

      const route1Stops = allocations.slice(0, 2);
      const route2Stops = allocations.slice(2);

      route1Stops.forEach((a) => (a.assigned_volunteer = v1));
      route2Stops.forEach((a) => (a.assigned_volunteer = v2));

      suggestedRoutes.push({
        volunteer_id: v1.id,
        volunteer_name: v1.name,
        phone: v1.phone,
        vehicle: v1.vehicle,
        stops: route1Stops.map((a, idx) => ({
          stop_number: idx + 1,
          store_name: a.store_name,
          address: a.store_address,
          pickup_items: a.items,
          quantity: a.allocated_quantity,
          unit: a.unit
        })),
        final_destination: `${demand.charity_name} (${demand.charity_address})`
      });

      suggestedRoutes.push({
        volunteer_id: v2.id,
        volunteer_name: v2.name,
        phone: v2.phone,
        vehicle: v2.vehicle,
        stops: route2Stops.map((a, idx) => ({
          stop_number: idx + 1,
          store_name: a.store_name,
          address: a.store_address,
          pickup_items: a.items,
          quantity: a.allocated_quantity,
          unit: a.unit
        })),
        final_destination: `${demand.charity_name} (${demand.charity_address})`
      });
    }

    return {
      demand_id: demand.id,
      demand_code: demand.demand_code,
      charity_name: demand.charity_name,
      item_name: demand.item_name,
      target_quantity: demand.target_quantity,
      unit: demand.unit,
      total_matched_quantity: totalMatched,
      is_fully_matched: isFullyMatched,
      allocations,
      suggested_routes: suggestedRoutes
    };
  }
};
