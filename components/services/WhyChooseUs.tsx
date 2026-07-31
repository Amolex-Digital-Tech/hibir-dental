"use client";

import { motion } from "framer-motion";
import { Cpu, Stethoscope, Heart, UserCheck, Sparkles, ShieldAlert } from "lucide-react";

const benefits = [
  { icon: Cpu, title: "Advanced Equipment", desc: "State-of-the-art diagnostic and treatment tools for precise outcomes." },
  { icon: Stethoscope, title: "Experienced Specialists", desc: "Board-certified doctors committed to continuous medical training." },
  { icon: Heart, title: "Comfortable Treatment", desc: "Pain-minimized procedures tailored to reduce anxiety at every step." },
  { icon: UserCheck, title: "Personalized Care", desc: "Customized care plans structured around your goals and lifestyle." },
  { icon: Sparkles, title: "Modern Technology", desc: "Digital imaging and intraoral 3D scanners for accurate planning." },
  { icon: ShieldAlert, title: "International Sterilization", desc: "Hospital-grade infection control protocols strictly adhered to." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Hibir Dental</h2>
          <p className="mt-3 text-slate-600">Setting a new benchmark for specialized dental healthcare.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-2xl bg-sky-50/40 border border-sky-100 hover:border-sky-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}