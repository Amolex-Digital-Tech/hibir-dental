"use client";

import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          Let's Start Your Smile Journey
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Whether you're visiting for a routine check-up, cosmetic dentistry, orthodontics, or emergency treatment, our team is ready to welcome you.
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
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}