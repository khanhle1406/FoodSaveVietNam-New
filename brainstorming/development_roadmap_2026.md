# Kế Hoạch Phát Triển Toàn Diện FoodSave Việt Nam (2026 - 2027)

> **Căn cứ tài liệu:**
> 1. `DINH_HUONG_FoodSave.docx` (Chiến lược 4 trụ cột tương lai - Khanh & Minh).
> 2. `BAN_GIAO_FoodSave.docx` (Hiện trạng kỹ thuật, bảo mật và kiến trúc hệ thống).
> 
> **Mục tiêu tối thượng:** Đưa FoodSave từ nền tảng kết nối 1-1 đơn lẻ trở thành **Mạng lưới Logistics Cứu trợ Thực phẩm Thông minh Đa điểm (Multi-Source Food Rescue Network)**, ứng dụng thuật toán ghép đơn tự động, cơ chế minh chứng sử dụng minh bạch chống gian lận, bản đồ số GIS điều phối và hệ thống đo lường báo cáo chuẩn ESG (Môi trường - Xã hội - Quản trị).

---

## 1. Bản Đồ Tổng Thể 4 Trụ Cột Nâng Cấp (Architectural Pillars)

```text
                               ┌────────────────────────────────────────────────────────┐
                               │           FOODSAVE VIỆT NAM (ECOSYSTEM 2026)          │
                               └───────────────────────────┬────────────────────────────┘
                                                           │
         ┌─────────────────────────┬───────────────────────┴───────────────┬────────────────────────┐
         ▼                         ▼                                       ▼                        ▼
┌───────────────────┐    ┌───────────────────┐                   ┌───────────────────┐    ┌───────────────────┐
│   TRỤ CỘT 1:      │    │   TRỤ CỘT 2:      │                   │   TRỤ CỘT 3:      │    │   TRỤ CỘT 4:      │
│ Ghép Đơn Tự Động  │    │ Minh Chứng Sử Dụng│                   │ Bản Đồ Số GIS &   │    │ Đo Lường ESG      │
│ & Kết Nối 2 Chiều │    │ Minh Bạch Hình Ảnh│                   │ Điều Phối TNV     │    │ & Xuất Báo Cáo    │
└───────────────────┘    └───────────────────┘                   └───────────────────┘    └───────────────────┘
```

---

## 2. Chi Tiết Kế Hoạch Triển Khai Từng Trụ Cột

---

### TRỤ CỘT 1: KẾT NỐI HAI CHIỀU & THUẬT TOÁN GHÉP ĐƠN THÔNG MINH (MULTI-SOURCE AUTO-MATCHING)

#### 1. Bối cảnh & Vấn đề giải quyết:
* **Hiện tại:** Cửa hàng đăng lô hàng nào thì một tổ chức từ thiện phải nhận trọn vẹn lô hàng đó (quan hệ 1 - 1). 
* **Thực tế:** Nhiều bếp ăn từ thiện cần 100 - 200 suất ăn/ngày, nhưng mỗi cửa hàng chỉ dư 15 - 30 phần. Ngược lại, một siêu thị lớn giải cứu 200kg rau củ nhưng một mái ấm nhỏ chỉ tiếp nhận được 30kg.
* **Giải pháp:** Xây dựng hệ thống khớp lệnh 2 chiều (Cung & Cầu) với thuật toán tự động gom/ghép đa điểm.

#### 2. Các tính năng & Phân rã kỹ thuật:
1. **Phân hệ Đăng Nhu Cầu Cứu Trợ (Charity Demands Engine):**
   * Cho phép Tổ chức từ thiện đăng phiếu nhu cầu:
     * Loại thực phẩm: Bánh mì/tinh bột, Cơm hộp/thức ăn chế biến, Rau củ quả tươi, Sữa/đồ uống.
     * Số lượng & Đơn vị chuẩn: Số phần, Hộp, Túi, Khối lượng (kg).
     * Khung giờ tiếp nhận, số người phục vụ dự kiến.
     * Mức độ ưu tiên: Thường nhật (Green), Cần gấp trong ngày (Yellow), Khẩn cấp cứu đói (Red).
