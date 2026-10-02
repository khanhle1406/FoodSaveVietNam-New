# Kế Hoạch Triển Khai Giai Đoạn 3: Nghiệp Vụ Cốt Lõi, QR Code Giao Nhận, Xác Thực Pháp Lý & Local Database

> **Định hướng chiến lược:** Thiết lập cơ chế **Local Database Engine** độc lập hoàn toàn (không phụ thuộc vào cloud Supabase bên ngoài), đảm bảo hệ thống chạy mượt mà 100% khi demo cho khách hàng/giám khảo xem; đồng thời hoàn thiện 4 tính năng nghiệp vụ cốt lõi theo [improvements.md](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/brainstorming/improvements.md).  
> **Thời gian dự kiến:** 3 - 5 ngày làm việc.  
> **Trạng thái:** Chờ phê duyệt.

---

## 1. NỀN TẢNG: LOCAL DATABASE ENGINE CHO BẢN DEMO KHÁCH XEM

Vì bạn không thể truy cập vào dashboard Supabase và cần một bản demo chạy ổn định tuyệt đối trước mắt khách hàng, hệ thống sẽ được trang bị **Local Data Engine**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FOODSAVE LOCAL DATA ENGINE                      │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Storage Provider:           │ LocalStorage / IndexedDB đồng bộ      │
│ 2. Data Persistence:           │ Lưu vĩnh viễn trên trình duyệt local  │
│ 3. Offline-First Fallback:     │ Tự động chuyển sang Local khi không   │
│                                │ có kết nối Supabase Cloud             │
│ 4. Cross-tab Synchronization:  │ BroadcastChannel API (đồng bộ tức thì │
│                                │ giữa các tab Partner, Charity, Admin) │
└────────────────────────────────┴───────────────────────────────────────┘
```

* **Ưu điểm khi demo:**
  - Không bao giờ bị lỗi văng màn hình `Failed to fetch`, `Network Error` hay hết quota đám mây.
  - Mở 2 tab cạnh nhau (1 tab Doanh nghiệp, 1 tab Từ thiện), tạo đơn là tab kia nhận được ngay tức thì nhờ `BroadcastChannel`.
  - Khởi tạo sẵn một bộ dữ liệu mẫu (Seed Data) chuẩn chỉnh: các siêu thị lớn (Co.opmart, WinMart), tổ chức từ thiện (Mái ấm Tre Xanh, Quỹ Bếp Yêu Thương) và các đợt quyên góp thực tế.

---

## 2. CHI TIẾT 4 TÍNH NĂNG NGHIỆP VỤ CỐT LÕI (GIAI ĐOẠN 3)

### Tính năng 1: Giao Nhận Điện Tử Bằng Mã QR (E-Handover Protocol)

* **Vấn đề thực tế:** Khi tình nguyện viên hoặc đại diện từ thiện đến cửa hàng lấy hàng, cần một biên bản bàn giao điện tử để chốt trách nhiệm pháp lý và thời điểm chuyển giao thực phẩm.
* **Các bước triển khai:**
  1. **Sinh mã QR Động cho mỗi lô hàng:**
     - Tích hợp thư viện sinh QR code siêu nhẹ (`qrcode.js` chạy client-side).
     - Mỗi lô hàng khi ở trạng thái `accepted` hoặc `in-route` sẽ có nút **"Mã QR Bàn Giao"**.
     - Dữ liệu mã hóa trong QR gồm: mã lô hàng (`FS-DONA-XXXX`), ID doanh nghiệp, ID tổ chức từ thiện, trọng lượng thực phẩm và mốc thời gian bàn giao.
  2. **Màn hình Quét & Đối Soát QR:**
     - Cung cấp cả 2 phương thức:
       - **Quét trực tiếp qua Camera:** Dùng thư viện `html5-qrcode`.
       - **Nhập mã đối soát thủ công:** Dành cho thiết bị không có camera hoặc camera mờ.
     - Sau khi quét thành công: hệ thống tự động đổi trạng thái đơn sang `completed`, ghi nhận mốc thời gian chốt sổ và hiển thị hiệu ứng thành công.

---

### Tính năng 2: Cổng Nộp Hồ Sơ Xác Thực Pháp Lý (KYB Verification)

* **Vấn đề thực tế:** Ngăn chặn việc lợi dụng danh nghĩa từ thiện để nhận thực phẩm cứu trợ bán lại kiếm lời; đảm bảo cửa hàng quyên góp có giấy phép ATVSTP.
* **Các bước triển khai:**
  1. **Form nộp tài liệu trong Cổng Doanh Nghiệp ([PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)):**
     - Upload Giấy chứng nhận Đăng ký Doanh nghiệp (GPKD).
     - Upload Giấy chứng nhận Cơ sở đủ điều kiện An toàn Thực phẩm (ATTP).
     - Hiển thị bản xem trước (preview) hình ảnh/PDF và trạng thái: `Chờ duyệt`, `Đã xác thực`, `Yêu cầu bổ sung`.
  2. **Form nộp tài liệu trong Cổng Từ Thiện ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html)):**
     - Upload Quyết định thành lập / Công nhận điều lệ quỹ từ thiện (theo Nghị định 93/2021/NĐ-CP) hoặc Giấy giới thiệu của Ủy ban MTTQ/Hội Chữ Thập Đỏ.
  3. **Lưu trữ tài liệu Local:** Lưu trữ dưới dạng Base64 data URL trong Local Data Store để demo mượt mà không cần upload lên cloud S3.

---

### Tính năng 3: Giao Diện Phê Duyệt Hồ Sơ Quản Trị (Admin Review Panel)

* **Vấn đề thực tế:** Trang [ADMIN_FOODSAVE.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/ADMIN_FOODSAVE.html) cần có công cụ trực quan để đội vận hành xem và đối soát hồ sơ pháp lý.
* **Các bước triển khai:**
  1. Xây dựng tab **"Hồ sơ pháp lý chờ duyệt"** trong trang Admin.
  2. Tính năng Review trực quan:
     - Khung xem trước tài liệu (Document Preview Modal) phóng to hình ảnh giấy phép.
     - Form thao tác:
       - **Nút "Phê duyệt":** Đổi trạng thái đối tác sang `active` và gắn huy hiệu tick xanh xác minh `Verified`.
       - **Nút "Từ chối / Yêu cầu bổ sung":** Nhập lý do (ví dụ: *"Giấy phép ATTP hết hạn"*, *"Ảnh chụp bị mờ mã số thuế"*).
  3. Tự động gửi thông báo kết quả kiểm duyệt về Cổng Đối tác và Cổng Từ thiện.

---

### Tính năng 4: Xuất Giấy Chứng Nhận ESG & Giảm Phát Thải CO₂ (PDF Certificate)

* **Vấn đề thực tế:** Động lực lớn nhất để các tập đoàn F&B tham gia quyên góp là báo cáo phát triển bền vững (CSR / ESG). Họ cần Giấy chứng nhận có thể tải về in ấn hoặc đính kèm báo cáo thường niên.
* **Các bước triển khai:**
  1. Tích hợp thư viện xuất PDF client-side chuyên nghiệp (`jspdf` + `html2canvas`).
  2. Thiết kế mẫu **Giấy Chứng Nhận Tác Động Môi Trường & Xã Hội** chuẩn mực:
     - Header: Quốc hiệu, Logo FoodSave Việt Nam, Mã chứng nhận điện tử (`ESG-VN-2026-XXXX`).
     - Tên doanh nghiệp / Đơn vị tài trợ.
     - Số liệu đóng góp: Tổng số kg thực phẩm giải cứu, Lượng CO₂ giảm phát thải (tính theo hệ số IPCC 2.5 kg CO₂e / kg thực phẩm), Số bữa ăn quy đổi.
     - Con dấu số nền tảng FoodSave Việt Nam và Mã QR đối soát xác thực chứng nhận.
  3. Cho phép Doanh nghiệp và Tổ chức từ thiện bấm **"Xuất chứng nhận PDF"** tải ngay về máy tính chỉ với 1 cú click.

---

## 3. CHECKLIST KIỂM THỬ KHI DEMO CHO KHÁCH

- [ ] **Chạy độc lập 100%:** Ngắt kết nối internet hoặc mở bản build local, toàn bộ hệ thống vẫn chạy mượt mà, không báo lỗi kết nối máy chủ.
- [ ] **Đồng bộ liên tab:** Mở tab Doanh nghiệp đăng món, tab Từ thiện lập tức nhận được thông báo đợt quyên góp mới.
- [ ] **Demo luồng QR Code:** Bấm nhận lô hàng ➔ mở QR code ➔ quét QR xác nhận ➔ hoàn thành bàn giao.
- [ ] **Demo Hồ sơ pháp lý:** Tải giấy phép lên ở tab Đối tác ➔ mở tab Admin xem và bấm duyệt ➔ tab Đối tác hiện huy hiệu "Đã xác thực".
- [ ] **Demo Xuất PDF:** Bấm xuất báo cáo ESG ➔ file PDF thiết kế đẹp mắt tự động tải về máy.
