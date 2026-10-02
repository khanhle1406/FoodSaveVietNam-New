# Kế Hoạch Triển Khai Giai Đoạn 4 (Phase 4): Vận Hành Thực Địa, Logistics & Sẵn Sàng Triển Khai

> **Mục tiêu cốt lõi:** Hoàn thiện trải nghiệm vận hành thực tế tại hiện trường cho dự án FoodSave Việt Nam, bao gồm: module điều phối vận chuyển khẩn cấp (AhaMove/Grab/TNV), hệ thống cảnh báo tức thì (Zalo ZNS & Push Alert) cho các lô hàng cận date khẩn cấp, bộ kiểm thử tự động (Test Suite), và cấu hình triển khai sẵn sàng (Vercel/Cloud Deployment).

---

## 1. Phân Tích Hiện Trạng & Yêu Cầu Giai Đoạn 4

* **Vấn đề 1 (Vận chuyển thực phẩm tươi sống khẩn cấp):** Hàng cứu trợ cận date (bánh mì, thực phẩm chế biến, rau củ) cần được vận chuyển trong vòng 1-3 giờ. Hiện tại `CHARITY.html` chỉ có trạng thái text "Đang trên đường". Cần bổ sung phân hệ **Điều phối giao vận (Logistics Dispatch)**: cho phép lựa chọn gọi đối tác vận chuyển (AhaMove, GrabExpress, BeDelivery) hoặc Biệt đội Tình nguyện viên, tính toán chi phí, cự ly và hiển thị trạng thái tài xế trực tiếp.
* **Vấn đề 2 (Cảnh báo khẩn cấp hạn chế lãng phí):** Khi cửa hàng tung lô hàng nhãn Đỏ (hết hạn trong 2-4 giờ), tổ chức từ thiện cần nhận được thông báo rung/chuông báo khẩn cấp ngay trên màn hình (mô phỏng thông báo Zalo ZNS / Web Push).
* **Vấn đề 3 (Kiểm thử & Độ tin cậy mã nguồn):** Thiết lập bộ kiểm thử tự động (Unit Test / Integration Test) cho các luồng API cốt lõi (Donation workflow, Eco-Impact calculation, KYB verification) để đảm bảo không bị lỗi hồi quy (regression bugs).
* **Vấn đề 4 (Cấu hình triển khai Vercel & Lộ trình Next.js):** Chuẩn bị sẵn file cấu hình `vercel.json` phục vụ việc deploy lên Vercel một chạm, đồng thời chuẩn hóa cấu trúc để nâng cấp giao diện sang Next.js App Router mượt mà.

---

## 2. Chi Tiết Các Hạng Mục Thực Hiện (Work Breakdown Structure)

### Hạng mục 4.1: Phân Hệ Điều Phối Vận Chuyển Khẩn Cấp (Logistics Dispatch Engine)
* **Tạo module `frontend/logisticsService.js`:**
  * Mô phỏng tích hợp API giao hàng nhanh nội thành (AhaMove, GrabExpress, FoodSave Volunteer Fleet).
  * Tính toán thông minh cước phí, cự ly km (khoảng cách giữa Cửa hàng và Tổ chức từ thiện), và thời gian dự kiến (ETA).
  * Hỗ trợ chọn điều kiện phương tiện bảo quản:
    * *Gói Tiêu chuẩn:* Xe máy + Thùng giữ nhiệt cách nhiệt (thích hợp bánh mì, cơm hộp).
    * *Gói Chuyên dụng:* Xe máy có túi đá gel lạnh hoặc Xe bán tải van mát (thích hợp sữa, thực phẩm tươi sống).
  * Modal giao diện: Cho phép Charity bấm "Gọi xe nhận hàng" ➔ Chọn đơn vị vận chuyển ➔ Xem thông tin tài xế (Tên, Biển số xe, SĐT, Vị trí đang di chuyển).

