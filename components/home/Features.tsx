"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Sparkles,
  ShieldCheck,
  UserCheck,
  Clock,
  HeartHandshake,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Digital Imaging & Precise Diagnosis",
    description:
      "We use modern dental imaging technology to support accurate diagnosis and effective treatment planning.",
  },
  {
    icon: UserCheck,
    title: "Specialist Doctors",
    description:
      "Our dental professionals provide specialized care while taking time to understand your concerns and explain your treatment options clearly.",
  },
  {
    icon: ShieldCheck,
    title: "Your Safety Comes First",
    description:
      "We maintain strict hygiene and sterilization practices to provide a clean and safe environment for every patient.",
  },
  {
    icon: HeartHandshake,
    title: "Gentle Care With Modern Techniques",
    description:
      "Our team focuses on reducing discomfort and creating a positive experience throughout your dental journey.",
  },
  {
    icon: Clock,
    title: "Convenient Scheduling",
    description:
      "Flexible appointment options and timely consultations help make accessing dental care easier.",
  },
  {
    icon: Sparkles,
    title: "Transparent Treatment Planning",
    description:
      "We provide clear explanations about your diagnosis, treatment options, and expected costs before starting procedures.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
            Why Choose Hibir Dental
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Quality Care Built Around Your Smile
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            At Hibir Dental Care Service, we believe excellent dental care begins with trust, communication, and attention to every patient's unique needs.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-600/10 text-sky-600 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}