"use client";

import { useState } from "react";
import { prisma } from "@/lib/prisma";

export default function ProductManagement() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      if (mainImage) formData.append("mainImage", mainImage);
      detailImages.forEach((image) => formData.append("detailImages", image));

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // 성공 메시지 표시 또는 리디렉션
        console.log("상품이 성공적으로 등록되었습니다.");
      } else {
        // 에러 처리
        console.error("상품 등록 실패");
      }
    } catch (error) {
      console.error("상품 등록 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            상품명
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label
            htmlFor="mainImage"
            className="block text-sm font-medium text-gray-700"
          >
            메인 이미지
          </label>
          <input
            type="file"
            id="mainImage"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            className="mt-1 block w-full"
            accept="image/*"
            required
          />
        </div>
        <div>
          <label
            htmlFor="detailImages"
            className="block text-sm font-medium text-gray-700"
          >
            상세 이미지들
          </label>
          <input
            type="file"
            id="detailImages"
            onChange={(e) => setDetailImages(Array.from(e.target.files || []))}
            className="mt-1 block w-full"
            accept="image/*"
            multiple
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          상품 등록
        </button>
      </form>
    </div>
  );
}
