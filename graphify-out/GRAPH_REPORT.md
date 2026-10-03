# Graph Report - TISPA  (2026-10-03)

## Corpus Check
- 103 files · ~140,527 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1025 nodes · 2282 edges · 52 communities (50 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `23671637`
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

## God Nodes (most connected - your core abstractions)
1. `select()` - 49 edges
2. `handleSupabaseError()` - 33 edges
3. `notify()` - 29 edges
4. `partnerState()` - 25 edges
5. `request()` - 23 edges
6. `ensurePartnerRegistrationDefaults()` - 22 edges
7. `HTTP_STATUS` - 22 edges
8. `savePartnerStep()` - 19 edges
9. `request()` - 18 edges
10. `savePartnerRegistrationToSupabase()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `ErrorResponse` --references--> `ErrorCode`  [EXTRACTED]
  src/types/api.ts → src/constants/errors.ts
- `OAuthOtpChallenge` --references--> `UserRole`  [EXTRACTED]
  src/services/authService.ts → src/types/domain.ts
- `requirePartnerProfile()` --calls--> `handleSupabaseError()`  [EXTRACTED]
  src/services/adminService.ts → src/services/supabaseService.ts
- `requirePartnerStores()` --calls--> `handleSupabaseError()`  [EXTRACTED]
  src/services/adminService.ts → src/services/supabaseService.ts
- `loadProfilesById()` --calls--> `handleSupabaseError()`  [EXTRACTED]
  src/services/adminService.ts → src/services/supabaseService.ts

## Import Cycles
- None detected.

## Communities (52 total, 2 thin omitted)

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
Nodes (52): applyCharityAddress(), applyCharityOcrToState(), applyPartnerOcrToState(), charityAddressParts(), charityCoordinate(), charityDocumentMetadataEntry(), charityDocumentPublicUrl(), charityDocumentsMetadata() (+44 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (37): authController, addressSchema, authRoleSchema, emailSchema, FacebookOAuthCallbackBody, facebookOAuthCallbackBodySchema, FacebookOAuthStartBody, facebookOAuthStartBodySchema (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (32): backCharityRegisterStep(), buildCharityRegistrationPayload(), charityContactEmail(), charityContactPhone(), charityFormValue(), charityNumber(), charityOrganizationProfilePayload(), charityOwnerProfilePayload() (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (27): dependencies, cors, dotenv, express, express-rate-limit, helmet, pg, serverless-http (+19 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (17): UuidParams, CreateStoreBody, StoreListQuery, UpdateStoreBody, catalogService, queryLocation(), storeDistance(), assertOwnerOrAdmin() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (15): env, envSchema, optionalNonEmptyString, parsedEnv, postgresPool, supabaseAdmin, supabaseAuth, emitStoreStatusChanged() (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.30
Nodes (12): UuidParams, CreateBeneficiaryGroupBody, CreateCharityProfileBody, CreateGalleryItemBody, CreateImpactReportBody, CreateVolunteerBody, PublicGalleryQuery, UpdateCharityProfileBody (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (25): assertProfileCanLoginWithPhoneOtp(), AuthAuditEvent, AuthContext, createAuthUser(), FacebookOAuthStartResult, GoogleOAuthStartResult, GoogleOtpSentResult, loadProfileByPhone() (+17 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (14): ERROR_CODES, ErrorCode, HTTP_STATUS, HttpStatus, handler, errorHandler(), formatZodIssues(), apiRateLimiter (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (45): applySellerAddress(), ensurePartnerOtp(), ensurePartnerRegistrationDefaults(), escapeHtml(), formatPartnerOtpTime(), handlePartnerHashtagKey(), isCharityUpload(), isPartnerOcrField() (+37 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (9): 1. Phân Tích Hiện Trạng & Yêu Cầu Giai Đoạn 4, 2. Chi Tiết Các Hạng Mục Thực Hiện (Work Breakdown Structure), 3. Kế Hoạch Triển Khai Từng Bước, 4. Cam Kết & Bảo Toàn, Hạng mục 4.1: Phân Hệ Điều Phối Vận Chuyển Khẩn Cấp (Logistics Dispatch Engine), Hạng mục 4.2: Hệ Thống Cảnh Báo Khẩn Cấp Tức Thời (Urgent Alert & ZNS Simulator), Hạng mục 4.3: Bộ Kiểm Thử Tự Động (Automated Test Suite), Hạng mục 4.4: Cấu Hình Triển Khai Vercel & Đóng Gói (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (22): buildPartnerRegistrationPayloads(), compactPartnerPayload(), insertPartnerRow(), logPartnerSupabaseError(), normalizePartnerEmail(), partnerContactEmail(), partnerDocumentsMetadata(), partnerOpeningHoursText() (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.14
Nodes (13): CancellationMutationResult, ExistsRow, fetchReputation(), mapReputation(), nullableTimestampToIso(), SellerReputationRow, TimestampValue, toIsoString() (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.11
Nodes (18): compilerOptions, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames, lib, module, moduleResolution, noImplicitOverride (+10 more)

### Community 17 - "Community 17"
Cohesion: 0.10
Nodes (23): generateCode(), getRange(), PaginationInput, toPagination(), ComplaintPriority, ComplaintStatus, Donation, DonationStatus (+15 more)

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
Cohesion: 0.22
Nodes (11): loadProfilesById(), requirePartnerProfile(), requirePartnerStores(), upsertProfile(), getStoreOwner(), assertCharityOwner(), getOwnedCharityIds(), getOwnedStoreIds() (+3 more)

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
Cohesion: 0.14
Nodes (17): catalogController, partnerController, authMiddleware(), extractBearerToken(), requireRoles(), adminRoutes, adminUserParamSchema, rejectPartnerBodySchema (+9 more)

### Community 26 - "Community 26"
Cohesion: 0.24
Nodes (10): customerProfileFromSupabaseSession(), notifyOnce(), oauthNotice(), setOAuthButtonPending(), socialLogin(), startFacebookLogin(), startGoogleLogin(), supabaseOAuthRedirectUrl() (+2 more)

### Community 27 - "Community 27"
Cohesion: 0.08
Nodes (23): 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN, 2.1. Lỗi Broken Link 404 ngay trên trang chủ, 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`, 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless, 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern, 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình, 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS), 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND (+15 more)

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (9): charityController, createBeneficiaryGroupBodySchema, createCharityProfileBodySchema, createGalleryItemBodySchema, createImpactReportBodySchema, createVolunteerBodySchema, publicGalleryQuerySchema, updateCharityProfileBodySchema (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.08
Nodes (23): 1. TỔNG QUAN HIỆN TRẠNG MÃ NGUỒN, 2.1. Lỗi Broken Link 404 ngay trên trang chủ, 2.2. Lỗi Crash truy vấn SQL trong `adminService.ts` và `ecoImpactService.ts`, 2.3. Lệch pha kiến trúc: Socket.io không thể hoạt động trên Netlify Serverless, 2.4. Xung đột kết nối cơ sở dữ liệu: Dual-Driver Anti-Pattern, 2.5. Lộ Secret Keys và Hardcode thông tin cấu hình, 2. CÁC LỖI KỸ THUẬT & ĐỨT GÃY NGHIÊM TRỌNG (CRITICAL BUGS), 3. SỰ BẤT ĐỒNG NHẤT GIỮA FRONTEND VÀ BACKEND (+15 more)

### Community 30 - "Community 30"
Cohesion: 0.42
Nodes (5): profileController, profileRoutes, UpdateProfileBody, updateProfileBodySchema, profileService

### Community 31 - "Community 31"
Cohesion: 0.11
Nodes (18): compilerOptions, esModuleInterop, exactOptionalPropertyTypes, forceConsistentCasingInFileNames, lib, module, moduleResolution, noImplicitOverride (+10 more)

### Community 32 - "Community 32"
Cohesion: 0.27
Nodes (11): UuidParams, AcceptDonationBody, CreateDonationBody, DonationListQuery, donationStatusSchema, UpdateDonationStatusBody, assertCharityOwner(), assertStoreOwner() (+3 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (14): API Base, Auth Flow, Commands, Deployment, Eco Impact Tracker, FoodSave Backend, Frontend Integration Notes, Local Setup (+6 more)

### Community 34 - "Community 34"
Cohesion: 0.13
Nodes (14): 1.1. Sửa lỗi Broken Link 404 trên Landing Page, 1.2. Khắc phục lỗi Crash SQL 500 trong `adminService.ts`, 1.3. Khắc phục lỗi Crash SQL 500 trong `ecoImpactService.ts`, 1. TỔNG QUAN CÁC GIAI ĐOẠN, 2.1. Loại bỏ Secret Key Hardcode trong `env.ts`, 2.2. Thống nhất Driver Kết Nối Cơ Sở Dữ Liệu, 2.3. Khóa Truy Cập Trang Quản Trị (Admin Early Auth Gate), 2. CHI TIẾT CÁC HẠNG MỤC THỰC HIỆN (+6 more)

### Community 35 - "Community 35"
Cohesion: 0.19
Nodes (16): authError(), buildAuthResult(), buildAuthResultFromOAuthCallback(), compactObject(), completeFacebookOAuthCallback(), createOAuthOtpChallenge(), ensureOAuthProfile(), isOAuthAuthUser() (+8 more)

### Community 36 - "Community 36"
Cohesion: 0.22
Nodes (8): 1. TỔNG QUAN HIỆN TRẠNG ĐỨT GÃY, 2. CHI TIẾT CÁC HẠNG MỤC TRIỂN KHAI, 3. CHECKLIST KIỂM THỬ GIAI ĐOẠN 2, Hạng mục 2.1: Tích hợp API vào Cổng Từ Thiện ([CHARITY.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/CHARITY.html)), Hạng mục 2.2: Tích hợp API vào Cổng Doanh Nghiệp ([PARTNER.html](file:///Users/xuannguyen/Desktop/Competitions/2026/TISPA/PARTNER.html)), Hạng mục 2.3: Chuyển đổi Realtime sang Supabase Realtime Channels, Hạng mục 2.4: Đồng bộ Authentication Session Đồng Nhất, Kế Hoạch Triển Khai Giai Đoạn 2: Đồng Bộ Hóa Dữ Liệu & Kết Nối Backend

### Community 37 - "Community 37"
Cohesion: 0.27
Nodes (8): AuthResult, ErrorResponse, PaginatedResponse, SuccessResponse, ValidatedRequestData, Profile, Request, ActorContext

### Community 38 - "Community 38"
Cohesion: 0.32
Nodes (13): createDonation(), emitSync(), getDonations(), getEcoImpactStats(), getState(), getStores(), init(), loadState() (+5 more)

### Community 39 - "Community 39"
Cohesion: 0.26
Nodes (10): sellerReputationController, UuidParams, sellerReputationRoutes, OrderSuccessBody, orderSuccessBodySchema, SellerCancellationBody, sellerCancellationBodySchema, SellerRatingAverageBody (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (8): donationController, validateRequest(), ValidationSchema, donationRoutes, acceptDonationBodySchema, createDonationBodySchema, donationListQuerySchema, updateDonationStatusBodySchema

### Community 41 - "Community 41"
Cohesion: 0.25
Nodes (7): 1. Bản Đồ Ánh Xạ Tuyến Đường (Route Mapping), 2. Các Thành Phần Shadcn UI Tương Ứng, 3. Kiến Trúc Quản Lý Dữ Liệu (Data Layer & State Management), 4. Tích Hợp Supabase SSR (Server-Side Rendering), Lộ Trình Chuyển Đổi Sang Next.js (App Router) & Shadcn UI, Tích hợp TanStack Query (React Query), Ánh xạ giao diện cụ thể:

### Community 42 - "Community 42"
Cohesion: 0.16
Nodes (11): adminController, AdminUserParams, RejectPartnerBody, healthController, UuidParams, healthRoutes, adminService, notificationService (+3 more)

### Community 43 - "Community 43"
Cohesion: 0.43
Nodes (4): calculateDistanceKm(), calculateFee(), showDispatchModal(), showDriverTrackingModal()

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (8): 1. NỀN TẢNG: LOCAL DATABASE ENGINE CHO BẢN DEMO KHÁCH XEM, 2. CHI TIẾT 4 TÍNH NĂNG NGHIỆP VỤ CỐT LÕI (GIAI ĐOẠN 3), 3. CHECKLIST KIỂM THỬ KHI DEMO CHO KHÁCH, Kế Hoạch Triển Khai Giai Đoạn 3: Nghiệp Vụ Cốt Lõi, QR Code Giao Nhận, Xác Thực Pháp Lý & Local Database, Tính năng 1: Giao Nhận Điện Tử Bằng Mã QR (E-Handover Protocol), Tính năng 2: Cổng Nộp Hồ Sơ Xác Thực Pháp Lý (KYB Verification), Tính năng 3: Giao Diện Phê Duyệt Hồ Sơ Quản Trị (Admin Review Panel), Tính năng 4: Xuất Giấy Chứng Nhận ESG & Giảm Phát Thải CO₂ (PDF Certificate)

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (9): notificationController, notificationRoutes, nonEmptyString, optionalPaginationQuerySchema, optionalTrimmedString, paginationQuerySchema, uuidParamSchema, NotificationListQuery (+1 more)

### Community 46 - "Community 46"
Cohesion: 0.42
Nodes (5): supportController, supportRoutes, CreateContactMessageBody, createContactMessageBodySchema, supportService

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (5): cleanUrls, headers, rewrites, trailingSlash, version

## Knowledge Gaps
- **258 isolated node(s):** `handler`, `name`, `version`, `private`, `description` (+253 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `handleSupabaseError()` connect `Community 21` to `Community 32`, `Community 1`, `Community 35`, `Community 7`, `Community 9`, `Community 10`, `Community 11`, `Community 42`, `Community 46`, `Community 15`, `Community 17`, `Community 30`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `HTTP_STATUS` connect `Community 11` to `Community 32`, `Community 1`, `Community 4`, `Community 7`, `Community 39`, `Community 9`, `Community 42`, `Community 10`, `Community 46`, `Community 15`, `Community 17`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `supabaseAdmin` connect `Community 8` to `Community 32`, `Community 1`, `Community 7`, `Community 9`, `Community 10`, `Community 11`, `Community 42`, `Community 46`, `Community 15`, `Community 17`, `Community 30`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `handler`, `name`, `version` to the rest of the system?**
  _258 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14624505928853754 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05499735589635114 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06838106370543542 - nodes in this community are weakly interconnected._