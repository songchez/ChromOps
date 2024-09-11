import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export default function Carousel({ product }) {
  return (
    <div>
      <div className="carousel max-w-xl">
        {[1, 2, 3, 4, 5].map((index) => {
          const imagePath = `/products/${product.id}/thumbnail_${index}.jpg`;
          const imageExists = fs.existsSync(
            path.join(process.cwd(), `public${imagePath}`)
          );

          if (imageExists) {
            return (
              <div
                id={`slide${index}`}
                key={index}
                className="carousel-item relative w-full"
              >
                <Image
                  src={imagePath}
                  alt={`${product.name} thumbnail ${index}`}
                  width={470}
                  height={500}
                  className="object-cover"
                />
                <div className="flex absolute text-3xl text-slate-300 left-5 right-5 top-1/2 -translate-y-1/2 transform justify-between">
                  <a
                    href={
                      index === 1
                        ? `#slide${
                            [2, 3, 4, 5].includes(index + 4) ? index + 4 : 1
                          }`
                        : `#slide${index - 1}`
                    }
                  >
                    ❮
                  </a>
                  <a
                    href={
                      index === 5
                        ? `#slide${
                            [1, 2, 3, 4].includes(index - 3) ? index - 3 : 5
                          }`
                        : `#slide${index + 1}`
                    }
                  >
                    ❯
                  </a>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
