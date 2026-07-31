"use client";

import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[160px] pointer-events-none rounded-full opacity-20"
        style={{ backgroundColor: "#ff9900" }}
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Ready to Experience Hibir Dental?
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          See the difference modern dentistry can make. Book your consultation and let our specialists help you achieve a healthier, more confident smile.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/appointment"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
            style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
          >
            Book Appointment
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}