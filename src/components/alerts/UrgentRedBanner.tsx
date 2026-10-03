'use client';

import React from 'react';
import { DonationItem } from '@/context/LocalDbContext';
import { AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';

interface UrgentRedBannerProps {
  urgentDonations: DonationItem[];
  onSelect: (donation: DonationItem) => void;
  onDismiss?: () => void;
}

export function UrgentRedBanner({ urgentDonations, onSelect, onDismiss }: UrgentRedBannerProps) {
  if (!urgentDonations || urgentDonations.length === 0) return null;

  const topUrgent = urgentDonations[0];
  if (!topUrgent) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-lg sticky top-0 z-40 px-4 py-2.5 transition-all">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-white/20 rounded-full animate-pulse flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-yellow-300" />
          </span>
          <div>
            <strong className="font-extrabold uppercase tracking-wide text-yellow-200">
              Cảnh báo khẩn cấp ({urgentDonations.length} lô cận giờ):
            </strong>{' '}
            <span className="opacity-95">
              {topUrgent.store} vừa đăng <strong>{topUrgent.items}</strong> ({topUrgent.weight_kg}kg) · Hết hạn: {topUrgent.exp}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(topUrgent)}
            className="px-3.5 py-1.5 bg-yellow-400 text-neutral-950 font-black rounded-full hover:bg-yellow-300 transition text-xs flex items-center gap-1.5 shadow"
          >
            Nhận khẩn cấp <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 text-white/80 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
