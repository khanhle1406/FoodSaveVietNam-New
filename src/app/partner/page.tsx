'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalDb, DonationItem, StoreKYB } from '@/context/LocalDbContext';
import { QrHandoverModal } from '@/components/qr/QrHandoverModal';
import { EsgCertificateModal } from '@/components/esg/EsgCertificateModal';
import {
  Building2,
  PlusCircle,
  QrCode,
  Award,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Package,
  FileText,
  Upload
} from 'lucide-react';

export default function PartnerPortalPage() {
  const { stores, donations, addDonation } = useLocalDb();

  // Active Store (default: WinMart or Tous Les Jours)
  const [selectedStoreId, setSelectedStoreId] = useState<string>('store-winmart-01');
  const currentStore = stores.find((s) => s.id === selectedStoreId) || stores[0];

  // Modals state
  const [activeQrDonation, setActiveQrDonation] = useState<DonationItem | null>(null);
  const [showEsgModal, setShowEsgModal] = useState(false);
  const [showKybModal, setShowKybModal] = useState(false);

  // New Donation Form state
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [weightKg, setWeightKg] = useState<number>(10);
  const [exp, setExp] = useState('Hôm nay · 21:00');
  const [urgency, setUrgency] = useState<'green' | 'yellow' | 'red'>('yellow');
  const [pickupStart, setPickupStart] = useState('18:00');
  const [pickupEnd, setPickupEnd] = useState('20:30');
  const [note, setNote] = useState('');
  const [showPostSuccess, setShowPostSuccess] = useState(false);

  // Filter donations for current store
  const storeDonations = donations.filter((d) => d.store_id === currentStore?.id || d.store === currentStore?.name);

  // Total kg saved by current store
  const storeTotalKg = storeDonations
    .filter((d) => d.status === 'completed')
    .reduce((acc, d) => acc + d.weight_kg, 120); // Base historical + live

  const handlePostDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.trim() || !amount.trim()) return;

    addDonation({
      store_id: currentStore?.id || 'store-winmart-01',
      store: currentStore?.name || 'Cửa hàng đối tác',
      items,
      amount,
      weight_kg: Number(weightKg),
      exp,
      urgency,
      pickup_start: pickupStart,
      pickup_end: pickupEnd,
      note: note || 'Bảo quản tiêu chuẩn, sẵn sàng đóng gói giao nhận.'
    });

    // Reset form
    setItems('');
    setAmount('');
    setNote('');
    setShowPostSuccess(true);
    setTimeout(() => setShowPostSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
        <div className="wrap h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-neutral-800 transition p-1.5 rounded-xl hover:bg-neutral-100">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-green-800 text-white flex items-center justify-center font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-neutral-950 flex items-center gap-2">
                  {currentStore?.name}
                  {currentStore?.verification_status === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-green-100 text-green-800 font-extrabold px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-700" /> ĐÃ DUYỆT KYB
                    </span>
                  )}
                </h1>
                <div className="text-xs text-neutral-500 font-medium">
                  Mã số thuế: {currentStore?.tax_code || '0104918404'} · {currentStore?.address}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowKybModal(true)}
              className="btn btn-outline text-xs font-bold py-2 px-3.5 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-neutral-600" /> Hồ Sơ KYB
            </button>
            <button
              onClick={() => setShowEsgModal(true)}
              className="btn btn-primary text-xs font-bold py-2 px-4 flex items-center gap-1.5 shadow-sm"
            >
              <Award className="w-4 h-4" /> Chứng Nhận ESG
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="wrap pt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Post New Donation */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 font-black text-neutral-950 text-lg mb-1">
                <PlusCircle className="w-5 h-5 text-green-700" /> Đăng Lô Thực Phẩm Cứu Trợ
              </div>
              <p className="text-xs text-neutral-500 mb-6">
                Thông tin được phát ngay tức thì đến các tổ chức từ thiện trong bán kính 10km
              </p>

              {showPostSuccess && (
                <div className="mb-5 p-3.5 bg-green-50 text-green-800 border border-green-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  Đã phát lô hàng thành công lên hệ thống điều phối cứu trợ!
                </div>
              )}

              <form onSubmit={handlePostDonation} className="space-y-4 text-xs font-semibold text-neutral-700">
                <div>
                  <label className="block mb-1.5 text-neutral-800">Tên món / Thực phẩm quyên góp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Sandwich gà phô mai & Bánh mì gối ngũ cốc"
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Số lượng phần *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 30 phần"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Khối lượng ước tính (kg) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.5"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Hạn sử dụng tốt nhất *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Hôm nay · 21:00"
                      value={exp}
                      onChange={(e) => setExp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Mức độ khẩn cấp *</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-bold text-neutral-900 bg-white"
                    >
                      <option value="yellow">🟡 Vàng (Cận date 4-8h)</option>
                      <option value="red">🔴 Đỏ (Khẩn cấp dưới 3h)</option>
                      <option value="green">🟢 Xanh (Còn 12-24h)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Giờ bắt đầu nhận</label>
                    <input
                      type="text"
                      value={pickupStart}
                      onChange={(e) => setPickupStart(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-neutral-800">Giờ kết thúc nhận</label>
                    <input
                      type="text"
                      value={pickupEnd}
                      onChange={(e) => setPickupEnd(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-neutral-800">Ghi chú đóng gói / bảo quản</label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Đã bọc màng thực phẩm, cần bảo quản mát 15-20 độ C..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-green-600 font-medium text-neutral-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary py-3.5 text-xs sm:text-sm font-black flex items-center justify-center gap-2 mt-2 shadow-md shadow-green-700/20"
                >
                  <PlusCircle className="w-4 h-4" /> Phát Tin Cứu Trợ Tức Thời
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Active Donations & Handover Management */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-black text-neutral-950">Danh Sách Lô Hàng Của Cửa Hàng</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Theo dõi tiếp nhận và quét mã QR bàn giao cho tổ chức từ thiện</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-neutral-200/80 rounded-full text-neutral-700">
                {storeDonations.length} lô hàng
              </span>
            </div>

            <div className="space-y-4">
              {storeDonations.map((d) => {
                const isNew = d.status === 'new';
                const isClaimed = d.status === 'claimed' || d.status === 'in_route';
                const isCompleted = d.status === 'completed';

                return (
                  <div
                    key={d.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200 shadow-sm transition hover:border-neutral-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-neutral-500">{d.donation_code}</span>
                          {d.urgency === 'red' && (
                            <span className="badge-urgent-red"><AlertTriangle className="w-3 h-3" /> KHẨN CẤP</span>
                          )}
                          {d.urgency === 'yellow' && (
                            <span className="badge-urgent-yellow"><Clock className="w-3 h-3" /> CẬN DATE</span>
                          )}
                          {d.urgency === 'green' && (
                            <span className="badge-urgent-green">TIÊU CHUẨN</span>
                          )}
                        </div>
                        <h3 className="text-base font-black text-neutral-950 mt-1">{d.items}</h3>
                        <div className="text-xs text-neutral-600 mt-1">
                          Số lượng: <strong>{d.amount}</strong> · Khối lượng: <strong>{d.weight_kg}kg</strong> (≈ {Number((d.weight_kg * 2.5).toFixed(1))}kg CO2e)
                        </div>
                      </div>

                      <div className="text-right">
                        {isNew && (
                          <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-[11px] font-bold">
                            Chờ tiếp nhận
                          </span>
                        )}
                        {isClaimed && (
                          <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-[11px] font-bold">
                            {d.status === 'in_route' ? 'Đang điều xe đến' : 'Đã có nơi nhận'}
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-block px-2.5 py-1 bg-green-50 text-green-800 border border-green-200 rounded-full text-[11px] font-bold">
                            Bàn giao hoàn tất
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-neutral-50 rounded-2xl p-3 text-xs text-neutral-600 border border-neutral-100 flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div>
                        Khung giờ lấy: <strong className="text-neutral-900">{d.pickup_start} - {d.pickup_end}</strong>
                      </div>
                      {d.charity_name && (
                        <div>
                          Đơn vị tiếp nhận: <strong className="text-blue-900">{d.charity_name}</strong>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
                      <button
                        onClick={() => setActiveQrDonation(d)}
                        className="btn btn-dark text-xs font-bold py-2 px-4 flex items-center gap-1.5"
                      >
                        <QrCode className="w-4 h-4 text-green-400" /> Mở Mã QR Bàn Giao
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* QR Handover Modal */}
      {activeQrDonation && (
        <QrHandoverModal
          donation={activeQrDonation}
          onClose={() => setActiveQrDonation(null)}
        />
      )}

      {/* ESG Certificate Modal */}
      {showEsgModal && (
        <EsgCertificateModal
          partnerName={currentStore?.name || 'Cửa hàng đối tác'}
          totalKg={storeTotalKg}
          onClose={() => setShowEsgModal(false)}
        />
      )}

      {/* KYB Verification Details Modal */}
      {showKybModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-100">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
              <div>
                <h3 className="text-lg font-black text-neutral-950">Hồ Sơ Thẩm Định Pháp Lý KYB</h3>
                <p className="text-xs text-neutral-500">{currentStore?.legal_name}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                ĐÃ XÁC THỰC
              </span>
            </div>

            <div className="space-y-3 mb-6 text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="font-bold text-neutral-900">1. Giấy Phép Đăng Ký Kinh Doanh (GPKD)</div>
                <div className="text-neutral-500 mt-0.5">{currentStore?.license_docs?.business?.name} · Đã duyệt</div>
              </div>
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                <div className="font-bold text-neutral-900">2. Giấy Chứng Nhận Đủ Điều Kiện An Toàn Thực Phẩm</div>
                <div className="text-neutral-500 mt-0.5">{currentStore?.license_docs?.food_safety?.name} · Hiệu lực đến 2029</div>
              </div>
            </div>

            <button
              onClick={() => setShowKybModal(false)}
              className="w-full btn btn-outline py-2.5 text-xs font-bold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
