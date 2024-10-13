import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">ChromOps</h3>
          <p className="text-zinc-300">Copyright © 2024 ChromOps</p>
          <p className="text-sm mt-1 text-zinc-300">
            사업자등록번호 513-28-01829 메이비존(주)
          </p>
        </div>

        <div className="flex space-x-4 text-2xl">
          <Link href="/personalInforPolicy" className="text-sm">
            개인정보처리방침
          </Link>
          <a href="#" className="hover:text-yellow-500">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-yellow-500">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}
