"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaShoppingBag,
  FaFeatherAlt,
  FaCommentAlt,
} from "react-icons/fa";

function NavItem({ href, icon: Icon, label, selected, setSelected }) {
  return (
    <Link href={href}>
      <div
        className={`flex flex-col items-center ${
          selected === label ? "text-blue-500" : ""
        }`}
        onClick={() => setSelected(label)}
      >
        <Icon className="h-7 w-7" />
      </div>
    </Link>
  );
}

export default function BottomNav() {
  const [selected, setSelected] = useState("");

  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-lg flex justify-around text-gray-700">
      <NavItem
        href="/"
        icon={FaHome}
        label="home"
        selected={selected}
        setSelected={setSelected}
      />
      <NavItem
        href="/shop"
        icon={FaShoppingBag}
        label="shop"
        selected={selected}
        setSelected={setSelected}
      />
      <NavItem
        href="/blog"
        icon={FaFeatherAlt}
        label="blog"
        selected={selected}
        setSelected={setSelected}
      />
      <NavItem
        href="/community"
        icon={FaCommentAlt}
        label="community"
        selected={selected}
        setSelected={setSelected}
      />
    </nav>
  );
}
