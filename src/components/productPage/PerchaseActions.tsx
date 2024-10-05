"use client";

import { LocalStorage } from "@/lib/localStorage";
import Link from "next/link";
import React, { useState } from "react";
import { FaAngleRight, FaCartShopping } from "react-icons/fa6";

export default function PerchaseActions({ product }) {
  const { colors, sizes } = product;
  const colorVariants = {
    black: "bg-black",
    olive: "bg-olive",
    beige: "bg-beige",
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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
            <div className="modal-box flex flex-col gap-4">
              <h3 className="font-bold text-lg">
                장바구니에 상품이 추가되었습니다!
              </h3>
              <form method="dialog" className="modal-backdrop">
                <Link
                  href="/cart"
                  className="btn bg-blue-900 hover:bg-blue-600 text-white"
                >
                  장바구니보러가기
                </Link>
              </form>
              <form method="dialog" className="modal-backdrop">
                <button className="btn">닫기</button>
              </form>
            </div>
          </dialog>
          <Link
            href="/cart"
            onClick={() => {
              handleAddToCart({
                product: product,
                quantity: 1,
                size: selectedSize,
                color: selectedColor,
              });
            }}
            className="btn w-full bg-blue-900 text-white py-3 rounded-sm flex items-center justify-center"
          >
            바로구매
            <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

// 장바구니에 상품을 추가하는 함수
const handleAddToCart = async ({ product, quantity, size, color }) => {
  // 새로 추가할 상품 정보 객체 생성
  const newItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    color: color,
    size: size,
    slug: product.slug,
  };

  // localStorage를 사용하여 장바구니 업데이트
  try {
    // localStorage에서 기존 장바구니 아이템 가져오기
    const cartItemsJson = LocalStorage.getItem("cartItems");
    let cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];

    // 동일한 상품(id, 색상, 사이즈가 모두 일치)이 이미 장바구니에 있는지 확인
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === newItem.id &&
        item.color === newItem.color &&
        item.size === newItem.size
    );

    // 동일한 상품이 있으면 수량만 증가, 없으면 새 상품 추가
    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      const newItemWithId = {
        ...newItem,
        itemId: `${newItem.id}_${newItem.color}_${newItem.size}_${Date.now()}`,
      };
      cartItems.push(newItemWithId);
    }

    // 업데이트된 장바구니 정보를 localStorage에 저장
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("상품이 성공적으로 장바구니에 담겼습니다!");
  } catch (error) {
    console.error("장바구니 업데이트 오류:", error);
  }

  // 상품 추가 완료 모달 열기
  const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};
