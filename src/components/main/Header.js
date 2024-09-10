import React from "react";

export default function Header() {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">ChromOps</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Collections
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
