"use client";

import { motion } from "framer-motion";

export function BeforeAfter() {
  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Before & After Smiles</h2>
          <p className="mt-3 text-slate-600 text-sm">
            Slide to explore patient transformations achieved through custom cosmetic and restorative care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {["Porcelain Veneers Makeover", "Full Arch Dental Implants"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
              <div className="h-64 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400">
                [ Interactive Before / After Slider Container ]
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}