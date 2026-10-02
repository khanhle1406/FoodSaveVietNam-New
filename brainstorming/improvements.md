# Kế Hoạch Đánh Giá & Hoàn Thiện Dự Án FoodSave Việt Nam

> **Tài liệu kiểm toán mã nguồn & Danh mục nâng cấp toàn diện**  
> **Dự án:** FoodSave Việt Nam ([GitHub Repository](https://github.com/foodsavevietnam/FoodSaveVietNam) | [Live Website](https://foodsavevietnam.netlify.app/))  
> **Ngày lập:** 02/10/2026  
> **Trạng thái phân tích:** Đã kiểm tra toàn bộ mã nguồn Frontend, Backend TypeScript, Database Migration SQL và Live Deployment.

---

## 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN

Dự án FoodSave Việt Nam đang ở giai đoạn **tái cấu trúc dở dang (In-Transition)** giữa mô hình cũ (Sàn thương mại điện tử 3 bên: Người dùng cá nhân, Cửa hàng bán giảm giá, Tổ chức từ thiện) và mô hình mới (Nền tảng B2B phi lợi nhuận: Doanh nghiệp quyên góp trực tiếp cho Tổ chức từ thiện).

```
                      [ HIỆN TRẠNG HỆ THỐNG ]
                    
     FRONTEND (Static Multi-Page)            BACKEND (Express/TypeScript)
  ┌─────────────────────────────────┐     ┌───────────────────────────────────┐
  │ index.html (Landing page)       │     │ src/routes/ (*.ts)                │
  │ PARTNER.html (Cổng doanh nghiệp)│  X  │ src/controllers/ (*.ts)           │
  │ CHARITY.html (Cổng từ thiện)    │     │ src/services/ (*.ts)              │
  │ ADMIN_FOODSAVE.html (Quản trị)  │     │ src/schemas/ (Zod validation)     │
  └─────────────────────────────────┘     └───────────────────────────────────┘
                  │                                         │
                  │ (Gọi trực tiếp client-side JS)          │ (REST API qua Netlify Functions)
                  ▼                                         ▼
            [ Supabase DB ] ◄───────────────────────────────┘
```

* **Điểm sáng:**
  * Backend TypeScript (`/src`) có cấu trúc phân tầng (`routes`, `controllers`, `services`, `middlewares`, `schemas`) rất chuẩn mực, dùng Zod để validate request.
  * Có script cơ sở dữ liệu `014_foodsave_partner_charity_refactor.sql` định nghĩa RLS (Row Level Security), enum, trigger tự động hóa và bảng số liệu tác động môi trường (`eco_impact_events`, `seller_reputation`).
  * Giao diện Landing Page `index.html` được thiết kế lại gọn gàng (~1.050 dòng), tốc độ tải trang nhanh.

* **Điểm yếu then chốt:**
  * **Frontend và Backend bị đứt gãy hoàn toàn:** Backend viết API RESTful nhưng Frontend không hề gọi tới, mà chạy bằng mock data và `localStorage`.
  * **Nhiều lỗi runtime nghiêm trọng:** Truy vấn các cột đã bị xóa trong database, Socket.io không chạy được trên môi trường Serverless, link nút điều hướng chính bị 404.

---

## 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS)

### 2.1. Lỗi Broken Link 404 ngay trên trang chủ
* **Vị trí:** `index.html` (dòng 839 và dòng 947).
* **Mô tả:** Nút CTA quan trọng nhất là **"Đăng nhập doanh nghiệp"** đang liên kết tới:
  ```html
  <a class="btn yellow" href="PARTNER_TINH.html">Đăng nhập doanh nghiệp</a>
  ```
* **Hậu quả:** File `PARTNER_TINH.html` không tồn tại trong repository. Người dùng hoặc đối tác doanh nghiệp truy cập trang chủ bấm vào nút chính sẽ lập tức gặp trang lỗi **404 Not Found**.
* **Khắc phục:** Đổi liên kết thành `PARTNER.html` (hoặc `/partner` theo Netlify Pretty URL).

### 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`
* **Vị trí:**
  * `src/services/adminService.ts` (dòng 40, 78, 99, 146, 185)
  * `src/services/ecoImpactService.ts` (dòng 454)
* **Mô tả:** Trong file migration `014_foodsave_partner_charity_refactor.sql`, các cột sau đã bị xóa khỏi bảng `public.profiles`:
  ```sql
  alter table public.profiles
    drop column if exists avatar_url cascade,
    drop column if exists metadata cascade;
  ```
  Tuy nhiên, trong `adminService.ts` vẫn cố định thực hiện câu query:
  ```ts
  .select("id,role,full_name,phone,avatar_url,status,metadata,created_at,updated_at")
  ```
* **Hậu quả:** Bất kỳ request nào của Admin gọi xem danh sách đối tác (`/api/v1/admin/partners/pending`, duyệt đối tác, từ chối đối tác) sẽ **bị văng lỗi 500 từ Postgres: column "avatar_url" does not exist**.
* **Khắc phục:** Cập nhật lại câu lệnh `.select("id,role,full_name,phone,status,created_at,updated_at")` để khớp với schema thực tế.

### 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless
* **Vị trí:** `src/realtime/socketServer.ts`, `src/server.ts`, `netlify/functions/api.ts`.
* **Mô tả:** Dự án cài đặt thư viện `socket.io` và viết logic phát thông báo WebSocket thời gian thực (`emitStoreStatusChanged`). Tuy nhiên, ứng dụng lại được deploy lên **Netlify Functions** (`serverless-http`).
* **Hậu quả:** Netlify Functions là môi trường Serverless chạy không trạng thái (stateless/ephemeral), container sẽ đóng băng hoặc tắt ngay sau khi kết thúc request HTTP. Kết nối WebSocket không thể duy trì, toàn bộ module Socket.io trở nên vô hiệu.
* **Khắc phục:** Thay vì tự dựng Socket.io server, chuyển toàn bộ tính năng realtime sang **Supabase Realtime (WebSockets qua Postgres Changes)** vốn đã được hỗ trợ sẵn bởi Supabase Client và tương thích 100% với hạ tầng serverless.

### 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern
* **Vị trí:** `src/config/postgres.ts`, `src/services/sellerReputationService.ts`.
* **Mô tả:** Trong khi 95% backend sử dụng REST API của Supabase qua HTTPS (`supabaseAdmin`), riêng `sellerReputationService.ts` lại import `postgresPool` từ thư viện `pg` (node-postgres) để mở kết nối TCP trực tiếp vào database.
* **Hậu quả:** Trên Netlify Functions, biến môi trường mặc định là `DATABASE_HOST=localhost:5432`. Khi gọi API uy tín người bán, serverless container cố kết nối vào `localhost:5432` nội bộ của AWS Lambda dẫn đến lỗi `ECONNREFUSED` hoặc bị timeout.
* **Khắc phục:** Đồng nhất toàn bộ truy vấn về `supabaseAdmin` hoặc dùng connection pooler của Supabase (PgBouncer cổng 6543) qua một chuỗi `DATABASE_URL` duy nhất.

### 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình
* **Vị trí:** `src/config/env.ts`, `PARTNER.html`, `ADMIN_FOODSAVE.html`, `frontend/foodsave-auth-client.js`.
* **Mô tả:** 
  * Anon Key và Supabase Project URL (`https://idhpydhlgnxjjtyrgfkj.supabase.co`) bị nhúng trực tiếp trong code frontend HTML.
  * Secret key thử nghiệm của MoMo (`K951B6PE1waDMi640xX08PD3vg6EkVlz`) được đặt làm giá trị mặc định trực tiếp trong code `env.ts`.
* **Khắc phục:** Đưa toàn bộ cấu hình vào file `.env`, truyền qua biến môi trường của Netlify Deployment, và chặn truy cập trực tiếp bằng các API proxy an toàn.

---

## 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND

Hiện tại, codebase tồn tại tới **3 hệ thống xử lý logic và dữ liệu chạy song song nhưng không hề liên thông**:

1. **Hệ thống 1 - Backend Express API (`src/`):**
   * Đầy đủ nghiệp vụ quản lý lô hàng (`/api/v1/donations`), hồ sơ tổ chức (`/api/v1/charity`), đối tác (`/api/v1/partner`), tính điểm phát thải (`/api/v1/eco-impact`).
   * **Thực tế:** Không có trang web nào ở frontend gửi request tới các route này.

2. **Hệ thống 2 - Script cũ `frontend/foodsave-auth-client.js`:**
   * Dài 5.341 dòng code, can thiệp vào window (`window.regNext`, `window.enterPortal`) theo flow đăng ký cũ 7 bước.
   * File này được nhúng vào `CHARITY.html`, nhưng bị `PARTNER.html` cố tình loại bỏ vì làm vỡ giao diện.

3. **Hệ thống 3 - Inline Javascript trong từng file HTML:**
   * `PARTNER.html` tự viết logic lưu session vào `localStorage.setItem('foodsave.auth.session')`.
   * Danh sách quyên góp và tiếp nhận trong `CHARITY.html` được gán cứng vào mảng bộ nhớ `let DONATIONS = [...]`. Khi chuyển trạng thái từ "Chờ nhận" sang "Đang giao" hay "Hoàn tất", dữ liệu chỉ thay đổi trên màn hình của phiên duyệt đó, người khác hoặc thiết bị khác không thể thấy.

**Yêu cầu cải tiến:** Bỏ toàn bộ hệ thống mock/patching trong `foodsave-auth-client.js` và inline JS. Viết một API Client duy nhất (dùng Fetch API hoặc Axios) gọi thẳng vào `/api/v1/*` của backend.

---

## 4. CÁC TÍNH NĂNG NGHIỆP VỤ CỐT LÕI CÒN THIẾU

Để trở thành một sản phẩm thực tế đưa vào vận hành tại Việt Nam, FoodSave cần bổ sung 6 khối tính năng nghiệp vụ cốt lõi:

### 4.1. Quy trình Điều phối & Vận chuyển (Logistics Execution)
* **Vấn đề thực tế:** Thực phẩm cận date thường là hàng tươi sống, rau củ quả, bánh mì, sữa... có thời gian sử dụng rất ngắn (còn từ 4 đến 24 giờ). Nếu không có phương tiện vận chuyển ngay, hàng sẽ bị hỏng trước khi tới nơi.
* **Tính năng cần xây dựng:**
  * Tích hợp Webhook/API với các đơn vị giao hàng nội thành (AhaMove, GrabExpress, hoặc BeDelivery) để tự động gọi xe khi tổ chức bấm nhận hàng.
  * Phân hệ dành cho **Tình nguyện viên (Volunteer App/Portal)**: Cho phép tình nguyện viên nhận nhiệm vụ pickup hàng, xem lộ trình tối ưu trên bản đồ, và cập nhật trạng thái "Đang di chuyển".
  * Tiêu chuẩn hóa điều kiện vận chuyển: Phân loại hàng cần thùng giữ nhiệt, đá gel hay xe lạnh chuyên dụng.

### 4.2. Giao nhận Điện tử & Miễn trừ Trách nhiệm Pháp lý (Legal Handover & Immunity)
* **Vấn đề thực tế:** Nguy cơ ngộ độc thực phẩm là rào cản lớn nhất khiến các chuỗi siêu thị/nhà hàng e ngại quyên góp.
* **Tính năng cần xây dựng:**
  * **Biên bản giao nhận điện tử (E-Handover Protocol):** Đối soát bằng mã QR 2 đầu. Khi đại diện từ thiện đến nhận hàng, bên cho quét mã QR của bên nhận; hệ thống chốt thời điểm bàn giao, hình ảnh lô hàng, nhiệt độ bảo quản lúc nhận.
  * **Điều khoản miễn trừ trách nhiệm (Good Samaritan Clause):** Tích hợp bản cam kết điện tử theo khung pháp lý Việt Nam: Doanh nghiệp được miễn trừ trách nhiệm pháp lý đối với các sự cố phát sinh sau thời điểm bàn giao nếu thực phẩm lúc giao vẫn còn hạn và bảo quản đúng hướng dẫn.

### 4.3. Xác thực Pháp lý Đối tác (KYB - Know Your Business & Charity Verification)
* **Vấn đề thực tế:** Tránh trường hợp lợi dụng danh nghĩa từ thiện để gom hàng cận date bán lại kiếm lời.
* **Tính năng cần xây dựng:**
  * **Cổng nộp hồ sơ pháp lý:**
    * *Doanh nghiệp:* Upload Giấy chứng nhận Đăng ký Doanh nghiệp, Giấy chứng nhận Cơ sở đủ điều kiện An toàn Thực phẩm.
    * *Tổ chức từ thiện:* Upload Quyết định thành lập / Công nhận điều lệ quỹ từ thiện theo Nghị định 93/2021/NĐ-CP hoặc giấy giới thiệu của Ủy ban Mặt trận Tổ quốc / Hội Chữ thập đỏ địa phương.
  * **Giao diện Admin Review:** Cho phép quản trị viên xem trước tài liệu PDF/hình ảnh, đối chiếu mã số thuế và duyệt/từ chối kèm lý do chính thức gửi qua email.

### 4.4. Hệ thống Thông báo Khẩn cấp Tức thời (Urgent Alert System)
* **Vấn đề thực tế:** Khi siêu thị đăng quyên góp lúc 16:00 và hạn chót nhận là 19:00, nếu chỉ gửi notification trong app thì tổ chức từ thiện sẽ bỏ lỡ.
* **Tính năng cần xây dựng:**
  * Tích hợp **Zalo ZNS (Zalo Notification Service)** hoặc **SMS Brandname**: Tự động bắn thông báo tới số điện thoại người phụ trách bếp ăn/mái ấm trong bán kính 5km.
  * Tích hợp **Web Push Notification** trên trình duyệt điện thoại để phát chuông báo khi có đợt quyên góp khẩn cấp (nhãn Đỏ).

### 4.5. Chứng nhận ESG & Báo cáo Giảm phát thải CO₂ (ESG Impact Certificates)
* **Vấn đề thực tế:** Động lực lớn nhất để các tập đoàn F&B và chuỗi bán lẻ tham gia FoodSave là điểm thưởng ESG (Môi trường - Xã hội - Quản trị) và hồ sơ trách nhiệm xã hội doanh nghiệp (CSR).
* **Tính năng cần xây dựng:**
  * Công cụ tự động tính toán phát thải tránh được dựa trên khối lượng thực phẩm (quy đổi theo hệ số IPCC / GHG Protocol: ví dụ 1 kg thực phẩm tránh lãng phí = giảm tương đương 2.5 kg CO₂e).
  * Chức năng **Xuất Giấy chứng nhận Quyên góp Điện tử (E-Certificate)** dạng PDF có gắn mã QR xác thực và chữ ký số nền tảng, dùng để kiểm toán và nộp báo cáo phát triển bền vững thường niên.

### 4.6. Bảo vệ Quyền riêng tư & Phân quyền Trang Quản trị (Admin Security)
* **Vấn đề thực tế:** Trang `/admin_foodsave` hiện đang mở công khai.
* **Tính năng cần xây dựng:**
  * Xây dựng trang đăng nhập quản trị riêng biệt (`/admin/login`).
  * Sử dụng Middleware xác thực JWT token và phân quyền RBAC (`role === 'admin'`). Chặn hiển thị giao diện dashboard nếu chưa có token hợp lệ (thay vì chỉ chặn lúc bấm nút duyệt).

---

## 5. HIỆN ĐẠI HÓA CÔNG NGHỆ (TECH STACK UPGRADE)

Frontend hiện tại được viết dưới dạng các file HTML tĩnh dài từ 1.000 đến 4.600 dòng code. Việc duy trì kiến trúc này rất khó mở rộng và kiểm thử.

* **Kiến trúc đề xuất:**
  * **Frontend Framework:** Chuyển đổi sang **Next.js (App Router)** hoặc **React + Vite**.
  * **Styling & UI:** TailwindCSS + Shadcn UI (hỗ trợ Dark/Light mode, component accessible chuẩn WCAG).
  * **State Management:** TanStack Query (React Query) để quản lý cache server-state, tự động refetch khi có dữ liệu mới.
  * **Testing:** Viết test suite hoàn chỉnh với Vitest (Unit test cho Backend Services) và Playwright (E2E test cho luồng Quyên góp - Nhận hàng).

---

## 6. LỘ TRÌNH TRIỂN KHAI HOÀN THIỆN (ACTIONABLE ROADMAP)

```
[ Giai đoạn 1: Hotfix ] ──► [ Giai đoạn 2: Tích hợp API ] ──► [ Giai đoạn 3: Tính năng cốt lõi ] ──► [ Giai đoạn 4: Vận hành ]
  - Sửa lỗi link 404         - Bỏ mock localStorage              - Giao nhận QR Code                 - Tích hợp vận chuyển
  - Sửa lỗi truy vấn SQL     - Kết nối Frontend vào /api/v1      - Upload duyệt giấy phép             - Zalo ZNS thông báo
  - Khóa trang Admin         - Đổi Socket sang Supabase          - Xuất chứng nhận ESG PDF           - Next.js Migration
```

### Chi tiết các bước thực hiện:

#### Giai đoạn 1: Sửa lỗi khẩn cấp & Bảo mật (Ưu tiên cao nhất - 1 đến 2 ngày)
- [ ] Sửa liên kết `PARTNER_TINH.html` thành `PARTNER.html` trên `index.html`.
- [ ] Sửa câu lệnh query trong `src/services/adminService.ts` và `src/services/ecoImpactService.ts`, bỏ các cột `avatar_url` và `metadata`.
- [ ] Thêm Auth Guard chặn trang `ADMIN_FOODSAVE.html`, bắt buộc đăng nhập tài khoản admin trước khi tải dữ liệu.
- [ ] Chuyển các secret key trong `src/config/env.ts` sang biến môi trường bí mật.

#### Giai đoạn 2: Đồng bộ hóa Dữ liệu & Kết nối Backend (3 đến 5 ngày)
- [ ] Viết module `apiService.js` ở Frontend chuẩn hóa gọi các endpoint:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/donations`
  - `POST /api/v1/donations`
  - `PATCH /api/v1/donations/:id/accept`
  - `PATCH /api/v1/donations/:id/status`
- [ ] Thay thế toàn bộ thao tác ghi `localStorage` bằng việc gọi API backend thực tế.
- [ ] Chuyển cơ chế realtime trong `src/realtime/` sang sử dụng Supabase Realtime Client để hoạt động ổn định trên Serverless.

#### Giai đoạn 3: Hoàn thiện Nghiệp vụ & Pháp lý (1 đến 2 tuần)
- [ ] Xây dựng tính năng sinh mã QR cho mỗi lô hàng quyên góp và màn hình quét camera xác nhận bàn giao.
- [ ] Thêm form upload tài liệu xác minh (Giấy phép kinh doanh, ATVSTP) cho Partner và Charity.
- [ ] Xây dựng trang Admin Review tài liệu pháp lý của các bên đăng ký.
- [ ] Tích hợp thư viện tạo PDF (như `pdfkit` hoặc `react-pdf`) để tự động xuất Giấy chứng nhận Tác động Môi trường (CO₂ saved).

#### Giai đoạn 4: Vận hành Thực địa & Nâng cấp Giao diện (2 đến 3 tuần)
- [ ] Kết nối dịch vụ thông báo Zalo ZNS hoặc Firebase Cloud Messaging.
- [ ] Tích hợp API đơn vị vận chuyển giao hàng khẩn cấp.
- [ ] Tái cấu trúc giao diện sang Next.js/React để nâng cao trải nghiệm người dùng trên thiết bị di động.
- [ ] Thiết lập kiểm thử tự động (Unit test, Integration test và CI/CD pipeline).

---

> **Kết luận:** Repository `FoodSaveVietNam` sở hữu định vị sản phẩm rất giá trị và phần backend viết rất chắc tay. Khi hoàn thiện các điểm gãy kết nối và bổ sung các quy trình thực tế nêu trên, dự án sẽ hoàn toàn đủ tiêu chuẩn trở thành một nền tảng công nghệ vì cộng đồng hoàn chỉnh và sẵn sàng vận hành quy mô lớn.
