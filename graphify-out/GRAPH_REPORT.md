# Graph Report - TISPA  (2026-10-03)

## Corpus Check
- 118 files · ~149,795 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1081 nodes · 2365 edges · 55 communities (51 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22d1971f`
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

## God Nodes (most connected - your core abstractions)
1. `select()` - 49 edges
2. `handleSupabaseError()` - 33 edges
3. `notify()` - 29 edges
4. `partnerState()` - 25 edges
5. `request()` - 23 edges
6. `compilerOptions` - 23 edges
7. `ensurePartnerRegistrationDefaults()` - 22 edges
8. `HTTP_STATUS` - 22 edges
9. `savePartnerStep()` - 19 edges
10. `request()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `ErrorResponse` --references--> `ErrorCode`  [EXTRACTED]
  src/types/api.ts → src/constants/errors.ts
- `AdminPortalPage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/admin/page.tsx → src/context/LocalDbContext.tsx
- `CharityPortalPage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/charity/page.tsx → src/context/LocalDbContext.tsx
- `HomePage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/page.tsx → src/context/LocalDbContext.tsx
- `PartnerPortalPage()` --calls--> `useLocalDb()`  [EXTRACTED]
  src/app/partner/page.tsx → src/context/LocalDbContext.tsx

## Import Cycles
- None detected.

## Communities (55 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (23): backPartnerRegisterStep(), bindPartnerStep6SubmitButton(), cancelPartnerRegistration(), capturePortalAccount(), finishPartnerPending(), forcePartnerStep6ToPendingDom(), handlePartnerStep6SubmitClick(), installPartnerStep6ClickListener() (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (48): ecoImpactController, ecoImpactRoutes, CharityEcoImpactQuery, charityEcoImpactQuerySchema, dateRangeRefine, EcoImpactLeaderboardQuery, ecoImpactLeaderboardQuerySchema, ecoImpactPeriodSchema (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (55): acceptDonation(), authToken(), browserLocation(), catalogPath(), centsToVnd(), clearNearbyLocation(), clearStoredNearbyLocation(), createMomoPayment() (+47 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (46): applyCharityAddress(), applyCharityOcrToState(), applyPartnerOcrToState(), charityAddressParts(), charityCoordinate(), charityDocumentMetadataEntry(), charityDocumentPublicUrl(), charityDocumentsMetadata() (+38 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (27): authController, authMiddleware(), extractBearerToken(), addressSchema, authRoleSchema, emailSchema, facebookOAuthCallbackBodySchema, facebookOAuthStartBodySchema (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (32): backCharityRegisterStep(), buildCharityRegistrationPayload(), charityContactEmail(), charityContactPhone(), charityFormValue(), charityNumber(), charityOrganizationProfilePayload(), charityOwnerProfilePayload() (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (40): dependencies, clsx, cors, dotenv, express, express-rate-limit, helmet, lucide-react (+32 more)

### Community 7 - "Community 7"
Cohesion: 0.30
Nodes (12): queryLocation(), storeDistance(), assertOwnerOrAdmin(), Coordinates, distanceKmBetween(), formatDistanceText(), geoBoundingBox(), GeoBounds (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (15): env, envSchema, optionalNonEmptyString, parsedEnv, postgresPool, supabaseAdmin, supabaseAuth, emitStoreStatusChanged() (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (21): charityController, UuidParams, CreateBeneficiaryGroupBody, createBeneficiaryGroupBodySchema, CreateCharityProfileBody, createCharityProfileBodySchema, CreateGalleryItemBody, createGalleryItemBodySchema (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (52): FacebookOAuthCallbackBody, FacebookOAuthStartBody, GoogleOAuthStartBody, GoogleOtpRequestBody, GoogleOtpVerifyBody, LoginBody, PasswordResetBody, PhoneOtpRequestBody (+44 more)

### Community 11 - "Community 11"
Cohesion: 0.14
Nodes (17): adminController, AdminUserParams, RejectPartnerBody, adminService, loadProfilesById(), ProfileRow, requirePartnerProfile(), requirePartnerStores() (+9 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (40): applySellerAddress(), ensurePartnerOtp(), ensurePartnerRegistrationDefaults(), escapeHtml(), formatPartnerOtpTime(), handlePartnerHashtagKey(), isCharityUpload(), isPartnerOcrField() (+32 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (9): 1. Phân Tích Hiện Trạng & Yêu Cầu Giai Đoạn 4, 2. Chi Tiết Các Hạng Mục Thực Hiện (Work Breakdown Structure), 3. Kế Hoạch Triển Khai Từng Bước, 4. Cam Kết & Bảo Toàn, Hạng mục 4.1: Phân Hệ Điều Phối Vận Chuyển Khẩn Cấp (Logistics Dispatch Engine), Hạng mục 4.2: Hệ Thống Cảnh Báo Khẩn Cấp Tức Thời (Urgent Alert & ZNS Simulator), Hạng mục 4.3: Bộ Kiểm Thử Tự Động (Automated Test Suite), Hạng mục 4.4: Cấu Hình Triển Khai Vercel & Đóng Gói (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (27): buildPartnerRegistrationPayloads(), compactPartnerPayload(), insertPartnerRow(), logPartnerSupabaseError(), normalizePartnerEmail(), normalizePhone(), partnerContactEmail(), partnerContactPhone() (+19 more)

### Community 15 - "Community 15"
Cohesion: 0.13
Nodes (14): CancellationMutationResult, ExistsRow, fetchReputation(), mapReputation(), nullableTimestampToIso(), SellerReputationRow, sellerReputationService, TimestampValue (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.07
Nodes (26): compilerOptions, allowJs, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames, incremental, isolatedModules, jsx (+18 more)

### Community 17 - "Community 17"
Cohesion: 0.11
Nodes (18): ComplaintPriority, ComplaintStatus, Donation, DonationStatus, DonationUrgency, Notification, Order, OrderItem (+10 more)

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
Cohesion: 0.21
Nodes (16): ERROR_CODES, ErrorCode, HTTP_STATUS, HttpStatus, handler, errorHandler(), formatZodIssues(), apiRateLimiter (+8 more)

### Community 22 - "Community 22"
Cohesion: 0.13
Nodes (14): API Base, Auth Flow, Commands, Deployment, Eco Impact Tracker, FoodSave Backend, Frontend Integration Notes, Local Setup (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.16
Nodes (21): accept(), approvePartner(), autoDiscoverToken(), create(), get(), getCharityImpact(), getLeaderboard(), getMyImpact() (+13 more)

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (22): cancelPhoneLoginOtp(), checkBlockedUser(), clearBlockedUserAuthState(), clearPhoneLoginOtpInputs(), clearPhoneOtpPending(), clearSession(), customerProfileFromSupabaseSession(), customerUserIdFromSession() (+14 more)

### Community 25 - "Community 25"
Cohesion: 0.14
Nodes (15): donationController, partnerController, requireRoles(), validateRequest(), ValidationSchema, adminRoutes, adminUserParamSchema, rejectPartnerBodySchema (+7 more)

### Community 26 - "Community 26"
Cohesion: 0.38
Nodes (7): notifyOnce(), oauthNotice(), setOAuthButtonPending(), socialLogin(), startFacebookLogin(), startGoogleLogin(), supabaseOAuthRedirectUrl()

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
Cohesion: 0.24
Nodes (8): profileController, profileRoutes, UpdateProfileBody, updateProfileBodySchema, partnerService, profileService, getActor(), sendSuccess()

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (7): AuthResult, ErrorResponse, PaginatedResponse, SuccessResponse, ValidatedRequestData, Profile, Request

### Community 32 - "Community 32"
Cohesion: 0.25
Nodes (12): UuidParams, AcceptDonationBody, CreateDonationBody, DonationListQuery, donationStatusSchema, UpdateDonationStatusBody, assertCharityOwner(), assertStoreOwner() (+4 more)

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
Cohesion: 0.26
Nodes (10): catalogController, UuidParams, catalogRoutes, CreateStoreBody, createStoreBodySchema, StoreListQuery, storeListQuerySchema, UpdateStoreBody (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.32
Nodes (13): createDonation(), emitSync(), getDonations(), getEcoImpactStats(), getState(), getStores(), init(), loadState() (+5 more)

### Community 39 - "Community 39"
Cohesion: 0.29
Nodes (9): sellerReputationController, UuidParams, sellerReputationRoutes, OrderSuccessBody, orderSuccessBodySchema, SellerCancellationBody, sellerCancellationBodySchema, SellerRatingAverageBody (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.28
Nodes (6): healthController, authRoutes, charityRoutes, healthRoutes, apiRoutes, notificationRoutes

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): 1. Bản Đồ Ánh Xạ Tuyến Đường (Route Mapping), 2. Các Thành Phần Shadcn UI Tương Ứng, 3. Kiến Trúc Quản Lý Dữ Liệu (Data Layer & State Management), 4. Tích Hợp Supabase SSR (Server-Side Rendering), Lộ Trình Chuyển Đổi Sang Next.js (App Router) & Shadcn UI, Tích hợp TanStack Query (React Query), Ánh xạ giao diện cụ thể:

### Community 42 - "Community 42"
Cohesion: 0.42
Nodes (5): supportController, supportRoutes, CreateContactMessageBody, createContactMessageBodySchema, supportService

### Community 43 - "Community 43"
Cohesion: 0.43
Nodes (4): calculateDistanceKm(), calculateFee(), showDispatchModal(), showDriverTrackingModal()

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): 1. NỀN TẢNG: LOCAL DATABASE ENGINE CHO BẢN DEMO KHÁCH XEM, 2. CHI TIẾT 4 TÍNH NĂNG NGHIỆP VỤ CỐT LÕI (GIAI ĐOẠN 3), 3. CHECKLIST KIỂM THỬ KHI DEMO CHO KHÁCH, Kế Hoạch Triển Khai Giai Đoạn 3: Nghiệp Vụ Cốt Lõi, QR Code Giao Nhận, Xác Thực Pháp Lý & Local Database, Tính năng 1: Giao Nhận Điện Tử Bằng Mã QR (E-Handover Protocol), Tính năng 2: Cổng Nộp Hồ Sơ Xác Thực Pháp Lý (KYB Verification), Tính năng 3: Giao Diện Phê Duyệt Hồ Sơ Quản Trị (Admin Review Panel), Tính năng 4: Xuất Giấy Chứng Nhận ESG & Giảm Phát Thải CO₂ (PDF Certificate)

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (12): notificationController, UuidParams, nonEmptyString, optionalPaginationQuerySchema, optionalTrimmedString, paginationQuerySchema, uuidParamSchema, NotificationListQuery (+4 more)

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (8): buildCommand, cleanUrls, framework, headers, outputDirectory, rewrites, trailingSlash, version

## Knowledge Gaps
- **282 isolated node(s):** `handler`, `nextConfig`, `name`, `version`, `private` (+277 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `handleSupabaseError()` connect `Community 11` to `Community 32`, `Community 1`, `Community 7`, `Community 9`, `Community 10`, `Community 42`, `Community 45`, `Community 15`, `Community 21`, `Community 30`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `UserRole` connect `Community 21` to `Community 32`, `Community 1`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 45`, `Community 15`, `Community 17`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `HTTP_STATUS` connect `Community 21` to `Community 32`, `Community 1`, `Community 37`, `Community 39`, `Community 9`, `Community 10`, `Community 11`, `Community 42`, `Community 15`, `Community 31`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `handler`, `nextConfig`, `name` to the rest of the system?**
  _282 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14624505928853754 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05499735589635114 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06838106370543542 - nodes in this community are weakly interconnected._