import Image from "next/image";
import products from "../../data/products.json";

export default function Collection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          당신을 위한 전술적 선택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-sm overflow-hidden"
            >
              <Image
                src={`/products/${product.id}/thumbnail_1.jpg`}
                alt={product.name}
                width={300}
                height={250}
                layout="responsive"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="mb-4">{product.description}</p>
                <p> {product.price}₩</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
