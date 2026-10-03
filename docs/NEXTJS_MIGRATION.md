# Lộ Trình Chuyển Đổi Sang Next.js (App Router) & Shadcn UI

> Tài liệu hướng dẫn chi tiết quá trình hiện đại hóa kiến trúc frontend của **FoodSave Việt Nam** từ Multi-Page HTML sang **Next.js 14+ (App Router)** kết hợp **TailwindCSS** và **Shadcn UI**.

---

## 1. Bản Đồ Ánh Xạ Tuyến Đường (Route Mapping)

Toàn bộ các file HTML độc lập hiện tại sẽ được chuyển đổi thành cấu trúc nhóm tuyến đường (Route Groups) sạch sẽ trong thư mục `src/app`:

| File HTML Hiện Tại | Route Next.js Mới | Loại Component | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| `index.html` | `app/(marketing)/page.tsx` | Server Component | Trang chủ, sứ mệnh, số liệu tác động ESG toàn quốc |
| `PARTNER.html` | `app/(partner)/dashboard/page.tsx` | Client Component | Cổng dành cho Cửa hàng: Đăng món giảm lãng phí, nộp hồ sơ KYB, mở mã QR bàn giao |
| `CHARITY.html` | `app/(charity)/dashboard/page.tsx` | Client Component | Cổng dành cho Tổ chức từ thiện: Nhận đợt cứu trợ, quét QR, điều phối xe AhaMove/Grab |
| `ADMIN_FOODSAVE.html` | `app/(admin)/portal/page.tsx` | Client Component | Bảng điều khiển Quản trị viên: Thẩm định KYB, giám sát đơn hàng, kiểm toán hệ thống |
| `FOODSAVE_USER.html` | `app/(consumer)/explore/page.tsx` | Client Component | Ứng dụng người tiêu dùng: Bản đồ tìm món ăn giải cứu giá rẻ quanh đây |

---

## 2. Các Thành Phần Shadcn UI Tương Ứng

Để tái sử dụng giao diện hiện đại mà không phải code CSS thủ công, cài đặt các component sau từ Shadcn:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog dropdown-menu badge tabs input table toast avatar alert
```

### Ánh xạ giao diện cụ thể:
1. **Thẻ Tác động ESG / Metric Cards:** Sử dụng `@/components/ui/card` kết hợp gradient và Lucide Icons (`Leaf`, `Truck`, `Heart`, `ShieldCheck`).
2. **Modal Quét QR & Đối soát Bàn giao:** Sử dụng `@/components/ui/dialog` tích hợp thư viện `html5-qrcode`.
3. **Modal Thẩm định KYB & Giấy chứng nhận ESG:** Sử dụng `@/components/ui/dialog` kết hợp in ấn CSS `@media print`.
4. **Bảng Quản trị & Lịch sử Đơn hàng:** Sử dụng `@/components/ui/table` kết hợp `@tanstack/react-table`.

---

## 3. Kiến Trúc Quản Lý Dữ Liệu (Data Layer & State Management)

### Tích hợp TanStack Query (React Query)
Thay thế hoàn toàn việc đọc/ghi thủ công từ `localStorage` bằng TanStack Query với tính năng tự động làm mới (Auto Refetch) khi có dữ liệu thay đổi:

```typescript
// hooks/useDonations.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FoodSaveAPI } from '@/lib/apiClient';

export function useDonations() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['donations'],
    queryFn: () => FoodSaveAPI.donations.list(),
  });

  const acceptMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      FoodSaveAPI.donations.accept(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    },
  });

  return { ...query, acceptDonation: acceptMutation.mutateAsync };
}
```

---

## 4. Tích Hợp Supabase SSR (Server-Side Rendering)

Sử dụng thư viện `@supabase/ssr` chính thức để quản lý Cookie session bảo mật tuyệt đối, ngăn chặn hoàn toàn việc rò rỉ token:

* `middleware.ts`: Tự động kiểm tra quyền admin trước khi cho phép vào `/admin/*`.
* `utils/supabase/server.ts`: Tạo Supabase Client trong Server Actions và Route Handlers.
* `utils/supabase/client.ts`: Tạo Supabase Client trong Client Components (Realtime subscriptions).
