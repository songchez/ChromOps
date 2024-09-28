import { Noto_Sans_KR } from "next/font/google";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const notoSans = Noto_Sans_KR({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "ChromOps",
  description: "역전, 승리, 크로몹스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <SessionProvider>
          <div className="bg-slate-950 text-white min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
