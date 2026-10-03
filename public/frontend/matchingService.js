/**
 * FoodSave Việt Nam - Multi-Source Auto-Matching Engine (Sprint 1)
 * Thư viện ghép đơn đa nguồn & phân bổ tình nguyện viên thông minh
 */
(function (global) {
  'use strict';

  const FoodSaveMatching = {
    /**
     * Thuật toán ghép đơn đa nguồn (Greedy Multi-Source Matcher)
     */
    matchDemand: function (demand, candidates, volunteers) {
      if (!demand || !candidates || candidates.length === 0) {
        return {
          demand_id: demand?.id,
          target_quantity: demand?.target_quantity || 0,
          total_matched_quantity: 0,
          is_fully_matched: false,
          allocations: [],
          suggested_routes: []
        };
      }

      // 1. Phân loại và lọc theo danh mục hoặc từ khóa
      const pool = candidates.filter(function (d) {
        if (!d || d.status === 'completed' || d.status === 'cancelled') return false;
        return true;
      });

      // 2. Sắp xếp ưu tiên: Hạn sử dụng khẩn cấp (đỏ > vàng > xanh) -> Cự ly gần nhất -> Đánh giá uy tín
      const urgencyRank = { red: 3, yellow: 2, green: 1 };
      pool.sort(function (a, b) {
        const uDiff = (urgencyRank[b.urgency] || 1) - (urgencyRank[a.urgency] || 1);
        if (uDiff !== 0) return uDiff;
        const distA = parseFloat(a.distance_text || a.distance_km || 3.0);
        const distB = parseFloat(b.distance_text || b.distance_km || 3.0);
        return distA - distB;
      });

      // 3. Gom hàng từ các cửa hàng
      let needed = parseInt(demand.target_quantity || demand.amount || 50, 10);
      const allocations = [];
      let stopOrder = 1;

      for (let i = 0; i < pool.length; i++) {
        if (needed <= 0) break;
        const donor = pool[i];
        const availQty = parseInt(donor.amount || donor.quantity || 20, 10);
        const take = Math.min(needed, availQty);

        if (take > 0) {
          allocations.push({
            donation_id: donor.id || donor.donation_code,
            donation_code: donor.donation_code || donor.id,
            store_name: donor.store || donor.store_name,
            store_address: donor.address || 'Quận 1, TP.HCM',
            items: donor.items,
            available_quantity: availQty,
            allocated_quantity: take,
            unit: demand.unit || 'phần',
            urgency: donor.urgency || 'yellow',
            exp: donor.exp || 'Hôm nay',
            distance_km: parseFloat(donor.distance_text || donor.distance_km || 2.5),
            stop_order: stopOrder++
          });
          needed -= take;
        }
      }

      const totalMatched = parseInt(demand.target_quantity || 50, 10) - needed;
      const isFulfilled = needed <= 0;

      // 4. Lộ trình phân bổ Tình nguyện viên
      const defaultTnv = [
        { id: 'tnv-1', name: 'Nguyễn Văn Hùng', phone: '0903 888 112', vehicle: 'Honda Wave (59-P1 839.22)' },
        { id: 'tnv-2', name: 'Trần Thị Mai', phone: '0918 442 331', vehicle: 'Yamaha Grande (59-L2 491.03)' }
      ];

      const routes = [];
      if (allocations.length <= 2) {
        routes.push({
          volunteer: defaultTnv[0],
          stops: allocations,
          destination: demand.charity_name || 'Mái Ấm Tiếp Nhận'
        });
      } else {
        routes.push({
          volunteer: defaultTnv[0],
          stops: allocations.slice(0, 2),
          destination: demand.charity_name || 'Mái Ấm Tiếp Nhận'
        });
        routes.push({
          volunteer: defaultTnv[1],
          stops: allocations.slice(2),
          destination: demand.charity_name || 'Mái Ấm Tiếp Nhận'
        });
      }

      return {
        demand_id: demand.id,
        item_name: demand.item_name || demand.items,
        target_quantity: parseInt(demand.target_quantity || 50, 10),
        unit: demand.unit || 'phần',
        total_matched_quantity: totalMatched,
        is_fully_matched: isFulfilled,
        allocations: allocations,
        suggested_routes: routes
      };
    },

    /**
     * Mở modal Đăng nhu cầu cứu trợ mới (Charity Demands)
     */
    showCreateDemandModal: function (onCreated) {
      const modalId = 'foodsave-create-demand-modal';
      let existing = document.getElementById(modalId);
      if (existing) existing.remove();

      const modalEl = document.createElement('div');
      modalEl.id = modalId;
      modalEl.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,10,10,0.65);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn 0.2s ease;font-family:"Plus Jakarta Sans","Inter",sans-serif;';

      modalEl.innerHTML = `
        <div style="background:#fff;border-radius:24px;width:100%;max-width:520px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,0.25);position:relative;border:1px solid #e5e7eb;">
          <button onclick="document.getElementById('${modalId}').remove()" style="position:absolute;top:20px;right:20px;background:none;border:none;cursor:pointer;font-size:20px;color:#9ca3af;">✕</button>

          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
            <span style="font-size:24px">🥣</span>
            <div>
              <h3 style="margin:0;font-size:18px;font-weight:900;color:#0a0a0a">Đăng Nhu Cầu Cứu Trợ Mới</h3>
              <p style="margin:2px 0 0 0;font-size:12px;color:#6b7280">Hệ thống sẽ tự động quét và ghép các cửa hàng lân cận</p>
            </div>
          </div>

          <form id="fs-demand-form" onsubmit="event.preventDefault(); window.FoodSaveMatching._submitDemand();" style="margin-top:20px;display:grid;gap:14px;">
            <div>
              <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Món / Thực phẩm cần tiếp nhận *</label>
              <input id="dm-item" type="text" required placeholder="Ví dụ: Bánh mì & Bánh ngọt dinh dưỡng" style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;outline:none;" value="Bánh mì & Bánh ngọt dinh dưỡng">
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div>
                <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Số lượng cần *</label>
                <input id="dm-qty" type="number" min="5" max="500" required style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;outline:none;font-weight:800;" value="50">
              </div>
              <div>
                <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Đơn vị tính *</label>
                <select id="dm-unit" style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;background:#fff;outline:none;font-weight:700;">
                  <option value="cái">Cái / Chiếc</option>
                  <option value="phần">Suất / Phần ăn</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="hộp">Hộp / Túi</option>
                </select>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div>
                <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Mức độ khẩn cấp</label>
                <select id="dm-urgency" style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;background:#fff;outline:none;font-weight:700;">
                  <option value="yellow">🟡 Cần trong ngày (4-8h)</option>
                  <option value="red">🔴 Khẩn cấp (dưới 3h)</option>
                  <option value="green">🟢 Thường nhật (ngày mai)</option>
                </select>
              </div>
              <div>
                <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Bán kính quét nguồn</label>
                <select id="dm-radius" style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;background:#fff;outline:none;font-weight:700;">
                  <option value="5">Trong vòng 5 km</option>
                  <option value="8">Trong vòng 8 km</option>
                  <option value="12">Trong vòng 12 km</option>
                </select>
              </div>
            </div>

            <div>
              <label style="display:block;font-size:12px;font-weight:800;color:#374151;margin-bottom:6px">Mục đích sử dụng & Đối tượng phục vụ</label>
              <textarea id="dm-notes" rows="2" placeholder="Ví dụ: Phục vụ bữa xế chiều cho 45 em nhỏ tại mái ấm..." style="width:100%;padding:10px 14px;border:1.5px solid #d1d5db;border-radius:12px;font-size:13px;outline:none;resize:none;">Phục vụ bữa phụ xế chiều cho các em nhỏ tại mái ấm.</textarea>
            </div>

            <button type="submit" style="margin-top:6px;width:100%;padding:14px;background:#16a34a;color:#fff;border:none;border-radius:999px;font-size:14px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 24px rgba(22,163,74,0.3);">
              <span>⚡</span> Đăng Nhu Cầu & Tự Động Ghép Nguồn Cung
            </button>
          </form>
        </div>
      `;

      document.body.appendChild(modalEl);

      window.FoodSaveMatching._submitDemand = function () {
        const item = document.getElementById('dm-item').value;
        const qty = parseInt(document.getElementById('dm-qty').value, 10);
        const unit = document.getElementById('dm-unit').value;
        const urgency = document.getElementById('dm-urgency').value;
        const notes = document.getElementById('dm-notes').value;

        let newDemand = null;
        if (window.FoodSaveLocalDB) {
          newDemand = window.FoodSaveLocalDB.addDemand({
            item_name: item,
            target_quantity: qty,
            unit: unit,
            urgency: urgency,
            notes: notes
          });
        }

        modalEl.remove();

        if (typeof onCreated === 'function') onCreated(newDemand);
        // Tự động mở ngay modal ghép đơn đa nguồn
        setTimeout(function () {
          FoodSaveMatching.showMatchingModal(newDemand || {
            item_name: item,
            target_quantity: qty,
            unit: unit,
            urgency: urgency,
            notes: notes
          });
        }, 300);
      };
    },

    /**
     * Mở modal kết quả ghép đơn đa nguồn (Multi-Source Result Modal)
     */
    showMatchingModal: function (demand, onFulfilled) {
      const modalId = 'foodsave-matching-result-modal';
      let existing = document.getElementById(modalId);
      if (existing) existing.remove();

      let donations = [];
      if (window.FoodSaveLocalDB) {
        donations = window.FoodSaveLocalDB.getDonations();
      }

      const result = FoodSaveMatching.matchDemand(demand, donations);

      const modalEl = document.createElement('div');
      modalEl.id = modalId;
      modalEl.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(10,10,10,0.65);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn 0.2s ease;font-family:"Plus Jakarta Sans","Inter",sans-serif;';

      const renderAllocations = result.allocations.map(function (a) {
        return `
          <div style="background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:14px;padding:12px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:between;">
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-weight:900;font-size:13.5px;color:#111827">Chặng ${a.stop_order}: ${a.store_name}</span>
                <span style="font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px;background:${a.urgency === 'red' ? '#fee2e2;color:#dc2626' : '#fef9c3;color:#ca8a04'}">${a.urgency === 'red' ? '🔴 CẬN DATE GẤP' : '🟡 CẬN DATE'}</span>
              </div>
              <div style="font-size:12px;color:#4b5563;margin-top:2px">${a.items}</div>
              <div style="font-size:11px;color:#6b7280;margin-top:2px">📍 ${a.store_address} · Cách ${a.distance_km}km</div>
            </div>
            <div style="text-align:right">
              <div style="font-weight:900;font-size:16px;color:#16a34a">+${a.allocated_quantity} <span style="font-size:12px;color:#6b7280">${a.unit}</span></div>
              <div style="font-size:10.5px;color:#9ca3af">(Có sẵn: ${a.available_quantity})</div>
            </div>
          </div>
        `;
      }).join('');

      const renderRoutes = result.suggested_routes.map(function (r, idx) {
        return `
          <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:14px;padding:12px 14px;margin-top:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div style="font-weight:900;font-size:13px;color:#166534">🛵 Tuyến ${idx + 1}: ${r.volunteer.name} (${r.volunteer.phone})</div>
              <span style="font-size:11px;font-weight:700;color:#15803d">${r.volunteer.vehicle}</span>
            </div>
            <div style="font-size:11.5px;color:#374151;margin-top:6px;line-height:1.5">
              ${r.stops.map(s => `➔ <strong>${s.store_name}</strong> (lấy ${s.allocated_quantity || s.quantity} ${s.unit})`).join(' ')} 
              ➔ 📍 <strong>Giao về ${r.destination}</strong>
            </div>
          </div>
        `;
      }).join('');

      modalEl.innerHTML = `
        <div style="background:#fff;border-radius:24px;width:100%;max-width:580px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,0.25);position:relative;border:1px solid #e5e7eb;max-height:90vh;overflow-y:auto;">
          <button onclick="document.getElementById('${modalId}').remove()" style="position:absolute;top:20px;right:20px;background:none;border:none;cursor:pointer;font-size:20px;color:#9ca3af;">✕</button>

          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <span style="font-size:26px">⚡</span>
            <div>
              <div style="font-size:11px;font-weight:800;color:#16a34a;text-transform:uppercase;letter-spacing:0.5px">Thuật Toán Ghép Đơn Đa Điểm (Multi-Source Matching)</div>
              <h3 style="margin:2px 0 0 0;font-size:18px;font-weight:900;color:#0a0a0a">Kết Quả Gom Hàng Cho: ${demand.item_name || 'Nhu cầu cứu trợ'}</h3>
            </div>
          </div>

          <div style="background:#fafafa;padding:12px 16px;border-radius:14px;border:1px solid #e5e7eb;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span style="font-size:12px;color:#6b7280">Nhu cầu đặt ra:</span>
              <strong style="font-size:14px;color:#111827;margin-left:4px">${result.target_quantity} ${result.unit}</strong>
            </div>
            <div>
              <span style="font-size:12px;color:#6b7280">Khớp thành công:</span>
              <strong style="font-size:16px;color:#16a34a;margin-left:4px">${result.total_matched_quantity} / ${result.target_quantity} ${result.unit}</strong>
              <span style="font-size:11px;font-weight:800;padding:2px 6px;border-radius:6px;background:${result.is_fully_matched ? '#dcfce7;color:#15803d' : '#fef3c7;color:#b45309'};margin-left:6px">${result.is_fully_matched ? '100% ĐẠT' : 'GOM 1 PHẦN'}</span>
            </div>
          </div>

          <div style="font-size:12px;font-weight:800;color:#374151;margin-bottom:8px">1. Danh sách ${result.allocations.length} cửa hàng được tự động ghép:</div>
          <div style="max-height:220px;overflow-y:auto;padding-right:4px">
            ${renderAllocations || '<p style="color:#9ca3af;font-size:12px">Không tìm thấy nguồn cung lân cận phù hợp.</p>'}
          </div>

          <div style="font-size:12px;font-weight:800;color:#374151;margin-top:14px;margin-bottom:6px">2. Lộ trình phân bổ Tình nguyện viên (TNV Fleet):</div>
          ${renderRoutes}

          <div style="margin-top:20px;display:flex;gap:10px">
            <button onclick="document.getElementById('${modalId}').remove()" style="flex:1;padding:12px;background:#f3f4f6;color:#374151;border:none;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer;">
              Đóng
            </button>
            <button onclick="window.FoodSaveMatching._confirmFulfill()" style="flex:2;padding:12px;background:#16a34a;color:#fff;border:none;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 8px 24px rgba(22,163,74,0.25);">
              <span>✓</span> Xác Nhận & Phát Lệnh Thu Gom Đa Điểm
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modalEl);

      window.FoodSaveMatching._confirmFulfill = function () {
        if (window.FoodSaveLocalDB) {
          window.FoodSaveLocalDB.fulfillMatchedDemand(result);
        }
        modalEl.remove();
        if (typeof global.tst === 'function') {
          global.tst('Đã phát lệnh ghép đơn!', `Đã chỉ định lấy ${result.total_matched_quantity} ${result.unit} từ ${result.allocations.length} cửa hàng`, 'accept');
        } else {
          alert(`Đã phát lệnh ghép đơn thành công lấy ${result.total_matched_quantity} ${result.unit} từ ${result.allocations.length} cửa hàng!`);
        }
        if (typeof onFulfilled === 'function') onFulfilled(result);
      };
    }
  };

  global.FoodSaveMatching = FoodSaveMatching;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { matchingService: FoodSaveMatching, FoodSaveMatching };
  }
})(typeof window !== 'undefined' ? window : global);
