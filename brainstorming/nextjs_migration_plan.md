# Kế Hoạch Chuyển Đổi Chi Tiết Sang Next.js App Router (Zero-Downtime Migration Plan)

> **Mục tiêu:** Chuyển đổi toàn diện dự án FoodSave Việt Nam từ mô hình Multi-Page HTML/JS sang ứng dụng Fullstack chuẩn **Next.js (App Router, React, TypeScript, TailwindCSS)**, đảm bảo:
> 1. Không làm gián đoạn bản demo đang chạy trực tiếp trên Vercel.
> 2. Giữ nguyên 100% tính năng đã hoàn thiện (Logistics AhaMove/Grab, Ký số QR, Chứng nhận ESG, Thẩm định KYB, Cảnh báo ZNS).
> 3. Tuyệt đối không có lỗi biên dịch TypeScript, ESLint hay lỗi gãy vỡ UI.

---

## 1. Phân Tích Rủi Ro & Chiến Lược An Toàn (Risk & Mitigation Matrix)

| Rủi ro tiềm ẩn | Mức độ | Biện pháp phòng ngừa & Xử lý |
| :--- | :--- | :--- |
| **Vercel Build thất bại** khi cài thêm Next.js vào dự án đang có Express | Cao | Chạy cài đặt dependencies cục bộ, cấu hình `next.config.mjs`, kiểm thử `npm run build` đạt 0 lỗi trước khi cập nhật `vercel.json` và đẩy lên production. |
| **Giao diện bị mất style / hiệu ứng** khi chuyển từ HTML sang JSX | Trung bình | Tách toàn bộ CSS tokens, gradient và micro-animations từ HTML vào `src/app/globals.css` và Tailwind theme, tái sử dụng các class có sẵn. |
| **Mất cơ chế Offline Demo** khi Supabase Cloud mất kết nối | Cao | Port toàn bộ `frontend/localDb.js` thành React State/Context hook (`useLocalDb`), tự động fallback nếu Supabase offline hoặc chưa đăng nhập. |
| **Lỗi SSR với thư viện Browser-only** (html5-qrcode, jspdf, localStorage) | Cao | Áp dụng directive `'use client'` cho các tương tác Client Component, bọc các API trình duyệt bằng dynamic import `ssr: false` hoặc `useEffect`. |

---

## 2. Lộ Trình Triển Khai 6 Giai Đoạn (Work Breakdown Structure)

```text
[Giai đoạn 1] Chuẩn bị hạ tầng & Cài đặt Next.js Core
       │
       ▼
[Giai đoạn 2] Chuyển đổi Core Services & State Layer (TypeScript/React Hooks)
       │
       ▼
[Giai đoạn 3] Chuyển đổi Component UI tái sử dụng (QR, ESG, Logistics, Alert)
       │
       ▼
[Giai đoạn 4] Xây dựng các Trang Tuyến đường (Landing, Partner, Charity, Admin)
       │
       ▼
[Giai đoạn 5] Tích hợp Backend API Routes & Supabase SSR
       │
       ▼
[Giai đoạn 6] Kiểm thử toàn diện, Build Production, Dọn dẹp & Push Vercel
```

---

### Giai đoạn 1: Chuẩn Bị Hạ Tầng & Cài Đặt Next.js Core

