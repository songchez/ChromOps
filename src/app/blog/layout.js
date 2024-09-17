import { Hahmlet } from "next/font/google";

const songmyung = Hahmlet({ weight: ["300"], subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <div className={`flex justify-center ${songmyung.className}`}>
      {children}
    </div>
  );
}
