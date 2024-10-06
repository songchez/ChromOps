import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

async function isAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });
  return user?.isAdmin === true;
}
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminCheck = await isAdmin(session.user.id);
  if (!adminCheck) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: parseInt(body.price),
        category: body.category,
        mainImages: body.mainImages,
        detailImages: body.detailImages,
        slug: body.slug,
        sizes: body.sizes,
        colors: body.colors,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
