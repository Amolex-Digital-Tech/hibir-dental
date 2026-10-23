import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ServicesOverview } from "@/components/home/ServicesOverview";

import { DoctorsSpotlight } from "@/components/home/DoctorsSpotlight";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ServicesOverview />
      <DoctorsSpotlight />
      <CtaBanner />
    </>
  );
}