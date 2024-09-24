import React from "react";
import * as PortOne from "@portone/browser-sdk/v2";

export default async function CheckoutPage() {
  const totalOrder = 1000;
  const orderlist = [];

  async function requestPayment() {
    const response = await PortOne.requestPayment({
      // Store ID (will be replaced with .env)
      storeId: "store-1eac614c-0f6b-47cc-ae80-9bf1e5fb55ba",
      // Channel Key
      channelKey: "channel-key-584702dd-b4dd-41fc-a94e-48fbfa110cbe",
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: orderlist.toString(),
      totalAmount: totalOrder,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      // 결제가 완료되었습니다 페이지로 리다이렉트
      redirectUrl: `${""}/payment-redirect`,
    });

    if (response.code != null) {
      // Error occurred
      return alert(response.message);
    }

    // /payment/complete 엔드포인트를 구현해야 합니다. 다음 목차에서 설명합니다.?
    const notified = await fetch(`${""}/payment/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // paymentId와 주문 정보를 서버에 전달합니다
      body: JSON.stringify({
        paymentId: "",
        // 주문 정보...
      }),
    });
  }

  return (
    <div>
      <div>checkout가격 : {totalOrder}원</div>
      <div>{orderlist}</div>
      <button>결제</button>
    </div>
  );
}
