import { Hero } from "@/components/appointment/Hero";
import { BookingForm } from "@/components/appointment/BookingForm";
import { AppointmentBenefits } from "@/components/appointment/AppointmentBenefits";
import { WhyChooseUs } from "@/components/appointment/WhyChooseUs";
import { FAQ } from "@/components/appointment/FAQ";
import { ContactCard } from "@/components/appointment/ContactCard";
import { Cta } from "@/components/appointment/Cta";

export default function AppointmentPage() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <Hero />
      <div id="booking-form" className="py-12 px-6">
        <BookingForm />
      </div>
      <AppointmentBenefits />
      <WhyChooseUs />
      <FAQ />
      <ContactCard />
      <Cta />
    </main>
  );
}