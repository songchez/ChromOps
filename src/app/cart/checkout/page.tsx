"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as PortOne from "@portone/browser-sdk/v2";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  const getOrderName = (items: CartItem[]): string => {
    if (items.length === 0) return "주문 없음";
    if (items.length === 1) return items[0].name;
    return `${items[0].name} 외 ${items.length - 1}개`;
  };

  const getTotalAmount = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    if (status !== "authenticated" || !session?.user) {
      console.error("사용자가 인증되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const orderName = getOrderName(cartItems);
      const totalAmount = getTotalAmount(cartItems);

      // 서버에서 결제 정보 가져오기
      const paymentDataResponse = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderName,
          totalAmount,
          cartItems, // 서버에서 주문 생성을 위해 전체 장바구니 데이터 전송
        }),
      });

      if (!paymentDataResponse.ok) {
        throw new Error("결제 초기화 실패");
      }

      const paymentData = await paymentDataResponse.json();

      const response = await PortOne.requestPayment(paymentData);

      if (response.code != null) {
        console.error("결제 오류:", response.message);
        router.push("/cart/checkout/fail");
      } else {
        console.log("결제 성공:", response);
        const notified = await fetch("/api/payment/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.paymentId,
            userId: session.user.id,
            orderId: paymentData.orderId, // 서버에서 생성한 주문 ID
          }),
        });

        if (notified.ok) {
          localStorage.removeItem("cart"); // 결제 성공 시 장바구니 비우기
          router.push("/cart/checkout/success");
        } else {
          console.error("서버 알림 실패");
          router.push("/cart/checkout/fail");
        }
      }
    } catch (error) {
      console.error("결제 요청 실패:", error);
      router.push("/cart/checkout/fail");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제 페이지</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">주문 내역</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}개, {item.price * item.quantity}원
            </li>
          ))}
        </ul>
        <p className="font-bold mt-2">총 금액: {getTotalAmount(cartItems)}원</p>
      </div>
      <button
        onClick={handlePayment}
        disabled={isLoading || cartItems.length === 0}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
          isLoading || cartItems.length === 0
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {isLoading ? "처리 중..." : "결제하기"}
      </button>
    </div>
  );
};

export default CheckoutPage;
