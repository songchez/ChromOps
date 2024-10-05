import { LocalStorage } from "@/lib/localStorage";

export async function getCartProducts() {
  const cartItemsJson = LocalStorage.getItem("cartItems");
  if (!cartItemsJson) {
    return [];
  }

  const cartItems = JSON.parse(cartItemsJson);
  const ids = cartItems.map((item: { id: string }) => item.id);

  const response = await fetch(`/api/cart?ids=${ids.join(",")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("장바구니 상품을 가져오는데 실패했습니다.");
  }

  const products = await response.json();

  return cartItems.map((item: { id: string; quantity: number }) => {
    const product = products.find((p: { id: string }) => p.id === item.id);
    return {
      ...item,
      ...product,
      mainImage: product?.mainImages[0] || null,
    };
  });
}
