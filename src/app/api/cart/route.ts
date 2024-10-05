import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",") || [];

  if (ids.length === 0) {
    return NextResponse.json([]);
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      mainImages: true,
    },
  });

  return NextResponse.json(products);
}
