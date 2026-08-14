"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";

export function ArticleCta() {
  return (
    <section className="mt-16">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 md:px-10 md:py-12">
        {/* Decorative background */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-300">
              <CalendarCheck className="h-3.5 w-3.5" />
              Personalized Dental Care
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Ready to Take the Next Step Toward a Healthier Smile?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Every patient is different. If you are considering dental
              implants or have questions about replacing a missing tooth,
              our dental team can assess your oral health and discuss the
              treatment options that may be appropriate for you.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row md:flex-col">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-500 hover:shadow-xl"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Hibir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}