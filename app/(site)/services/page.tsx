import { Hero } from "@/components/services/Hero";
import { FeaturedServices } from "@/components/services/FeaturedServices";
import { WhyChooseUs } from "@/components/services/WhyChooseUs";
import { TreatmentProcess } from "@/components/services/TreatmentProcess";
import { Technology } from "@/components/services/Technology";
import { FAQ } from "@/components/services/FAQ";
import { Cta } from "@/components/services/Cta";

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 text-slate-800 antialiased overflow-hidden">
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <TreatmentProcess />
      <Technology />
      <FAQ />
      <Cta />
    </main>
  );
}