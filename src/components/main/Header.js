import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartShopping, FaMagnifyingGlass, FaUser } from "react-icons/fa6";
import NavUser from "./sessionNav/navUser";

export default function Header() {
  return (
    <header className="bg-black py-4 overflow-hidden">
      <div className="container mx-auto md:flex-row flex flex-col gap-2 justify-between items-center ">
        <Link href="/">
          <Image
            width={140}
            height={100}
            src={"/images/Logo.png"}
            alt="logo"
          ></Image>
        </Link>
        {/* 데스크탑용 네비게이션 */}
        <div className="flex items-center gap-14">
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
              <span>|</span>
              <li>
                <a href="/blog" className="hover:text-yellow-500">
                  BLOG
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500">
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
          <nav className="hidden lg:flex">
            <ul className="flex space-x-4">
              <li>
                <a href="/cart" className="hover:text-yellow-500 text-xl">
                  <FaCartShopping />
                </a>
              </li>
              <NavUser />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
