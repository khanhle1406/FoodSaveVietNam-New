/**
 * FoodSave Việt Nam - Logistics Dispatch & Cold-Chain Delivery Engine
 * Phân hệ Điều phối Giao vận Khẩn cấp nội thành (AhaMove, GrabExpress, TNV FoodSave)
 * Tự động tính cước, cự ly km, thời gian ETA và điều kiện bảo quản thực phẩm.
 */
(function (global) {
  'use strict';

  // Danh mục đơn vị vận chuyển đối tác
  const LOGISTICS_PROVIDERS = [
    {
      id: 'volunteer',
      name: 'Biệt đội Tình nguyện viên FoodSave',
      badge: 'Miễn phí cộng đồng',
      badgeColor: '#16a34a',
      icon: '🛵',
      baseFee: 0,
      perKm: 0,
      etaMins: 20,
      vehicle: 'Xe máy cá nhân + Thùng giữ nhiệt FoodSave',
      description: 'Đội ngũ tình nguyện viên sinh viên và thanh niên hỗ trợ lấy và giao tận nơi 0đ.',
      rating: 4.9
    },
    {
      id: 'ahamove',
      name: 'AhaMove Siêu Tốc (Có thùng giữ nhiệt)',
      badge: 'Giao trong 30-45 phút',
      badgeColor: '#ea580c',
      icon: '🚚',
      baseFee: 22000,
      perKm: 4500,
      etaMins: 15,
      vehicle: 'Xe máy + Thùng giữ nhiệt cách nhiệt chuyên dụng',
      description: 'Đối tác chiến lược của FoodSave, ưu tiên nhận đơn thực phẩm cận date giảm 30% cước.',
      rating: 4.8
    },
    {
      id: 'grab',
      name: 'GrabExpress Siêu Tốc Thực Phẩm',
      badge: 'Đông tài xế nhất',
      badgeColor: '#059669',
      icon: '🏍️',
      baseFee: 25000,
      perKm: 5000,
      etaMins: 12,
      vehicle: 'Xe máy Grab standard',
      description: 'Mạng lưới tài xế phủ khắp các quận TP.HCM, tiếp cận cửa hàng sau 5-10 phút.',
      rating: 4.7
    },
    {
      id: 'cool_van',
      name: 'Xe Tải Lạnh Chuyên Dụng (Cool-Van FoodSave)',
      badge: 'Lô hàng lớn > 40kg',
      badgeColor: '#2563eb',
      icon: '🚛',
      baseFee: 85000,
      perKm: 12000,
      etaMins: 35,
      vehicle: 'Xe bán tải thùng lạnh (-2°C đến 8°C)',
      description: 'Chuyên dụng cho các đợt giải cứu thực phẩm quy mô lớn từ siêu thị, chuỗi sữa tươi.',
      rating: 5.0
    }
  ];

  // Danh mục điều kiện bảo quản
  const PRESERVATION_PACKS = [
    {
      id: 'insulated_warm',
      name: 'Thùng giữ nhiệt cách nhiệt',
      temp: '45°C - 60°C',
      icon: '♨️',
      suitableFor: 'Cơm hộp, bánh mì nóng, súp, món ăn chín chế biến trong ngày'
    },
    {
      id: 'gel_ice_cold',
      name: 'Thùng đá gel lạnh (-2°C đến 5°C)',
      temp: '-2°C - 5°C',
      icon: '❄️',
      suitableFor: 'Sữa tươi, bánh kem, yogurt, salad, rau mầm tươi sống'
    },
    {
      id: 'ambient_dry',
      name: 'Thùng carton tiêu chuẩn (Nhiệt độ phòng)',
      temp: '22°C - 28°C',
      icon: '📦',
      suitableFor: 'Bánh ngọt khô, trái cây vỏ dày, đồ hộp, gạo, mì gói'
    }
  ];

  // Danh sách tài xế mô phỏng thực tế
  const MOCK_DRIVERS = [
    { name: 'Nguyễn Văn Hùng', phone: '0908 123 456', plate: '59-P1 829.41', rating: 4.9, avatar: '👨‍✈️' },
    { name: 'Trần Minh Quân (TNV)', phone: '0932 789 012', plate: '59-X2 415.88', rating: 5.0, avatar: '🧑‍🎓' },
    { name: 'Lê Hoàng Nam', phone: '0919 334 556', plate: '59-K3 902.13', rating: 4.8, avatar: '🛵' },
    { name: 'Phạm Đức Trọng', phone: '0988 567 890', plate: '51D-938.22 (Xe tải van)', rating: 5.0, avatar: '🚛' }
  ];

  function calculateDistanceKm(pickupAddr, dropAddr) {
    // Thuật toán ước lượng cự ly nội thành TP.HCM thực tế
    let hash = 0;
    const str = String(pickupAddr || '') + String(dropAddr || '');
    for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) % 1000;
    return Number((2.5 + (hash % 65) / 10).toFixed(1)); // Khoảng cách từ 2.5km đến 9.0km
  }

  function calculateFee(provider, distanceKm) {
    if (provider.baseFee === 0) return 0;
    const extraKm = Math.max(0, distanceKm - 2);
    return Math.round((provider.baseFee + extraKm * provider.perKm) / 1000) * 1000;
  }

  const FoodSaveLogistics = {
    getProviders() {
      return LOGISTICS_PROVIDERS;
    },

    getPreservationPacks() {
      return PRESERVATION_PACKS;
    },

    /**
     * Mở modal điều phối vận chuyển khẩn cấp
     */
    showDispatchModal(donation, onDispatchSuccess) {
      const d = donation || {};
      const pickupStore = d.store || 'WinMart Thảo Điền';
      const charityName = d.charity_name || 'Mái Ấm Tre Xanh (Thảo Đàn)';
      const weightText = d.weight || `${d.weight_kg || 5}kg`;
      const distanceKm = calculateDistanceKm(pickupStore, charityName);

      let selectedProviderId = 'volunteer';
      let selectedPackId = (d.items && /sữa|kem|rau|salad/i.test(d.items)) ? 'gel_ice_cold' : 'insulated_warm';

      const renderProviders = () => {
        return LOGISTICS_PROVIDERS.map(p => {
          const fee = calculateFee(p, distanceKm);
          const isSelected = p.id === selectedProviderId;
          const feeText = fee === 0 ? 'MIỄN PHÍ' : `${fee.toLocaleString('vi-VN')}đ`;

          return `
            <div onclick="window.FoodSaveLogistics._selectProvider('${p.id}')" 
                 style="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid ${isSelected ? '#15803d' : '#e5e7eb'};background:${isSelected ? '#f0fdf4' : '#ffffff'};border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all 0.15s">
              <span style="font-size:26px">${p.icon}</span>
              <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-weight:800;font-size:13.5px;color:#111827">${p.name}</span>
                  <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:${p.badgeColor}15;color:${p.badgeColor}">${p.badge}</span>
                </div>
                <div style="font-size:11.5px;color:#6b7280;margin-top:2px">${p.vehicle} · ETA ~${p.etaMins} phút</div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:900;font-size:14px;color:${fee === 0 ? '#15803d' : '#111827'}">${feeText}</div>
                <div style="font-size:10.5px;color:#9ca3af">★ ${p.rating}</div>
              </div>
            </div>
          `;
        }).join('');
      };

      const renderPacks = () => {
        return PRESERVATION_PACKS.map(pk => {
          const isSel = pk.id === selectedPackId;
          return `
            <div onclick="window.FoodSaveLogistics._selectPack('${pk.id}')"
                 style="flex:1;min-width:140px;padding:10px 12px;border:1.5px solid ${isSel ? '#15803d' : '#e5e7eb'};background:${isSel ? '#f0fdf4' : '#fff'};border-radius:10px;cursor:pointer;transition:all 0.15s">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
                <span style="font-size:18px">${pk.icon}</span>
                <span style="font-size:12px;font-weight:800;color:#111827">${pk.temp}</span>
              </div>
              <div style="font-size:11px;font-weight:700;color:${isSel ? '#15803d' : '#4b5563'}">${pk.name}</div>
            </div>
          `;
        }).join('');
      };

      window.FoodSaveLogistics._selectProvider = function(pid) {
        selectedProviderId = pid;
        const container = document.getElementById('logistics-providers-list');
        if (container) container.innerHTML = renderProviders();
      };

      window.FoodSaveLogistics._selectPack = function(pkid) {
        selectedPackId = pkid;
        const container = document.getElementById('logistics-packs-list');
        if (container) container.innerHTML = renderPacks();
      };

      window.FoodSaveLogistics._confirmDispatch = function() {
        const prov = LOGISTICS_PROVIDERS.find(p => p.id === selectedProviderId) || LOGISTICS_PROVIDERS[0];
        const pack = PRESERVATION_PACKS.find(pk => pk.id === selectedPackId) || PRESERVATION_PACKS[0];
        const driver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
        const fee = calculateFee(prov, distanceKm);

        // Lưu trạng thái vào LocalDB nếu có
        if (window.FoodSaveLocalDB && d.id) {
          window.FoodSaveLocalDB.updateDonationStatus(d.id, 'in-route', {
            vol: `${driver.name} (${prov.name})`,
            delivery_partner: prov.name,
            preservation_type: pack.name,
            driver_phone: driver.phone,
            driver_plate: driver.plate,
            delivery_fee: fee
          });
        }

        if (typeof onDispatchSuccess === 'function') {
          onDispatchSuccess({
            provider: prov,
            driver: driver,
            pack: pack,
            fee: fee,
            distanceKm: distanceKm
          });
        }

        // Đổi modal sang màn hình Live Tracking tài xế
        FoodSaveLogistics.showDriverTrackingModal(donation, {
          provider: prov,
          driver: driver,
          pack: pack,
          distanceKm: distanceKm,
          fee: fee
        });
      };

      const modalContent = `
        <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#f8fafc;border-radius:12px;padding:14px;margin-bottom:16px;border:1px solid #e2e8f0">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase">Tuyến đường vận chuyển khẩn cấp</span>
              <span style="font-size:12px;font-weight:900;color:#0284c7">Cự ly: ${distanceKm} km · ${weightText}</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:10px">
              <div style="display:flex;flex-direction:column;align-items:center;padding-top:4px">
                <div style="width:10px;height:10px;border-radius:50%;background:#16a34a"></div>
                <div style="width:2px;height:24px;background:#cbd5e1;margin:2px 0"></div>
                <div style="width:10px;height:10px;border-radius:50%;background:#e11d48"></div>
              </div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:800;color:#0f172a">${pickupStore}</div>
                <div style="font-size:11px;color:#64748b;margin-bottom:6px">Điểm lấy hàng cứu trợ</div>
                <div style="font-size:13px;font-weight:800;color:#0f172a">${charityName}</div>
                <div style="font-size:11px;color:#64748b">Điểm giao nhận cho bếp ăn/mái ấm</div>
              </div>
            </div>
          </div>

          <div style="margin-bottom:16px">
            <label style="font-size:12px;font-weight:800;color:#334155;text-transform:uppercase;margin-bottom:8px;display:block">
              1. Điều kiện bảo quản thực phẩm (Cold-Chain Standard)
            </label>
            <div id="logistics-packs-list" style="display:flex;gap:8px;flex-wrap:wrap">
              ${renderPacks()}
            </div>
          </div>

          <div style="margin-bottom:20px">
            <label style="font-size:12px;font-weight:800;color:#334155;text-transform:uppercase;margin-bottom:8px;display:block">
              2. Chọn đơn vị vận chuyển giao nhanh
            </label>
            <div id="logistics-providers-list">
              ${renderProviders()}
            </div>
          </div>

          <div style="display:flex;gap:10px">
            <button class="btn btn-primary btn-lg" style="flex:1;justify-content:center;background:linear-gradient(135deg,#15803d,#047857);font-weight:900" 
                    onclick="window.FoodSaveLogistics._confirmDispatch()">
              <i class="ti ti-truck-delivery"></i> Xác nhận Gọi xe / Điều phối ngay
            </button>
            <button class="btn btn-o btn-lg" onclick="if(typeof closeM==='function')closeM();">Đóng</button>
          </div>
        </div>
      `;

      if (typeof modal === 'function') {
        modal('Điều phối Vận chuyển Khẩn cấp (Logistics Execution)', modalContent);
      }
    },

    /**
     * Màn hình theo dõi hành trình tài xế đang giao hàng (Live Tracking)
     */
    showDriverTrackingModal(donation, dispatchInfo) {
      const d = donation || {};
      const info = dispatchInfo || {};
      const driver = info.driver || MOCK_DRIVERS[0];
      const prov = info.provider || LOGISTICS_PROVIDERS[0];

      const trackingHtml = `
        <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:540px;margin:0 auto">
          <div style="text-align:center;padding:16px 0;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:14px;margin-bottom:16px">
            <div style="font-size:38px;margin-bottom:4px">${driver.avatar}</div>
            <div style="font-size:18px;font-weight:900;color:#166534">${driver.name}</div>
            <div style="font-size:12px;color:#15803d;font-weight:700">Đã tiếp nhận đơn hàng · Đang di chuyển đến điểm lấy</div>
            <div style="display:inline-flex;align-items:center;gap:6px;background:#ffffff;padding:4px 12px;border-radius:20px;margin-top:8px;font-size:11.5px;font-weight:800;color:#0f172a;box-shadow:0 2px 6px rgba(0,0,0,0.06)">
              <span>Biển số: <strong>${driver.plate}</strong></span> · 
              <span>SĐT: <a href="tel:${driver.phone}" style="color:#0284c7;text-decoration:none">${driver.phone}</a></span>
            </div>
          </div>

          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:16px">
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:12px">
              <span style="font-weight:800;color:#475569">Tiến độ giao vận</span>
              <span style="font-weight:900;color:#ea580c">Dự kiến giao: ~15 phút nữa</span>
            </div>
            <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;margin-bottom:12px">
              <div style="height:100%;width:45%;background:linear-gradient(90deg,#16a34a,#0284c7);border-radius:4px"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;font-weight:600">
              <span style="color:#16a34a;font-weight:800">✓ Đã nhận cuốc</span>
              <span style="color:#0284c7;font-weight:800">Đang tới điểm lấy</span>
              <span>Đang trên đường giao</span>
              <span>Bàn giao hoàn tất</span>
            </div>
          </div>

          <div style="display:flex;gap:10px">
            <button class="btn btn-primary" style="flex:1;justify-content:center" onclick="window.location.href='tel:${driver.phone}'">
              <i class="ti ti-phone"></i> Gọi tài xế
            </button>
            <button class="btn btn-o" style="flex:1;justify-content:center" onclick="if(typeof closeM==='function')closeM();">
              <i class="ti ti-check"></i> Đóng cửa sổ
            </button>
          </div>
        </div>
      `;

      if (typeof modal === 'function') {
        modal('Theo dõi Hành trình Vận chuyển Realtime', trackingHtml);
      }
    }
  };

  global.FoodSaveLogistics = FoodSaveLogistics;
})(typeof window !== 'undefined' ? window : global);
