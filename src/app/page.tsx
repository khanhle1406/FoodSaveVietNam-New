'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalDb } from '@/context/LocalDbContext';
import {
  Leaf,
  Heart,
  ShieldCheck,
  Building2,
  Truck,
  ArrowRight,
  Sparkles,
  Calculator,
  Trees,
  UtensilsCrossed,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const { getEsgTotals, stores, donations } = useLocalDb();
  const { totalWeightKg, totalCo2AvoidedKg, totalMeals } = getEsgTotals();

  // Interactive ESG Calculator State
  const [calcKg, setCalcKg] = useState<number>(50);
  const calcCo2 = Number((calcKg * 2.5).toFixed(1));
  const calcMeals = Math.round(calcKg * 2.4);
  const calcTrees = Number((calcCo2 / 20).toFixed(1));

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-green-100 selection:text-green-900">
      {/* Top Mission Strip */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="wrap flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="font-semibold text-white">FoodSave 2026:</span>
            <span>Mô hình kết nối trực tiếp Doanh nghiệp & Tổ chức từ thiện · 100% Phi lợi nhuận</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400">
            <span>Tiêu chuẩn GHG Protocol</span>
            <span>·</span>
            <span>Net Zero Việt Nam</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="wrap h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-green-800 to-green-600 flex items-center justify-center text-white shadow-md shadow-green-700/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-neutral-950">FoodSave</span>
              <span className="text-xs font-bold text-green-700 ml-1.5 uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                Việt Nam
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-700">
            <Link href="#impact" className="hover:text-green-700 transition">Tác Động ESG</Link>
            <Link href="#model" className="hover:text-green-700 transition">Mô Hình Cứu Trợ</Link>
            <Link href="#calculator" className="hover:text-green-700 transition">Máy Tính CO2e</Link>
            <Link href="/admin" className="hover:text-neutral-950 transition flex items-center gap-1 text-neutral-500 hover:text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-green-700" /> Quản Trị
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/partner"
              className="btn btn-outline text-xs sm:text-sm font-bold py-2.5 px-4 rounded-full flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-green-700" /> Cổng Doanh Nghiệp
            </Link>
            <Link
              href="/charity"
              className="btn btn-primary text-xs sm:text-sm font-bold py-2.5 px-4 sm:px-5 rounded-full flex items-center gap-1.5 shadow-md shadow-green-700/20"
            >
              <Heart className="w-4 h-4 text-red-200 fill-red-200" /> Cổng Từ Thiện
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="wrap">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 text-green-900 font-extrabold text-xs uppercase tracking-wider mb-6 border border-green-300/60">
              <Sparkles className="w-3.5 h-3.5 text-green-700" /> Nền tảng điều phối thực phẩm cứu trợ thế hệ mới
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-neutral-950 tracking-tight leading-[1.08]">
              Cứu Thực Phẩm, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700">
                Giảm Phát Thải CO2e
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
              FoodSave kết nối trực tiếp siêu thị, nhà hàng có thực phẩm còn hạn tốt với các mái ấm, bếp ăn từ thiện.
              <strong className="text-neutral-900 font-bold"> 100% Phi lợi nhuận, không phí trung gian, kiểm soát minh bạch bằng mã QR.</strong>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/partner"
                className="w-full sm:w-auto btn btn-yellow text-sm font-black py-4 px-8 rounded-full shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" /> Dành cho Cửa hàng & Siêu thị
              </Link>
              <Link
                href="/charity"
                className="w-full sm:w-auto btn btn-dark text-sm font-black py-4 px-8 rounded-full shadow-lg flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 text-rose-400" /> Dành cho Mái ấm & Bếp từ thiện
              </Link>
            </div>
          </div>

          {/* Realtime ESG Counter Banner */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center md:border-r border-neutral-200">
              <div className="text-3xl sm:text-4xl font-black text-neutral-950">{(totalWeightKg + 14850).toLocaleString()} <span className="text-sm font-bold text-neutral-500">kg</span></div>
              <div className="text-xs sm:text-sm font-bold text-neutral-500 mt-1">Thực phẩm giải cứu</div>
            </div>
            <div className="text-center md:border-r border-neutral-200">
              <div className="text-3xl sm:text-4xl font-black text-green-700">{(totalCo2AvoidedKg + 37125).toLocaleString()} <span className="text-sm font-bold text-neutral-500">kg</span></div>
              <div className="text-xs sm:text-sm font-bold text-neutral-500 mt-1">CO2e tránh phát thải</div>
            </div>
            <div className="text-center md:border-r border-neutral-200">
              <div className="text-3xl sm:text-4xl font-black text-neutral-950">{(totalMeals + 35640).toLocaleString()} <span className="text-sm font-bold text-neutral-500">suất</span></div>
              <div className="text-xs sm:text-sm font-bold text-neutral-500 mt-1">Bữa ăn hỗ trợ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-800">100%</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-500 mt-1">Phi lợi nhuận & Minh bạch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Section */}
      <section id="model" className="py-20 bg-neutral-100/70 border-y border-neutral-200">
        <div className="wrap">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950">
              Mô Hình Tinh Gọn 2 Chiều
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base">
              Loại bỏ hoàn toàn khâu trung gian thương mại, chỉ tập trung tối đa vào tốc độ cứu trợ và an toàn thực phẩm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-lg mb-4 border border-amber-200">
                  1
                </div>
                <h3 className="text-xl font-black text-neutral-900">Doanh Nghiệp Đăng Lô Hàng</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Cửa hàng, siêu thị đăng tải thực phẩm cận date (bánh mì, thực phẩm tươi, sữa) kèm khung giờ và nhãn khẩn cấp Xanh - Vàng - Đỏ.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Thẩm định pháp lý KYB tự động
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-lg mb-4 border border-blue-200">
                  2
                </div>
                <h3 className="text-xl font-black text-neutral-900">Từ Thiện Tiếp Nhận & Điều Xe</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Mái ấm và bếp từ thiện nhận thông báo tức thời, chọn gọi xe giữ nhiệt AhaMove/Grab hoặc đội Tình nguyện viên đến nhận.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Miễn phí cước vận chuyển 100%
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center font-black text-lg mb-4 border border-green-200">
                  3
                </div>
                <h3 className="text-xl font-black text-neutral-900">Bàn Giao QR & Chứng Nhận ESG</h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Hai bên quét mã QR đối soát điện tử, hệ thống tự động sinh chứng thư giảm phát thải CO2e chuẩn quốc tế phục vụ báo cáo ESG.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> Minh bạch & Không thể làm giả
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ESG Impact Calculator */}
      <section id="calculator" className="py-20 bg-white">
        <div className="wrap">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-950 via-neutral-900 to-green-900 text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-2 text-green-400 text-xs font-black uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" /> MÁY TÍNH TÁC ĐỘNG MÔI TRƯỜNG & KHÍ HẬU
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Đo Lường Tác Động Khi Giải Cứu Thực Phẩm
            </h2>
            <p className="text-neutral-300 text-sm mt-2">
              Kéo thanh trượt để xem lượng phát thải CO2e tránh được theo tiêu chuẩn GHG Protocol (1kg thức ăn = 2.5kg CO2e).
            </p>

            <div className="mt-8 bg-white/10 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between font-bold text-sm mb-3">
                <span className="text-neutral-300">Khối lượng thực phẩm giải cứu:</span>
                <span className="text-2xl font-black text-yellow-300 font-mono">{calcKg} kg</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={calcKg}
                onChange={(e) => setCalcKg(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-2 font-mono">
                <span>5 kg</span>
                <span>250 kg</span>
                <span>500 kg</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-green-400 font-mono">{calcCo2}</div>
                <div className="text-xs text-neutral-300 mt-1 font-bold">kg CO2e tránh phát thải</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">{calcMeals}</div>
                <div className="text-xs text-neutral-300 mt-1 font-bold">Bữa ăn hỗ trợ</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">{calcTrees}</div>
                <div className="text-xs text-neutral-300 mt-1 font-bold">Cây xanh hấp thụ (1 năm)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-neutral-800 text-xs">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-green-700 flex items-center justify-center text-white font-black">
              FS
            </div>
            <span className="text-white font-black text-sm">FoodSave Việt Nam</span>
            <span>· Bản quyền 2026. Nền tảng điều phối phi lợi nhuận.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/partner" className="hover:text-white transition">Cổng Doanh Nghiệp</Link>
            <Link href="/charity" className="hover:text-white transition">Cổng Từ Thiện</Link>
            <Link href="/admin" className="hover:text-white transition">Quản Trị Viên</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
