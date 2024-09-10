import ProductGrid from "@/components/shop/ProductGrid";
import products from "@/data/products.json";

export default function ShopPage() {
  return (
    <div className="p-6">
      <ProductGrid products={products} />
    </div>
  );
}
