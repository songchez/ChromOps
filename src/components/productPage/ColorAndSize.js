"use client";

import React, { useState } from "react";

export default function ColorAndSize({ colors, sizes }) {
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedSize, setSelectedSize] = useState("M");
  return (
    <div>
      <div>
        <h3 className="font-semibold mb-2">Color</h3>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full ${
                color === "" ? `bg-${color}-600` : "bg-gray-400"
              } ${selectedColor === color ? `ring-2 ring-${color}-500` : ""}`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 border rounded ${
                selectedSize === size
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
