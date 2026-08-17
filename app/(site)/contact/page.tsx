import { Hero } from "@/components/contact/Hero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ClinicInfo } from "@/components/contact/ClinicInfo";
import { Map } from "@/components/contact/Map";
import { WorkingHours } from "@/components/contact/WorkingHours";
import { FAQ } from "@/components/contact/FAQ";
import { EmergencyBanner } from "@/components/contact/EmergencyBanner";
import { Cta } from "@/components/contact/Cta";

export default function ContactPage() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <Hero />
      <ContactCards />
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <div className="lg:col-span-5 space-y-8">
          <ClinicInfo />
        </div>
      </div>
      <Map />
      <WorkingHours />
      <FAQ />
      <EmergencyBanner />
      <Cta />
    </main>
  );
}