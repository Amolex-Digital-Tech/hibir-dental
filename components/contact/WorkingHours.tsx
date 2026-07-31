"use client";

import { motion } from "framer-motion";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function WorkingHours() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">Availability</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Working Hours</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLINIC_CONTACT.workingHours.map((wh, i) => (
            <motion.div
              key={wh.days}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm"
            >
              <span className="text-xs font-bold text-slate-500 uppercase">{wh.days}</span>
              <span className={`text-sm font-extrabold mt-2 ${wh.hours === "Closed" ? "text-rose-500" : "text-slate-900"}`}>
                {wh.hours}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}