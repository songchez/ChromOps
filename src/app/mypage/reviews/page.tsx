import React from "react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function getReviews(userId: string) {
  return await prisma.review.findMany({
    where: { userId },
    include: {
      product: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function Reviews() {
  const session = await auth();
  if (!session || !session.user) {
    return <div>로그인이 필요합니다.</div>;
  }

  const reviews = await getReviews(session.user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">상품리뷰</h1>
      {reviews.map((review) => (
        <div key={review.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">{review.product.name}</h2>
          <p>평점: {review.rating}/5</p>
          <p>내용: {review.comment}</p>
          <p>작성일: {review.createdAt.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
