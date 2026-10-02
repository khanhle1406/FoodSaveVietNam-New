# Kế Hoạch Triển Khai Cải Tiến Dự Án FoodSave Việt Nam
*(Triển khai các hạng mục khả thi ngay hiện tại)*

> **Mục tiêu:** Khắc phục triệt để các lỗi runtime nghiêm trọng, chuẩn hóa cấu hình bảo mật, vá lỗ hổng truy cập trang quản trị và xây dựng module API Client kết nối Frontend - Backend.  
> **Thời gian dự kiến:** 1 - 2 ngày làm việc.  
> **Trạng thái:** Sẵn sàng thực thi.

---

## 1. TỔNG QUAN CÁC GIAI ĐOẠN

```text
[ Giai đoạn 1: Hotfix Khẩn cấp ]  ──►  [ Giai đoạn 2: Bảo mật & Cơ sở dữ liệu ]  ──►  [ Giai đoạn 3: Cầu nối API Frontend ]
  • Sửa lỗi link 404 (index.html)        • Dọn dẹp secret key (env.ts)                 • Tạo module frontend/js/apiClient.js
  • Sửa lỗi query SQL (adminService)     • Thống nhất driver DB (sellerReputation)     • Kết nối mẫu API quyên góp thực tế
  • Sửa lỗi query SQL (ecoImpactService) • Kích hoạt Auth Guard (ADMIN_FOODSAVE)
```

---

## 2. CHI TIẾT CÁC HẠNG MỤC THỰC HIỆN

### Giai đoạn 1: Sửa Lỗi Khẩn Cấp (Hotfixes)

#### 1.1. Sửa lỗi Broken Link 404 trên Landing Page
* **File:** [index.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/index.html)
* **Vị trí:** Dòng 839 và dòng 947.
* **Chi tiết thay đổi:**
  * Thay `href="PARTNER_TINH.html"` thành `href="PARTNER.html"`.
* **Tiêu chuẩn nghiệm thu:** 
  * Cả hai nút CTA "Đăng nhập doanh nghiệp" tại Header và Hero section khi click đều mở chính xác trang [PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html), không bị lỗi 404.

#### 1.2. Khắc phục lỗi Crash SQL 500 trong `adminService.ts`
* **File:** [src/services/adminService.ts](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/services/adminService.ts)
* **Vấn đề:** Bảng `profiles` sau migration `014` không còn cột `avatar_url` và `metadata`.
* **Chi tiết thay đổi:**
  * Cập nhật kiểu `ProfileRow`: loại bỏ `avatar_url` và `metadata`.
  * Cập nhật 5 câu truy vấn `.select(...)` tại các hàm:
    * `requirePartnerProfile` (dòng 40)
    * `loadProfilesById` (dòng 78)
    * `getPendingPartners` (dòng 99)
    * `approvePartner` (dòng 146)
    * `rejectPartner` (dòng 185)
    * *Đổi thành:* `.select("id,role,full_name,phone,status,created_at,updated_at")`.
* **Tiêu chuẩn nghiệm thu:** 
  * API `/api/v1/admin/partners/pending` và các endpoint duyệt đối tác không bị lỗi Postgres `column "avatar_url" does not exist`.

#### 1.3. Khắc phục lỗi Crash SQL 500 trong `ecoImpactService.ts`
* **File:** [src/services/ecoImpactService.ts](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/services/ecoImpactService.ts)
* **Vị trí:** Dòng 454 - 471.
* **Chi tiết thay đổi:**
  * Sửa câu truy vấn `.select("id,full_name,avatar_url")` thành `.select("id,full_name")`.
  * Cập nhật type casting loại bỏ `avatar_url`.
  * Gán mặc định `avatar_url: null` trong dữ liệu trả về cho bảng xếp hạng.
* **Tiêu chuẩn nghiệm thu:** 
  * API bảng xếp hạng đóng góp môi trường `/api/v1/eco-impact/leaderboard` truy vấn dữ liệu thành công.

---

### Giai đoạn 2: Củng Cố Bảo Mật & Ổn Định Hạ Tầng

