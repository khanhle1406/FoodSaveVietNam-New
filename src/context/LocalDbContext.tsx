'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface StoreKYB {
  id: string;
  name: string;
  legal_name: string;
  tax_code: string;
  address: string;
  rating: number;
  status: 'active' | 'pending' | 'suspended';
  verification_status: 'verified' | 'pending_review' | 'rejected';
  license_docs: {
    business: { name: string; date: string; verified: boolean };
    food_safety: { name: string; date: string; verified: boolean };
  };
}

export interface DonationItem {
  id: string;
  donation_code: string;
  store_id: string;
  store: string;
  storeAv?: string;
  img?: string;
  items: string;
  amount: string;
  weight_kg: number;
  weight?: string;
  exp: string;
  urgency: 'green' | 'yellow' | 'red';
  pickup_start: string;
  pickup_end: string;
  status: 'new' | 'claimed' | 'in_route' | 'completed' | 'cancelled';
  note?: string;
  charity_name?: string;
  claimed_at?: string;
  completed_at?: string;
  logistics_method?: string;
  created_at: string;
}

export interface HandoverLog {
  id: string;
  donation_id: string;
  donation_code: string;
  store_name: string;
  charity_name: string;
  weight_kg: number;
  co2_saved_kg: number;
  signature: string;
  timestamp: string;
}

interface LocalDbContextType {
  stores: StoreKYB[];
  donations: DonationItem[];
  logs: HandoverLog[];
  addDonation: (donation: Omit<DonationItem, 'id' | 'donation_code' | 'created_at' | 'status'>) => DonationItem;
  claimDonation: (id: string, charityName: string, logisticsMethod?: string) => boolean;
  completeHandover: (id: string, signature?: string) => boolean;
  updateKYBStatus: (storeId: string, status: 'verified' | 'rejected') => boolean;
  getEsgTotals: () => { totalWeightKg: number; totalCo2AvoidedKg: number; totalMeals: number };
}

const STORAGE_KEY = 'foodsave_local_database_v2';

const DEFAULT_STORES: StoreKYB[] = [
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
];

