"use client";

import { motion } from "framer-motion";
import { Sparkles, Smile, ShieldAlert, RefreshCw, CalendarCheck } from "lucide-react";

const TIPS = [
  { icon: Sparkles, title: "Brush Twice Daily", desc: "Use a fluoride toothpaste for at least 2 minutes every morning and night." },
  { icon: Smile, title: "Floss Everyday", desc: "Remove plaque and food particles where toothbrushes can't reach." },
  { icon: ShieldAlert, title: "Limit Sugary Foods", desc: "Reduce sugar intake to prevent enamel erosion and cavity formation." },
  { icon: RefreshCw, title: "Replace Toothbrush", desc: "Swap your brush or brush head every 3–4 months for optimal clean." },
  { icon: CalendarCheck, title: "Regular Check-ups", desc: "Visit your dentist twice a year for early detection and cleaning." },
];

export function OralHealthTips() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Quick Advice
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">Essential Oral Health Tips</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TIPS.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center justify-between"
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(255, 153, 0, 0.12)", color: "#d97706" }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}