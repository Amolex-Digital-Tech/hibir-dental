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
          Dental Insights & Articles
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          Expert Dental Advice <span className="text-sky-600">& Health Tips</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          Explore expert guidance, maintenance tips, and practical guides written by our specialists to help you keep your teeth healthy, bright, and strong.
        </motion.p>
      </div>
    </section>
  );
}