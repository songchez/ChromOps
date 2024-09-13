"use client";

import React from "react";
import { FaCartShopping } from "react-icons/fa6";

export default function AddToCart({ product }) {
  return (
    <button
      onClick={handleAddToCart({
        product: product,
        quantity: 5,
        size: product.sizes[0],
        color: product.colors[0],
      })}
      className="btn w-full text-black py-3 rounded-sm flex items-center justify-center"
    >
      <FaCartShopping className="mr-2" />
      장바구니담기
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            장바구니에 상품이 추가되었습니다!
          </h3>
          <p className="py-4">ESC 또는 닫기를 누르세요</p>
          <form method="dialog" className="modal-backdrop">
            <button className="btn">닫기</button>
          </form>
        </div>
      </dialog>
    </button>
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
