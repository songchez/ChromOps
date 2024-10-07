"use client";

import React, { useState, useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useRouter } from "next/navigation";
import { LocalStorage } from "@/lib/localStorage";

// 카트 아이템 가져오기
async function getCartProducts() {
  const cartItemsJson = LocalStorage.getItem("cartItems");
  const cartItems: CartItem[] = cartItemsJson ? JSON.parse(cartItemsJson) : [];
  const productIds = cartItems.map((item) => item.id).join(",");

  const response = await fetch(`/api/cart?ids=${productIds}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Cart의 썸네일을 가져오는데 실패했습니다.");
  }

  const products = await response.json();
  // cartitems에 imagurl추가하기
  return cartItems.map((cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);
    return {
      ...cartItem,
      mainImage: product?.mainImages?.[0] || "",
    };
  });
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadCartItems() {
      setLoading(true);
      const products = await getCartProducts();
      setCartItems(products);
      setLoading(false);
    }
    loadCartItems();
  }, []);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      );
      LocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });

    router.refresh();
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item.itemId !== itemId
      );
      LocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
    router.refresh();
  };

  const orderSummary = React.useMemo(() => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = 0;
    const discount = 0;
    const orderTotal = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shippingEstimate: shipping,
      orderTotal,
    };
  }, [cartItems]);

  return (
    <div className="mx-auto max-w-5xl p-4 bg-slate-50 text-black">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>

      {loading ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center border-b py-4">
                <div className="skeleton w-24 h-24 mr-4"></div>
                <div className="flex-grow">
                  <div className="skeleton h-4 w-3/4 mb-2"></div>
                  <div className="skeleton h-4 w-1/2 mb-2"></div>
                  <div className="skeleton h-4 w-1/4"></div>
                </div>
                <div className="flex flex-col items-end gap-7">
                  <div className="skeleton w-6 h-6 m-4"></div>
                  <div className="skeleton w-24 h-8 mx-4"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <div className="skeleton h-64 w-full"></div>
          </div>
        </div>
      ) : !cartItems.length ? (
        <div className="text-center py-8">
          <p className="text-lg">장바구니가 비었습니다. 상품을 담아주세요 👍</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            {cartItems.map((item) => (
              <CartItem
                key={item.itemId}
                item={item}
                updateQuantity={(newQuantity) =>
                  handleUpdateQuantity(item.itemId, newQuantity)
                }
                removeItem={() => handleRemoveItem(item.itemId)}
              />
            ))}
          </div>
          <OrderSummary orderSummary={orderSummary} />
        </div>
      )}
    </div>
  );
}
