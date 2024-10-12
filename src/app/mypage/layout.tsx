import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/mypage", label: "주문/배송조회" },
  { href: "/mypage/returns", label: "교환반품내역" },
  { href: "/mypage/account", label: "계정관리" },
];

export default async function MypageLayout({ children }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex text-zinc-950 bg-white max-w-6xl mx-auto">
      <nav className="w-64 h-screen p-6">
        <h2 className="text-xl font-bold mb-6">마이페이지</h2>
        <ul>
          {navItems.map((item) => (
            <>
              <li key={item.href} className="mb-4">
                <Link
                  href={item.href}
                  className="text-gray-800 hover:text-yellow-700"
                >
                  {item.label}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
