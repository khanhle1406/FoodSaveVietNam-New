/**
 * FoodSave Việt Nam - Local Database & Realtime Sync Engine
 * Chuyên dụng cho môi trường Demo offline / Trình chiếu khách hàng độc lập
 * Đồng bộ liên tab tức thời qua BroadcastChannel API & localStorage fallback.
 */
(function (global) {
  'use strict';

  const STORAGE_KEY = 'foodsave_local_database_v1';
  const CHANNEL_NAME = 'foodsave_intertab_sync';

  // Dữ liệu mẫu (Seed Data) ban đầu cho bản demo chuyên nghiệp
  const DEFAULT_SEED_DATA = {
    stores: [
      {
        id: 'store-winmart-01',
        name: 'WinMart Thảo Điền',
        legal_name: 'Công ty Cổ phần Dịch vụ Thương mại Tổng hợp WinCommerce',
        tax_code: '0104918404',
        address: '15 Thảo Điền, Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
        rating: 4.9,
        status: 'active',
        verification_status: 'verified',
        license_docs: {
          business: { name: 'GPKD_WinMart_ThaoDien.pdf', date: '2026-01-10', verified: true },
          food_safety: { name: 'ATVSTP_GiayChungNhan_2026.pdf', date: '2026-02-15', verified: true }
        }
      },
      {
        id: 'store-tous-01',
        name: 'Tous Les Jours Lê Duẩn',
        legal_name: 'Công ty TNHH CJ Foodville Việt Nam',
        tax_code: '0304567891',
        address: '39 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM',
        rating: 4.8,
        status: 'active',
        verification_status: 'verified',
        license_docs: {
          business: { name: 'GPKD_TousLesJours.pdf', date: '2026-01-05', verified: true },
          food_safety: { name: 'ATTP_SoYTe_TPHCM.pdf', date: '2026-01-20', verified: true }
        }
      },
      {
        id: 'store-coop-01',
        name: 'Co.opmart Huỳnh Tấn Phát',
        legal_name: 'Liên hiệp HTX Thương mại TP.HCM (Saigon Co.op)',
        tax_code: '0300834571',
        address: '80/4A Huỳnh Tấn Phát, Phường Tân Phú, Quận 7, TP.HCM',
        rating: 4.7,
        status: 'pending',
        verification_status: 'pending_review',
        license_docs: {
          business: { name: 'GPKD_SaigonCoop_Q7.pdf', date: '2026-03-01', verified: false },
          food_safety: { name: 'GiayATTP_Coopmart_2026.pdf', date: '2026-03-01', verified: false }
        }
      }
    ],
    charities: [
      {
        id: 'charity-tre-xanh',
        name: 'Mái Ấm Tre Xanh (Thảo Đàn)',
        legal_name: 'Dự án Bảo trợ Xã hội Thảo Đàn',
        decision_code: 'QĐ-93/2021/UBND-Q1',
        address: '40/34 Calmette, Phường Nguyễn Thái Bình, Quận 1, TP.HCM',
        contact: '0903 112 233 (Cô Hoa)',
        status: 'active',
        verification_status: 'verified'
      },
      {
        id: 'charity-bep-yeu-thuong',
        name: 'Bếp Cơm Yêu Thương Q.7',
        legal_name: 'Chi hội Bảo trợ Bệnh nhân nghèo Liên Tâm',
        decision_code: 'GXN-MTTQ-Q7/2026',
        address: '142 Lâm Văn Bền, Phường Tân Quy, Quận 7, TP.HCM',
        contact: '0918 445 566 (Chú Minh)',
        status: 'active',
        verification_status: 'verified'
      }
    ],
    donations: [
      {
        id: 'FS-DONA-8012',
        donation_code: 'FS-DONA-8012',
        store_id: 'store-winmart-01',
        store: 'WinMart Thảo Điền',
        storeAv: 'WM',
        img: '🥪',
        items: 'Sandwich gà xé phô mai & Bánh mì gối ngũ cốc',
        amount: '25 phần',
        weight_kg: 7.5,
        weight: '7.5kg',
        exp: 'Hôm nay · 21:30',
        urgency: 'yellow',
        pickup_start: '18:00',
        pickup_end: '21:00',
        pickupStart: '18:00',
        pickupEnd: '21:00',
        status: 'new', // new = chờ tiếp nhận
        note: 'Bánh sản xuất sáng nay, đã bọc màng co thực phẩm chuẩn bảo quản mát.',
        created_at: new Date(Date.now() - 35 * 60000).toISOString(),
        time: '35 phút trước',
        vol: null
      },
      {
        id: 'FS-DONA-8011',
        donation_code: 'FS-DONA-8011',
        store_id: 'store-tous-01',
        store: 'Tous Les Jours Lê Duẩn',
        storeAv: 'TL',
        img: '🥐',
        items: 'Croissant bơ Pháp & Bánh mì hoa cúc',
        amount: '40 chiếc',
        weight_kg: 12.0,
        weight: '12.0kg',
        exp: 'Ngày mai · 10:00',
        urgency: 'green',
        pickup_start: '19:30',
        pickup_end: '21:30',
        pickupStart: '19:30',
        pickupEnd: '21:30',
        status: 'accepted',
        charity_id: 'charity-tre-xanh',
        charity_name: 'Mái Ấm Tre Xanh (Thảo Đàn)',
        vol: 'Trần Minh Quang (TNV Q.1)',
        note: 'Đã đóng thùng carton sạch, ưu tiên thùng giữ nhiệt khi lấy.',
        created_at: new Date(Date.now() - 90 * 60000).toISOString(),
        time: '1.5 giờ trước'
      },
      {
        id: 'FS-DONA-8009',
        donation_code: 'FS-DONA-8009',
        store_id: 'store-coop-01',
        store: 'Co.opmart Huỳnh Tấn Phát',
        storeAv: 'CP',
        img: '🥗',
        items: 'Rau củ hữu cơ Đà Lạt & Cà chua bi VietGAP',
        amount: '18 túi',
        weight_kg: 24.5,
        weight: '24.5kg',
        exp: 'Hôm nay · 20:00',
        urgency: 'red',
        pickup_start: '17:00',
        pickup_end: '19:30',
        pickupStart: '17:00',
        pickupEnd: '19:30',
        status: 'in-route',
        charity_id: 'charity-bep-yeu-thuong',
        charity_name: 'Bếp Cơm Yêu Thương Q.7',
        vol: 'Lê Thanh Tùng (Xe bán tải thiện nguyện)',
        note: 'Rau củ tươi thu hoạch từ hôm qua, thích hợp nấu súp/canh ngay.',
        created_at: new Date(Date.now() - 150 * 60000).toISOString(),
        time: '2.5 giờ trước'
      }
    ],
    handover_records: [],
    audit_logs: [
      {
        id: 'LOG-001',
        actor: 'WinMart Thảo Điền',
        action: 'Tạo lô hàng quyên góp mới #FS-DONA-8012 (7.5kg)',
        time: new Date(Date.now() - 35 * 60000).toISOString()
      },
      {
        id: 'LOG-002',
        actor: 'Mái Ấm Tre Xanh',
        action: 'Tiếp nhận lô hàng #FS-DONA-8011 từ Tous Les Jours',
        time: new Date(Date.now() - 80 * 60000).toISOString()
      }
    ]
  };

  // Broadcast channel để đồng bộ tức thời giữa các tab trình duyệt
  let syncChannel = null;
  try {
    if (typeof window.BroadcastChannel !== 'undefined') {
      syncChannel = new window.BroadcastChannel(CHANNEL_NAME);
    }
  } catch (e) {
    console.warn('[LocalDB] Không hỗ trợ BroadcastChannel, dùng storage event fallback');
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[LocalDB] Lỗi đọc state local:', e);
    }
    // Khởi tạo mới từ seed data
    saveState(DEFAULT_SEED_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('[LocalDB] Lỗi ghi state local:', e);
    }
  }

  function emitSync(eventType, payload) {
    const message = { type: eventType, payload, timestamp: Date.now() };
    if (syncChannel) {
      syncChannel.postMessage(message);
    }
    // Dispatch event cục bộ trong cùng 1 window
    window.dispatchEvent(new CustomEvent('foodsave:localsync', { detail: message }));
  }

  // Khởi tạo đối tượng Local Database Engine
  const FoodSaveLocalDB = {
    init() {
      const state = loadState();
      return state;
    },

    getState() {
      return loadState();
    },

    resetToSeedData() {
      saveState(DEFAULT_SEED_DATA);
      emitSync('RESET_DATABASE', {});
      return DEFAULT_SEED_DATA;
    },

    // ─── PHÂN HỆ QUYÊN GÓP (DONATIONS) ───
    getDonations(filters = {}) {
      const state = loadState();
      let list = state.donations || [];
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        list = list.filter(d => statuses.includes(d.status));
      }
      if (filters.store_id) {
        list = list.filter(d => d.store_id === filters.store_id);
      }
      return list;
    },

    createDonation(data) {
      const state = loadState();
      const nextIdNum = 8013 + (state.donations?.length || 0);
      const code = `FS-DONA-${nextIdNum}`;
      const newDonation = {
        id: code,
        donation_code: code,
        store_id: data.store_id || 'store-winmart-01',
        store: data.store || 'WinMart Thảo Điền',
        storeAv: 'FS',
        img: data.img || '🍱',
        items: data.items || 'Thực phẩm dinh dưỡng tổng hợp',
        amount: data.amount || '30 phần',
        weight_kg: Number(data.weight_kg) || 10,
        weight: `${Number(data.weight_kg) || 10}kg`,
        exp: data.exp || 'Hôm nay · Trong ngày',
        urgency: data.urgency || 'yellow',
        pickup_start: data.pickup_start || '18:00',
        pickup_end: data.pickup_end || '21:00',
        pickupStart: data.pickup_start || '18:00',
        pickupEnd: data.pickup_end || '21:00',
        status: 'new',
        note: data.note || '',
        created_at: new Date().toISOString(),
        time: 'Vừa xong',
        vol: null
      };

      state.donations.unshift(newDonation);
      state.audit_logs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        actor: newDonation.store,
        action: `Đăng lô hàng quyên góp mới #${code} (${newDonation.weight})`,
        time: new Date().toISOString()
      });

      saveState(state);
      emitSync('DONATION_CREATED', newDonation);
      return newDonation;
    },

    updateDonationStatus(id, newStatus, extra = {}) {
      const state = loadState();
      const donation = (state.donations || []).find(d => d.id === id || d.donation_code === id);
      if (!donation) return null;

      const oldStatus = donation.status;
      donation.status = newStatus;
      if (extra.vol) donation.vol = extra.vol;
      if (extra.charity_id) donation.charity_id = extra.charity_id;
      if (extra.charity_name) donation.charity_name = extra.charity_name;
      if (extra.completed_at) donation.completed_at = extra.completed_at;

      // Nếu hoàn tất bàn giao -> ghi nhận record giao nhận QR
      if (newStatus === 'completed') {
        state.handover_records.unshift({
          id: `HO-${Date.now().toString().slice(-6)}`,
          donation_id: donation.id,
          store: donation.store,
          charity: donation.charity_name || 'Tổ chức từ thiện tiếp nhận',
          weight_kg: donation.weight_kg,
          co2_avoided_kg: (donation.weight_kg * 2.5).toFixed(1),
          handover_time: new Date().toISOString(),
          signed_by_volunteer: donation.vol || 'TNV điều phối FoodSave'
        });
      }

      state.audit_logs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        actor: extra.charity_name || donation.vol || 'Hệ thống',
        action: `Cập nhật lô hàng #${donation.id}: ${oldStatus} ➔ ${newStatus}`,
        time: new Date().toISOString()
      });

      saveState(state);
      emitSync('DONATION_UPDATED', donation);
      return donation;
    },

    // ─── PHÂN HỆ HỒ SƠ PHÁP LÝ (KYB) ───
    getStores() {
      const state = loadState();
      return state.stores || [];
    },

    updateStoreVerification(storeId, status, reason = '') {
      const state = loadState();
      const store = (state.stores || []).find(s => s.id === storeId);
      if (!store) return null;

      store.verification_status = status;
      store.review_reason = reason;
      store.reviewed_at = new Date().toISOString();

      if (status === 'verified') {
        store.status = 'active';
        if (store.license_docs?.business) store.license_docs.business.verified = true;
        if (store.license_docs?.food_safety) store.license_docs.food_safety.verified = true;
      }

      state.audit_logs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        actor: 'Admin FoodSave',
        action: `${status === 'verified' ? 'Phê duyệt' : 'Từ chối'} hồ sơ pháp lý đối tác: ${store.name}`,
        time: new Date().toISOString()
      });

      saveState(state);
      emitSync('STORE_VERIFICATION_UPDATED', store);
      return store;
    },

    uploadStoreLicense(storeId, type, fileName, fileDataUrl) {
      const state = loadState();
      const store = (state.stores || []).find(s => s.id === storeId);
      if (!store) return null;

      store.license_docs = store.license_docs || {};
      store.license_docs[type] = {
        name: fileName,
        dataUrl: fileDataUrl,
        date: new Date().toISOString().split('T')[0],
        verified: false
      };
      store.verification_status = 'pending_review';

      saveState(state);
      emitSync('STORE_LICENSE_UPLOADED', { storeId, type, fileName });
      return store;
    },

    // ─── TÍNH ĐIỂM ESG & BÁO CÁO MÔI TRƯỜNG ───
    getEcoImpactStats(actorId = null) {
      const state = loadState();
      const completedDonations = (state.donations || []).filter(d => d.status === 'completed');
      
      const totalKg = completedDonations.reduce((sum, d) => sum + (Number(d.weight_kg) || 0), 0) + 145.5; // cộng dồn demo
      const co2AvoidedKg = totalKg * 2.5; // Hệ số IPCC: 1 kg thực phẩm cứu trợ = giảm 2.5 kg CO2e
      const mealsEquivalent = Math.round(totalKg / 0.4); // 400g / suất ăn tiêu chuẩn

      return {
        food_saved_kg: Number(totalKg.toFixed(1)),
        co2_avoided_kg: Number(co2AvoidedKg.toFixed(1)),
        meals_equivalent: mealsEquivalent,
        completed_donations: completedDonations.length + 18,
        active_partners: state.stores.length,
        active_charities: state.charities.length
      };
    },

    // ─── ĐỒNG BỘ LIÊN TAB REALTIME ───
    subscribe(callback) {
      const handler = (event) => {
        const data = event.data || event.detail;
        if (data && typeof callback === 'function') {
          callback(data);
        }
      };

      if (syncChannel) {
        syncChannel.addEventListener('message', handler);
      }
      window.addEventListener('foodsave:localsync', handler);

      // Storage event listener fallback cho trình duyệt cũ
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && typeof callback === 'function') {
          callback({ type: 'STORAGE_CHANGED', timestamp: Date.now() });
        }
      });
    }
  };

  // Khởi tạo ngay lập tức khi script được load
  FoodSaveLocalDB.init();

  global.FoodSaveLocalDB = FoodSaveLocalDB;
})(typeof window !== 'undefined' ? window : this);
