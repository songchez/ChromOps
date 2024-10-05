export {};

declare global {
  type Category = "outer" | "pants" | "shoes" | "acc";
  interface Window {
    daum: any;
  }
  interface CartItem {
    itemId: string;
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    mainImage: string;
  }
}
