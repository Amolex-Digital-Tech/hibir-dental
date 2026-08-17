"use client";

import { motion } from "framer-motion";
import { Cpu, UserCheck, Heart, Sparkles, ShieldCheck, Clock } from "lucide-react";

export function WhyChooseUs() {
  const cards = [
    { title: "Modern Technology", icon: Cpu, desc: "Digital low-radiation digital radiography." },
    { title: "Experienced Specialists", icon: UserCheck, desc: "A team of qualified specialists covering every dental discipline." },
    { title: "Patient Comfort", icon: Heart, desc: "A calm, hospitable clinic environment designed to eliminate dental anxiety." },
    { title: "Personalized Care", icon: Sparkles, desc: "Individual treatment programs tailored specifically to your goals." },
    { title: "Safe Sterilization", icon: ShieldCheck, desc: "Strict adherence to international hygiene and sterilization protocols." },
    { title: "Flexible Scheduling", icon: Clock, desc: "Convenient morning and afternoon clinic hours six days a week." },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">Why Choose Us</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why Patients Trust Hibir</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{c.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}