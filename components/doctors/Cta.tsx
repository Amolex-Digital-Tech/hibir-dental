"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Cta() {
  return (
    <section className="py-24 bg-gradient-to-r from-sky-800 to-sky-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Meet Our Specialists?
          </h2>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you're seeking preventive care, cosmetic treatment, orthodontics, or advanced restorative dentistry, our experienced team is ready to help you achieve a healthy, confident smile.
          </p>

          <Link
            href="/appointment"
            className="inline-block px-8 py-4 rounded-full bg-white text-sky-900 font-bold shadow-lg hover:bg-sky-50 transition-all"
          >
            Book Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  );
}