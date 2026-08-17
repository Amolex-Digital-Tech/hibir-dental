import { Hero } from "@/components/doctors/Hero";
import { Introduction } from "@/components/doctors/Introduction";
import { DoctorsGrid } from "@/components/doctors/DoctorsGrid";
import { DoctorSpotlight } from "@/components/doctors/DoctorSpotlight";
import { Expertise } from "@/components/doctors/Expertise";
import { WhyChooseTeam } from "@/components/doctors/WhyChooseTeam";
import { PatientCare } from "@/components/doctors/PatientCare";
import { FAQ } from "@/components/doctors/FAQ";
import { Cta } from "@/components/doctors/Cta";

export default function DoctorsPage() {
  return (
    <main className="bg-slate-50 text-slate-800 antialiased overflow-hidden">
      <Hero />
      <Introduction />
      <DoctorsGrid />
      <DoctorSpotlight />
      <Expertise />
      <WhyChooseTeam />
      <PatientCare />
      <FAQ />
      <Cta />
    </main>
  );
}