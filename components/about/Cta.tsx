"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-gradient-to-r from-sky-700 to-sky-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Your Smile Deserves Exceptional Care
          </h2>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you need preventive care, cosmetic dentistry, orthodontics, or advanced restorative treatments, our team is ready to provide personalized care tailored to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="px-8 py-4 rounded-full bg-white text-sky-900 font-semibold shadow-lg hover:bg-sky-50 transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border border-sky-300/50 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}