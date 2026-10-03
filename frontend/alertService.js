/**
 * FoodSave Việt Nam - Urgent Alert & ZNS / Push Notification Service
 * Phân hệ Phát chuông báo khẩn cấp và mô phỏng gửi Zalo ZNS / SMS Brandname
 * Tự động kích hoạt khi có đợt quyên góp nhãn ĐỎ (Cận date < 3 giờ)
 */
(function (global) {
  'use strict';

  // Khởi tạo âm thanh cảnh báo bằng Web Audio API thuần (không cần file mp3 ngoài)
  function playUrgentChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('[Audio Alert] Không thể phát âm thanh tự động:', e);
    }
  }

  const FoodSaveAlert = {
    /**
     * Kích hoạt chuông và banner cảnh báo khẩn cấp cho lô hàng nhãn đỏ
     */
    triggerUrgentDonationAlert(donation) {
      const d = donation || {};
      playUrgentChime();

      // Hiển thị banner khẩn cấp ở đỉnh màn hình nếu chưa có
      let banner = document.getElementById('foodsave-urgent-banner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'foodsave-urgent-banner';
        banner.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: #ffffff;
          padding: 10px 16px;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
          animation: slideDownAlert 0.3s ease;
        `;
        document.body.prepend(banner);
      }

      banner.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700">
          <span style="font-size:18px;animation:pulseAlarm 1s infinite">🚨</span>
          <span><strong>CẢNH BÁO CẦN CỨU GẤP (CẬN DATE &lt; 3H):</strong> ${d.store || 'WinMart'} vừa đăng <em>${d.items || 'Thực phẩm dinh dưỡng'}</em> (${d.weight || '7.5kg'})</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <button onclick="window.FoodSaveAlert.showZnsNotificationModal(${JSON.stringify(d).replace(/"/g, '&quot;')})" 
                  style="background:#ffffff;color:#dc2626;border:none;padding:5px 12px;border-radius:6px;font-weight:900;font-size:12px;cursor:pointer">
            Xem tin Zalo ZNS
          </button>
          <button onclick="document.getElementById('foodsave-urgent-banner').remove()" 
                  style="background:none;border:none;color:#ffffff;font-size:16px;cursor:pointer;padding:4px">
            ✕
          </button>
        </div>
      `;

      // Tự động tắt sau 15 giây nếu không tương tác
      setTimeout(() => {
        if (banner && banner.parentNode) banner.remove();
      }, 15000);
    },

    /**
     * Mở popup mô phỏng thông báo Zalo ZNS / SMS Brandname tới điện thoại
     */
    showZnsNotificationModal(donation) {
      const d = donation || {};
      const modalHtml = `
        <div style="font-family:'Plus Jakarta Sans',system-ui,sans-serif;max-width:440px;margin:0 auto">
          <div style="background:#0068ff;color:#fff;border-radius:14px 14px 0 0;padding:16px;text-align:center">
            <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;opacity:0.9">Thông báo Chính thức qua Zalo ZNS</div>
            <div style="font-size:18px;font-weight:900;margin-top:4px">FoodSave Việt Nam Official</div>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;padding:20px">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #f1f5f9">
              <span style="font-size:28px">📦</span>
              <div>
                <div style="font-size:14px;font-weight:900;color:#0f172a">ĐỢT QUYÊN GÓP KHẨN CẤP NHÃN ĐỎ</div>
                <div style="font-size:11.5px;color:#64748b">Mã định danh: <strong>${d.id || 'FS-DONA-8012'}</strong></div>
              </div>
            </div>

            <div style="font-size:12.5px;color:#334155;line-height:1.6;margin-bottom:16px">
              Kính gửi <strong>Trưởng ban Điều phối Bếp ăn</strong>,<br>
              Cửa hàng <strong>${d.store || 'WinMart Thảo Điền'}</strong> (cách 3.2km) vừa đăng tặng khẩn cấp:
              <div style="background:#fef2f2;border-left:3px solid #dc2626;padding:8px 12px;margin:8px 0;border-radius:4px;font-weight:700;color:#991b1b">
                ${d.items || 'Sandwich gà xé phô mai'} · Khối lượng: ${d.weight || '7.5kg'}<br>
                Thời hạn sử dụng còn lại: Dưới 3 giờ!
              </div>
              Vui lòng bấm tiếp nhận để hệ thống tự động điều phối xe giao nhận khẩn cấp tới mái ấm.
            </div>

            <div style="display:flex;gap:10px">
              <button class="btn btn-primary btn-lg" style="flex:1;justify-content:center;background:#0068ff;border-color:#0068ff;font-weight:900"
                      onclick="if(typeof closeM==='function')closeM();if(window.FoodSaveLogistics)FoodSaveLogistics.showDispatchModal(${JSON.stringify(d).replace(/"/g, '&quot;')});">
                <i class="ti ti-check"></i> Tiếp nhận & Gọi xe ngay
              </button>
              <button class="btn btn-o btn-lg" onclick="if(typeof closeM==='function')closeM();">
                Để sau
              </button>
            </div>
          </div>
        </div>
      `;

      if (typeof modal === 'function') {
        modal('Zalo ZNS — Thông Báo Cứu Trợ Khẩn Cấp', modalHtml);
      }
    }
  };

  // Tự động lắng nghe Local Database: Nếu có donation red urgency -> Bắn alert
  if (global.FoodSaveLocalDB) {
    global.FoodSaveLocalDB.subscribe((type, data) => {
      if (type === 'DONATION_CREATED' && data && data.urgency === 'red') {
        FoodSaveAlert.triggerUrgentDonationAlert(data);
      }
    });
  }

  global.FoodSaveAlert = FoodSaveAlert;
})(typeof window !== 'undefined' ? window : global);
