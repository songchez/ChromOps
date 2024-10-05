import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export default async function Collection() {
  const products = await getProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-8 text-center">
            <p className="text-xl font-bold text-left">BEST ITEMS</p>
            가장 사랑받는 아이템
          </h2>
          <Link className="text-right text-zinc-300" href="/shop">
            더 알아보기
          </Link>
        </div>
        <div className="grid grid-cols-2 p-4 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-8">
          {products.map((product) => (
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
                />
                <div className="p-4">
                  <h3 className="text-md font-bold mb-2">{product.name}</h3>
                  <p className="text-xs mb-4">{product.description}</p>
                  <p className="text-sm">
                    {product.price.toLocaleString("ko-KR")}원
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
