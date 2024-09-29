"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as PortOne from "@portone/browser-sdk/v2";

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await PortOne.requestPayment({
        storeId: process.env.PORTONE_STORE_ID,
        channelKey: process.env.PORTONE_KAKAO_CHANNEL_KEY,
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: "나이키 와플 트레이너 2 SD",
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        customer: {
          customerId: "customerId_now",
          fullName: "홍길동",
          phoneNumber: "01012345678",
          email: "test@example.com",
          zipcode: "06018",
        },
        windowType: {
          pc: "IFRAME",
          mobile: "REDIRECTION",
        },
        redirectUrl: `${window.location.origin}/cart/checkout/redirect`,
      });

      if (response.code != null) {
        // 오류 발생
        console.error("결제 오류:", response.message);
        router.push("/cart/checkout/fail");
      } else {
        // 결제 성공
        console.log("결제 성공:", response);
        // 서버에 결제 정보 전송
        const notified = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/complete`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.paymentId,
              // 기타 필요한 주문 정보...
            }),
          }
        );

        if (notified.ok) {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">결제 페이지</h1>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "처리 중..." : "결제하기"}
      </button>
    </div>
  );
};

export default CheckoutPage;
