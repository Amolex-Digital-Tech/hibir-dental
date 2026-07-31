"use client";

import { motion } from "framer-motion";

export function ClinicIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Excellence Begins with <span className="text-sky-600">Compassion</span>
          </h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Hibir Specialty Dental Clinic was founded with a clear vision: to redefine the dental care experience by combining clinical excellence with genuine compassion.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our clinic provides comprehensive dental services in a modern, welcoming environment where every patient is treated with professionalism, respect, and personalized attention. From preventive dentistry to advanced cosmetic and restorative procedures, our team is committed to helping patients achieve healthy, confident smiles using evidence-based treatments and state-of-the-art technology.
          </p>
          <p className="mt-4 text-slate-600 font-medium">
            Every visit is designed to be comfortable, transparent, and focused on long-term oral health.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-2xl bg-sky-100 overflow-hidden shadow-xl border border-sky-50 flex items-center justify-center text-sky-400"
        >
          {/* Replace with clinic image */}
          <span className="text-sm font-medium">[ Clinic Interior Photo Placeholder ]</span>
        </motion.div>
      </div>
    </section>
  );
}