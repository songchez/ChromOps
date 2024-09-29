import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderName, totalAmount } = await request.json();

  const paymentData = {
    storeId: process.env.PORTONE_STORE_ID,
    channelKey: process.env.PORTONE_KAKAO_CHANNEL_KEY,
    paymentId: `payment-${crypto.randomUUID()}`,
    orderName,
    totalAmount,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
    customer: {
      customerId: session.user.id || "guest",
      fullName: session.user.name || "게스트",
      email: session.user.email || "guest@example.com",
      zipcode: "06018",
    },
    windowType: {
      pc: "IFRAME",
      mobile: "REDIRECTION",
    },
    redirectUrl: `${process.env.NEXTAUTH_URL}/cart/checkout/redirect`,
  };

  return NextResponse.json(paymentData);
}