2. **Thuật toán Khớp lệnh & Ghép đơn Thông minh (Knapsack / Greedy Multi-Source Matching):**
   * *Đầu vào:* 1 Nhu cầu của Tổ chức (Cần Q suất/kg thực phẩm loại X trong bán kính R km).
   * *Xử lý:*
     * Quét các cửa hàng trong bán kính R km có lô thực phẩm X còn hạn dùng.
     * Ưu tiên xếp hạng: Hạn sử dụng ngắn nhất (cận date) ➔ Khoảng cách gần nhất (km) ➔ Điểm uy tín cửa hàng (Rating KYB).
     * Ghép cộng dồn (Cửa hàng 1 + Cửa hàng 2 + Cửa hàng 3) cho đến khi đạt đủ số lượng Q.
   * *Đầu ra:* Một "Chuyến cứu trợ gộp" (Consolidated Rescue Mission) với lộ trình đa chặng.
3. **Phân rã lộ trình cho Đội Tình nguyện viên (TNV Multi-Hop Route):**
   * Giao diện phân công: Trưởng ban từ thiện có thể chỉ định:
     * Tình nguyện viên A: Ghé WinMart (lấy 20 cái) ➔ Ghé Tous Les Jours (lấy 18 cái).
     * Tình nguyện viên B: Ghé Co.opmart (lấy 12 cái).
   * Cả 2 TNV cùng tập kết về địa chỉ Bếp từ thiện ➔ Đủ 50 cái bánh.
4. **Cơ chế Xác thực Ký số Đa điểm:**
   * Mỗi điểm dừng (stop) có một mã PIN 4 số và mã QR riêng biệt. Khi TNV đến từng cửa hàng, cả 2 bên quét đối soát điện tử, cập nhật trạng thái thời gian thực.

---

### TRỤ CỘT 2: MINH CHỨNG SỬ DỤNG THỰC PHẨM & CHỐNG GIAN LẬN THƯƠNG MẠI (PROOF OF IMPACT)

#### 1. Bối cảnh & Vấn đề giải quyết:
* Doanh nghiệp tặng thực phẩm miễn phí luôn lo ngại: Thực phẩm có đến tay người nghèo thật không? Có bị đem bán lại ra chợ đen kiếm lời không?
* **Giải pháp:** Cơ chế "Proof of Impact" bắt buộc: Mọi lô hàng sau khi tiếp nhận phải nộp báo cáo minh chứng thực tế trong vòng 24 - 48 giờ.

#### 2. Các tính năng & Phân rã kỹ thuật:
1. **Phân hệ Tải Minh Chứng (Charity Proof Submission Portal):**
   * **Hình ảnh thực tế:** Chụp trực tiếp từ camera điện thoại lúc chế biến, chia phần, hoặc phát cho bà con.
   * **Bộ lọc AI bảo vệ quyền riêng tư (Privacy-first Face Blurring):** Tự động phát hiện khuôn mặt và làm mờ/che mặt người nhận (đặc biệt trẻ em và người yếu thế) để giữ gìn nhân phẩm người thụ hưởng.
   * **Định vị GPS đối soát (Geotagging Verification):** Tự động trích xuất tọa độ GPS từ ảnh/thiết bị lúc tải lên, đối chiếu xem có đúng tại địa chỉ cơ sở từ thiện đã đăng ký không (cho phép giải trình sửa tay nếu phát lưu động).
   * **Thông tin định lượng:** Số người hưởng lợi thực tế, thành phần thụ hưởng (người già, trẻ em, lao động nghèo, bệnh nhân).
2. **Cơ chế Phê duyệt & Hậu kiểm (Admin Audit & Auto-reminder):**
   * Bảng điều khiển Admin: Xem danh sách minh chứng chờ duyệt, phóng to ảnh, kiểm tra tính xác thực.
   * Hệ thống tự động gửi thông báo (Zalo ZNS / SMS / Web Push) nhắc nhở Tổ chức nếu sau 24 giờ kể từ khi nhận hàng mà chưa gửi minh chứng.
   * Nếu quá 72 giờ không nộp minh chứng: Tạm khóa quyền nhận hàng mới (Suspension Lock) cho đến khi bổ sung giải trình.
3. **Bảng tin Tri ân Doanh nghiệp (Partner Impact Wall):**
   * Mỗi khi Admin duyệt minh chứng, toàn bộ ảnh (đã làm mờ mặt) và nhật ký phát cơm sẽ được gửi ngược lại bảng điều khiển của Cửa hàng đã quyên góp.
   * Doanh nghiệp có thể xem trực tiếp món quà của mình đã biến thành bao nhiêu nụ cười và bữa ăn ấm lòng.

---

