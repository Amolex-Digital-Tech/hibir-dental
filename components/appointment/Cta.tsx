"use client";

import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
          Your Healthier Smile Starts Today
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Book your consultation today and let our specialists create a treatment plan tailored to your needs.
        </p>

        <a
          href="#booking-form"
          className="inline-block px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-lg"
          style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
        >
          Book Appointment Now
        </a>
      </div>
    </section>
  );
}