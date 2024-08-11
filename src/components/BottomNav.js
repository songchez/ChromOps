import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-lg flex justify-around text-gray-700">
      <Link href="/" className="flex flex-col items-center">
        <FaHome className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link href="/shop" className="flex flex-col items-center">
        <FaShoppingBag className="h-6 w-6" />
        <span className="text-xs mt-1">Shop</span>
      </Link>
      <Link href="/blog" className="flex flex-col items-center">
        <FaFeatherAlt className="h-6 w-6" />
        <span className="text-xs mt-1">Blog</span>
      </Link>
      <Link href="/community" className="flex flex-col items-center">
        <FaCommentAlt className="h-6 w-6" />
        <span className="text-xs mt-1">Community</span>
      </Link>
    </nav>
  );
}
