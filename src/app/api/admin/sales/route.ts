import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    console.error("Error fetching sales data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
