import Image from "next/image";
import Link from "next/link";

export default function Category() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Outer", src: "/images/category/outer.jpg" },
            { name: "Pants", src: "/images/category/pants.jpg" },
            { name: "Shoes", src: "/images/category/shoes.jpg" },
            { name: "Accessories", src: "/images/category/acc.jpg" },
          ].map(({ name, src }) => (
            <div key={name}>
              <Link className="relative shadow-xl" href={"/shop"}>
                <Image
                  className="cover w-full h-full opacity-70"
                  src={src}
                  alt={name}
                  width={850}
                  height={250}
                />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h2 className="text-xl font-bold">{name}</h2>
                  <div className="justify-left">Shop Now 〉 </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
