import { Hero } from "@/components/about/Hero";
import { ClinicIntro } from "@/components/about/ClinicIntro";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { OurStory } from "@/components/about/OurStory";
import { MissionVision } from "@/components/about/MissionVision";
import { PatientJourney } from "@/components/about/PatientJourney";
import { Achievements } from "@/components/about/Achievements";
import { DoctorsPreview } from "@/components/about/DoctorsPreview";
import { Gallery } from "@/components/about/Gallery";
import { Certifications } from "@/components/about/Certifications";
import { Cta } from "@/components/about/Cta";

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-800 antialiased overflow-hidden">
      <Hero />
      <ClinicIntro />
      <WhyChooseUs />
      <OurStory />
      <MissionVision />
      <PatientJourney />
      
      <Achievements />
      <DoctorsPreview />
      <Gallery />
      <Certifications />
      <Cta />
    </main>
  );
}