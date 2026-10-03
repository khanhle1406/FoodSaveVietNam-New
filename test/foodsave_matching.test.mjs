import test from 'node:test';
import assert from 'node:assert/strict';
import matchingServiceModule from '../frontend/matchingService.js';
const { matchingService } = matchingServiceModule;

test('Sprint 1 Auto-Matching: Khớp lệnh đa nguồn (Multi-Source Greedy Matching)', () => {
  const demand = {
    id: 'DEMAND-001',
    demand_code: 'FS-DEMAND-101',
    charity_id: 'charity-tre-xanh',
    charity_name: 'Mái Ấm Tre Xanh (Thảo Đàn)',
    charity_address: '40/34 Calmette, P. Nguyễn Thái Bình, Quận 1',
    category: 'bakery',
    item_name: 'Bánh mì & Bánh ngọt dinh dưỡng',
    target_quantity: 50,
    unit: 'cái',
    urgency: 'yellow',
    deadline: new Date(Date.now() + 4 * 3600000).toISOString(),
    matched_quantity: 0,
    status: 'open',
    created_at: new Date().toISOString()
  };

  const candidates = [
    {
      id: 'DONA-01',
      donation_code: 'FS-DONA-8013',
      store_id: 'store-tous',
      store_name: 'Tous Les Jours Lê Duẩn',
      store_address: '39 Lê Duẩn, Quận 1',
      category: 'bakery',
      items: 'Croissant bơ Pháp',
      quantity: 40,
      unit: 'cái',
      weight_kg: 12.0,
      urgency: 'red', // Khẩn cấp nhất -> Phải ưu tiên số 1
      exp: 'Hôm nay · 20:00',
      distance_km: 1.8,
      rating: 4.9
    },
    {
      id: 'DONA-02',
      donation_code: 'FS-DONA-8012',
      store_id: 'store-winmart',
      store_name: 'WinMart Thảo Điền',
      store_address: '15 Thảo Điền, TP. Thủ Đức',
      category: 'bakery',
      items: 'Sandwich gà xé ngũ cốc',
      quantity: 25,
      unit: 'cái',
      weight_kg: 7.5,
      urgency: 'yellow',
      exp: 'Hôm nay · 21:30',
      distance_km: 3.2,
      rating: 4.8
    },
    {
      id: 'DONA-03',
      donation_code: 'FS-DONA-8015',
      store_id: 'store-coop',
      store_name: 'Co.opmart Huỳnh Tấn Phát',
      store_address: '80 Huỳnh Tấn Phát, Quận 7',
      category: 'bakery',
      items: 'Bánh mì Baguette',
      quantity: 20,
      unit: 'cái',
      weight_kg: 6.0,
      urgency: 'green',
      exp: 'Ngày mai · 10:00',
      distance_km: 5.5,
      rating: 4.7
    }
  ];

  const result = matchingService.matchDemand(demand, candidates);

  // Kiểm tra kết quả ghép đơn
  assert.equal(result.is_fully_matched, true, 'Nhu cầu 50 cái bánh phải được thỏa mãn 100%');
  assert.equal(result.total_matched_quantity, 50, 'Tổng số lượng khớp phải đạt đúng 50');
  assert.equal(result.allocations.length, 2, 'Thuật toán tối ưu chỉ cần ghép từ 2 cửa hàng (40 + 10)');

  // Cửa hàng 1 (Tous Les Jours) được gom trọn vẹn 40 chiếc
  assert.equal(result.allocations[0].store_name, 'Tous Les Jours Lê Duẩn');
  assert.equal(result.allocations[0].allocated_quantity, 40);

  // Cửa hàng 2 (WinMart) chỉ lấy 10 chiếc còn thiếu
  assert.equal(result.allocations[1].store_name, 'WinMart Thảo Điền');
  assert.equal(result.allocations[1].allocated_quantity, 10);

  // Lộ trình phân bổ TNV
  assert.ok(result.suggested_routes.length > 0, 'Phải có gợi ý lộ trình vận chuyển');
  assert.ok(result.suggested_routes[0].stops.length > 0, 'TNV phải có các điểm dừng');
});

test('Sprint 1 Auto-Matching: Khớp lệnh một phần khi nguồn cung thiếu (Partial Fulfillment)', () => {
  const demand = {
    id: 'DEMAND-002',
    demand_code: 'FS-DEMAND-102',
    charity_id: 'charity-bep',
    charity_name: 'Bếp Cơm Yêu Thương Q.7',
    charity_address: '142 Lâm Văn Bền, Quận 7',
    category: 'fresh_produce',
    item_name: 'Rau củ tươi sạch',
    target_quantity: 100, // Cần 100kg
    unit: 'kg',
    urgency: 'green',
    deadline: new Date(Date.now() + 6 * 3600000).toISOString(),
    matched_quantity: 0,
    status: 'open',
    created_at: new Date().toISOString()
  };

  const candidates = [
    {
      id: 'DONA-RAU-01',
      donation_code: 'FS-DONA-8014',
      store_id: 'store-coop',
      store_name: 'Co.opmart Huỳnh Tấn Phát',
      store_address: '80 Huỳnh Tấn Phát, Quận 7',
      category: 'fresh_produce',
      items: 'Rau cải thủy canh',
      quantity: 35,
      unit: 'kg',
      weight_kg: 35.0,
      urgency: 'green',
      exp: 'Ngày mai · 10:00',
      distance_km: 2.1
    }
  ];

  const result = matchingService.matchDemand(demand, candidates);

  assert.equal(result.is_fully_matched, false, 'Khi chỉ có 35kg thì is_fully_matched phải là false');
  assert.equal(result.total_matched_quantity, 35, 'Khớp được tối đa 35kg');
  assert.equal(result.allocations[0].allocated_quantity, 35);
});
