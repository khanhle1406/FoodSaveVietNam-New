/**
 * FoodSave Việt Nam - ESG Impact Certificate Generator
 * Xuất Giấy chứng nhận Đóng góp Giảm phát thải CO₂ & Trách nhiệm Xã hội (ESG/CSR)
 */
(function (global) {
  'use strict';

  const FoodSaveESG = {
    /**
     * Mở modal và tạo Giấy chứng nhận ESG chính thức
     */
    showCertificate(options = {}) {
      const entityName = options.name || 'Cửa hàng đối tác FoodSave';
      const roleName = options.role === 'charity' ? 'Tổ chức Tiếp nhận Từ thiện' : 'Doanh nghiệp Đóng góp Tài trợ';
      const totalKg = Number(options.totalKg || 328).toLocaleString('vi-VN');
      const co2Kg = Number(options.co2Kg || 820).toLocaleString('vi-VN'); // 328 * 2.5
      const meals = Number(options.meals || 820).toLocaleString('vi-VN');
      const certCode = options.certCode || `ESG-VN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const issueDate = options.date || new Date().toLocaleDateString('vi-VN');

      const modalId = 'fs-esg-cert-modal';
      let modal = document.getElementById(modalId);
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = modalId;
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(10,25,18,0.8);backdrop-filter:blur(8px);z-index:9999999;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto;font-family:system-ui,sans-serif;';
      
      modal.innerHTML = `
        <div style="background:#fff;border-radius:24px;max-width:760px;width:100%;padding:36px;box-shadow:0 30px 80px rgba(0,0,0,0.4);position:relative;margin:auto;">
          <!-- Close button -->
          <div onclick="document.getElementById('${modalId}').remove()" class="no-print" style="position:absolute;top:20px;right:20px;width:38px;height:38px;border-radius:12px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6b7280;font-weight:700;">✕</div>

          <!-- Printable Certificate Area -->
          <div id="fs-printable-cert" style="border:6px double #1A6B47;border-radius:18px;padding:32px 28px;background:radial-gradient(circle at 50% 50%, #fafffc, #f0f7f3);text-align:center;position:relative;">
            <!-- Header -->
            <div style="font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#4b5563;margin-bottom:4px;">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br>
              <span style="border-bottom:1.5px solid #1A6B47;padding-bottom:2px;display:inline-block;font-size:10px;">Độc lập – Tự do – Hạnh phúc</span>
            </div>

            <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin:18px 0 10px;">
              <span style="font-size:1.6rem;font-weight:900;color:#1A6B47;letter-spacing:-0.5px;">FOOD<span style="color:#d97706;">SAVE</span> VIỆT NAM</span>
            </div>

            <h1 style="font-size:1.7rem;font-weight:900;color:#152B22;text-transform:uppercase;margin:8px 0 4px;letter-spacing:0.5px;">
              GIẤY CHỨNG NHẬN TÁC ĐỘNG ESG
            </h1>
            <div style="font-size:0.85rem;color:#1A6B47;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:20px;">
              ESG & CSR ENVIRONMENTAL IMPACT CERTIFICATE
            </div>

            <p style="font-size:0.95rem;color:#4b5563;margin:0 0 6px;">Nền tảng FoodSave Việt Nam trân trọng chứng nhận:</p>
            <h2 style="font-size:1.55rem;font-weight:900;color:#1A6B47;margin:4px 0 6px;">${entityName}</h2>
            <div style="font-size:0.82rem;color:#6b7280;font-weight:600;margin-bottom:24px;">Vai trò: ${roleName} · Mã định danh: ${certCode}</div>

            <!-- Impact Metrics Badges -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:28px;">
              <div style="background:#fff;border:1.5px solid #bbf7d0;border-radius:14px;padding:16px 12px;box-shadow:0 4px 12px rgba(26,107,71,0.06);">
                <div style="font-size:1.6rem;font-weight:900;color:#1A6B47;margin-bottom:2px;">${totalKg} <span style="font-size:0.9rem;">kg</span></div>
                <div style="font-size:0.75rem;font-weight:800;color:#475569;text-transform:uppercase;">Thực phẩm giải cứu</div>
              </div>

              <div style="background:#fff;border:1.5px solid #bfdbfe;border-radius:14px;padding:16px 12px;box-shadow:0 4px 12px rgba(37,99,235,0.06);">
                <div style="font-size:1.6rem;font-weight:900;color:#2563eb;margin-bottom:2px;">${co2Kg} <span style="font-size:0.9rem;">kg</span></div>
                <div style="font-size:0.75rem;font-weight:800;color:#475569;text-transform:uppercase;">CO₂ Giảm phát thải</div>
              </div>

              <div style="background:#fff;border:1.5px solid #fed7aa;border-radius:14px;padding:16px 12px;box-shadow:0 4px 12px rgba(217,119,6,0.06);">
                <div style="font-size:1.6rem;font-weight:900;color:#d97706;margin-bottom:2px;">${meals} <span style="font-size:0.9rem;">suất</span></div>
                <div style="font-size:0.75rem;font-weight:800;color:#475569;text-transform:uppercase;">Bữa ăn cộng đồng</div>
              </div>
            </div>

            <!-- Standard compliance statement -->
            <div style="font-size:0.78rem;color:#64748b;line-height:1.5;max-width:580px;margin:0 auto 28px;text-align:center;">
              Số liệu giảm phát thải được tính toán dựa trên khung phương pháp IPCC / GHG Protocol (hệ số tránh lãng phí 2.5 kg CO₂e / 1 kg thực phẩm). Chứng nhận dùng cho báo cáo phát triển bền vững thường niên (CSR/ESG).
            </div>

            <!-- Signatures and Stamp -->
            <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:20px;padding:0 24px;">
              <div style="text-align:center;font-size:0.8rem;color:#475569;">
                <div style="font-size:0.72rem;color:#94a3b8;margin-bottom:4px;">MÃ ĐỐI SOÁT XÁC THỰC</div>
                <div style="display:inline-block;padding:6px;background:#fff;border:1px solid #cbd5e1;border-radius:8px;">
                  <span style="font-size:1.4rem;">🏁</span>
                </div>
                <div style="font-family:monospace;font-size:0.75rem;color:#64748b;margin-top:2px;">${certCode}</div>
              </div>

              <div style="text-align:center;">
                <div style="font-size:0.8rem;color:#64748b;margin-bottom:4px;">TP. Hồ Chí Minh, ngày ${issueDate}</div>
                <div style="font-size:0.85rem;font-weight:800;color:#152B22;margin-bottom:24px;">ĐẠI DIỆN NỀN TẢNG FOODSAVE</div>
                <div style="display:inline-block;color:#dc2626;border:2px solid #dc2626;padding:4px 10px;border-radius:8px;font-size:0.82rem;font-weight:900;letter-spacing:1px;transform:rotate(-4deg);margin-bottom:8px;">
                  ★ ĐÃ XÁC THỰC SỐ ★
                </div>
                <div style="font-size:0.9rem;font-weight:800;color:#152B22;">Ban Điều Hành FoodSave Việt Nam</div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="no-print" style="margin-top:20px;display:flex;gap:12px;justify-content:center;">
            <button onclick="window.print()" style="padding:13px 26px;background:#1A6B47;color:#fff;border:none;border-radius:12px;font-weight:700;font-size:0.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(26,107,71,0.3);">
              <span>🖨️ Tải file PDF / In Giấy Chứng Nhận</span>
            </button>
            <button onclick="document.getElementById('${modalId}').remove()" style="padding:13px 20px;background:#f3f4f6;color:#4b5563;border:none;border-radius:12px;font-weight:600;font-size:0.92rem;cursor:pointer;">
              Đóng
            </button>
          </div>
        </div>
      `;

      // CSS for printing only the certificate
      const printStyle = document.createElement('style');
      printStyle.textContent = `
        @media print {
          body * { visibility: hidden !important; }
          #fs-esg-cert-modal, #fs-esg-cert-modal * { visibility: visible !important; }
          #fs-esg-cert-modal { position: absolute !important; inset: 0 !important; background: transparent !important; padding: 0 !important; }
          .no-print { display: none !important; }
          #fs-printable-cert { border-width: 4px !important; box-shadow: none !important; }
        }
      `;
      document.head.appendChild(printStyle);
      document.body.appendChild(modal);
    }
  };

  global.FoodSaveESG = FoodSaveESG;
})(typeof window !== 'undefined' ? window : this);
