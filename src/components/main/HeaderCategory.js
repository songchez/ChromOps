import React from "react";

export default function HeaderCategory() {
  return (
    <div className="sticky top-0 flex justify-center bg-black p-4 z-50">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/shop" className="hover:text-yellow-500">
              OUTER
            </a>
          </li>
          <li>
            <a href="/shop" className="hover:text-yellow-500">
              PANTS
            </a>
          </li>
          <li>
            <a href="/shop" className="hover:text-yellow-500">
              SHOES
            </a>
          </li>
          <li>
            <a href="/shop" className="hover:text-yellow-500">
              ACC
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
