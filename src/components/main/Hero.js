import Image from "next/image";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Tactical operations"
          fill={true}
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <HeroText />
      </div>
    </section>
  );
}
