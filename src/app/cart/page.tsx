"use client";

import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useRouter } from "next/navigation";
import { LocalStorage } from "@/lib/localStorage";
import { getCartProducts } from "@/services/cartService";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCartItems() {
      const products = await getCartProducts();
      setCartItems(products);
    }
    loadCartItems();
  }, []);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    const cartItemsJson = LocalStorage.getItem("cartItems");
    let updatedCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];

    updatedCartItems = updatedCartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    LocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    router.refresh();
  };

  const handleRemoveItem = (id: string) => {
    const cartItemsJson = LocalStorage.getItem("cartItems");
    let updatedCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    updatedCartItems = updatedCartItems.filter((item) => item.id !== id);
    LocalStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    setCartItems(cartItems.filter((item) => item.id !== id));
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
      <Suspense fallback={<div>Loading...</div>}>
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">
              장바구니가 비었습니다. 상품을 담아주세요 👍
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={(newQuantity) =>
                    handleUpdateQuantity(item.id, newQuantity)
                  }
                  removeItem={() => handleRemoveItem(item.id)}
                />
              ))}
            </div>
            <OrderSummary orderSummary={orderSummary} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
