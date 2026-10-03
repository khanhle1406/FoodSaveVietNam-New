# Graph Report - TISPA  (2026-10-03)

## Corpus Check
- 132 files · ~246,684 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1881 nodes · 4452 edges · 87 communities (79 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `83966f75`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]

## God Nodes (most connected - your core abstractions)
1. `select()` - 49 edges
2. `select()` - 49 edges
3. `select()` - 49 edges
4. `handleSupabaseError()` - 33 edges
5. `notify()` - 29 edges
6. `notify()` - 29 edges
7. `notify()` - 29 edges
8. `partnerState()` - 25 edges
9. `partnerState()` - 25 edges
10. `partnerState()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `AuthResult` --references--> `Profile`  [EXTRACTED]
  src/services/authService.ts → src/types/domain.ts
- `OAuthOtpChallenge` --references--> `UserRole`  [EXTRACTED]
  src/services/authService.ts → src/types/domain.ts
- `AdminPortalPage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/admin/page.tsx → src/context/LocalDbContext.tsx
- `CharityPortalPage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/charity/page.tsx → src/context/LocalDbContext.tsx
- `HomePage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/page.tsx → src/context/LocalDbContext.tsx

## Import Cycles
- None detected.

## Communities (87 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (40): backPartnerRegisterStep(), bindPartnerStep6SubmitButton(), cancelPartnerRegistration(), capturePortalAccount(), ensurePartnerOtp(), ensurePartnerRegistrationDefaults(), finishPartnerPending(), forcePartnerStep6ToPendingDom() (+32 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (48): ecoImpactController, ecoImpactRoutes, CharityEcoImpactQuery, charityEcoImpactQuerySchema, dateRangeRefine, EcoImpactLeaderboardQuery, ecoImpactLeaderboardQuerySchema, ecoImpactPeriodSchema (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (55): acceptDonation(), authToken(), browserLocation(), catalogPath(), centsToVnd(), clearNearbyLocation(), clearStoredNearbyLocation(), createMomoPayment() (+47 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (52): applyCharityAddress(), applyCharityOcrToState(), applyPartnerOcrToState(), charityAddressParts(), charityCoordinate(), charityDocumentMetadataEntry(), charityDocumentPublicUrl(), charityDocumentsMetadata() (+44 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (37): authController, addressSchema, authRoleSchema, emailSchema, FacebookOAuthCallbackBody, facebookOAuthCallbackBodySchema, FacebookOAuthStartBody, facebookOAuthStartBodySchema (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (32): backCharityRegisterStep(), buildCharityRegistrationPayload(), charityContactEmail(), charityContactPhone(), charityFormValue(), charityNumber(), charityOrganizationProfilePayload(), charityOwnerProfilePayload() (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (40): dependencies, clsx, cors, dotenv, express, express-rate-limit, helmet, lucide-react (+32 more)

