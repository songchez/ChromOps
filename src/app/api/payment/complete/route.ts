import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const { paymentId, orderId } = await req.json();

  try {
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

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new Error("주문을 찾을 수 없습니다");
    }

    if (order.totalAmount === payment.amount.total) {
      switch (payment.status) {
        case "VIRTUAL_ACCOUNT_ISSUED": {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "VIRTUAL_ACCOUNT_ISSUED" },
          });
          break;
        }
        case "PAID": {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "PAID" },
          });
          break;
        }
      }
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "결제 금액이 불일치합니다." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "결제 검증 중 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
