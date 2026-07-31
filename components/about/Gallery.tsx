"use client";

import { motion } from "framer-motion";

export function Gallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Inside Hibir Specialty Dental Clinic</h2>
          <p className="mt-3 text-slate-600 text-sm">
            Explore our thoughtfully designed clinic, modern treatment rooms, and welcoming environment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="h-48 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 text-xs text-slate-400"
            >
              [ Clinic Photo {item} ]
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}