import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// 구현중...어떻게 하면 좋을까?

// async function getReturns(userId: string) {
//   return await prisma.return.findMany({
//     where: { order: { userId } },
//     include: {
//       order: {
//         include: {
//           orderItems: {
//             include: {
//               product: true,
//             },
//           },
//         },
//       },
//     },
//     orderBy: { createdAt: "desc" },
//   });
// }

export default async function Returns() {
  const session = await auth();
  if (!session || !session.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  //   const returns = await getReturns(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">교환반품내역</h1>
      {/* {returns.map((returnItem) => (
        <div key={returnItem.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">
            반품번호: {returnItem.id}
          </h2>
          <p>주문번호: {returnItem.orderId}</p>
          <p>상태: {returnItem.status}</p>
          <p>사유: {returnItem.reason}</p>
          <h3 className="font-semibold mt-4 mb-2">반품 상품:</h3>
          <ul>
            {returnItem.order.orderItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.product.name} - {item.quantity}개
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}
