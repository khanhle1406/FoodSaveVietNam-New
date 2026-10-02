# Kế Hoạch Triển Khai Giai Đoạn 2: Đồng Bộ Hóa Dữ Liệu & Kết Nối Backend

> **Mục tiêu:** Xóa bỏ hoàn toàn hiện trạng dữ liệu giả (`localStorage` / biến RAM `DONATIONS = []`), kết nối các cổng người dùng ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html), [PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)) với hệ thống REST API Backend thông qua `FoodSaveAPI`, và giải quyết vấn đề Realtime trên Serverless.  
> **Thời gian dự kiến:** 2 - 3 ngày làm việc.  
> **Trạng thái:** Chờ phê duyệt.

---

## 1. TỔNG QUAN HIỆN TRẠNG ĐỨT GÃY

```text
[ HIỆN TRẠNG ]
  • PARTNER.html: Lưu session vào localStorage riêng lẻ; tạo đợt quyên góp chỉ đổi mảng cục bộ PRD / donaHistory.
  • CHARITY.html: Danh sách quyên góp chạy bằng mảng cứng DONATIONS = []; bấm "Nhận hàng" hay "Đang giao" chỉ đổi RAM trình duyệt hiện tại.
  • Socket.io: Chạy server riêng trong src/realtime/, vô hiệu khi deploy lên Netlify Serverless Functions.

[ MỤC TIÊU GIAI ĐOẠN 2 ]
  • Nhúng frontend/apiClient.js vào cả 2 cổng Doanh nghiệp và Từ thiện.
  • CHARITY.html: Tải danh sách lô hàng từ GET /api/v1/donations; cập nhật trạng thái qua PATCH /api/v1/donations/:id/*.
  • PARTNER.html: Đăng lô hàng quyên góp vào POST /api/v1/donations; tải lịch sử quyên góp thật từ DB.
  • Realtime: Chuyển sang Supabase Realtime Channels (Postgres Changes) chạy qua WebSockets client-side, tương thích 100% Serverless.
```

---

## 2. CHI TIẾT CÁC HẠNG MỤC TRIỂN KHAI

### Hạng mục 2.1: Tích hợp API vào Cổng Từ Thiện ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html))

* **Vấn đề cần giải quyết:** Biến `let DONATIONS = []` tại dòng 1641 đang chứa mock data. Các thao tác chuyển trạng thái (nhận lô hàng, tài xế xuất phát, hoàn tất nhận) chỉ sửa phần tử mảng nội bộ.
* **Các bước triển khai:**
  1. Nhúng `<script src="frontend/apiClient.js"></script>` vào [CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html).
  2. Viết hàm `fetchRealDonations()`:
     - Gọi `FoodSaveAPI.donations.list({ status: ['new', 'pending', 'accepted', 'in-route', 'completed'] })`.
     - Ánh xạ (map) dữ liệu từ bảng `donations` của Backend vào cấu trúc hiển thị của giao diện (tên doanh nghiệp, số kg, địa chỉ, loại thực phẩm, hạn sử dụng, nhãn xanh/vàng/đỏ).
     - Đổ vào danh sách `DONATIONS` và gọi hàm re-render `R()`.
  3. Kết nối các hành động của Tổ chức từ thiện:
     - **Bấm "Nhận quyên góp":** Gọi `FoodSaveAPI.donations.accept(donationId, { estimated_pickup_at: ... })`.
     - **Bấm "Bắt đầu pickup / Xuất phát":** Gọi `FoodSaveAPI.donations.updateStatus(donationId, { status: 'in-route' })`.
     - **Bấm "Xác nhận đã nhận hàng":** Gọi `FoodSaveAPI.donations.updateStatus(donationId, { status: 'completed' })`.
     - **Bấm "Từ chối lô hàng":** Gọi `FoodSaveAPI.donations.updateStatus(donationId, { status: 'cancelled', note: reason })`.
  4. Hiển thị thông báo Toast thành công hoặc lỗi chi tiết từ máy chủ khi thao tác.

---

### Hạng mục 2.2: Tích hợp API vào Cổng Doanh Nghiệp ([PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html))

