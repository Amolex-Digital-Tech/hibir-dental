"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-sky-100/60">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/80 rounded-full"
        >
          Smile Gallery & Clinic Tour
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          Real Results & <span className="text-sky-600">Modern Facilities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          Take a look inside our state-of-the-art clinic and explore our patient transformations, advanced technology, and welcoming healthcare environment.
        </motion.p>
      </div>
    </section>
  );
}