### TRỤ CỘT 3: BẢN ĐỒ SỐ GIS ĐIỀU PHỐI & MẠNG LƯỚI TÌNH NGUYỆN VIÊN (GIS & FLEET LOGISTICS)

#### 1. Bối cảnh & Vấn đề giải quyết:
* Việc cứu trợ thực phẩm phụ thuộc sống còn vào cự ly và thời gian (thời gian vận chuyển không quá 1 - 2 giờ để giữ trọn vệ sinh an toàn thực phẩm).
* **Giải pháp:** Tích hợp Bản đồ số trực quan (GIS) hỗ trợ tính toán cự ly, phân bổ đội xe và dẫn đường.

#### 2. Các tính năng & Phân rã kỹ thuật:
1. **Bản đồ Nhiệt Cứu trợ (Interactive Rescue Map):**
   * Hiển thị trực quan trên giao diện:
     * Cửa hàng (Ghim màu: Xanh lá = Còn hạn dài, Vàng = Cận date 4-8h, Đỏ = Cận date dưới 3h cần xe gấp).
     * Tổ chức từ thiện (Ghim hình trái tim đỏ kèm sức chứa tiếp nhận).
     * Tình nguyện viên đang online trong khu vực (Ghim hình xe máy xanh).
2. **Thuật toán Tối ưu hóa Khoảng cách (Haversine & Routing Optimization):**
   * Tự động tính khoảng cách thực tế theo tuyến đường bộ (km) và thời gian di chuyển (phút).
   * Tự động lọc các lô hàng: Chỉ hiển thị các lô hàng nằm trong phạm vi giao hàng an toàn (bán kính tối ưu 3km - 7km - 10km).
3. **Phân hệ Tình Nguyện Viên (FoodSave Volunteer Fleet):**
   * Đăng ký tham gia đội tình nguyện viên (họ tên, số điện thoại, phương tiện xe máy, loại thùng hàng).
   * Cơ chế bảo vệ quyền riêng tư vị trí: Tọa độ TNV chỉ được cập nhật khi TNV bấm "Sẵn sàng nhận nhiệm vụ" và tự động tắt khi hoàn thành chuyến đi.
   * Ứng dụng bản đồ chỉ đường: Tích hợp nút "Chỉ đường Google Maps / Apple Maps" để TNV bấm 1 chạm là mở ứng dụng dẫn đường đến đúng cửa hàng.

---

### TRỤ CỘT 4: KHUNG ĐO LƯỜNG CHỈ SỐ ESG CHUẨN QUỐC TẾ & XUẤT BÁO CÁO TỰ ĐỘNG

#### 1. Bối cảnh & Vấn đề giải quyết:
* Các chuỗi bán lẻ, siêu thị và tập đoàn F&B hiện đại chịu áp lực rất lớn về công bố thông tin phát triển bền vững (ESG Reporting) theo Nghị định 08/2022/NĐ-CP và cam kết COP26 Net Zero 2050 của Việt Nam.
* **Giải pháp:** Chuẩn hóa toàn bộ công thức tính toán theo tiêu chuẩn quốc tế và tự động xuất Báo cáo ESG chuyên nghiệp.

#### 2. Khung Chỉ Số ESG Chuẩn Hóa:

##### A. Trụ cột E (Environmental - Môi trường):
| Chỉ số | Đơn vị | Công thức / Căn cứ khoa học | Ý nghĩa thực tiễn |
| :--- | :--- | :--- | :--- |
| **Tổng thực phẩm được cứu** | kg | Tổng khối lượng các lô hàng có trạng thái `completed` | Đo lường giảm lãng phí tài nguyên sinh học |
| **Lượng khí nhà kính tránh phát thải** | kg CO₂e | Khối lượng thực phẩm (kg) × 2,5 | Chuẩn FAO (2013) & IPCC 2021: 1kg thức ăn phân hủy kỵ khí tại bãi chôn lấp sinh ra khí Metan (CH₄) có tiềm năng nóng lên toàn cầu gấp 28 lần CO₂ |
| **Lượng nước sạch tiết kiệm** | Lít (m³) | Khối lượng thực phẩm (kg) × 890 lít/kg | Theo chuẩn FAO Food Wastage Footprint: Nước tưới tiêu và chế biến ẩn trong chuỗi cung ứng thực phẩm |
| **Tỷ lệ hàng giải cứu thành công** | % | (Số lô hoàn tất ÷ Tổng số lô đăng) × 100% | Đánh giá hiệu suất điều phối của mạng lưới |

