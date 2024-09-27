"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user.isAdmin) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            관리자 페이지
          </h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/admin/products"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            상품 관리
          </Link>
          <Link
            href="/admin/sales"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            판매 현황
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
