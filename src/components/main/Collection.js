import Image from "next/image";
import products from "../../data/products.json";
import Link from "next/link";

export default function Collection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-8 text-center">Best items</h2>
          <Link className="text-right text-zinc-300" href="/shop">
            더 알아보기
          </Link>
        </div>
        <div className="grid grid-cols-2 p-4 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-8">
          {products.map(
            (product, index) =>
              index < 4 && (
                <div
                  key={product.id}
                  className="bg-white text-black rounded-sm overflow-hidden"
                >
                  <Link href={`/shop/${product.slug}`}>
                    <Image
                      src={`/products/${product.id}/thumbnail_1.jpg`}
                      alt={product.name}
                      width={300}
                      height={250}
                      layout="responsive"
                    />
                    <div className="p-4">
                      <h3 className="text-md font-bold mb-2">{product.name}</h3>
                      <p className="text-xs mb-4">{product.description}</p>
                      <p className="text-sm">₩{product.price}</p>
                    </div>
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
