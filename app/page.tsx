import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { SmileGallery } from "@/components/home/SmileGallery";
import { DoctorsSpotlight } from "@/components/home/DoctorsSpotlight";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ServicesOverview />
      <SmileGallery />
      <DoctorsSpotlight />
      <Testimonials />
      <CtaBanner />
    </>
  );
}