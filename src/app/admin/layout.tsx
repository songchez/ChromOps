import { redirect } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session.status !== "authenticated" || !session.data?.user?.isAdmin) {
    redirect("/login");
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
