"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMinus, FaPlus, FaX } from "react-icons/fa6";
import Link from "next/link";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    discount: 0,
    shoppingEstimate: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    // Local Storage에서 장바구니 정보 로드
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const calculateOrderSummary = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const shipping = 0;
    const orderTotal = total - orderSummary.discount + shipping;

    setOrderSummary({
      subtotal: total,
      discount: 0,
      shoppingEstimate: shipping,
      orderTotal: orderTotal,
    });
  };

  useEffect(() => {
    calculateOrderSummary();
  }, [cartItems]);

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedCart);
    // localstorage update
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    // state상에서 제거
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    // localstorage update
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <div className="mx-auto max-w-5xl p-4 bg-slate-50 text-black">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center border-b py-4">
              <Link href={`/shop/${item.slug}`}>
                <Image
                  src={`/products/${item.id}/thumbnail_1.jpg`}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mr-4"
                />
              </Link>
              <div className="flex-grow">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {item.color} · {item.size}
                </p>
                <p className="font-semibold">
                  {item.price.toLocaleString("ko-KR")} 원
                </p>
              </div>
              <div className="flex flex-col items-end gap-7">
                <button
                  className="text-gray-500 m-4"
                  onClick={() => removeItem(index)}
                >
                  <FaX size={11} />
                </button>
                <div className="flex gap-3 rounded-sm p-1 items-center border mx-4">
                  <button
                    className="p-1"
                    onClick={() =>
                      updateQuantity(
                        index,
                        item.quantity - 1 < 1 ? 1 : item.quantity - 1
                      )
                    }
                  >
                    <FaMinus size={14} />
                  </button>

                  <span className="text-sm px-2">{item.quantity}</span>

                  <button
                    className="p-1"
                    onClick={() =>
                      updateQuantity(
                        index,
                        item.quantity + 1 > 10 ? 10 : item.quantity + 1
                      )
                    }
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">주문예상금액</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>총 상품 가격</span>
                <span>{orderSummary.subtotal.toLocaleString("ko-KR")}원</span>
              </div>
              <div className="flex justify-between items-center">
                <span>총 할인</span>
                <div className="flex items-center">
                  <span>
                    -{orderSummary.discount.toLocaleString("ko-KR")}원
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>총 배송비</span>
                <div className="flex items-center">
                  <span>
                    {orderSummary.shoppingEstimate.toLocaleString("ko-KR")}원
                  </span>
                </div>
              </div>
              <div className="flex justify-end font-semibold text-lg pt-2">
                <span>{orderSummary.orderTotal.toLocaleString("ko-KR")}원</span>
              </div>
            </div>
            <button className="w-full bg-blue-800 text-white py-2 rounded mt-4 hover:bg-indigo-500 transition duration-200">
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
