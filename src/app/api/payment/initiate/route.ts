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
    const channelKey =
      paymentMethod === "EASY_PAY"
        ? process.env.PORTONE_KAKAO_CHANNEL_KEY
        : process.env.PORTONE_HANGUCK_CHANNEL_KEY;

    const Currentuser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    const order = await prisma.order.create({
      data: {
        userId: Currentuser.id,
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
            size: item.size,
            color: item.color,
          })),
        },
      },
    });

    const paymentData = {
      storeId: process.env.PORTONE_STORE_ID,
      channelKey: channelKey,
      paymentId: `payment${order.id}`,
      orderName,
      totalAmount,
      currency: "CURRENCY_KRW",
      payMethod: paymentMethod,
      ...(paymentMethod === "EASY_PAY" && {
        easyPay: {
          easyPayProvider: "KAKAOPAY",
        },
      }),
      customer: {
        customerId: Currentuser.id,
        name: recipient,
        phoneNumber,
        address: {
          addressLine1: address.address,
          addressLine2: address.detailAddress,
          postcode: address.zonecode,
        },
      },
    };
    console.log(paymentData);
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
