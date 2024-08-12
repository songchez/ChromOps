import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

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
