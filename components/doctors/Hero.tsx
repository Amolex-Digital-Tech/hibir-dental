"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-sky-50/80 via-white to-slate-50 border-b border-sky-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/80 rounded-full">
            Specialized Medical Team
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Meet Our <span className="text-sky-600">Dental Specialists</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
            Our experienced dental professionals combine advanced clinical expertise, modern technology, and compassionate care to provide exceptional treatment for every patient.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20"
            >
              Book Appointment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative h-[420px] rounded-3xl bg-slate-200 overflow-hidden border border-slate-100 shadow-2xl flex items-center justify-center text-slate-400">
            <span>[ Group Doctor Photo Placeholder ]</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
          >
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-base">15+ Specialists</p>
              <p className="text-xs text-slate-500">Board-Certified Dental Doctors</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
          >
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">100% Patient Focus</p>
              <p className="text-xs text-slate-500">Evidence-Based Medicine</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}