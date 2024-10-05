import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaX } from "react-icons/fa6";

interface CartItemProps {
  item: any;
  updateQuantity: (newQuantity: number) => void;
  removeItem: () => void;
}

export default function CartItem({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps) {
  return (
    <div className="flex items-center border-b py-4">
      <Link href={`/shop/${item.id}`}>
        {item.mainImage && (
          <Image
            src={item.mainImage}
            alt={item.name}
            width={100}
            height={100}
            className="mr-4"
          />
        )}
      </Link>
      <div className="flex-grow">
        <h2 className="font-semibold">{item.name}</h2>
        <p className="text-gray-600">
          {item.color} · {item.size}
        </p>
        <p className="font-semibold">{item.price.toLocaleString("ko-KR")} 원</p>
      </div>
      <div className="flex flex-col items-end gap-7">
        <button className="text-gray-500 m-4" onClick={removeItem}>
          <FaX size={11} />
        </button>
        <div className="flex gap-3 rounded-sm p-1 items-center border mx-4">
          <button
            className="p-1"
            onClick={() => updateQuantity(Math.max(1, item.quantity - 1))}
          >
            <FaMinus size={14} />
          </button>
          <span className="text-sm px-2">{item.quantity}</span>
          <button
            className="p-1"
            onClick={() => updateQuantity(Math.min(10, item.quantity + 1))}
          >
            <FaPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
