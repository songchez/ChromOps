import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white p-4 shadow-lg rounded-lg flex justify-between items-center">
      <div className="text-2xl font-bold">RetroCommerce</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
