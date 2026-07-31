"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Happy Patients", value: "500+" },
  { label: "Dental Services", value: "15+" },
  { label: "Patient Satisfaction", value: "98%" },
  { label: "Safety Standards", value: "100%" },
  { label: "Modern Equipment", value: "Latest" },
  { label: "Established", value: "2025" },
];

export function Achievements() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted by Our Community</h2>
          <p className="mt-3 text-slate-600">These numbers represent our dedication to delivering exceptional care every day.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 text-center rounded-2xl bg-sky-50/50 border border-sky-100"
            >
              <span className="text-3xl font-extrabold text-sky-600 block mb-1">{m.value}</span>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}