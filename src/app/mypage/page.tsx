import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function getOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function OrderList() {
  const session = await auth();
  if (!session || !session.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const orders = await getOrders(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">주문/배송조회</h1>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">주문번호: {order.id}</h2>
          <p>주문일: {order.createdAt.toLocaleDateString()}</p>
          <p>상태: {order.status}</p>
          <h3 className="font-semibold mt-4 mb-2">주문 상품:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="mb-2">
                {item.product.name} - {item.quantity}개
              </li>
            ))}
          </ul>
          <p className="mt-2">총 금액: {order.totalAmount}원</p>
        </div>
      ))}
    </div>
  );
}
