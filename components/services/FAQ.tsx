"use client";

import { motion } from "framer-motion";

const faqs = [
  { q: "Does dental treatment hurt?", a: "Most procedures are rendered comfortable and pain-free through local anesthetics and advanced micro-invasive techniques." },
  { q: "Do you offer emergency dental care?", a: "Yes, we prioritize same-day emergency appointments for acute tooth pain, trauma, or broken restorations." },
  { q: "How long does teeth whitening take?", a: "In-office treatments typically take around 60 minutes and deliver noticeable brightness right away." },
  { q: "Can children receive treatment at Hibir Dental?", a: "Yes, we offer specialized pediatric dental services designed to create positive experiences for children." },
  { q: "Do you accept walk-in patients?", a: "Walk-ins are welcome depending on availability, though booking an appointment in advance guarantees prompt care." },
];

export function FAQ() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-3 text-slate-600">Find quick answers regarding our dental procedures and appointments.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm"
            >
              <h3 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}