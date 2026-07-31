"use client";

import { motion } from "framer-motion";

const TOUR_ROOMS = [
  "Reception & Waiting Area",
  "Consultation Suites",
  "Treatment Rooms",
  "Sterilization Suite",
  "Digital X-Ray Suite",
];

export function ClinicTour() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Virtual Walkthrough
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Clinic Tour</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOUR_ROOMS.map((room, i) => (
            <motion.div
              key={room}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition-colors shadow-sm"
            >
              <div className="h-44 rounded-xl bg-slate-100 mb-4 flex items-center justify-center text-xs text-slate-400">
                [ Photo: {room} ]
              </div>
              <h3 className="text-base font-bold text-slate-900">{room}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}