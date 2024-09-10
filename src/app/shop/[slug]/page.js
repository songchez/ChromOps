// src/app/shop/[slug]/page.js
import React from "react";
import products from "../../../data/products.json"; // Adjust this path if necessary
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const { slug } = params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="p-6">
      {/* Product Header with Carousel */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
        <div className="w-full lg:w-1/2">
          <div className="carousel w-full">
            {product.thumbnails.map((thumbnail, index) => (
              <div key={index} className="carousel-item w-full">
                <Image
                  src={thumbnail}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={870}
                  height={500}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-600">
            ₩{product.price.toLocaleString()}
          </p>
          <p className="text-gray-500">{product.description}</p>
          <button className="btn btn-primary w-full lg:w-auto mt-4">
            구매하기
          </button>
        </div>
      </div>

      {/* Detailed Images Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">상품 상세 이미지</h2>
        <Image
          src={product.thumbnails[0]} // Use a detailed image if available
          alt={product.name}
          width={870}
          height={2000}
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
