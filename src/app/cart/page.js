"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaInfo, FaX } from "react-icons/fa6";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shippingEstimate: 5.0,
    taxEstimate: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    // Local Storage에서 장바구니 정보 로드
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // 장바구니 정보가 변경될 때마다 Local Storage 업데이트 및 주문 요약 계산
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    calculateOrderSummary();
  }, [cartItems]);

  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const taxEstimate = subtotal * 0.08; // 8% 세금 가정
    setOrderSummary({
      subtotal,
      shippingEstimate: 5.0,
      taxEstimate,
      orderTotal: subtotal + 5.0 + taxEstimate,
    });
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center border-b py-4">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="mr-4"
              />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {item.color} · {item.size}
                </p>
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                {item.inStock ? (
                  <p className="text-green-500 text-sm">In stock</p>
                ) : (
                  <p className="text-gray-500 text-sm">Ships in 3-4 weeks</p>
                )}
              </div>
              <div className="flex items-center">
                <select
                  className="border rounded p-1 mr-2"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="text-gray-500"
                  onClick={() => removeItem(index)}
                >
                  <FaX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping estimate</span>
                <div className="flex items-center">
                  <span>${orderSummary.shippingEstimate.toFixed(2)}</span>
                  <faInfo size={16} className="ml-1 text-gray-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax estimate</span>
                <div className="flex items-center">
                  <span>${orderSummary.taxEstimate.toFixed(2)}</span>
                  <FaInfo size={16} className="ml-1 text-gray-500" />
                </div>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Order total</span>
                <span>${orderSummary.orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded mt-4 hover:bg-indigo-700 transition duration-200">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
