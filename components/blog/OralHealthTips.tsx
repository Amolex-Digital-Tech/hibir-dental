"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Smile,
  ShieldAlert,
  RefreshCw,
  CalendarCheck,
} from "lucide-react";

const TIPS = [
  {
    icon: Sparkles,
    title: "Brush Twice Daily",
    desc: "Brush for about two minutes, morning and night, using a fluoride toothpaste.",
  },
  {
    icon: Smile,
    title: "Clean Between Teeth",
    desc: "Use dental floss or another interdental cleaner to remove plaque where brushing cannot reach.",
  },
  {
    icon: ShieldAlert,
    title: "Limit Frequent Sugar",
    desc: "Reduce frequent exposure to sugary foods and drinks to lower your risk of tooth decay.",
  },
  {
    icon: RefreshCw,
    title: "Replace Your Toothbrush",
    desc: "Replace your toothbrush or brush head regularly, especially when the bristles become worn or frayed.",
  },
  {
    icon: CalendarCheck,
    title: "Keep Regular Check-ups",
    desc: "Visit your dentist at intervals recommended for your individual oral-health needs.",
  },
];

export function OralHealthTips() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Quick Advice
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Essential Oral Health Tips
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Simple habits can make a meaningful difference to your oral health.
            Here are a few practical reminders from the dental team at Hibir
            Specialty Dental Clinic.
          </p>
        </div>

        {/* Tips */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {TIPS.map((tip, index) => {
            const Icon = tip.icon;

            return (
              <motion.article
                key={tip.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-40px",
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 153, 0, 0.12)",
                    color: "#d97706",
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-sm font-bold text-slate-900">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-500">
                  {tip.desc}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}