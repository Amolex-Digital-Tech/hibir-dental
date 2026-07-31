"use client";

import { motion } from "framer-motion";
import { WHAT_TO_EXPECT_STEPS } from "@/lib/data/appointment";

export function AppointmentBenefits() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">Patient Experience</span>
          <h2 className="text-3xl font-extrabold text-slate-900">What to Expect During Your Visit</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_TO_EXPECT_STEPS.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden"
            >
              <span className="text-3xl font-black text-amber-500/20 absolute top-4 right-4">{item.step}</span>
              <h3 className="text-base font-bold text-slate-900 mb-2 relative z-10">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}