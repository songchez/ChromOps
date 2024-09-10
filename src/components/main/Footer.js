import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">ChromOps</h3>
          <p>Copyright © 2023 ChromOps</p>
        </div>
        <div className="flex space-x-4 text-2xl">
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
