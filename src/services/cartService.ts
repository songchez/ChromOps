import { LocalStorage } from "@/lib/localStorage";
import prisma from "@/lib/prisma";

export async function getCartProducts() {
  const cartItemsJson = LocalStorage.getItem("cartItems");
  if (!cartItemsJson) {
    return [];
  }

  const cartItems = JSON.parse(cartItemsJson);

  const products = await Promise.all(
    cartItems.map(async (item: { id: string }) => {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
        select: {
          id: true,
          name: true,
          price: true,
          mainImages: true,
          slug: true,
        },
      });
      return product;
    })
  );

  return cartItems.map(
    (item: { id: string; quantity: number }, index: number) => {
      const product = products[index];
      return {
        ...item,
        ...product,
        mainImage: product?.mainImages[0] || null,
      };
    }
  );
}