##### B. Trụ cột S (Social - Trách nhiệm Xã hội):
| Chỉ số | Đơn vị | Công thức / Căn cứ khoa học | Ý nghĩa thực tiễn |
| :--- | :--- | :--- | :--- |
| **Suất ăn cứu trợ tương đương** | Suất | Khối lượng thực phẩm (kg) ÷ 0,35 kg/suất (hoặc 420g theo WRAP Anh Quốc) | Quy đổi trực tiếp ra bữa ăn phục vụ người nghèo |
| **Số người hưởng lợi thực tế** | Người | Tổng số người ghi nhận trong các biên bản minh chứng hợp lệ | Tác động an sinh xã hội tại địa phương |
| **Tỷ lệ nhu cầu được đáp ứng** | % | (Nhu cầu đã nhận đủ ÷ Tổng nhu cầu đăng) × 100% | Đo lường mức độ bao phủ an ninh lương thực |
| **Mạng lưới đối tác hoạt động** | Điểm | Số cửa hàng & mái ấm có phát sinh giao dịch trong tháng | Độ phủ và tính bền vững của cộng đồng |

##### C. Trụ cột G (Governance - Quản trị Minh bạch):
| Chỉ số | Đơn vị | Công thức / Căn cứ | Ý nghĩa thực tiễn |
| :--- | :--- | :--- | :--- |
| **Tỷ lệ minh chứng hợp lệ** | % | (Số lô có ảnh/GPS hợp lệ ÷ Số lô đã giao) × 100% | Chống thất thoát và thương mại hóa thực phẩm từ thiện |
| **Tốc độ đăng minh chứng** | Giờ | Trung bình thời gian từ khi nhận hàng đến khi gửi ảnh | Tính kỷ luật của các tổ chức từ thiện |
| **Tỷ lệ đối tác xác thực KYB** | % | (Hồ sơ đã duyệt GPKD, ATTP ÷ Tổng đối tác) × 100% | Đảm bảo 100% cơ sở tuân thủ pháp lý an toàn thực phẩm |
| **Tỷ lệ xử lý phản ánh** | % | (Số khiếu nại đã giải quyết ÷ Tổng khiếu nại) × 100% | Đo lường năng lực phản hồi và kiểm soát rủi ro |

3. **Phân hệ Xuất Báo Cáo ESG Tự Động (ESG Report Generator):**
   * Cho phép Doanh nghiệp và Admin lọc theo: Tháng, Quý, Năm hoặc Khoảng ngày tùy chọn.
   * Xuất file định dạng **PDF Trình Bày Chuẩn Hội Đồng Quản Trị / Báo Cáo Niên Độ** (đầy đủ biểu đồ tròn, cột, con dấu điện tử, số liệu phân bổ).
   * Xuất file **Excel / CSV Raw Data** phục vụ việc nộp cho các đơn vị kiểm toán độc lập (PwC, Deloitte, EY, KPMG) đối soát tín chỉ carbon.

---

## 3. Lộ Trình Triển Khai Thực Hiện Theo 4 Phase

```text
[Sprint 1: 2 tuần]  Trụ cột 1: Ghép đơn đa điểm & Khớp lệnh nhu cầu Cung - Cầu
       │
[Sprint 2: 2 tuần]  Trụ cột 3: Tích hợp Bản đồ số GIS & Điều phối lộ trình Tình nguyện viên
       │
[Sprint 3: 2 tuần]  Trụ cột 2: Phân hệ Minh chứng sử dụng, AI che mặt & Chống gian lận
       │
[Sprint 4: 2 tuần]  Trụ cột 4: Bảng điều khiển ESG E-S-G & Công cụ xuất báo cáo kiểm toán
```

### Chi Tiết Từng Sprint:

