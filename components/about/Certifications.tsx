"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

export function Certifications() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Award className="w-8 h-8 text-sky-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Quality You Can Trust</h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Our clinic is committed to maintaining the highest professional and clinical standards through continuous education, adherence to national healthcare regulations, and ongoing investment in quality improvement.
          </p>
        </motion.div>
      </div>
    </section>
  );
}