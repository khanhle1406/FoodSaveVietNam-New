'use client';

import React, { useState } from 'react';
import { DonationItem, useLocalDb } from '@/context/LocalDbContext';
import { Truck, Bike, Users, Clock, ShieldCheck, MapPin, X, CheckCircle2 } from 'lucide-react';

interface LogisticsModalProps {
  donation: DonationItem | null;
  charityName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LogisticsModal({ donation, charityName, onClose, onSuccess }: LogisticsModalProps) {
  const { claimDonation } = useLocalDb();
  const [selectedProvider, setSelectedProvider] = useState<'ahamove' | 'grab' | 'volunteer'>('ahamove');
  const [driverAssigned, setDriverAssigned] = useState(false);

  if (!donation) return null;

  const providers = [
    {
      id: 'ahamove',
      name: 'AhaMove Giao Siêu Tốc',
      type: 'Xe máy + Thùng giữ nhiệt cách nhiệt',
      eta: '20 - 30 phút',
      cost: '0đ (Quỹ FoodSave tài trợ)',
      icon: Bike,
      color: 'text-orange-600',
      badge: 'Ưu tiên cho hàng nóng/bánh mì'
    },
    {
      id: 'grab',
      name: 'GrabExpress Mát',
      type: 'Xe máy + Túi đá gel làm lạnh',
      eta: '25 - 35 phút',
      cost: '0đ (Quỹ FoodSave tài trợ)',
      icon: Truck,
      color: 'text-green-700',
      badge: 'Thích hợp sữa/rau củ'
    },
    {
      id: 'volunteer',
      name: 'Biệt Đội Tình Nguyện Viên',
      type: 'TNV FoodSave Green Fleet',
      eta: '30 - 45 phút',
      cost: 'Miễn phí 100%',
      icon: Users,
      color: 'text-blue-600',
      badge: 'Hỗ trợ bốc dỡ tận nơi'
    }
  ];

  const handleDispatch = () => {
    const prov = providers.find((p) => p.id === selectedProvider);
    claimDonation(donation.id, charityName, prov?.name || 'AhaMove Giao Siêu Tốc');
    setDriverAssigned(true);
    if (onSuccess) onSuccess();
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-neutral-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 transition p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-2 border border-blue-200">
            <Truck className="w-3.5 h-3.5" /> LOGISTICS DISPATCH ENGINE
          </div>
          <h3 className="text-xl font-black text-neutral-900">Điều Phối Vận Chuyển Khẩn Cấp</h3>
          <p className="text-xs text-neutral-500 mt-1">Đảm bảo thực phẩm cận date được vận chuyển an toàn đến nơi tiếp nhận</p>
        </div>

        {/* Route Preview */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 mb-5 text-xs">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-900">Điểm lấy: {donation.store}</div>
              <div className="text-neutral-500 text-[11px] mt-0.5">Lô hàng: {donation.items} ({donation.weight_kg}kg)</div>
            </div>
          </div>
          <div className="border-l-2 border-dashed border-neutral-300 ml-2 h-4 my-1"></div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-neutral-900">Điểm giao: {charityName}</div>
              <div className="text-neutral-500 text-[11px] mt-0.5">Khung giờ nhận: {donation.pickup_start} - {donation.pickup_end}</div>
            </div>
          </div>
        </div>

        {/* Provider Selection */}
        <div className="space-y-3 mb-6">
          {providers.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedProvider === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p.id as any)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-green-600 bg-green-50/50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl bg-white shadow-sm border border-neutral-100 ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-neutral-900">{p.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">{p.type}</div>
                    <div className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                      {p.badge}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-green-700">{p.cost}</div>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-neutral-500 mt-1">
                    <Clock className="w-3 h-3" /> {p.eta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {driverAssigned ? (
          <div className="p-4 bg-green-50 rounded-2xl border border-green-300 text-center">
            <div className="inline-flex items-center gap-1.5 text-green-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> Đã điều phối tài xế thành công!
            </div>
            <div className="text-xs text-neutral-600 mt-2 font-medium">
              Tài xế: <strong>Nguyễn Văn Hùng</strong> · Biển số: <strong>59-P1 839.22</strong> (Đang di chuyển đến cửa hàng)
            </div>
          </div>
        ) : (
          <button
            onClick={handleDispatch}
            className="w-full btn btn-primary py-3 text-sm font-bold flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" /> Xác Nhận Điều Xe Tiếp Nhận
          </button>
        )}
      </div>
    </div>
  );
}