| Sprint | Thời gian | Hạng mục công việc chính | Kết quả đầu ra (Deliverables) |
| :--- | :--- | :--- | :--- |
| **Sprint 1: Auto-Matching** | Tuần 1 - 2 | 1. Tạo bảng `charity_demands` trong Supabase.<br>2. Form đăng nhu cầu cho Charity.<br>3. Thuật toán gộp lô hàng từ nhiều cửa hàng lân cận.<br>4. Giao diện chia đơn cho nhiều TNV. | Tổ chức đăng cần 50 cái bánh ➔ Hệ thống tự động ghép 3 cửa hàng lân cận và chia việc cho 2 TNV. |
| **Sprint 2: GIS & Fleet** | Tuần 3 - 4 | 1. Tích hợp thư viện Leaflet / Mapbox trên nền Next.js.<br>2. Hiển thị ghim cửa hàng (Xanh/Vàng/Đỏ) & Mái ấm.<br>3. Bộ lọc bán kính 3km - 10km.<br>4. Module vị trí TNV & nút mở Google Maps. | Bản đồ trực quan định vị toàn bộ mạng lưới cứu trợ thời gian thực; chỉ đường thông minh cho TNV. |
| **Sprint 3: Proof of Impact** | Tuần 5 - 6 | 1. Tạo bảng `impact_proofs` lưu ảnh, GPS, số suất.<br>2. Upload ảnh lên Supabase Storage bucket riêng tư.<br>3. Tích hợp canvas/CSS làm mờ khuôn mặt người nhận.<br>4. Quy trình Admin duyệt & Bức tường tri ân Doanh nghiệp. | Tổ chức đăng ảnh phát cơm đã làm mờ mặt; Cửa hàng và Admin nhìn thấy minh chứng thực tế; Cảnh báo quá hạn. |
| **Sprint 4: ESG Master** | Tuần 7 - 8 | 1. Mở rộng bảng `eco_impact_events` đủ 12 chỉ số E-S-G.<br>2. Dashboard biểu đồ tương tác trên Admin & Cửa hàng.<br>3. Xuất file PDF Báo cáo Bền vững ESG chuẩn quốc tế.<br>4. Xuất file Excel đối soát kiểm toán. | Doanh nghiệp tải được Báo cáo ESG chính thức để kiểm toán và công bố báo cáo bền vững thường niên. |

---

## 4. Bảng Phân Bổ Kiến Trúc Database & API Cần Bổ Sung

### Các Bảng Mới Trong Supabase:
1. `public.charity_demands`: Lưu trữ phiếu nhu cầu cứu trợ của Tổ chức từ thiện (loại món, số lượng, hạn chót, trạng thái).
2. `public.demand_matches`: Lưu kết quả khớp lệnh giữa 1 nhu cầu và nhiều lô hàng (`donations`).
3. `public.impact_proofs`: Lưu trữ biên bản minh chứng thực tế (ảnh, tọa độ GPS, số người thụ hưởng, ghi chú, trạng thái duyệt của Admin).
4. `public.volunteer_shifts`: Lưu lịch trình phân công di chuyển của Tình nguyện viên theo từng chặng.
5. `public.esg_monthly_snapshots`: Lưu số liệu chốt sổ ESG hàng tháng phục vụ xuất báo cáo tức thì không cần tính toán lại.

### Các API Route Handlers Mới (Next.js App Router):
* `POST /api/v1/demands`: Đăng phiếu nhu cầu cứu trợ mới.
* `POST /api/v1/demands/match`: Chạy thuật toán tự động khớp các lô hàng lân cận.
* `POST /api/v1/proofs`: Nộp minh chứng sử dụng thực phẩm kèm upload ảnh.
* `POST /api/v1/proofs/[id]/audit`: Admin phê duyệt hoặc yêu cầu bổ sung minh chứng.
* `GET /api/v1/esg/report/pdf`: Xuất file PDF Báo cáo ESG theo kỳ.
* `GET /api/v1/esg/report/excel`: Xuất dữ liệu thô Excel phục vụ kiểm toán độc lập.

---

## 5. Tiêu Chuẩn Nghiệm Thu Kỹ Thuật (Acceptance Criteria)

1. **Hiệu năng & Trải nghiệm:**
   * Thời gian chạy thuật toán ghép đơn đa điểm không quá 300ms.
   * Bản đồ tải mượt mà dưới 1,5 giây trên thiết bị di động 4G.
2. **Bảo mật & Pháp lý:**
   * 100% ảnh minh chứng có khuôn mặt trẻ em hoặc người nhận được che/làm mờ tự động.
   * Dữ liệu hình ảnh và giấy tờ lưu trong Supabase Storage được bảo vệ bằng cơ chế RLS và Signed URL có thời hạn.
3. **Độ tin cậy & Kiểm toán:**
   * Công thức tính toán CO₂e (2,5 kg CO₂e / kg) và nước (890 lít / kg) có trích dẫn nguồn khoa học (FAO 2013) trực tiếp trên báo cáo.
   * Bộ kiểm thử tự động `npm test` đạt 100% pass trên toàn bộ các ca kiểm thử ghép đơn và tính toán phát thải.
