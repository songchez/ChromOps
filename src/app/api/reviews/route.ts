import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { auth } from "@/auth";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const productName = formData.get("productName") as string;
  const rating = parseInt((formData.get("rating") as string) || "0", 10);
  const comment = formData.get("comment") as string;
  const imageFile = formData.get("imageFile") as File;

  // 현재유저를 리뷰어로 설정
  const session = await auth();
  const Currentuser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  try {
    let reviewImage = "";

    if (imageFile) {
      reviewImage = await uploadImageToS3(imageFile, productName);
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: Currentuser.id,
        rating,
        comment,
        reviewImage,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("리뷰 작성 중 오류 발생:", error);
    return NextResponse.json(
      { error: "리뷰 작성에 실패했습니다." },
      { status: 500 }
    );
  }
}

async function uploadImageToS3(
  file: File,
  productName: String
): Promise<string> {
  const fileBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const fileName = `${crypto.randomUUID()}-${file.name}`;
  const key = `products/${productName}/${fileName}`;

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