### Community 7 - "Community 7"
Cohesion: 0.16
Nodes (21): catalogController, UuidParams, CreateStoreBody, createStoreBodySchema, StoreListQuery, storeListQuerySchema, UpdateStoreBody, updateStoreBodySchema (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (29): envSchema, optionalNonEmptyString, parsedEnv, postgresPool, supabaseAdmin, supabaseAuth, authMiddleware(), extractBearerToken() (+21 more)

### Community 9 - "Community 9"
Cohesion: 0.16
Nodes (22): charityController, UuidParams, charityRoutes, CreateBeneficiaryGroupBody, createBeneficiaryGroupBodySchema, CreateCharityProfileBody, createCharityProfileBodySchema, CreateGalleryItemBody (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (30): AuthAuditEvent, AuthContext, authError(), AuthResult, buildAuthResult(), buildAuthResultFromOAuthCallback(), compactObject(), completeFacebookOAuthCallback() (+22 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (17): adminController, AdminUserParams, RejectPartnerBody, adminService, loadProfilesById(), ProfileRow, requirePartnerProfile(), requirePartnerStores() (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.12
Nodes (28): applySellerAddress(), escapeHtml(), isCharityUpload(), isPartnerOcrField(), limitPartnerHashtags(), markSellerFileUploaded(), parseSellerTypedAddress(), partnerBankStyle() (+20 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (9): 1. Phân Tích Hiện Trạng & Yêu Cầu Giai Đoạn 4, 2. Chi Tiết Các Hạng Mục Thực Hiện (Work Breakdown Structure), 3. Kế Hoạch Triển Khai Từng Bước, 4. Cam Kết & Bảo Toàn, Hạng mục 4.1: Phân Hệ Điều Phối Vận Chuyển Khẩn Cấp (Logistics Dispatch Engine), Hạng mục 4.2: Hệ Thống Cảnh Báo Khẩn Cấp Tức Thời (Urgent Alert & ZNS Simulator), Hạng mục 4.3: Bộ Kiểm Thử Tự Động (Automated Test Suite), Hạng mục 4.4: Cấu Hình Triển Khai Vercel & Đóng Gói (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (22): buildPartnerRegistrationPayloads(), compactPartnerPayload(), insertPartnerRow(), logPartnerSupabaseError(), normalizePartnerEmail(), partnerContactEmail(), partnerDocumentsMetadata(), partnerOpeningHoursText() (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.06
Nodes (52): applyCharityAddress(), applyCharityOcrToState(), applyPartnerOcrToState(), charityAddressParts(), charityCoordinate(), charityDocumentMetadataEntry(), charityDocumentPublicUrl(), charityDocumentsMetadata() (+44 more)

### Community 16 - "Community 16"
Cohesion: 0.07
Nodes (26): compilerOptions, allowJs, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+18 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (21): ValidatedRequestData, ComplaintPriority, ComplaintStatus, Donation, DonationStatus, DonationUrgency, Order, OrderItem (+13 more)

### Community 18 - "Community 18"
Cohesion: 0.11
Nodes (27): afterCharityRegisterRender(), afterPartnerRegisterRender(), attachCharityFaceStream(), attachPartnerFaceStream(), backToRegisterMethods(), beginPhoneSignup(), charityAuthState(), initPartnerFaceScan() (+19 more)

### Community 19 - "Community 19"
Cohesion: 0.08
Nodes (23): 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN, 2.1. Lỗi Broken Link 404 ngay trên trang chủ, 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`, 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless, 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern, 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình, 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS), 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (30): captureLegacyPortalAccount(), charityFallbackProfile(), charityMetadataStatus(), enterPortalWithAuth(), getPartnerLoginSupabaseClient(), isCharityPendingApproval(), isCharityProfileDashboardEnabled(), loadSupabaseCharityAuthContext() (+22 more)

### Community 21 - "Community 21"
Cohesion: 0.08
Nodes (24): 1. Bản Đồ Tổng Thể 4 Trụ Cột Nâng Cấp (Architectural Pillars), 1. Bối cảnh & Vấn đề giải quyết:, 1. Bối cảnh & Vấn đề giải quyết:, 1. Bối cảnh & Vấn đề giải quyết:, 1. Bối cảnh & Vấn đề giải quyết:, 2. Chi Tiết Kế Hoạch Triển Khai Từng Trụ Cột, 2. Các tính năng & Phân rã kỹ thuật:, 2. Các tính năng & Phân rã kỹ thuật: (+16 more)

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (14): API Base, Auth Flow, Commands, Deployment, Eco Impact Tracker, FoodSave Backend, Frontend Integration Notes, Local Setup (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.16
Nodes (21): accept(), approvePartner(), autoDiscoverToken(), create(), get(), getCharityImpact(), getLeaderboard(), getMyImpact() (+13 more)

### Community 24 - "Community 24"
Cohesion: 0.23
Nodes (13): cancelPhoneLoginOtp(), clearPhoneLoginOtpInputs(), clearPhoneOtpPending(), maskPhone(), readPhoneOtpInput(), readStoredPhoneOtp(), requestPhoneLoginOtp(), resendPhoneLoginOtp() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.11
Nodes (22): profileController, supportController, requireRoles(), validateRequest(), ValidationSchema, adminRoutes, adminUserParamSchema, rejectPartnerBodySchema (+14 more)

### Community 26 - "Community 26"
Cohesion: 0.24
Nodes (10): customerProfileFromSupabaseSession(), notifyOnce(), oauthNotice(), setOAuthButtonPending(), socialLogin(), startFacebookLogin(), startGoogleLogin(), supabaseOAuthRedirectUrl() (+2 more)

### Community 27 - "Community 27"
Cohesion: 0.08
Nodes (23): 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN, 2.1. Lỗi Broken Link 404 ngay trên trang chủ, 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`, 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless, 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern, 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình, 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS), 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND (+15 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (23): AdminPortalPage(), UrgentRedBanner(), UrgentRedBannerProps, metadata, HomePage(), CharityPortalPage(), DEFAULT_DONATIONS, DEFAULT_LOGS (+15 more)

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (23): 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN, 2.1. Lỗi Broken Link 404 ngay trên trang chủ, 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`, 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless, 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern, 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình, 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS), 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND (+15 more)

### Community 30 - "Community 30"
Cohesion: 0.07
Nodes (55): acceptDonation(), authToken(), browserLocation(), catalogPath(), centsToVnd(), clearNearbyLocation(), clearStoredNearbyLocation(), createMomoPayment() (+47 more)

### Community 31 - "Community 31"
Cohesion: 0.07
Nodes (55): acceptDonation(), authToken(), browserLocation(), catalogPath(), centsToVnd(), clearNearbyLocation(), clearStoredNearbyLocation(), createMomoPayment() (+47 more)

### Community 32 - "Community 32"
Cohesion: 0.19
Nodes (16): donationController, UuidParams, AcceptDonationBody, acceptDonationBodySchema, CreateDonationBody, createDonationBodySchema, DonationListQuery, donationListQuerySchema (+8 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (14): API Base, Auth Flow, Commands, Deployment, Eco Impact Tracker, FoodSave Backend, Frontend Integration Notes, Local Setup (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.13
Nodes (14): 1.1. Sửa lỗi Broken Link 404 trên Landing Page, 1.2. Khắc phục lỗi Crash SQL 500 trong `adminService.ts`, 1.3. Khắc phục lỗi Crash SQL 500 trong `ecoImpactService.ts`, 1. TỔNG QUAN CÁC GIAI ĐOẠN, 2.1. Loại bỏ Secret Key Hardcode trong `env.ts`, 2.2. Thống nhất Driver Kết Nối Cơ Sở Dữ Liệu, 2.3. Khóa Truy Cập Trang Quản Trị (Admin Early Auth Gate), 2. CHI TIẾT CÁC HẠNG MỤC THỰC HIỆN (+6 more)

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (10): 1. Phân Tích Rủi Ro & Chiến Lược An Toàn (Risk & Mitigation Matrix), 2. Lộ Trình Triển Khai 6 Giai Đoạn (Work Breakdown Structure), 3. Bảng Kiểm Tra Tiến Độ Từng Bước (Migration Checklist), Giai đoạn 1: Chuẩn Bị Hạ Tầng & Cài Đặt Next.js Core, Giai đoạn 2: Chuyển Đổi Core Services & State Management, Giai đoạn 3: Chuyển Đổi Các Component Chuyên Dụng Tái Sử Dụng, Giai đoạn 4: Xây Dựng Các Tuyến Đường (App Router Pages), Giai đoạn 5: Tích Hợp API Routes & Supabase SSR (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (8): 1. TỔNG QUAN HIỆN TRẠNG ĐỨT GÃY, 2. CHI TIẾT CÁC HẠNG MỤC TRIỂN KHAI, 3. CHECKLIST KIỂM THỬ GIAI ĐOẠN 2, Hạng mục 2.1: Tích hợp API vào Cổng Từ Thiện ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html)), Hạng mục 2.2: Tích hợp API vào Cổng Doanh Nghiệp ([PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)), Hạng mục 2.3: Chuyển đổi Realtime sang Supabase Realtime Channels, Hạng mục 2.4: Đồng bộ Authentication Session Đồng Nhất, Kế Hoạch Triển Khai Giai Đoạn 2: Đồng Bộ Hóa Dữ Liệu & Kết Nối Backend

### Community 37 - "Community 37"
Cohesion: 0.06
Nodes (52): applyCharityAddress(), applyCharityOcrToState(), applyPartnerOcrToState(), charityAddressParts(), charityCoordinate(), charityDocumentMetadataEntry(), charityDocumentPublicUrl(), charityDocumentsMetadata() (+44 more)

### Community 38 - "Community 38"
Cohesion: 0.32
Nodes (13): createDonation(), emitSync(), getDonations(), getEcoImpactStats(), getState(), getStores(), init(), loadState() (+5 more)

### Community 39 - "Community 39"
Cohesion: 0.19
Nodes (17): env, ERROR_CODES, ErrorCode, HTTP_STATUS, HttpStatus, handler, errorHandler(), formatZodIssues() (+9 more)

### Community 40 - "Community 40"
Cohesion: 0.12
Nodes (28): applySellerAddress(), escapeHtml(), isCharityUpload(), isPartnerOcrField(), limitPartnerHashtags(), markSellerFileUploaded(), parseSellerTypedAddress(), partnerBankStyle() (+20 more)

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): 1. Bản Đồ Ánh Xạ Tuyến Đường (Route Mapping), 2. Các Thành Phần Shadcn UI Tương Ứng, 3. Kiến Trúc Quản Lý Dữ Liệu (Data Layer & State Management), 4. Tích Hợp Supabase SSR (Server-Side Rendering), Lộ Trình Chuyển Đổi Sang Next.js (App Router) & Shadcn UI, Tích hợp TanStack Query (React Query), Ánh xạ giao diện cụ thể:

### Community 42 - "Community 42"
Cohesion: 0.09
Nodes (40): backPartnerRegisterStep(), bindPartnerStep6SubmitButton(), cancelPartnerRegistration(), capturePortalAccount(), ensurePartnerOtp(), ensurePartnerRegistrationDefaults(), finishPartnerPending(), forcePartnerStep6ToPendingDom() (+32 more)

### Community 43 - "Community 43"
Cohesion: 0.43
Nodes (4): calculateDistanceKm(), calculateFee(), showDispatchModal(), showDriverTrackingModal()

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): 1. NỀN TẢNG: LOCAL DATABASE ENGINE CHO BẢN DEMO KHÁCH XEM, 2. CHI TIẾT 4 TÍNH NĂNG NGHIỆP VỤ CỐT LÕI (GIAI ĐOẠN 3), 3. CHECKLIST KIỂM THỬ KHI DEMO CHO KHÁCH, Kế Hoạch Triển Khai Giai Đoạn 3: Nghiệp Vụ Cốt Lõi, QR Code Giao Nhận, Xác Thực Pháp Lý & Local Database, Tính năng 1: Giao Nhận Điện Tử Bằng Mã QR (E-Handover Protocol), Tính năng 2: Cổng Nộp Hồ Sơ Xác Thực Pháp Lý (KYB Verification), Tính năng 3: Giao Diện Phê Duyệt Hồ Sơ Quản Trị (Admin Review Panel), Tính năng 4: Xuất Giấy Chứng Nhận ESG & Giảm Phát Thải CO₂ (PDF Certificate)

### Community 45 - "Community 45"
Cohesion: 0.12
Nodes (17): healthController, notificationController, UuidParams, partnerController, healthRoutes, notificationRoutes, NotificationListQuery, notificationListQuerySchema (+9 more)

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (8): buildCommand, cleanUrls, framework, headers, outputDirectory, rewrites, trailingSlash, version

### Community 55 - "Community 55"
Cohesion: 0.13
Nodes (32): backCharityRegisterStep(), buildCharityRegistrationPayload(), charityContactEmail(), charityContactPhone(), charityFormValue(), charityNumber(), charityOrganizationProfilePayload(), charityOwnerProfilePayload() (+24 more)

### Community 56 - "Community 56"
Cohesion: 0.13
Nodes (32): backCharityRegisterStep(), buildCharityRegistrationPayload(), charityContactEmail(), charityContactPhone(), charityFormValue(), charityNumber(), charityOrganizationProfilePayload(), charityOwnerProfilePayload() (+24 more)

### Community 57 - "Community 57"
Cohesion: 0.13
Nodes (30): captureLegacyPortalAccount(), charityFallbackProfile(), charityMetadataStatus(), enterPortalWithAuth(), getPartnerLoginSupabaseClient(), isCharityPendingApproval(), isCharityProfileDashboardEnabled(), loadSupabaseCharityAuthContext() (+22 more)

### Community 58 - "Community 58"
Cohesion: 0.13
Nodes (30): captureLegacyPortalAccount(), charityFallbackProfile(), charityMetadataStatus(), enterPortalWithAuth(), getPartnerLoginSupabaseClient(), isCharityPendingApproval(), isCharityProfileDashboardEnabled(), loadSupabaseCharityAuthContext() (+22 more)

### Community 59 - "Community 59"
Cohesion: 0.12
Nodes (28): applySellerAddress(), escapeHtml(), isCharityUpload(), isPartnerOcrField(), limitPartnerHashtags(), markSellerFileUploaded(), parseSellerTypedAddress(), partnerBankStyle() (+20 more)

### Community 60 - "Community 60"
Cohesion: 0.11
Nodes (27): afterCharityRegisterRender(), afterPartnerRegisterRender(), attachCharityFaceStream(), attachPartnerFaceStream(), backToRegisterMethods(), beginPhoneSignup(), charityAuthState(), initPartnerFaceScan() (+19 more)

### Community 61 - "Community 61"
Cohesion: 0.16
Nodes (22): buildPartnerRegistrationPayloads(), compactPartnerPayload(), insertPartnerRow(), logPartnerSupabaseError(), normalizePartnerEmail(), partnerContactEmail(), partnerDocumentsMetadata(), partnerOpeningHoursText() (+14 more)

### Community 62 - "Community 62"
Cohesion: 0.11
Nodes (27): afterCharityRegisterRender(), afterPartnerRegisterRender(), attachCharityFaceStream(), attachPartnerFaceStream(), backToRegisterMethods(), beginPhoneSignup(), charityAuthState(), initPartnerFaceScan() (+19 more)

### Community 63 - "Community 63"
Cohesion: 0.16
Nodes (21): accept(), approvePartner(), autoDiscoverToken(), create(), get(), getCharityImpact(), getLeaderboard(), getMyImpact() (+13 more)

### Community 64 - "Community 64"
Cohesion: 0.16
Nodes (21): accept(), approvePartner(), autoDiscoverToken(), create(), get(), getCharityImpact(), getLeaderboard(), getMyImpact() (+13 more)

### Community 65 - "Community 65"
Cohesion: 0.09
Nodes (40): backPartnerRegisterStep(), bindPartnerStep6SubmitButton(), cancelPartnerRegistration(), capturePortalAccount(), ensurePartnerOtp(), ensurePartnerRegistrationDefaults(), finishPartnerPending(), forcePartnerStep6ToPendingDom() (+32 more)

### Community 66 - "Community 66"
Cohesion: 0.23
Nodes (13): cancelPhoneLoginOtp(), clearPhoneLoginOtpInputs(), clearPhoneOtpPending(), maskPhone(), readPhoneOtpInput(), readStoredPhoneOtp(), requestPhoneLoginOtp(), resendPhoneLoginOtp() (+5 more)

### Community 67 - "Community 67"
Cohesion: 0.16
Nodes (22): buildPartnerRegistrationPayloads(), compactPartnerPayload(), insertPartnerRow(), logPartnerSupabaseError(), normalizePartnerEmail(), partnerContactEmail(), partnerDocumentsMetadata(), partnerOpeningHoursText() (+14 more)

### Community 68 - "Community 68"
Cohesion: 0.27
Nodes (17): addDemand(), createDonation(), emitSync(), fulfillMatchedDemand(), getDemands(), getDonations(), getEcoImpactStats(), getState() (+9 more)

### Community 69 - "Community 69"
Cohesion: 0.27
Nodes (17): addDemand(), createDonation(), emitSync(), fulfillMatchedDemand(), getDemands(), getDonations(), getEcoImpactStats(), getState() (+9 more)

### Community 70 - "Community 70"
Cohesion: 0.23
Nodes (13): cancelPhoneLoginOtp(), clearPhoneLoginOtpInputs(), clearPhoneOtpPending(), maskPhone(), readPhoneOtpInput(), readStoredPhoneOtp(), requestPhoneLoginOtp(), resendPhoneLoginOtp() (+5 more)

### Community 71 - "Community 71"
Cohesion: 0.16
Nodes (15): sellerReputationController, UuidParams, sellerReputationRoutes, nonEmptyString, optionalPaginationQuerySchema, optionalTrimmedString, paginationQuerySchema, uuidParamSchema (+7 more)

### Community 72 - "Community 72"
Cohesion: 0.24
Nodes (10): customerProfileFromSupabaseSession(), notifyOnce(), oauthNotice(), setOAuthButtonPending(), socialLogin(), startFacebookLogin(), startGoogleLogin(), supabaseOAuthRedirectUrl() (+2 more)

### Community 73 - "Community 73"
Cohesion: 0.24
Nodes (10): customerProfileFromSupabaseSession(), notifyOnce(), oauthNotice(), setOAuthButtonPending(), socialLogin(), startFacebookLogin(), startGoogleLogin(), supabaseOAuthRedirectUrl() (+2 more)

### Community 74 - "Community 74"
Cohesion: 0.43
Nodes (4): calculateDistanceKm(), calculateFee(), showDispatchModal(), showDriverTrackingModal()

### Community 75 - "Community 75"
Cohesion: 0.43
Nodes (4): calculateDistanceKm(), calculateFee(), showDispatchModal(), showDriverTrackingModal()

### Community 82 - "Community 82"
Cohesion: 0.24
Nodes (12): assertProfileCanLoginWithPhoneOtp(), createAuthUser(), loadProfileByPhone(), normalizePhone(), normalizePhoneForSms(), phoneLoginCandidates(), requestPhoneOtp(), resolveEmailFromIdentifier() (+4 more)

### Community 83 - "Community 83"
Cohesion: 0.33
Nodes (5): CharityDemand, DemandMatchResult, matchingService, StoreDonationCandidate, StoreMatchAllocation

## Knowledge Gaps
- **302 isolated node(s):** `handler`, `nextConfig`, `name`, `version`, `private` (+297 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `AppError` connect `Community 39` to `Community 32`, `Community 1`, `Community 4`, `Community 8`, `Community 9`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `UserRole` connect `Community 17` to `Community 32`, `Community 1`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 39`, `Community 45`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `handleSupabaseError()` connect `Community 11` to `Community 32`, `Community 1`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 39`, `Community 45`, `Community 82`, `Community 25`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `handler`, `nextConfig`, `name` to the rest of the system?**
  _302 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09487179487179487 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05499735589635114 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06838106370543542 - nodes in this community are weakly interconnected._