"use client";

import { motion } from "framer-motion";
import { Scan, ShieldCheck, Eye, Cpu, Radio } from "lucide-react";

const techItems = [
  { 
    icon: Radio, 
    title: "Comprehensive Dental Care", 
    desc: "From routine check-ups and preventive care to restorative treatments and oral surgery, we provide a full range of dental services tailored to every stage of your oral health journey." 
  },
  { 
    icon: Scan, 
    title: "Sterilization & Infection Control", 
    desc: "Our sterilization systems and infection prevention protocols help ensure that every instrument is thoroughly sterilized, supporting a clean and safe treatment environment." 
  },
  { 
    icon: Eye, 
    title: "Modern Restorative Equipment", 
    desc: "Advanced dental instruments and restorative equipment allow us to perform fillings, crowns, root canal treatments, and other restorative procedures with accuracy and efficiency." 
  },
  { 
    icon: ShieldCheck, 
    title: "Prosthetic & Crown Solutions", 
    desc: "We use modern materials and clinical techniques to create crowns, bridges, dentures, and other prosthetic restorations that are designed for comfort, durability, and a natural appearance." 
  },
  { 
    icon: Cpu, 
    title: "Supporting Healthy Gums", 
    desc: "Professional scaling and periodontal treatment equipment help remove plaque and tartar effectively while promoting healthier gums and long-term oral health." 
  },
];

export function Technology() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Excellence Dental Care Solution
          </h2>
          <p className="mt-3 text-slate-600">
            Leveraging cutting-edge innovations to ensure faster and pain-free treatments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}