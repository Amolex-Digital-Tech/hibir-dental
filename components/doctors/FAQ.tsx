"use client";

import { motion } from "framer-motion";

const faqs = [
  { q: "Can I choose my doctor?", a: "Yes, you can request a specific specialist when booking online or through our reception team." },
  { q: "Do specialists treat children?", a: "Yes, we have pediatric dental specialists trained specifically to manage children's oral health with extra care." },
  { q: "How do I schedule with a specific doctor?", a: "Simply click 'Book Appointment' on your preferred doctor's profile card." },
  { q: "What languages do your doctors speak?", a: "Our doctors are fluent in English and Amharic." },
];

export function FAQ() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
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