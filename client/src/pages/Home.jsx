import { Footer } from "@/components/Footer";
import { AgentsSection } from "@/components/home/AgentsSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FeaturedProperty } from "@/components/home/FeaturedProperty";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ImageGridSection } from "@/components/home/ImageGridSection";
import { Navbar } from "@/components/Navbar";
import React from "react";

function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedProperty />
        <AgentsSection />
        <ImageGridSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
