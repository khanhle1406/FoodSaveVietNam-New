# Deployment & Local Testing Rule

## Localhost Testing Only
- Mọi chỉnh sửa, tính năng mới hoặc vá lỗi trong dự án này PHẢI được build và chạy kiểm thử hoàn toàn ở **localhost** (`http://localhost:3000`).
- Không tự ý kích hoạt lệnh deploy lên server production (như `npx vercel --prod`, Netlify prod, v.v.).
- Chỉ thực hiện deploy lên production khi và chỉ khi có yêu cầu trực tiếp từ người dùng.