### Hạng mục 4.2: Hệ Thống Cảnh Báo Khẩn Cấp Tức Thời (Urgent Alert & ZNS Simulator)
* **Tạo module `frontend/alertService.js`:**
  * Bắt sự kiện khi có lô hàng quyên góp nhãn Đỏ (`urgency: 'red'`, còn dưới 3 tiếng).
  * Kích hoạt âm thanh thông báo và Banner Cảnh báo Đỏ (Urgent Floating Banner) trên đầu trang của Tổ chức từ thiện.
  * Mô phỏng tin nhắn thông báo **Zalo ZNS / SMS Brandname** gửi tới điện thoại trưởng ban điều phối với nút nhận hàng nhanh 1 chạm.

### Hạng mục 4.3: Bộ Kiểm Thử Tự Động (Automated Test Suite)
* **Xây dựng kiểm thử tự động với Vitest / Node Test:**
  * Test luồng tính toán phát thải `ecoImpactService` (1kg thực phẩm = 2.5kg CO₂e avoided).
  * Test luồng tạo và chuyển đổi trạng thái lô hàng (`donations`: open ➔ accepted ➔ in_route ➔ completed).
  * Test xác thực thẩm định pháp lý KYB (Pending ➔ Verified/Rejected).
  * Chạy test bằng lệnh `npm test` đảm bảo 100% pass.

### Hạng mục 4.4: Cấu Hình Triển Khai Vercel & Đóng Gói
* **Tạo file `vercel.json`:**
  * Cấu hình định tuyến và phục vụ tĩnh các file HTML (`index.html`, `CHARITY.html`, `PARTNER.html`, `ADMIN_FOODSAVE.html`, `FOODSAVE_USER.html`) cùng thư mục `frontend/`.
  * Hỗ trợ API routes nếu chạy fullstack serverless.
* **Tạo tài liệu kiến trúc chuyển đổi Next.js (`docs/NEXTJS_MIGRATION.md`):**
  * Hướng dẫn cụ thể cách chuyển đổi từng file HTML sang các route trong `app/` của Next.js với Shadcn UI.

---

## 3. Kế Hoạch Triển Khai Từng Bước

| Bước | Nội dung công việc | File tác động | Tiêu chí hoàn thành |
| :--- | :--- | :--- | :--- |
| **Bước 1** | Xây dựng `frontend/logisticsService.js` | `frontend/logisticsService.js` | Tính cước, cự ly, mô phỏng tài xế giao hàng AhaMove/Grab/TNV |
| **Bước 2** | Xây dựng `frontend/alertService.js` | `frontend/alertService.js` | Chuông báo, banner khẩn cấp nhãn Đỏ, mô phỏng Zalo ZNS |
| **Bước 3** | Tích hợp Logistics & Alert vào `CHARITY.html` và `PARTNER.html` | `CHARITY.html`, `PARTNER.html` | Charity có nút "Gọi xe giao hàng", Partner thấy cước và tài xế đến lấy |
| **Bước 4** | Xây dựng Test Suite kiểm thử tự động | `test/foodsave.test.ts` hoặc `test/services.test.js` | `npm test` chạy thành công 100% |
| **Bước 5** | Tạo cấu hình Vercel & tài liệu Next.js | `vercel.json`, `docs/NEXTJS_MIGRATION.md` | Sẵn sàng deploy Vercel 1 lệnh |
| **Bước 6** | Biên dịch, đồng bộ Graphify & Git commit | Toàn bộ repository | `npm run build` 0 lỗi, push lên GitHub repo cá nhân |

---

## 4. Cam Kết & Bảo Toàn

* Tiếp tục duy trì cơ chế **Local Database Engine (`localDb.js`)**: Bản demo cho khách hàng chạy độc lập 100%, không bị ảnh hưởng bởi đường truyền mạng hay giới hạn dung lượng ổ đĩa.
* Tuyệt đối tuân thủ quy tắc không dùng ký hiệu LaTeX (`$`, `$$`).
