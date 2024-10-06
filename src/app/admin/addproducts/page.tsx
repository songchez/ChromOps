"use client";

import { useState, useEffect } from "react";
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
    mainImages: [],
    detailImages: [],
  });
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem("productFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prevData) => ({
        ...prevData,
        ...parsedData,
        mainImages: [],
        detailImages: [],
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.name === "mainImages") {
      setFormData((prev) => ({
        ...prev,
        mainImages: Array.from(e.target.files),
      }));
    } else if (e.target.name === "detailImages") {
      setFormData((prev) => ({
        ...prev,
        detailImages: Array.from(e.target.files),
      }));
    }
  };

  const handleSave = () => {
    const dataToSave = { ...formData };
    delete dataToSave.mainImages;
    delete dataToSave.detailImages;
    localStorage.setItem("productFormData", JSON.stringify(dataToSave));
    alert("폼 데이터가 임시 저장되었습니다.");
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
      } else if (key === "mainImages") {
        formData[key].forEach((file) => {
          formDataToSend.append("mainImages", file);
        });
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
        localStorage.removeItem("productFormData");
        router.push("/admin/addproducts");
      } else {
        throw new Error("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("상품 등록 중 오류 발생:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 text-black">
      <div>
        <div className="label">
          <span className="label-text">상품명</span>
        </div>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="상품명"
          required
          className="input input-bordered w-full rounded-sm"
        />
      </div>
      <div>
        <div className="label">
          <span className="label-text">가격</span>
        </div>
        <div className="relative">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="가격"
            required
            className="input input-bordered w-full rounded-sm pl-8"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            원
          </span>
        </div>
      </div>
      <div>
        <div className="label">
          <span className="label-text">상세설명</span>
        </div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="상세설명"
          required
          className="textarea textarea-bordered w-full rounded-sm"
        />
      </div>
      <div>
        <div className="label">
          <span className="label-text">카테고리</span>
        </div>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="select select-bordered w-full rounded-sm"
        >
          <option value="outer">아우터</option>
          <option value="pants">바지</option>
          <option value="shoes">신발</option>
          <option value="acc">악세서리</option>
        </select>
      </div>
      <div>
        <div className="label">
          <span className="label-text">슬러그</span>
        </div>
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="슬러그"
          required
          className="input input-bordered w-full rounded-sm"
        />
      </div>
      <div>
        <div className="label">
          <span className="label-text">사이즈옵션</span>
        </div>
        <input
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
          placeholder="사이즈옵션 (쉼표로 구분)"
          required
          className="input input-bordered w-full rounded-sm"
        />
      </div>
      <div>
        <div className="label">
          <span className="label-text">색상옵션</span>
        </div>
        <input
          name="colors"
          value={formData.colors}
          onChange={handleChange}
          placeholder="색상옵션 (쉼표로 구분)"
          required
          className="input input-bordered w-full rounded-sm"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">메인 이미지 5개</span>
        </label>
        <input
          name="mainImages"
          type="file"
          multiple
          onChange={handleImageChange}
          required
          className="file-input file-input-bordered w-full rounded-sm"
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">상세 이미지</span>
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
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-secondary w-32 mr-2 rounded-sm"
        >
          임시 저장
        </button>
        <button type="submit" className="btn btn-primary w-1/3 ml-2 rounded-sm">
          상품 등록
        </button>
      </div>
    </form>
  );
}
