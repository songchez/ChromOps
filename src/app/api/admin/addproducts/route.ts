// 필요한 모듈과 라이브러리를 가져옵니다.
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToDrive } from "@/utils/googleDrive";
import fs from "fs/promises";
import os from "os";
import path from "path";

type Category = "outer" | "pants" | "shoes" | "acc";

// POST 요청을 처리하는 함수입니다.
export async function POST(request: Request) {
  // 요청에서 formData를 추출합니다.
  const formData = await request.formData();

  // formData에서 필요한 정보를 추출하고 적절한 타입으로 변환합니다.
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string);
  const description = formData.get("description") as string;
  const category = formData.get("category") as Category;
  const slug = formData.get("slug") as string;
  const sizes = JSON.parse(formData.get("sizes") as string);
  const colors = JSON.parse(formData.get("colors") as string);
  const rating = parseFloat(formData.get("rating") as string) || 0;
  const mainImage = formData.get("mainImage") as File;
  const detailImages = formData.getAll("detailImages") as File[];

  try {
    // 메인 이미지를 Google Drive에 업로드합니다.
    const mainImageUrl = await uploadImageToDrive(mainImage);

    // 상세 이미지들을 Google Drive에 업로드합니다.
    const detailImageUrls = await Promise.all(
      detailImages.map((image) => uploadImageToDrive(image))
    );

    // 데이터베이스에 새 상품을 생성합니다.
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
        mainImage: mainImageUrl,
        detailImages: detailImageUrls,
        reviews: [],
      },
    });

    // 성공 응답을 반환합니다.
    return NextResponse.json({
      message: "상품이 성공적으로 등록되었습니다.",
      product,
    });
  } catch (error) {
    // 오류 발생 시 로그를 남기고 에러 응답을 반환합니다.
    console.error("상품 등록 중 오류 발생:", error);
    return NextResponse.json(
      { error: "상품 등록에 실패했습니다." },
      { status: 500 }
    );
  } finally {
    // 데이터베이스 연결을 종료합니다.
    await prisma.$disconnect();
  }
}

// 이미지를 Google Drive에 업로드하는 함수입니다.
async function uploadImageToDrive(file: File): Promise<string> {
  // 임시 파일 경로를 생성합니다.
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, file.name);

  try {
    // 파일 데이터를 버퍼로 변환합니다.
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 임시 파일을 생성합니다.
    await fs.writeFile(tempFilePath, buffer);

    // Google Drive에 파일을 업로드하고 URL을 받아옵니다.
    const imageUrl = await uploadToDrive({
      originalname: file.name,
      mimetype: file.type,
      path: tempFilePath,
    });

    return imageUrl;
  } catch (error) {
    // 오류 발생 시 로그를 남기고 에러를 던집니다.
    console.error("이미지 업로드 중 오류 발생:", error);
    throw error;
  } finally {
    // 임시 파일을 삭제합니다.
    try {
      await fs.unlink(tempFilePath);
    } catch (error) {
      console.error("임시 파일 삭제 중 오류 발생:", error);
    }
  }
}
