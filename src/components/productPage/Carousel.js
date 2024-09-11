import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";

export default function Carousel({ product }) {
  return (
    <div>
      <div className="carousel">
        {[1, 2, 3, 4, 5].map((index) => {
          const imagePath = `/products/${product.id}/thumbnail_${index}.jpg`;
          const imageExists = fs.existsSync(
            path.join(process.cwd(), `public${imagePath}`)
          );

          if (imageExists) {
            return (
              <div
                id={`slide${index + 1}`}
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
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={
                      index < 1 ? `#slide${index + 4}` : `#slide${index - 1}`
                    }
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={
                      index > 3 ? `#slide${index - 3}` : `#slide${index + 1}`
                    }
                    className="btn btn-circle"
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
