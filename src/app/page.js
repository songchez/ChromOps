import BrandStory from "@/components/main/BrandStory";
import Category from "@/components/main/Category";
import Collection from "@/components/main/Collection";

import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Collection />
      <Category />
      <BrandStory />
    </div>
  );
}
