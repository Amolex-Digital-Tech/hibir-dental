"use client";

import { motion } from "framer-motion";
import { Cpu, ScanFace, ShieldCheck, Armchair } from "lucide-react";

const EQUIPMENT = [
  { title: "Digital 3D X-Ray", category: "Diagnostics", icon: ScanFace },
  { title: "Intraoral 3D Scanner", category: "Precision", icon: Cpu },
  { title: "Hospital Sterilization", category: "Safety", icon: ShieldCheck },
  { title: "Ergonomic Chairs", category: "Comfort", icon: Armchair },
];

export function Equipment() {
  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Cutting-Edge Infrastructure
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Technology & Equipment</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EQUIPMENT.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500 transition-all shadow-sm"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(255, 153, 0, 0.12)", color: "#d97706", border: "1px solid rgba(255, 153, 0, 0.3)" }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{item.category}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}