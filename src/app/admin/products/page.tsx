import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4 text-zinc-950">
      <h1 className="text-2xl font-bold mb-4">상품 목록</h1>
      <Link
        href="/admin/addproducts"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        새 상품 추가
      </Link>
      <table className="w-full border-collapse text-center max-w-3xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">이름</th>
            <th className="border p-2">가격</th>
            <th className="border p-2">카테고리</th>
            <th className="border p-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="text-blue-500 hover:underline"
                >
                  수정
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
