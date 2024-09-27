import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const salesData = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: {
        quantity: true,
        price: true,
      },
    });

    const formattedSalesData = await Promise.all(
      salesData.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true },
        });

        return {
          id: item.productId,
          productName: product?.name || "Unknown Product",
          quantity: item._sum.quantity || 0,
          totalSales: item._sum.price || 0,
        };
      })
    );

    return NextResponse.json(formattedSalesData);
  } catch (error) {
    console.error("판매 데이터 가져오는 중 오류 발생:", error);
    return NextResponse.json(
      { error: "판매 데이터를 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}
