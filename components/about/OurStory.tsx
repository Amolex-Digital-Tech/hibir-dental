"use client";

import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sky-600 font-semibold uppercase text-xs tracking-wider">Our Background</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-8">Our Journey</h2>
          
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg text-left md:text-center">
            <p>
              Hibir Dental Care Service was founded with a vision to provide modern dental care that prioritizes both clinical excellence and patient experience.
            </p>
            <p>
              Recognizing the growing need for accessible, modern, and specialized dental services, our founders envisioned a clinic where patients could receive comprehensive care under one roof while feeling genuinely valued throughout every stage of their treatment.
            </p>
            <p>
              Although our journey has only begun, our commitment to excellence continues to shape every decision we make. We are dedicated to growing alongside our community while continuously investing in advanced technology, education, and patient experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}