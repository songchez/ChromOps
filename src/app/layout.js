import { Gothic_A1 } from "next/font/google";
import "./globals.css";

const gothic = Gothic_A1({ weight: ["300"], subsets: ["latin"] });

export const metadata = {
  title: "예쓰샵",
  description: "예쁜쓰레기들만 모아놓은 힙한편집샵",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" theme={cmyk}>
      <body className={gothic.className}>{children}</body>
    </html>
  );
}
