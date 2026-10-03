import type { Metadata } from 'next';
import './globals.css';
import { LocalDbProvider } from '@/context/LocalDbContext';

export const metadata: Metadata = {
  title: 'FoodSave Việt Nam - Cứu Thực Phẩm, Giảm Phát Thải CO2e',
  description: 'Nền tảng kết nối trực tiếp thực phẩm dư thừa chất lượng cao từ doanh nghiệp đến tổ chức từ thiện. 100% Phi lợi nhuận, không phí trung gian.',
  keywords: ['FoodSave', 'Cứu thực phẩm', 'ESG Việt Nam', 'Từ thiện thực phẩm', 'Giảm phát thải'],
  openGraph: {
    title: 'FoodSave Việt Nam - Cứu Thực Phẩm, Giảm Phát Thải CO2e',
    description: 'Nền tảng kết nối thực phẩm dư thừa đến tổ chức từ thiện. Minh bạch, nhanh chóng và miễn phí 100%.',
    url: 'https://foodsave-vietnam-new.vercel.app',
    siteName: 'FoodSave Việt Nam',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocalDbProvider>{children}</LocalDbProvider>
      </body>
    </html>
  );
}
