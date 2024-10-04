import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  // session이 null이 아니고, user 객체가 존재하는지 확인
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  try {
    const orderItems = await prisma.orderItem.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    const salesMap = new Map();

    orderItems.forEach((item) => {
      const { productId, quantity, product } = item;
      const existingData = salesMap.get(productId) || {
        id: productId,
        productName: product.name,
        quantity: 0,
        totalSales: 0,
      };

      existingData.quantity += quantity;
      existingData.totalSales += quantity * Number(product.price);

      salesMap.set(productId, existingData);
    });

    const salesData = Array.from(salesMap.values());

    return NextResponse.json(salesData);
  } catch (error) {
    console.error("판매 데이터 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
