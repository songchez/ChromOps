import React from "react";
import products from "../../../data/products.json"; // Adjust this path if necessary
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import ColorAndSize from "@/components/productPage/ColorAndSize";
import Carousel from "@/components/productPage/Carousel";

export default function ProductPage({ params }) {
  const { slug } = params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-3/4 p-6">
        {/* Product Header with Carousel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 mb-10">
          {/* Carousel */}
          <Carousel product={product} />
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold">
                    ${product.price}
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
                    <a href="#" className="text-xs text-blue-600">
                      {product.reviewCount}개의 리뷰
                    </a>
                  </div>
                </div>
                {/* 컬러와사이즈 (client side) */}
                <ColorAndSize colors={product.colors} sizes={product.sizes} />

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center">
                  <FaCartShopping className="mr-2" />
                  Add to cart
                </button>

                <div>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Images Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">상품 상세 이미지</h2>
          <Image
            src={`/products/${product.id}/detail_page.jpg`} // Use a detailed image if available
            alt={product.name}
            width={870}
            height={2000}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
