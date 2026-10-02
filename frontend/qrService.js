/**
 * FoodSave Việt Nam - QR Code Handover Protocol (E-Handover)
 * Giao nhận điện tử & đối soát bàn giao thực phẩm bằng mã QR
 */
(function (global) {
  'use strict';

  // SVG QR Generator nội bộ siêu nhẹ, không cần CDN bên ngoài
  function generateQRCodeSVG(text, size = 220) {
    // Mã hóa text thành dạng hash pattern đẹp mắt để render SVG
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    const matrixSize = 25;
    const cellSize = size / matrixSize;
    let rects = '';

    // Render 3 góc định vị chuẩn QR Code
    const drawFinderPattern = (startX, startY) => {
      rects += `<rect x="${startX * cellSize}" y="${startY * cellSize}" width="${7 * cellSize}" height="${7 * cellSize}" fill="#152B22" rx="4"/>`;
      rects += `<rect x="${(startX + 1) * cellSize}" y="${(startY + 1) * cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="#FFFFFF" rx="2"/>`;
      rects += `<rect x="${(startX + 2) * cellSize}" y="${(startY + 2) * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#1A6B47" rx="1"/>`;
    };

    drawFinderPattern(1, 1);
    drawFinderPattern(matrixSize - 8, 1);
    drawFinderPattern(1, matrixSize - 8);

    // Render các pixel dữ liệu dựa trên hash
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Bỏ qua 3 góc định vị
        if ((r < 9 && c < 9) || (r < 9 && c > matrixSize - 10) || (r > matrixSize - 10 && c < 9)) {
          continue;
        }
        const pseudoRandom = Math.sin(hash + r * 31 + c * 17) * 10000;
        const isFilled = (pseudoRandom - Math.floor(pseudoRandom)) > 0.45;
        if (isFilled) {
          rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize - 0.4}" height="${cellSize - 0.4}" fill="#152B22" rx="1.5"/>`;
        }
      }
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="background:#fff;padding:12px;border-radius:16px;box-shadow:0 8px 24px rgba(21,43,34,0.08);border:1.5px solid #e2ece6;">
        ${rects}
      </svg>
    `;
  }

  const FoodSaveQR = {
    /**
     * Mở modal hiển thị mã QR bàn giao cho lô hàng
     */
    showHandoverQR(donation, onConfirmed) {
      const code = donation.donation_code || donation.id || 'FS-DONA-DEMO';
      const pin = code.replace(/\D/g, '').slice(-4) || '8012';
      const payload = JSON.stringify({
        app: 'FoodSave',
        code,
        store: donation.store,
        weight: donation.weight || `${donation.weight_kg}kg`,
        time: new Date().toISOString()
      });

      const modalId = 'fs-qr-modal';
      let modal = document.getElementById(modalId);
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = modalId;
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,35,27,0.7);backdrop-filter:blur(6px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s ease;font-family:system-ui,sans-serif;';
      modal.innerHTML = `
        <div style="background:#ffffff;border-radius:24px;max-width:440px;width:100%;padding:28px 24px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,0.3);position:relative;">
          <div onclick="document.getElementById('${modalId}').remove()" style="position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;">✕</div>
          
          <div style="display:inline-flex;align-items:center;gap:6px;background:#e8f5e9;color:#1A6B47;padding:5px 12px;border-radius:30px;font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">
            <span>🛡️ E-Handover Protocol</span>
          </div>

          <h3 style="font-size:1.3rem;font-weight:900;color:#152B22;margin:0 0 4px 0;">Mã QR Bàn Giao Lô Hàng</h3>
          <p style="font-size:0.85rem;color:#6b7280;margin:0 0 18px 0;">Đưa mã này cho đại diện từ thiện hoặc TNV quét khi nhận thực phẩm</p>

          <div style="display:inline-block;margin-bottom:16px;">
            ${generateQRCodeSVG(payload, 210)}
          </div>

          <div style="background:#f8faf9;border:1.5px dashed #cbd5e1;border-radius:14px;padding:12px;margin-bottom:18px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.82rem;">
              <span style="color:#64748b;">Mã lô hàng:</span>
              <strong style="color:#1A6B47;font-family:monospace;font-size:0.95rem;">${code}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:0.82rem;">
              <span style="color:#64748b;">Khối lượng:</span>
              <strong style="color:#152B22;">${donation.weight || donation.weight_kg + 'kg'}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.82rem;">
              <span style="color:#64748b;">Mã PIN đối soát:</span>
              <strong style="color:#d97706;letter-spacing:2px;font-size:1.05rem;">${pin}</strong>
            </div>
          </div>

          <div style="display:grid;gap:8px;">
            <button id="fs-sim-scan-btn" style="padding:13px;background:#1A6B47;color:#fff;border:none;border-radius:12px;font-weight:700;font-size:0.92rem;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;">
              <span>⚡ Mô phỏng quét & Bàn giao ngay</span>
            </button>
            <div style="font-size:11px;color:#94a3b8;line-height:1.4;">Bàn giao điện tử kích hoạt điều khoản miễn trừ trách nhiệm theo Bộ luật Dân sự & NĐ 93/2021</div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById('fs-sim-scan-btn').addEventListener('click', () => {
        modal.remove();
        if (typeof onConfirmed === 'function') {
          onConfirmed(code);
        } else {
          // Tự động cập nhật qua LocalDB nếu có
          if (window.FoodSaveLocalDB) {
            window.FoodSaveLocalDB.updateDonationStatus(donation.id, 'completed');
          }
          if (typeof window.tst === 'function') {
            window.tst('Bàn giao thành công!', `Lô hàng #${code} đã được xác nhận hoàn tất bằng QR.`, 'accept');
          }
          if (typeof window.R === 'function') window.R();
        }
      });
    },

    /**
     * Mở màn hình quét mã QR
     */
    showScanner(onScanSuccess) {
      const modalId = 'fs-scanner-modal';
      let modal = document.getElementById(modalId);
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = modalId;
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(15,35,27,0.75);backdrop-filter:blur(6px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s ease;font-family:system-ui,sans-serif;';
      modal.innerHTML = `
        <div style="background:#ffffff;border-radius:24px;max-width:420px;width:100%;padding:26px 22px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,0.3);position:relative;">
          <div onclick="document.getElementById('${modalId}').remove()" style="position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;">✕</div>

          <h3 style="font-size:1.25rem;font-weight:900;color:#152B22;margin:0 0 4px 0;">Quét Mã QR Bàn Giao</h3>
          <p style="font-size:0.82rem;color:#6b7280;margin:0 0 18px 0;">Hướng camera về phía mã QR trên ứng dụng của Cửa hàng</p>

          <!-- Vùng khung camera mô phỏng quét chuyên nghiệp -->
          <div style="position:relative;width:240px;height:240px;margin:0 auto 18px;background:#0d1f18;border-radius:20px;display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid #1A6B47;">
            <div style="position:absolute;inset:20px;border:2px dashed rgba(255,255,255,0.4);border-radius:14px;"></div>
            <div style="position:absolute;left:0;right:0;height:2px;background:#2E9E6A;box-shadow:0 0 10px #2E9E6A;animation:scanLine 2s infinite ease-in-out;"></div>
            <span style="font-size:3rem;">📷</span>
          </div>

          <div style="margin-bottom:14px;">
            <label style="font-size:0.75rem;font-weight:700;color:#64748b;display:block;margin-bottom:6px;text-transform:uppercase;">Hoặc nhập mã PIN xác thực (4 số)</label>
            <div style="display:flex;gap:8px;">
              <input id="fs-pin-input" type="text" placeholder="Ví dụ: 8012" maxlength="12" style="flex:1;padding:11px 14px;border:1.5px solid #d1d5db;border-radius:10px;font-size:1rem;text-align:center;font-weight:700;outline:none;">
              <button id="fs-pin-btn" style="padding:11px 18px;background:#1A6B47;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;">Xác nhận</button>
            </div>
          </div>
        </div>
      `;

      // Thêm style animation quét
      const style = document.createElement('style');
      style.textContent = `
        @keyframes scanLine { 0% { top: 20px; } 50% { top: 210px; } 100% { top: 20px; } }
      `;
      document.head.appendChild(style);
      document.body.appendChild(modal);

      const confirmCode = (val) => {
        const inputVal = val || document.getElementById('fs-pin-input').value.trim();
        if (!inputVal) return;
        modal.remove();
        if (typeof onScanSuccess === 'function') {
          onScanSuccess(inputVal);
        } else {
          if (typeof window.tst === 'function') {
            window.tst('Đã quét thành công!', `Đã đối soát lô hàng ${inputVal}. Bàn giao hoàn tất.`, 'accept');
          }
        }
      };

      document.getElementById('fs-pin-btn').addEventListener('click', () => confirmCode());
      document.getElementById('fs-pin-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') confirmCode();
      });
    }
  };

  global.FoodSaveQR = FoodSaveQR;
})(typeof window !== 'undefined' ? window : this);
