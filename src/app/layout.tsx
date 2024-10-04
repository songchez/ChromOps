import { Noto_Sans_KR } from "next/font/google";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "@/components/Providers";

const notoSans = Noto_Sans_KR({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "ChromOps",
  description: "역전, 승리, 크로몹스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <Providers>
          <div className="bg-zinc-950 text-white min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
