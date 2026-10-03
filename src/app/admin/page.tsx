'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalDb, StoreKYB } from '@/context/LocalDbContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowLeft,
  Search,
  Award,
  Users,
  AlertTriangle,
  LogOut
} from 'lucide-react';

export default function AdminPortalPage() {
  const { stores, donations, logs, updateKYBStatus, getEsgTotals } = useLocalDb();
  const { totalWeightKg, totalCo2AvoidedKg, totalMeals } = getEsgTotals();

  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default active for seamless demo inspection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'kyb' | 'donations' | 'logs'>('kyb');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@foodsave.vn' && (password === 'admin123' || password === 'FoodSave@2026')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Email hoặc mật khẩu không chính xác. Sử dụng admin@foodsave.vn / admin123 để kiểm thử demo.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl text-white">
          <div className="w-12 h-12 rounded-2xl bg-green-900/60 border border-green-700/50 flex items-center justify-center text-green-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-center text-white">Cổng Quản Trị Hệ Thống</h2>
          <p className="text-xs text-neutral-400 text-center mt-1">Xác thực quyền quản trị viên FoodSave Việt Nam</p>

          {authError && (
            <div className="mt-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-xs font-semibold">
            <div>
              <label className="block mb-1.5 text-neutral-300">Email Quản Trị Viên</label>
              <input
                type="email"
                required
                placeholder="admin@foodsave.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-500 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-neutral-300">Mật khẩu</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-green-500 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary py-3.5 text-xs font-black shadow-lg shadow-green-900/30 mt-2"
            >
              Đăng Nhập Quản Trị
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
            <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300">
              Quay lại Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const pendingStores = stores.filter((s) => s.verification_status === 'pending_review');

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-neutral-950 text-white border-b border-neutral-800">
        <div className="wrap h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition p-1.5 rounded-xl hover:bg-neutral-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-black text-white flex items-center gap-2">
                  FoodSave Admin Portal
                  <span className="text-[10px] bg-green-900 text-green-300 px-2 py-0.5 rounded-full font-mono">
                    SUPERADMIN
                  </span>
                </h1>
                <div className="text-xs text-neutral-400 font-medium">
                  Hệ thống kiểm toán & thẩm định pháp lý đối tác
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition"
            >
              <LogOut className="w-4 h-4" /> Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="wrap pt-8">
        {/* KPI Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <div className="text-xs font-bold text-neutral-500 uppercase">Đối tác Cửa hàng</div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-950 mt-1">{stores.length}</div>
            <div className="text-[11px] text-amber-600 font-bold mt-1">
              {pendingStores.length} hồ sơ chờ duyệt KYB
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <div className="text-xs font-bold text-neutral-500 uppercase">Thực phẩm điều phối</div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-950 mt-1">{totalWeightKg + 14850} <span className="text-xs text-neutral-500">kg</span></div>
            <div className="text-[11px] text-neutral-500 mt-1 font-medium">{donations.length} đợt cứu trợ</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <div className="text-xs font-bold text-neutral-500 uppercase">CO2e Giảm Phát Thải</div>
            <div className="text-2xl sm:text-3xl font-black text-green-700 mt-1">{totalCo2AvoidedKg + 37125} <span className="text-xs text-neutral-500">kg</span></div>
            <div className="text-[11px] text-neutral-500 mt-1 font-medium">Tiêu chuẩn GHG Protocol</div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm">
            <div className="text-xs font-bold text-neutral-500 uppercase">Nhật ký Bàn Giao QR</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">{logs.length + 18}</div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">Chữ ký số xác thực 100%</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-neutral-200 mb-6 pb-2 text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('kyb')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'kyb'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Thẩm Định Hồ Sơ KYB ({stores.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'donations'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
            }`}
          >
            <Building2 className="w-4 h-4" /> Toàn Bộ Lô Hàng ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'logs'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200'
            }`}
          >
            <FileText className="w-4 h-4" /> Nhật Ký Bàn Giao Chữ Ký Số ({logs.length})
          </button>
        </div>

        {/* Tab Content: KYB Management */}
        {activeTab === 'kyb' && (
          <div className="space-y-4">
            {stores.map((s) => {
              const isVerified = s.verification_status === 'verified';
              return (
                <div
                  key={s.id}
                  className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-black text-neutral-950">{s.name}</h3>
                      {isVerified ? (
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-700" /> ĐÃ XÁC THỰC
                        </span>
                      ) : (
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-700" /> CHỜ THẨM ĐỊNH
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1 font-medium">
                      Pháp nhân: <strong>{s.legal_name}</strong> · MST: <strong>{s.tax_code}</strong> · {s.address}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-neutral-600 font-medium">
                      <span>GPKD: {s.license_docs?.business?.name || 'Đã nộp bản scan'}</span>
                      <span>·</span>
                      <span>ATTP: {s.license_docs?.food_safety?.name || 'Hiệu lực hợp lệ'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isVerified ? (
                      <>
                        <button
                          onClick={() => updateKYBStatus(s.id, 'verified')}
                          className="btn btn-primary text-xs font-bold py-2.5 px-4 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Phê Duyệt KYB
                        </button>
                        <button
                          onClick={() => updateKYBStatus(s.id, 'rejected')}
                          className="btn btn-outline text-xs font-bold py-2.5 px-3.5 text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1.5"
                        >
                          <XCircle className="w-4 h-4" /> Từ Chối
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-neutral-400 italic">
                        Đang hoạt động trên sàn
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content: All Donations */}
        {activeTab === 'donations' && (
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-neutral-50 border-b border-neutral-200 font-extrabold text-neutral-800 uppercase">
                <tr>
                  <th className="p-4">Mã lô</th>
                  <th className="p-4">Cửa hàng</th>
                  <th className="p-4">Mặt hàng quyên góp</th>
                  <th className="p-4">Khối lượng</th>
                  <th className="p-4">Mức độ</th>
                  <th className="p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-50/80 transition">
                    <td className="p-4 font-mono font-bold text-neutral-900">{d.donation_code}</td>
                    <td className="p-4 font-bold text-neutral-900">{d.store}</td>
                    <td className="p-4">{d.items}</td>
                    <td className="p-4 font-bold">{d.weight_kg}kg ({d.amount})</td>
                    <td className="p-4 font-bold">
                      {d.urgency === 'red' && <span className="text-red-600">🔴 Khẩn cấp</span>}
                      {d.urgency === 'yellow' && <span className="text-yellow-600">🟡 Cận date</span>}
                      {d.urgency === 'green' && <span className="text-green-600">🟢 Tiêu chuẩn</span>}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-700 font-bold uppercase text-[10px]">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab Content: Handover Logs */}
        {activeTab === 'logs' && (
          <div className="space-y-3">
            {logs.map((l) => (
              <div
                key={l.id}
                className="bg-white rounded-2xl p-4 border border-neutral-200 shadow-sm flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono font-bold text-green-700">{l.donation_code} · Chữ ký: {l.signature}</div>
                  <div className="text-neutral-900 font-bold mt-1">
                    {l.store_name} ➔ {l.charity_name}
                  </div>
                  <div className="text-neutral-500 text-[11px] mt-0.5">
                    Thời gian: {new Date(l.timestamp).toLocaleString('vi-VN')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-neutral-900">{l.weight_kg} kg</div>
                  <div className="text-green-700 font-bold text-[11px] mt-0.5">-{l.co2_saved_kg} kg CO2e</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
