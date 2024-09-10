import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpg"
          alt="Tactical operations"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          역경을 뒤집고 승리를 쟁취하라
        </h1>
        <p className="text-xl mb-8">
          패션은 단순한 옷이 아니라, 승리의 전략입니다.
        </p>
        <button className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition duration-300">
          둘러보기
        </button>
      </div>
    </section>
  );
}
