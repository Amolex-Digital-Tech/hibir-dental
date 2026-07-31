"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DoctorsPreview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Meet the Professionals Behind Every Smile
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Our experienced dental team is passionate about creating healthy, confident smiles through compassionate care and clinical excellence. Each member brings specialized knowledge and a patient-centered approach.
          </p>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors shadow-sm"
          >
            Meet Our Doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}