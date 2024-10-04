import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Tactical operations"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="relative text-left -inset-x-40">
        <h1 className="text-5xl font-bold mb-4">
          역사를 뒤집고 승리를 쟁취하라
        </h1>
        <p className="text-xl mb-8">
          패션은 단순한 옷이 아니라, 승리의 전략입니다.
        </p>
        <Link
          href="/shop"
          className="bg-zinc-300 text-black px-8 py-3 rounded-sm font-bold hover:bg-yellow-600 transition duration-300"
        >
          둘러보기
        </Link>
      </div>
    </section>
  );
}
