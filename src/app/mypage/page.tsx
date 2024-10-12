import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import AddReview from "@/components/mypage/addreview";
import Image from "next/image";
import { Session } from "next-auth";

// 유저이메일을 기반으로 id가져오기
async function getCurrentUser(session: Session) {
  return await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
}

// userId로 오더 가져오기
async function fetchedOrders(currentUser) {
  const orders = prisma.order.findMany({
    where: { userId: currentUser.id },
    include: {
      items: true,
    },
  });
  return orders;
}

// productId로 리뷰를 포함한 product가져오기
async function fetchedProduct(id: string, userId: string) {
  const product = await prisma.product.findUnique({
    where: { id: id },
    include: {
      reviews: {
        where: { userId },
      },
    },
  });
  return product;
}

// 오더페이지. 주문한 상품나열+리뷰작성. 리뷰작성되어있을경우 작성한리뷰가 나옴
export default async function OrdersPage() {
  const session = await auth();
  const currentUser = await getCurrentUser(session);
  const orders = await fetchedOrders(currentUser);

  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      const itemsWithProducts = await Promise.all(
        order.items.map(async (item) => {
          const product = await fetchedProduct(item.productId, currentUser.id);
          return { ...item, product }; // 제품 정보를 아이템에 추가
        })
      );
      return { ...order, items: itemsWithProducts }; // 주문에 아이템 정보 추가
    })
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">주문 목록</h1>
      <ul className="space-y-4">
        {ordersWithProducts.map((order) => (
          <li
            key={order.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">
              {order.createdAt.toLocaleDateString("ko-KR")} 주문
            </h2>
            <p className="text-green-600">배송완료</p>
            <ul className="mt-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col items-start space-x-4 border-b py-2"
                >
                  <div className="flex items-center space-x-4 py-2">
                    <Image
                      src={item.product.mainImages[0]}
                      alt={item.product.name}
                      width={120}
                      height={120}
                      className="rounded"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-zinc-500">
                        {item.product.price}원 • {item.size} • {item.quantity}개
                      </div>
                    </div>
                  </div>
                  {item.product.reviews === null ? (
                    <div className="collapse bg-base-200 w-auto">
                      <input type="checkbox" />
                      <div className="collapse-title text-md font-medium rounded-md">
                        리뷰 작성
                      </div>
                      <div className="collapse-content">
                        <AddReview product={item.product} />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1 className="m-1 mt-3">내가쓴리뷰</h1>
                      {item.product.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="mb-4 p-3 border rounded"
                        >
                          <p className="text-lg text-yellow-400">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </p>
                          <p>{review.comment}</p>
                          <p>작성일: {review.createdAt.toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">총 금액: {order.totalAmount} 원</p>
            <button className="btn bg-blue-700 text-white rounded-md mt-2">
              배송조회
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
