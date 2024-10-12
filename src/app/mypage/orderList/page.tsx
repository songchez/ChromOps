import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import AddReview from "@/components/mypage/addreview";
import Image from "next/image";

async function fetchedOrders() {
  const session = await auth();
  const orders = prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
  });
  return orders;
}
async function fetchedProduct(id: string) {
  const product = prisma.product.findUnique({
    where: { id: id },
  });
  return product;
}

export default async function OrdersPage() {
  const orders = await fetchedOrders();

  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const itemsWithProducts = await Promise.all(
        order.items.map(async (item) => {
          const product = await fetchedProduct(item.productId);
          return { ...item, product }; // 제품 정보를 아이템에 추가
        })
      );
      return { ...order, items: itemsWithProducts }; // 주문에 아이템 정보 추가
    })
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">주문 목록</h1>
      <ul className="space-y-4">
        {ordersWithProducts.map((order) => (
          <li key={order.id} className="border p-4 rounded">
            <h2 className="text-lg">
              {order.createdAt.toLocaleDateString("ko-KR")} 주문
            </h2>
            <p>배송완료</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.productId}>
                  <Image
                    src={item.product.mainImages[0]}
                    alt={item.product.name}
                    width={120}
                    height={120}
                  />
                  <div>{item.product.name}</div>
                  <div>{item.product.price} 원</div>
                  <div>{item.quantity}개</div>
                  <div>{item.size}</div>
                  <div className="collapse bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      리뷰 작성
                    </div>
                    <div className="collapse-content">
                      <AddReview product={item.product} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p>총 금액: {order.totalAmount} 원</p>
            <button className="btn bg-blue-700 rounded-md mt-2">
              배송조회
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
