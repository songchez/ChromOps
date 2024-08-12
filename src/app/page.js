import CTA from "@/components/main/CTA";
import Features from "@/components/main/Features";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <div className="container mx-auto p-4 mb-40">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