const DEFAULT_DONATIONS: DonationItem[] = [
  {
    id: 'FS-DONA-8012',
    donation_code: 'FS-DONA-8012',
    store_id: 'store-winmart-01',
    store: 'WinMart Thảo Điền',
    storeAv: 'WM',
    img: '🥪',
    items: 'Sandwich gà xé phô mai & Bánh mì ngũ cốc',
    amount: '25 phần',
    weight_kg: 7.5,
    weight: '7.5kg',
    exp: 'Hôm nay · 21:30',
    urgency: 'yellow',
    pickup_start: '18:00',
    pickup_end: '21:00',
    status: 'new',
    note: 'Bánh sản xuất sáng nay, bảo quản phòng lạnh chuẩn.',
    created_at: new Date(Date.now() - 35 * 60000).toISOString()
  },
  {
    id: 'FS-DONA-8013',
    donation_code: 'FS-DONA-8013',
    store_id: 'store-tous-01',
    store: 'Tous Les Jours Lê Duẩn',
    storeAv: 'TLJ',
    img: '🥐',
    items: 'Croissant bơ Pháp, Baguette & Bánh Danish nho',
    amount: '40 chiếc',
    weight_kg: 12.0,
    weight: '12.0kg',
    exp: 'Hôm nay · 20:00 (Cận date)',
    urgency: 'red',
    pickup_start: '17:30',
    pickup_end: '19:45',
    status: 'new',
    note: 'Lô hàng nhãn Đỏ khẩn cấp! Cần xe giữ nhiệt tiếp nhận trước 20:00.',
    created_at: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: 'FS-DONA-8014',
    donation_code: 'FS-DONA-8014',
    store_id: 'store-coop-01',
    store: 'Co.opmart Huỳnh Tấn Phát',
    storeAv: 'CP',
    img: '🥗',
    items: 'Rau cải ngọt thủy canh & Xà lách Đà Lạt chuẩn VietGAP',
    amount: '18 túi (35kg)',
    weight_kg: 35.0,
    weight: '35.0kg',
    exp: 'Ngày mai · 10:00',
    urgency: 'green',
    pickup_start: '07:30',
    pickup_end: '11:00',
    status: 'new',
    note: 'Rau tươi thu hoạch tại nông trường sáng nay.',
    created_at: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

const DEFAULT_LOGS: HandoverLog[] = [
  {
    id: 'log-001',
    donation_id: 'FS-DONA-8009',
    donation_code: 'FS-DONA-8009',
    store_name: 'Tous Les Jours Lê Duẩn',
    charity_name: 'Mái Ấm Tre Xanh (Thảo Đàn)',
    weight_kg: 15.5,
    co2_saved_kg: 38.75,
    signature: 'FS_SIG_8009_VERIFIED',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString()
  }
];

const LocalDbContext = createContext<LocalDbContextType | undefined>(undefined);

export function LocalDbProvider({ children }: { children: React.ReactNode }) {
  const [stores, setStores] = useState<StoreKYB[]>(DEFAULT_STORES);
  const [donations, setDonations] = useState<DonationItem[]>(DEFAULT_DONATIONS);
  const [logs, setLogs] = useState<HandoverLog[]>(DEFAULT_LOGS);

  // Khôi phục từ localStorage lúc mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stores?.length) setStores(parsed.stores);
        if (parsed.donations?.length) setDonations(parsed.donations);
        if (parsed.logs?.length) setLogs(parsed.logs);
      }
    } catch (e) {
      console.warn('Lỗi đọc LocalDB:', e);
    }
  }, []);

  // Tự động lưu và phát broadcast
  const saveState = useCallback((newStores: StoreKYB[], newDonations: DonationItem[], newLogs: HandoverLog[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ stores: newStores, donations: newDonations, logs: newLogs }));
    } catch (e) {
      console.warn('Lỗi ghi LocalDB:', e);
    }
  }, []);

  const addDonation = useCallback((data: Omit<DonationItem, 'id' | 'donation_code' | 'created_at' | 'status'>) => {
    const code = 'FS-DONA-' + Math.floor(1000 + Math.random() * 9000);
    const newDonation: DonationItem = {
      ...data,
      id: code,
      donation_code: code,
      status: 'new',
      created_at: new Date().toISOString()
    };
    setDonations((prev) => {
      const next = [newDonation, ...prev];
      saveState(stores, next, logs);
      return next;
    });
    return newDonation;
  }, [stores, logs, saveState]);

  const claimDonation = useCallback((id: string, charityName: string, logisticsMethod?: string) => {
    let success = false;
    setDonations((prev) => {
      const next = prev.map((d) => {
        if (d.id === id) {
          success = true;
          return {
            ...d,
            status: (logisticsMethod ? 'in_route' : 'claimed') as DonationItem['status'],
            charity_name: charityName,
            claimed_at: new Date().toISOString(),
            logistics_method: logisticsMethod || 'Tự đến nhận'
          };
        }
        return d;
      });
      if (success) saveState(stores, next, logs);
      return next;
    });
    return success;
  }, [stores, logs, saveState]);

  const completeHandover = useCallback((id: string, signature?: string) => {
    let completedItem: DonationItem | null = null;
    setDonations((prev) => {
      const next = prev.map((d) => {
        if (d.id === id) {
          completedItem = { ...d, status: 'completed', completed_at: new Date().toISOString() };
          return completedItem;
        }
        return d;
      });
      return next;
    });

    if (completedItem) {
      const item = completedItem as DonationItem;
      const co2 = Number((item.weight_kg * 2.5).toFixed(2));
      const newLog: HandoverLog = {
        id: 'log-' + Date.now(),
        donation_id: item.id,
        donation_code: item.donation_code,
        store_name: item.store,
        charity_name: item.charity_name || 'Tổ chức từ thiện',
        weight_kg: item.weight_kg,
        co2_saved_kg: co2,
        signature: signature || 'FS_SIG_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        timestamp: new Date().toISOString()
      };
      setLogs((prev) => {
        const nextLogs = [newLog, ...prev];
        saveState(stores, donations, nextLogs);
        return nextLogs;
      });
      return true;
    }
    return false;
  }, [stores, donations, saveState]);

  const updateKYBStatus = useCallback((storeId: string, status: 'verified' | 'rejected') => {
    let ok = false;
    setStores((prev) => {
      const next = prev.map((s) => {
        if (s.id === storeId) {
          ok = true;
          return {
            ...s,
            verification_status: status,
            status: (status === 'verified' ? 'active' : 'suspended') as StoreKYB['status']
          };
        }
        return s;
      });
      if (ok) saveState(next, donations, logs);
      return next;
    });
    return ok;
  }, [donations, logs, saveState]);

  const getEsgTotals = useCallback(() => {
    const totalWeightKg = logs.reduce((acc, l) => acc + (l.weight_kg || 0), 0);
    const totalCo2AvoidedKg = Number((totalWeightKg * 2.5).toFixed(1));
    const totalMeals = Math.round(totalWeightKg * 2.4);
    return { totalWeightKg, totalCo2AvoidedKg, totalMeals };
  }, [logs]);

  return (
    <LocalDbContext.Provider
      value={{
        stores,
        donations,
        logs,
        addDonation,
        claimDonation,
        completeHandover,
        updateKYBStatus,
        getEsgTotals
      }}
    >
      {children}
    </LocalDbContext.Provider>
  );
}

export function useLocalDb() {
  const context = useContext(LocalDbContext);
  if (!context) {
    throw new Error('useLocalDb phải được sử dụng bên trong LocalDbProvider');
  }
  return context;
}
