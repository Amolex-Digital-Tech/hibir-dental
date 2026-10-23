import { Hero } from "@/components/blog/Hero";



import { OralHealthTips } from "@/components/blog/OralHealthTips";
import { Newsletter } from "@/components/blog/Newsletter";
import { Cta } from "@/components/blog/Cta";

export const metadata = {
  title: "Dental Health Blog | Hibir Specialty Dental Clinic",
  description:
    "Expert dental health advice, oral hygiene tips, preventive care guides, children's dentistry, orthodontics, dental implants, and emergency dental information from Hibir Specialty Dental Clinic in Ethiopia.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Hero />

      

      

      

      

      <OralHealthTips />

      <Newsletter />

      <Cta />
    </main>
  );
}