"use client";

import { motion } from "framer-motion";
import { Cpu, UserCheck, HeartHandshake, Smile, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Modern Technology",
    desc: "We use advanced diagnostic equipment and modern treatment techniques to support accurate diagnosis and effective care.",
  },
  {
    icon: UserCheck,
    title: "Experienced Dental Professionals",
    desc: "Our team brings together skilled dental professionals who are committed to continuous learning and high-quality patient care.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Treatment",
    desc: "Every patient receives recommendations and treatment plans designed around their oral health needs, lifestyle, and long-term goals.",
  },
  {
    icon: Smile,
    title: "Comfortable Environment",
    desc: "Our clinic has been designed to provide a calm and welcoming atmosphere where patients of all ages can feel at ease.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Infection Prevention",
    desc: "We follow strict sterilization and infection prevention protocols to help maintain a safe clinical environment for every patient.",
  },
  {
    icon: Users,
    title: "Long-Term Relationships",
    desc: "We believe in building lasting relationships with our patients through trust, transparency, and exceptional care.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Patients Trust Hibir
          </h2>
          <p className="mt-4 text-slate-600">
            We focus on delivering dental care built on professionalism, trust, and patient comfort.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}