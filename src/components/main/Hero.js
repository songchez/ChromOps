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
        />
      </div>
      <HeroText />
    </section>
  );
}
