"use client";

import { motion } from "framer-motion";

export function Introduction() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sky-600 font-semibold uppercase text-xs tracking-wider">Compassionate Excellence</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Dedicated to Your Smile</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Every member of our dental team is committed to delivering personalized, evidence-based care while ensuring every patient feels comfortable, informed, and confident throughout their treatment journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}