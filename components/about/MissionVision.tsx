"use client";

import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

const values = [
  { name: "Excellence", desc: "We strive to deliver quality care through professional standards, attention to detail, and continuous improvement." },
  { name: "Compassion", desc: "Every patient deserves kindness, empathy, and respectful care." },
  { name: "Integrity", desc: "We communicate honestly and make decisions that prioritize our patients' best interests." },
  { name: "Innovation", desc: "We embrace modern technology and evidence-based dentistry to deliver better outcomes." },
  { name: "Safety", desc: "Patient safety remains our highest clinical priority." },
  { name: "Continuous Learning", desc: "Our professionals continuously expand their knowledge to stay at the forefront." },
];

export function MissionVision() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm"
          >
            <Target className="w-10 h-10 text-sky-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To provide professional, compassionate, and personalized dental care that promotes lifelong oral health through modern technology, clinical expertise, and patient-centered service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm"
          >
            <Eye className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To be recognized as a trusted provider of comprehensive dental care, known for professionalism, innovation, and a commitment to improving the oral health of our community.
            </p>
          </motion.div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Sparkles className="w-5 h-5 text-sky-600" />
            <h3 className="text-2xl font-bold text-slate-900">Our Core Values</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white rounded-xl border border-slate-200/60"
              >
                <h4 className="font-semibold text-sky-700 mb-2">{v.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}