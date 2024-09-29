import { NextResponse } from "next/server";
import { OrderService } from "@/services/OrderService";

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export async function POST(request: Request) {
  try {
    const { paymentId, orderId } = await request.json();

    // 1. 포트원 결제내역 단건조회 API 호출
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` },
      }
    );

    if (!paymentResponse.ok) {
      throw new Error(`paymentResponse: ${await paymentResponse.text()}`);
    }

    const payment = await paymentResponse.json();

    // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
    const orderData = await OrderService.getOrderData(orderId);

    if (orderData.amount === payment.amount.total) {
      switch (payment.status) {
        case "VIRTUAL_ACCOUNT_ISSUED": {
          const paymentMethod = payment.paymentMethod;
          await OrderService.updateOrderStatus(
            orderId,
            "VIRTUAL_ACCOUNT_ISSUED"
          );
          return NextResponse.json({
            status: "virtual_account_issued",
            paymentMethod,
          });
        }
        case "PAID": {
          await OrderService.updateOrderStatus(orderId, "PAID");
          return NextResponse.json({ status: "paid" });
        }
        default: {
          return NextResponse.json({ status: "unknown" });
        }
      }
    } else {
      // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }
  } catch (e) {
    // 결제 검증에 실패했습니다.
    console.error("Payment verification failed:", e);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 }
    );
  }
}
