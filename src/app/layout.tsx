import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";
import { AppProvider } from "@/contexts/AppContext";
import Container from "@/components/atoms/Container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Fahasa - Nhà Sách Trực Tuyến Hàng Đầu Việt Nam - FAHASA.COM",
  description: "Fahasa Online - Hệ thống nhà sách chuyên nghiệp. Đáp ứng tất cả các yêu cầu về sách, nhiều ưu đãi hấp dẫn, voucher miễn phí vận chuyển. Đặt mua ngay!",
  keywords: "fahasa.com, fahasa, sách, nhà sách, bookstore, nhà sách trên mạng, mua sách online, văn phòng phẩm, đồ chơi",
  robots: "INDEX,FOLLOW",
  appleWebApp: true,
  icons: [
    { rel: "icon", url: "https://cdn0.fahasa.com/media/favicon/default/favicon4.ico" },
    { rel: "shortcut icon", url: "https://cdn0.fahasa.com/media/favicon/default/favicon4.ico", type: "image/x-icon" },
  ],
  alternates: {
    canonical: "https://www.fahasa.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="mdl-js">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F0F0F0]`}
        data-new-gr-c-s-check-loaded="14.1092.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <AppProvider>
          <header>
            <Header />
          </header>

          <main>
            <Container>
              {children}
            </Container>
          </main>

          <footer>
            <Footer />
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
