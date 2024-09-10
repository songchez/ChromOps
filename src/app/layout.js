import { Gothic_A1 } from "next/font/google";
import "./globals.css";

const gothic = Gothic_A1({ weight: ["500"], subsets: ["latin"] });

export const metadata = {
  title: "ChromOps",
  description: "역전, 승리, 크로몹스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" theme={"black"}>
      <body className={gothic.className}>
        <div className="bg-gray-900 text-white min-h-screen">{children}</div>
      </body>
    </html>
  );
}
