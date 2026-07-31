"use client";

import { motion } from "framer-motion";

export function TeamGallery() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Behind The Scenes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Our Team in Action</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {["Clinical Consultations", "Specialist Briefings", "Continuous Training"].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="h-64 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs text-slate-400 shadow-sm"
            >
              [ Photo: {title} ]
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}