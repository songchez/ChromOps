import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { getProducts } from "@/services/productService";

// S3 클라이언트 초기화
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

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
    // 메인 이미지를 S3에 업로드
    const mainImageUrl = await uploadImageToS3(mainImage);

    // 상세 이미지들을 S3에 업로드
    const detailImageUrls = await Promise.all(
      detailImages.map((image) => uploadImageToS3(image))
    );

    // 데이터베이스에 새 상품을 생성
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

// 이미지를 S3에 업로드하는 함수입니다.
async function uploadImageToS3(file: File): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const key = `products/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });

  try {
    await s3Client.send(command);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    return signedUrl.split("?")[0]; // URL에서 쿼리 파라미터 제거
  } catch (error) {
    console.error("S3 이미지 업로드 중 오류 발생:", error);
    throw error;
  }
}
