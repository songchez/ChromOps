import ProductGrid from "@/components/shop/ProductGrid";
import products from "@/data/product.json";

export default function ShopPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl text-primary-content font-bold mb-6 bg-secondary/40">
        YEZZ
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