* **Vấn đề cần giải quyết:** Doanh nghiệp đăng thông tin quyên góp thực phẩm cận date nhưng không được lưu trữ vào bảng `donations` trong cơ sở dữ liệu.
* **Các bước triển khai:**
  1. Nhúng `<script src="frontend/apiClient.js"></script>` vào [PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html).
  2. Kết nối form **"Đăng đợt quyên góp mới"**:
     - Thu thập thông tin: tên thực phẩm, trọng lượng (kg), nhãn (xanh / vàng / đỏ), hạn sử dụng (giờ/ngày), điều kiện bảo quản, địa chỉ kho nhận.
     - Gửi request `FoodSaveAPI.donations.create(payload)` lên endpoint `POST /api/v1/donations`.
     - Nhận phản hồi thành công và tự động làm mới danh sách các đợt quyên góp của cửa hàng.
  3. Tải số liệu tác động môi trường thực tế:
     - Gọi `FoodSaveAPI.ecoImpact.getPartnerImpact()` để hiển thị chính xác số kg thực phẩm đã giải cứu và lượng CO₂ giảm phát thải trên Dashboard đối tác thay cho số liệu tĩnh.

---

### Hạng mục 2.3: Chuyển đổi Realtime sang Supabase Realtime Channels

* **Vấn đề cần giải quyết:** Socket.io trong `src/realtime/socketServer.ts` không duy trì được kết nối liên tục trên Netlify Functions (Serverless).
* **Các bước triển khai:**
  1. Ở Client Frontend ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html) và [PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)):
     - Sử dụng Supabase Realtime Client (kết nối trực tiếp từ trình duyệt qua WebSocket của Supabase):
       ```javascript
       const channel = supabase.channel('donations_realtime')
         .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, (payload) => {
           console.log('Có thay đổi trạng thái lô hàng:', payload);
           fetchRealDonations(); // Tự động cập nhật giao diện ngay lập tức
         })
         .subscribe();
       ```
     - Khi Doanh nghiệp đăng lô hàng mới -> Màn hình Từ thiện tự động nhảy thông báo và hiện lô hàng mới mà không cần F5 tải lại trang.
  2. Ở Backend:
     - Biến `emitStoreStatusChanged` trong [src/realtime/socketServer.ts](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/realtime/socketServer.ts) thành non-blocking safe (không báo lỗi khi không có Socket server).

---

### Hạng mục 2.4: Đồng bộ Authentication Session Đồng Nhất

* **Vấn đề cần giải quyết:** Cả `PARTNER.html` và `CHARITY.html` cần dùng chung định dạng lưu trữ token đăng nhập để `apiClient.js` tự động nhận diện và gửi kèm trong header `Authorization: Bearer <token>`.
* **Các bước triển khai:**
  - Chuẩn hóa hàm lưu session khi đăng nhập thành công vào khóa `foodsave.auth.session` chứa `{ access_token, user: { id, role, email, full_name } }`.
  - Tự động kiểm tra tính hợp lệ của token khi tải trang; nếu hết hạn thì chuyển hướng về màn hình đăng nhập.

---

## 3. CHECKLIST KIỂM THỬ GIAI ĐOẠN 2

- [ ] Mở tab Doanh nghiệp ([PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)), tạo một lô hàng quyên góp mới.
- [ ] Kiểm tra cơ sở dữ liệu Supabase: bảng `donations` xuất hiện bản ghi mới với trạng thái `new`.
- [ ] Mở tab Từ thiện ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html)): lô hàng mới tự động xuất hiện trên danh sách mà không cần F5.
- [ ] Bấm "Tiếp nhận" trên giao diện Từ thiện: trạng thái lô hàng trên database chuyển thành `accepted`.
- [ ] Bấm "Bắt đầu pickup" -> chuyển thành `in-route`; Bấm "Đã nhận hàng" -> chuyển thành `completed`.
- [ ] Bảng tác động môi trường [ecoImpact](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/services/ecoImpactService.ts) ghi nhận sự kiện và cộng dồn số kg thực phẩm giải cứu.
