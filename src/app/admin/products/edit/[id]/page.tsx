"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    mainImages: [],
    detailImages: [],
    slug: "",
    sizes: [],
    colors: [],
  });

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      router.push("/admin/products");
    } else {
      alert("상품 수정에 실패했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e, type) => {
    const { value } = e.target;
    setProduct({
      ...product,
      [type]: value.split(",").map((url) => url.trim()),
    });
  };

  if (!product.id) return <div>로딩 중...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">상품 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            이름:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">
            설명:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="price" className="block">
            가격:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block">
            카테고리:
          </label>
          <select
            id="category"
            name="category"
            value={product.category as Category}
            onChange={handleChange}
            className="w-full border p-2"
          >
            <option value="outer">아우터</option>
            <option value="pants">바지</option>
            <option value="shoes">신발</option>
            <option value="acc">액세서리</option>
          </select>
        </div>
        <div>
          <label htmlFor="mainImages" className="block">
            메인 이미지 URL (쉼표로 구분):
          </label>
          <input
            type="text"
            id="mainImages"
            name="mainImages"
            value={product.mainImages.join(", ")}
            onChange={(e) => handleImageChange(e, "mainImages")}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="detailImages" className="block">
            상세 이미지 URL (쉼표로 구분):
          </label>
          <input
            type="text"
            id="detailImages"
            name="detailImages"
            value={product.detailImages.join(", ")}
            onChange={(e) => handleImageChange(e, "detailImages")}
            className="w-full border p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          수정 완료
        </button>
      </form>
    </div>
  );
}
