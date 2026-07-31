"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Cpu, BookOpen, Heart, Users } from "lucide-react";

const reasons = [
  { icon: Stethoscope, title: "Experienced Specialists", desc: "Board-certified doctors with international clinical training." },
  { icon: ShieldCheck, title: "Advanced Training", desc: "Continuous learning in state-of-the-art medical techniques." },
  { icon: Cpu, title: "Modern Equipment", desc: "Powered by 3D imaging, low-dose X-rays, and intraoral scanners." },
  { icon: BookOpen, title: "Continuous Education", desc: "Regular participation in international dental conferences." },
  { icon: Heart, title: "Patient-Centered Care", desc: "Individualized treatment plans focused on your goals." },
  { icon: Users, title: "Collaborative Planning", desc: "Multi-specialist team reviews for complex restorative cases." },
];

export function WhyChooseTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Our Team</h2>
          <p className="mt-3 text-slate-600">Excellence through collaboration, innovation, and empathy.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-2xl bg-sky-50/40 border border-sky-100"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <r.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}