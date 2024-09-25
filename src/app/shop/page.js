import Image from "next/image";
import products from "@/data/products.json";
import Link from "next/link";
export default function ShopPage() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-8 p-12 bg-white">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-sm overflow-hidden hover:opacity-90"
        >
          <Link href={`/shop/${product.slug}`}>
            <Image
              src={`/products/${product.id}/thumbnail_1.jpg`}
              alt={product.name}
              width={300}
              height={250}
            />
            <div className="p-1 bg-white text-primary-content md:p-4">
              <h3 className="text-sm md:text-md font-light mb-2">
                {product.name}
              </h3>
              <p className="text-sm">
                {product.price.toLocaleString("ko-KR")}원
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
