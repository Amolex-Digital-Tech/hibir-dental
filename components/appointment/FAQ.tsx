"use client";

import { APPOINTMENT_FAQS } from "@/lib/data/appointment";

export function FAQ() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Appointment FAQs</h2>
        </div>

        <div className="space-y-4">
          {APPOINTMENT_FAQS.map((faq) => (
            <div key={faq.q} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}