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
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Our experienced dental professionals are here to help you achieve healthy, confident smiles with personalized care and advanced treatment solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="px-8 py-4 rounded-full bg-white text-sky-900 font-bold shadow-lg hover:bg-sky-50 transition-all"
            >
              Book Appointment
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full border border-sky-300/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}