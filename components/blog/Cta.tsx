"use client";

import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          Ready for a Healthier Smile?
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Reading about dental care is the first step. Let our specialists help you put that knowledge into practice with personalized treatment and preventive care.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/appointment"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
          >
            Book Appointment
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}