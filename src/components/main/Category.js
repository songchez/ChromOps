import Image from "next/image";

export default function Category() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: "Outer", src: "/images/operation-chromite.png" },
            { name: "Pants", src: "/products/00002/thumbnail_1.jpg" },
            { name: "Shoes", src: "/products/00001/thumbnail_1.jpg" },
            { name: "Bags", src: "/products/00002/thumbnail_1.jpg" },
            { name: "Accessories", src: "/products/00001/thumbnail_1.jpg" },
          ].map(({ name, src }) => (
            <div className="relative shadow-xl" key={name}>
              <Image
                className="cover w-full h-full opacity-70"
                src={src}
                alt={name}
                width={250}
                height={250}
              />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <div className="justify-left">Shop Now 〉 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
