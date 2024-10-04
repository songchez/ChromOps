"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "outer" as Category,
    slug: "",
    sizes: "",
    colors: "",
    rating: "",
    mainImage: null,
    detailImages: [],
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.name === "mainImage") {
      setFormData((prev) => ({ ...prev, mainImage: e.target.files[0] }));
    } else if (e.target.name === "detailImages") {
      setFormData((prev) => ({
        ...prev,
        detailImages: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === "sizes" || key === "colors") {
        formDataToSend.append(key, JSON.stringify(formData[key].split(",")));
      } else if (key === "detailImages") {
        formData[key].forEach((file) => {
          formDataToSend.append("detailImages", file);
        });
      } else if (key === "mainImage") {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("/api/admin/addproducts", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("상품이 성공적으로 등록되었습니다.");
        router.push("/admin/products");
      } else {
        throw new Error("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("상품 등록 중 오류 발생:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="상품명"
        required
        className="input input-bordered w-full rounded-sm"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="가격"
        required
        className="input input-bordered w-full rounded-sm"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="설명"
        required
        className="textarea textarea-bordered w-full rounded-sm"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="select select-bordered w-full rounded-sm"
      >
        <option value="outer">외투</option>
        <option value="pants">바지</option>
        <option value="shoes">신발</option>
        <option value="acc">악세서리</option>
      </select>
      <input
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="슬러그"
        required
        className="input input-bordered w-full rounded-sm"
      />
      <input
        name="sizes"
        value={formData.sizes}
        onChange={handleChange}
        placeholder="사이즈 (쉼표로 구분)"
        required
        className="input input-bordered w-full rounded-sm"
      />
      <input
        name="colors"
        value={formData.colors}
        onChange={handleChange}
        placeholder="색상 (쉼표로 구분)"
        required
        className="input input-bordered w-full rounded-sm"
      />
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">메인 이미지</span>
        </label>
        <input
          name="mainImage"
          type="file"
          onChange={handleImageChange}
          required
          className="file-input file-input-bordered w-full rounded-sm"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">상세 이미지들</span>
        </label>
        <input
          name="detailImages"
          type="file"
          multiple
          onChange={handleImageChange}
          required
          className="file-input file-input-bordered w-full rounded-sm"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full rounded-sm">
        상품 등록
      </button>
    </form>
  );
}
