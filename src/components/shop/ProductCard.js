import React from "react";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
}
