import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Be_Vietnam_Pro, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { LocalDbProvider } from '@/context/LocalDbContext';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-be-vietnam',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-source-serif',
});

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
    <html
      lang="vi"
      className={`${inter.variable} ${plusJakarta.variable} ${beVietnam.variable} ${sourceSerif.variable}`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@500,700,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
      </head>
      <body>
        <LocalDbProvider>{children}</LocalDbProvider>
      </body>
    </html>
  );
}
