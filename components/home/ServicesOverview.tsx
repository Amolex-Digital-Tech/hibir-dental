"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Sparkles,
  Smile,
  ShieldAlert,
  Stethoscope,
  HeartPulse,
  Zap,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Enhance Your Natural Smile",
    description: "Improve the appearance of your teeth with customized cosmetic treatments designed around your smile goals.",
    href: "/services#cosmetic",
  },
  {
    icon: Smile,
    title: "Straighter Teeth, Improved Confidence",
    description: "We provide orthodontic solutions to improve tooth alignment and create a healthier, more balanced smile.",
    href: "/services#orthodontics",
  },
  {
    icon: Stethoscope,
    title: "Restore Missing Teeth With Confidence",
    description: "Dental implants provide a reliable solution for replacing missing teeth and restoring natural function and appearance.",
    href: "/services#implants",
  },
  {
    icon: ShieldAlert,
    title: "Root Canal Therapy",
    description: "Our root canal treatments focus on relieving discomfort and saving damaged teeth through careful clinical procedures.",
    href: "/services#root-canal",
  },
  {
    icon: HeartPulse,
    title: "Gentle Dental Care For Children",
    description: "We provide friendly and comfortable dental care designed to support children's oral health from an early age.",
    href: "/services#pediatric",
  },
  {
    icon: Zap,
    title: "Emergency Care",
    description: "For urgent dental concerns such as severe tooth pain, broken teeth, or unexpected dental problems, our team provides timely consultation and care.",
    href: "/services#emergency",
  },
];

export function ServicesOverview() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/60">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase bg-sky-100/80 px-3.5 py-1.5 rounded-full">
              Comprehensive Care
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Our Specialty Services
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              From preventive checkups to advanced restorative treatments, our dental services are designed to support your oral health and improve your confidence.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-sky-600 hover:text-sky-700 transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={service.href}
                  className="group block p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-600/5 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center gap-2 text-sm font-semibold text-sky-600 group-hover:text-sky-700">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}