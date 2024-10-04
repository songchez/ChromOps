import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  const description = formData.get("description") as string;
  const category = formData.get("category") as Category;
  const slug = formData.get("slug") as string;
  const sizes = JSON.parse(formData.get("sizes") as string);
  const colors = JSON.parse(formData.get("colors") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const mainImage = formData.get("mainImage") as File;
  const detailImages = formData.getAll("detailImages") as File[];

  // 여기서 이미지 파일을 처리하고 저장하는 로직을 구현해야 합니다.
  // 예를 들어, 클라우드 스토리지에 업로드하고 URL을 받아올 수 있습니다.
  // 지금은 간단히 파일 이름만 저장하도록 하겠습니다.

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        category,
        slug,
        sizes,
        colors,
        rating,
        mainImage: mainImage.name,
        detailImages: detailImages.map((image) => image.name),
        reviews: [], // 초기에는 빈 배열로 설정
      },
    });

    return NextResponse.json({
      message: "상품이 성공적으로 등록되었습니다.",
      product,
    });
  } catch (error) {
    console.error("상품 등록 중 오류 발생:", error);
    return NextResponse.json(
      { error: "상품 등록에 실패했습니다." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