#### 2.1. Loại bỏ Secret Key Hardcode trong `env.ts`
* **File:** [src/config/env.ts](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/config/env.ts)
* **Chi tiết thay đổi:**
  * Thay giá trị fallback mặc định của `MOMO_ACCESS_KEY` và `MOMO_SECRET_KEY` bằng chuỗi rỗng `""`.
  * Đảm bảo hệ thống ưu tiên đọc từ biến môi trường `process.env`.
  * Bổ sung ghi chú vào [.env.example](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/.env.example).
* **Tiêu chuẩn nghiệm thu:** 
  * Không còn khóa bí mật lộ trong mã nguồn Git.

#### 2.2. Thống nhất Driver Kết Nối Cơ Sở Dữ Liệu
* **File:** [src/services/sellerReputationService.ts](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/src/services/sellerReputationService.ts)
* **Vấn đề:** Sử dụng `postgresPool` (node-postgres) gọi trực tiếp tới `localhost:5432`, gây lỗi `ECONNREFUSED` trên Netlify Serverless Functions.
* **Chi tiết thay đổi:**
  * Chuyển các truy vấn bảng `seller_reputation` sang dùng `supabaseAdmin.from("seller_reputation")`.
  * Loại bỏ import `postgresPool` trong service này.
* **Tiêu chuẩn nghiệm thu:** 
  * Chạy thông suốt trên cả môi trường local lẫn serverless Netlify mà không yêu cầu cổng TCP Postgres trực tiếp.

#### 2.3. Khóa Truy Cập Trang Quản Trị (Admin Early Auth Gate)
* **File:** [ADMIN_FOODSAVE.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/ADMIN_FOODSAVE.html)
* **Vấn đề:** Người dùng chưa đăng nhập vẫn xem được toàn bộ giao diện dashboard và dữ liệu mẫu.
* **Chi tiết thay đổi:**
  * Thêm màn hình kiểm tra quyền truy cập (Auth Overlay) che phủ dashboard ngay khi load DOM.
  * Tự động kiểm tra session từ Supabase:
    * Nếu đã đăng nhập và có quyền `role === 'admin'`: gỡ bỏ màn che và cho phép thao tác.
    * Nếu chưa đăng nhập: giữ màn che, hiển thị form đăng nhập admin trực tiếp hoặc chuyển hướng về trang chủ.
* **Tiêu chuẩn nghiệm thu:** 
  * Khi mở trang ở chế độ ẩn danh (Incognito), giao diện dashboard bị khóa hoàn toàn cho tới khi đăng nhập thành công tài khoản quản trị.

---

### Giai đoạn 3: Cầu Nối Frontend - Backend (Khởi tạo `apiClient.js`)

#### 3.1. Xây dựng Module Client API Chuẩn Hóa
* **File tạo mới:** `frontend/js/apiClient.js`
* **Nội dung:**
  * Cung cấp cơ chế tự động nhận dạng base URL:
    * Chế độ Local: `http://localhost:8080/api/v1`
    * Chế độ Deploy: `/.netlify/functions/api/v1`
  * Tự động lấy JWT Access Token từ Supabase session để đính kèm vào header `Authorization: Bearer <token>`.
  * Xây dựng các hàm giao tiếp chuẩn:
    * `authAPI`: Đăng nhập, thông tin profile.
    * `donationsAPI`: Danh sách lô hàng quyên góp, tạo mới lô hàng, tiếp nhận (`accept`), cập nhật trạng thái (`status`).
    * `ecoImpactAPI`: Lấy thống kê số kg thực phẩm giải cứu và lượng CO₂ giảm phát thải.
* **Tiêu chuẩn nghiệm thu:** 
  * Frontend có thể gọi thử nghiệm API backend thông qua file script duy nhất mà không cần viết lại logic `fetch` rải rác.

---

## 3. CHECKLIST KIỂM THỬ & NGHIỆM THU

- [ ] `npm run build`: TypeScript biên dịch hoàn tất 0 lỗi (`dist/` được tạo mới đầy đủ).
- [ ] Kiểm tra liên kết tại [index.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/index.html) -> mở đúng [PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html).
- [ ] Không còn cảnh báo schema hay lỗi SQL liên quan đến `avatar_url`/`metadata`.
- [ ] Mở [ADMIN_FOODSAVE.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/ADMIN_FOODSAVE.html) ở trình duyệt ẩn danh được bảo vệ bởi lớp khóa xác thực.
- [ ] Commit thay đổi vào git local và push lên repo cá nhân: `https://github.com/khanhle1406/FoodSaveVietNam-New.git`.
