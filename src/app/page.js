import BrandStory from "@/components/main/BrandStory";
import Features from "@/components/main/Features";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <div className="container mx-auto p-4 mb-40">
      <Header />
      <Hero />
      <Features />
      <BrandStory />
      <Footer />
    </div>
  );
}
