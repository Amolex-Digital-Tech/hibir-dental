"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DOCTORS } from "@/lib/data/doctors";
import { Clock, Globe, ArrowRight } from "lucide-react";

export function DoctorsGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Medical Specialists</h2>
          <p className="mt-3 text-slate-600">Choose a specialist to view their complete credentials and book a direct consultation.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc, index) => (
            <motion.div
              key={doc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center text-xs text-slate-400 group-hover:scale-105 transition-transform duration-500">
                  <span>[ Portrait: {doc.name} ]</span>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-sky-700 shadow-sm">
                    {doc.title}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {doc.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-sky-500" /> {doc.experience}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Globe className="w-3.5 h-3.5 text-amber-500" /> {doc.languages.join(", ")}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {doc.specialties.map((spec) => (
                      <span key={spec} className="px-2.5 py-1 bg-sky-50 text-sky-800 text-[11px] font-medium rounded-md border border-sky-100">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-50 mt-4">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="text-xs font-semibold text-slate-700 hover:text-sky-600 inline-flex items-center gap-1 transition-colors"
                >
                  View Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/appointment"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-sm"
                >
                  Book →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}