export {};

declare global {
  type Category = "outer" | "pants" | "shoes" | "acc";
  interface Window {
    daum: any;
  }
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
}
