"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STEPS = [
  { step: "01", title: "Warm Arrival" },
  { step: "02", title: "In-Depth Consultation" },
  { step: "03", title: "Precision Diagnosis" },
  { step: "04", title: "Gentle Treatment" },
  { step: "05", title: "Confident Smile" },
];

export function PatientExperience() {
  return (
    <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-semibold uppercase text-xs tracking-widest block mb-2" style={{ color: "#ff9900" }}>
            Patient Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Patient Experience</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-black" style={{ color: "#ff9900" }}>{s.step}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-white">{s.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}