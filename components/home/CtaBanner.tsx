"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Calendar, Phone } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-sky-600 to-sky-800 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 text-center lg:text-left">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready for a Healthier, Brighter Smile?
            </h2>
            <p className="text-sky-100 text-base md:text-lg">
              Schedule your appointment online today or call us directly to talk to our specialist care advisors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              href="/appointment"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-sky-700 font-bold px-8 py-4 rounded-full shadow-lg transition-all text-base"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>
            <a
              href="tel:+251900000000"
              className="flex items-center justify-center gap-2 bg-sky-700/60 hover:bg-sky-700 border border-sky-400/40 text-white font-semibold px-8 py-4 rounded-full transition-all text-base"
            >
              <Phone className="w-5 h-5" />
              <span>+251 973 777 783</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}