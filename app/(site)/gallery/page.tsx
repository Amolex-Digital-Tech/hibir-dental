import { Hero } from "@/components/gallery/Hero";
import { Categories } from "@/components/gallery/Categories";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { ClinicTour } from "@/components/gallery/ClinicTour";
import { Equipment } from "@/components/gallery/Equipment";
import { TeamGallery } from "@/components/gallery/TeamGallery";
import { PatientExperience } from "@/components/gallery/PatientExperience";
import { SocialGallery } from "@/components/gallery/SocialGallery";
import { Cta } from "@/components/gallery/Cta";

export default function GalleryPage() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <Hero />
      <Categories />
      <GalleryGrid />
      <BeforeAfter />
      <ClinicTour />
      <Equipment />
      <TeamGallery />
      <PatientExperience />
      <SocialGallery />
      <Cta />
    </main>
  );
}