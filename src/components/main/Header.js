import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            width={140}
            height={100}
            src={"/images/Logo.png"}
            alt="logo"
          ></Image>
        </Link>
        <div className="lg:hidden dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content text-black bg-base-100 z-[1] mt-4 w-52 p-2 shadow"
          >
            <li>
              <a href="/" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-yellow-500">
                Collections
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-yellow-500">
                Blog
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:text-yellow-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* 데스크탑용 네비게이션 */}
        <nav className="hidden lg:flex">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-yellow-500">
                Collections
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-yellow-500">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-500">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
