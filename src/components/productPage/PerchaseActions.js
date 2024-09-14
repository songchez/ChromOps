"use client";

import React, { useState } from "react";
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";

export default function PerchaseActions({ product }) {
  const { colors, sizes } = product;
  const colorVariants = {
    black: "bg-black",
    olive: "bg-olive",
    beige: "bg-beige",
  };
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedSize, setSelectedSize] = useState("M");
  return (
    <div>
      <div className="space-y-8">
        {/* Color Section */}
        <div>
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${
                  color !== "" ? `${colorVariants[color]}` : "bg-gray-400"
                } ${selectedColor === color ? `ring-2 ring-primary` : ""}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        {/* Size section */}
        <div>
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        {/* Action Section */}
        <div className="flex gap-4 w-52">
          <button
            className="btn flex w-full text-black py-3 rounded-sm items-center justify-center"
            onClick={() => {
              handleAddToCart({
                product: product,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
              });
            }}
          >
            <FaCartShopping className="mr-2" />
            장바구니담기
          </button>
          {/* Modal */}
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                장바구니에 상품이 추가되었습니다!
              </h3>
              <p className="py-4">장바구니보러가기 </p>
              <form method="dialog" className="modal-backdrop">
                <button className="btn">닫기</button>
              </form>
            </div>
          </dialog>
          <button className="btn w-full bg-blue-900 text-white py-3 rounded-sm flex items-center justify-center">
            바로구매
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

const handleAddToCart = ({ product, quantity, size, color }) => {
  // 기존 장바구니 가져오기

  const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  // 새로 추가할 상품 (예시 상품 정보)
  const newItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    color: color,
    size: size,
  };
  // 장바구니에 동일한 상품이 있는지 확인
  const existingItemIndex = existingCart.findIndex(
    (item) => item.id === newItem.id
  );

  if (existingItemIndex >= 0) {
    // 기존에 있는 상품이면 수량만 증가
    existingCart[existingItemIndex].quantity += 1;
  } else {
    // 새 상품이면 추가
    existingCart.push(newItem);
  }

  // 로컬 스토리지에 저장
  localStorage.setItem("cartItems", JSON.stringify(existingCart));

  // 모달열기
  return () => {
    document.getElementById("my_modal_2").showModal();
  };
};