* **Mục tiêu:** Thiết lập môi trường Next.js App Router song song mà không ảnh hưởng mã nguồn hiện có.
* **Các bước thực hiện:**
  1. Cài đặt các gói phụ thuộc chuẩn:
     * `next`, `react`, `react-dom`, `@types/react`, `@types/react-dom`
     * `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `clsx`, `tailwind-merge`
  2. Tạo file cấu hình:
     * `next.config.mjs`: Hỗ trợ tối ưu hình ảnh, standalone output cho Vercel.
     * `tailwind.config.ts`: Khai báo bảng màu FoodSave (green-950, green-800, yellow-400, soft-background).
     * `postcss.config.mjs`
  3. Cập nhật `tsconfig.json`: Bổ sung cấu hình JSX (`preserve`), `paths` (`@/*` trỏ tới `./src/*`).
  4. Tạo cấu trúc thư mục gốc:
     * `src/app/layout.tsx` (Root Layout nạp font Plus Jakarta Sans, toaster, metadata SEO)
     * `src/app/globals.css` (Design system tokens, keyframes animation)

---

### Giai đoạn 2: Chuyển Đổi Core Services & State Management

* **Mục tiêu:** Chuyển đổi toàn bộ logic vanilla JS sang TypeScript Hooks và Context an toàn kiểu dữ liệu.
* **Các file chuyển đổi:**
  1. `frontend/apiClient.js` ➔ `src/lib/apiClient.ts`:
     * Hỗ trợ gọi nội bộ API routes hoặc Supabase Cloud.
  2. `frontend/localDb.js` ➔ `src/context/LocalDbContext.tsx` & `src/hooks/useLocalDb.ts`:
     * Cung cấp State stores, donations, claims, logs.
     * Tự động đồng bộ với localStorage trên trình duyệt.
  3. `frontend/foodsave-auth-client.js` ➔ `src/hooks/useAuth.ts`:
     * Quản lý trạng thái phiên đăng nhập Supabase Auth (User, Role: admin/partner/charity).

---

### Giai đoạn 3: Chuyển Đổi Các Component Chuyên Dụng Tái Sử Dụng

* **Mục tiêu:** Module hóa các tính năng độc lập thành React Component chuẩn UI:
  1. **QR Handover Component (`src/components/qr/QrHandoverModal.tsx`):**
     * Sinh mã QR bàn giao lô hàng kèm chữ ký số xác thực thời gian thực.
     * Tích hợp máy quét camera quét QR đối soát 2 chiều giữa Partner và Charity.
  2. **ESG Certificate Component (`src/components/esg/EsgCertificateModal.tsx`):**
     * Hiển thị chứng nhận giảm phát thải CO2e chuẩn quốc tế.
     * Hỗ trợ in ấn và tải về định dạng PDF.
  3. **Logistics Dispatcher Component (`src/components/logistics/LogisticsModal.tsx`):**
     * Lựa chọn đối tác điều phối (AhaMove, GrabExpress, Biệt đội Tình nguyện viên).
     * Tính toán cước phí thông minh, thời gian dự kiến (ETA) và hiển thị định vị tài xế.
  4. **Urgent Alert Component (`src/components/alerts/UrgentRedBanner.tsx`):**
     * Banner cảnh báo khẩn cấp cho các lô hàng nhãn Đỏ (cận date dưới 3 giờ).
     * Tích hợp âm thanh chuông báo và mô phỏng thông báo Zalo ZNS.

---

### Giai đoạn 4: Xây Dựng Các Tuyến Đường (App Router Pages)

* **Tuyến đường 1: Landing Page (`src/app/page.tsx`):**
  * Chuyển đổi từ `index.html`.
  * Hiển thị Hero banner, cam kết minh bạch phi lợi nhuận, bộ đếm số liệu tác động thời gian thực (kg thức ăn cứu trợ, tấn CO2 giảm phát thải, bữa ăn phục vụ).
  * Bộ tính toán tác động ESG tương tác (ESG Interactive Impact Calculator).
* **Tuyến đường 2: Cổng Doanh Nghiệp Đối Tác (`src/app/partner/page.tsx`):**
  * Chuyển đổi từ `PARTNER.html`.
  * Form đăng ký lô hàng quyên góp mới (chọn hạn sử dụng, khối lượng, nhãn khẩn cấp Xanh/Vàng/Đỏ).
  * Hồ sơ thẩm định pháp lý KYB (Giấy phép kinh doanh, Giấy ATTP) kèm trạng thái duyệt.
  * Danh sách lô hàng đã đăng kèm nút xuất mã QR bàn giao.
* **Tuyến đường 3: Cổng Tổ Chức Từ Thiện (`src/app/charity/page.tsx`):**
  * Chuyển đổi từ `CHARITY.html`.
  * Bộ lọc tìm kiếm lô hàng theo cự ly gần nhất (km) và mức độ khẩn cấp.
  * Nút "Tiếp nhận cứu trợ" ➔ Gọi xe vận chuyển (AhaMove/Grab/TNV) ➔ Quét mã QR nghiệm thu.
* **Tuyến đường 4: Cổng Quản Trị Hệ Thống (`src/app/admin/page.tsx`):**
  * Chuyển đổi từ `ADMIN_FOODSAVE.html`.
  * Cổng bảo mật xác thực quản trị viên (Gatekeeper Auth).
  * Phê duyệt hồ sơ KYB của đối tác cửa hàng.
  * Giám sát bản đồ điều phối thời gian thực và nhật ký kiểm toán hệ thống.

---

### Giai đoạn 5: Tích Hợp API Routes & Supabase SSR

* Chuyển đổi các endpoint Express cốt lõi sang Next.js App Route Handlers:
  * `src/app/api/v1/donations/route.ts` (GET danh sách, POST tạo mới)
  * `src/app/api/v1/donations/[id]/claim/route.ts` (POST tiếp nhận hàng)
  * `src/app/api/v1/kyb/verify/route.ts` (POST duyệt hồ sơ pháp lý)
* Đảm bảo API Handlers vừa ghi nhận dữ liệu vào Supabase Cloud vừa có cơ chế phản hồi tương thích ngược.

---

### Giai đoạn 6: Kiểm Thử Toàn Diện, Build Production & Triển Khai Vercel

* **Bộ tiêu chí nghiệm thu (Acceptance Criteria):**
  1. `npm test` vượt qua 100% các bài test nghiệp vụ trong `test/foodsave_core.test.mjs`.
  2. `npm run build` biên dịch Next.js thành công 100% với 0 lỗi TypeScript và 0 lỗi cảnh báo cú pháp.
  3. Cấu hình `vercel.json` chuyển sang chế độ Next.js native (`framework: "nextjs"`).
  4. Đẩy mã nguồn lên GitHub repo `https://github.com/khanhle1406/FoodSaveVietNam-New.git`.
  5. Vercel tự động build và triển khai bản Next.js mượt mà.
  6. Xóa các file `.html` cũ sau khi đã đối soát xong toàn bộ chức năng trên môi trường live.

---

## 3. Bảng Kiểm Tra Tiến Độ Từng Bước (Migration Checklist)

- [ ] Bước 1: Khởi tạo dependencies Next.js + React + TailwindCSS
- [ ] Bước 2: Thiết lập `next.config.mjs`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`
- [ ] Bước 3: Chuyển đổi Data Layer: `LocalDbContext`, `useAuth`, `apiClient`
- [ ] Bước 4: Chuyển đổi 4 UI Modals: `QrHandoverModal`, `EsgCertificateModal`, `LogisticsModal`, `UrgentRedBanner`
- [ ] Bước 5: Chuyển đổi `src/app/page.tsx` (Trang chủ)
- [ ] Bước 6: Chuyển đổi `src/app/partner/page.tsx` (Portal Đối tác)
- [ ] Bước 7: Chuyển đổi `src/app/charity/page.tsx` (Portal Từ thiện)
- [ ] Bước 8: Chuyển đổi `src/app/admin/page.tsx` (Portal Admin)
- [ ] Bước 9: Chạy `npm test` & `npm run build` xác thực 0 lỗi
- [ ] Bước 10: Xóa các file `.html` cũ, cập nhật `vercel.json` và push GitHub
