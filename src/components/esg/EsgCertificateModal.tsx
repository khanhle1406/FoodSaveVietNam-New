'use client';

import React from 'react';
import { Leaf, Award, Printer, X, Trees, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

interface EsgCertificateModalProps {
  partnerName: string;
  totalKg: number;
  onClose: () => void;
}

export function EsgCertificateModal({ partnerName, totalKg, onClose }: EsgCertificateModalProps) {
  const co2AvoidedKg = Number((totalKg * 2.5).toFixed(1));
  const mealsProvided = Math.round(totalKg * 2.4);
  const treesEquivalent = Number((co2AvoidedKg / 20).toFixed(1));
  const certId = 'ESG-VN-2026-' + Math.floor(100000 + Math.random() * 900000);
  const issueDate = new Date().toLocaleDateString('vi-VN');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border-4 border-green-700/20 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-700 transition p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate Border Design */}
        <div className="border-2 border-dashed border-green-700/30 rounded-2xl p-6 bg-gradient-to-b from-green-50/50 to-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-900 rounded-full text-xs font-black tracking-wider uppercase mb-3">
            <Award className="w-4 h-4 text-green-700" /> CHỨNG NHẬN TRÁCH NHIỆM XANH ESG
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            CHỨNG THỰC BẢO VỆ MÔI TRƯỜNG & KHÍ HẬU
          </h2>
          <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-semibold">
            FOOD RESCUE & CARBON OFFSET ACCREDITATION 2026
          </p>

          <div className="my-6">
            <p className="text-xs text-neutral-500 font-medium">Trân trọng chứng nhận và tri ân đơn vị đối tác:</p>
            <h3 className="text-2xl font-black text-green-900 mt-1.5">{partnerName}</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
              Đã tích cực tham gia mạng lưới giải cứu thực phẩm, ngăn chặn lãng phí và đóng góp trực tiếp vào mục tiêu Net Zero quốc gia.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="bg-white p-3.5 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-green-700 text-xs font-bold mb-1">
                <UtensilsCrossed className="w-3.5 h-3.5" /> Thực phẩm cứu trợ
              </div>
              <div className="text-xl sm:text-2xl font-black text-neutral-900">{totalKg} <span className="text-xs font-bold text-neutral-500">kg</span></div>
              <div className="text-[11px] text-neutral-500 mt-0.5">≈ {mealsProvided} suất ăn</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-green-700 text-xs font-bold mb-1">
                <Leaf className="w-3.5 h-3.5" /> Giảm phát thải CO2e
              </div>
              <div className="text-xl sm:text-2xl font-black text-green-700">{co2AvoidedKg} <span className="text-xs font-bold text-neutral-500">kg</span></div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Tiêu chuẩn GHG Protocol</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-center justify-center gap-1 text-green-700 text-xs font-bold mb-1">
                <Trees className="w-3.5 h-3.5" /> Tương đương cây xanh
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-800">{treesEquivalent} <span className="text-xs font-bold text-neutral-500">cây</span></div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Hấp thụ trong 1 năm</div>
            </div>
          </div>

          {/* Footer of Certificate */}
          <div className="flex items-center justify-between text-left border-t border-neutral-200/80 pt-4 mt-6 text-xs text-neutral-500">
            <div>
              <div>Mã số chứng nhận: <strong className="text-neutral-800 font-mono">{certId}</strong></div>
              <div>Ngày cấp chứng nhận: <strong className="text-neutral-800">{issueDate}</strong></div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Hệ thống giám sát định danh FoodSave Blockchain Registry</div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-green-800 font-bold bg-green-100/70 px-2.5 py-1 rounded-md text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-700" /> ĐÃ XÁC THỰC KYB
              </div>
              <div className="text-[10px] text-neutral-500 mt-1 font-semibold">Ban Giám Sát Tác Động ESG</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="btn btn-outline text-xs font-bold py-2.5 px-4"
          >
            Đóng
          </button>
          <button
            onClick={() => window.print()}
            className="btn btn-primary text-xs font-bold py-2.5 px-5 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> In / Tải Chứng Nhận PDF
          </button>
        </div>
      </div>
    </div>
  );
}
