# AGENTS PROTOCOL & PROJECT RULES

## 1. Local Testing & Deployment Policy (BẮT BUỘC)
- **Kiểm thử hoàn toàn tại Localhost:**
  - Mọi thay đổi code, cập nhật giao diện, logic backend, API hoặc migration database CHỈ được build, chạy và kiểm thử trên môi trường **localhost** (`http://localhost:3000` hoặc server test cục bộ).
  - Sử dụng các lệnh kiểm tra:
    - Chạy unit test: `npm test`
    - Kiểm tra build: `npm run build`
    - Chạy thử nghiệm local: `npm run start` hoặc `npm run dev`
- **Không tự ý deploy Production:**
  - **TUYỆT ĐỐI KHÔNG** tự ý chạy các lệnh deploy lên server production (như `vercel --prod`, `netlify deploy --prod`, hoặc đẩy trực tiếp lên hosting công khai) trừ khi người dùng đưa ra **yêu cầu rõ ràng và cụ thể** trong phiên chat.
  - Khi hoàn thành tác vụ, cung cấp đường link `http://localhost:3000/...` tương ứng để người dùng đối soát.

## 2. Giao diện & Kiến trúc Frontend
- Dự án đã chuyển dịch toàn bộ sang **Next.js App Router** (`src/app/`).
- Duy trì tính nguyên bản 100% của giao diện FoodSave từ các bản thiết kế gốc (Home, Charity, Partner, Admin).
- Không tự ý thêm tính năng ngoài phạm vi yêu cầu của người dùng.
