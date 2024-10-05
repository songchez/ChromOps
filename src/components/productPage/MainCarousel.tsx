"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function MainCarousel({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.mainImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.mainImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel max-w-xl overflow-hidden">
        <Image
          src={product.mainImages[currentIndex]}
          alt={`${product.name} 썸네일 ${currentIndex + 1}`}
          width={800}
          height={600}
          className="w-full h-96 object-cover"
        />
      </div>

      {isHovered && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center justify-start pl-4">
            <button
              onClick={handlePrevClick}
              className="carousel-control-prev bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center justify-end pr-4">
            <button
              onClick={handleNextClick}
              className="carousel-control-next bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
