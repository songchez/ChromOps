import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import NavUser from "./sessionNav/navUser";

export default function Header() {
  return (
    <header className="py-4">
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
                <Link href="/shop" className="hover:text-yellow-500">
                  OUTER
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-yellow-500">
                  PANTS
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-yellow-500">
                  SHOES
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-yellow-500">
                  ACC
                </Link>
              </li>
              <span>|</span>
              <li>
                <Link href="/blog" className="hover:text-yellow-500">
                  BLOG
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-500">
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="hidden lg:flex">
            <ul className="flex space-x-3">
              <li className="flex items-center">
                <Link href="/cart" className="hover:text-yellow-500 text-xl">
                  <FaCartShopping />
                </Link>
              </li>
              <NavUser />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
