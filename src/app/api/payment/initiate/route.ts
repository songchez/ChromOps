import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const {
    orderName,
    totalAmount,
    cartItems,
    address,
    paymentMethod,
    recipient,
    phoneNumber,
    deliveryNote,
  } = await req.json();

  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PAYMENT_WAITING",
        totalAmount,
        shippingAddress: `${address.address} ${address.detailAddress} ${address.zonecode}`,
        paymentMethod,
        recipientName: recipient,
        phoneNumber,
        deliveryNote,
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    const paymentData = {
      storeId: process.env.PORTONE_STORE_ID,
      channelKey: process.env.PORTONE_CHANNEL_KEY,
      paymentId: `payment-${order.id}`,
      orderName,
      totalAmount,
      currency: "CURRENCY_KRW",
      payMethod: paymentMethod,
      customer: {
        customerId: session.user.id,
        name: recipient,
        phoneNumber,
        address: {
          addressLine1: `${address.address} ${address.detailAddress}`,
          postcode: address.zonecode,
        },
      },
    };

    return NextResponse.json({ success: true, paymentData, orderId: order.id });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "주문 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
