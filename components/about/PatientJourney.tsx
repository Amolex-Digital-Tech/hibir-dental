"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Consultation", desc: "We begin by listening to your concerns, understanding your goals, and performing a comprehensive dental examination." },
  { num: "02", title: "Diagnosis", desc: "Using advanced diagnostic technology, we carefully evaluate your oral health and identify the most effective treatment options." },
  { num: "03", title: "Personalized Treatment Plan", desc: "Every treatment plan is designed specifically for your needs, preferences, and long-term oral health." },
  { num: "04", title: "Comfortable Treatment", desc: "Our experienced professionals perform treatments using modern techniques focused on comfort, safety, and precision." },
  { num: "05", title: "Follow-Up Care", desc: "We continue supporting your oral health through post-treatment guidance, regular check-ups, and preventive care." },
];

export function PatientJourney() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Your Smile Journey Starts Here</h2>
          <p className="mt-4 text-slate-600">A smooth, transparent, and patient-centered treatment process.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative"
            >
              <span className="text-3xl font-black text-sky-200 block mb-3">{s.num}</span>
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}