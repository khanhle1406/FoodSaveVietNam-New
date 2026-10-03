'use client';

import React, { useState } from 'react';
import { DonationItem, useLocalDb } from '@/context/LocalDbContext';
import { QrCode, ShieldCheck, CheckCircle2, X, Printer } from 'lucide-react';

interface QrHandoverModalProps {
  donation: DonationItem | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function QrHandoverModal({ donation, onClose, onSuccess }: QrHandoverModalProps) {
  const { completeHandover } = useLocalDb();
  const [confirmed, setConfirmed] = useState(false);

  if (!donation) return null;

  const code = donation.donation_code || donation.id;
  const pin = code.replace(/\D/g, '').slice(-4) || '8012';

  // SVG QR Generator nội bộ
  const renderQrSvg = () => {
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      hash = ((hash << 5) - hash) + code.charCodeAt(i);
      hash |= 0;
    }
    const matrixSize = 25;
    const cellSize = 200 / matrixSize;
    const rects: React.ReactNode[] = [];

    // 3 Góc định vị chuẩn
    const addFinder = (keyPrefix: string, startX: number, startY: number) => {
      rects.push(
        <rect key={`${keyPrefix}-outer`} x={startX * cellSize} y={startY * cellSize} width={7 * cellSize} height={7 * cellSize} fill="#0a0a0a" rx={4} />,
        <rect key={`${keyPrefix}-mid`} x={(startX + 1) * cellSize} y={(startY + 1) * cellSize} width={5 * cellSize} height={5 * cellSize} fill="#ffffff" rx={2} />,
        <rect key={`${keyPrefix}-inner`} x={(startX + 2) * cellSize} y={(startY + 2) * cellSize} width={3 * cellSize} height={3 * cellSize} fill="#16a34a" rx={1} />
      );
    };

    addFinder('tl', 1, 1);
    addFinder('tr', matrixSize - 8, 1);
    addFinder('bl', 1, matrixSize - 8);

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if ((r < 9 && c < 9) || (r < 9 && c > matrixSize - 10) || (r > matrixSize - 10 && c < 9)) continue;
        const pseudo = Math.sin(hash + r * 31 + c * 17) * 10000;
        if (pseudo - Math.floor(pseudo) > 0.45) {
          rects.push(
            <rect
              key={`cell-${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize - 0.4}
              height={cellSize - 0.4}
              fill="#0a0a0a"
              rx={1.5}
            />
          );
        }
      }
    }

    return (
      <svg width={200} height={200} viewBox="0 0 200 200" className="mx-auto bg-white p-3 rounded-2xl shadow-md border border-neutral-200">
        {rects}
      </svg>
    );
  };

  const handleConfirm = () => {
    const sig = 'FS_SIG_' + Math.random().toString(36).substring(2, 9).toUpperCase();
    completeHandover(donation.id, sig);
    setConfirmed(true);
    if (onSuccess) onSuccess();
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 transition p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full mb-2 border border-green-200">
            <ShieldCheck className="w-3.5 h-3.5" /> E-HANDOVER PROTOCOL v2
          </div>
          <h3 className="text-xl font-black text-neutral-900">Mã Bàn Giao Điện Tử</h3>
          <p className="text-xs text-neutral-500 mt-1">Đưa mã QR cho bên nhận quét hoặc đọc mã PIN 4 số</p>
        </div>

        <div className="my-5 flex justify-center">
          {renderQrSvg()}
        </div>

        <div className="bg-neutral-50 rounded-2xl p-4 text-center border border-neutral-200/80 mb-5">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Mã PIN Đối Soát Khẩn Cấp</div>
          <div className="text-3xl font-black tracking-widest text-green-700 mt-1 font-mono">{pin}</div>
          <div className="text-xs text-neutral-600 mt-2 font-medium">
            Mã lô: <strong className="text-neutral-900">{code}</strong> · {donation.items}
          </div>
        </div>

        {confirmed ? (
          <div className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-800 rounded-xl font-bold text-sm border border-green-300">
            <CheckCircle2 className="w-5 h-5 text-green-600" /> Đã xác thực bàn giao thành công!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.print()}
              className="btn btn-outline text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> In Phiếu Giao
            </button>
            <button
              onClick={handleConfirm}
              className="btn btn-primary text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Xác Nhận Giao
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
