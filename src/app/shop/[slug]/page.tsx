import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import MainCarousel from "@/components/productPage/MainCarousel";
import PerchaseActions from "@/components/productPage/PerchaseActions";
import prisma from "@/lib/prisma";
import Link from "next/link";

const getProduct = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { id: slug },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new Error("제품을 찾을 수 없습니다");
  }

  return product;
};

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  return (
    <div className="flex w-full justify-center bg-white text-slate-800">
      <div className="max-w-4xl p-6">
        {/* Product Header with Carousel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 mb-10">
          <MainCarousel product={product} />
          <div className="mx-auto p-6">
            {/* 오른쪽전체간격 */}
            <div className="space-y-8">
              <h1 className="text-3xl font-bold ">{product.name}</h1>
              <p className="text-gray-400">{product.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold">
                  {product.price.toLocaleString("ko-KR")}원
                </span>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Link href="#" className="text-xs text-primary">
                    {product.reviews.length}개의 리뷰
                  </Link>
                </div>
              </div>
              {/* 구매액션 섹션(client side) */}
              <PerchaseActions product={product} />
            </div>
          </div>
        </div>

        {/* Detailed Images Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">상품 상세 이미지</h2>
          {product.detailImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.name} 상세 이미지 ${index + 1}`}
              width={870}
              height={2000}
              className="object-cover rounded-lg mb-4"
            />
          ))}
        </div>

        {/* 리뷰 섹션 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">고객 리뷰</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ul className="space-y-6">
              {product.reviews.map((review) => (
                <li key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {review.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    작성자: {review.user.name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">아직 리뷰가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
