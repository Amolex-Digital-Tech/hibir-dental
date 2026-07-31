"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/data/services";
import { 
  Clock, 
  Activity, 
  ArrowRight, 
  Grid, 
  Search, 
  Stethoscope, 
  ActivitySquare, 
  Baby, 
  ShieldAlert, 
  Scissors, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// Updated Specialty Icons Map matching Hibir Clinical Departments
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "All Specialties": Grid,
  "Consultation & Diagnosis": Search,
  "Restorative Dentistry": Stethoscope,
  "Root Canal Treatment": ActivitySquare,
  "Pediatric Dentistry": Baby,
  "Periodontics": ShieldAlert,
  "Oral Surgery": Scissors,
  "Prosthodontics": Sparkles,
  "Cosmetic Dentistry": Sparkles,
  "Emergency Dental Care": AlertCircle,
};

export function FeaturedServices() {
  const [selectedCategory, setSelectedCategory] = useState("All Specialties");

  // Filter services dynamically
  const filteredServices = selectedCategory === "All Specialties"
    ? SERVICES
    : SERVICES.filter((service) => service.category === selectedCategory);

  return (
    <section className="py-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Category Filter Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Filter by Clinical Specialty
            </span>
            <span className="text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Showing: <strong className="text-sky-800 font-semibold">{selectedCategory}</strong> ({filteredServices.length})
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const Icon = CATEGORY_ICONS[cat] || Grid;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? "text-white border-sky-600 shadow-md shadow-sky-600/25 scale-[1.02]"
                      : "text-slate-600 bg-white border-slate-200/80 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-sky-600 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-sky-500"}`} />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Services Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={service.slug}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Banner Header */}
                  <div className="h-40 bg-gradient-to-br from-slate-100 via-sky-50/50 to-white relative p-6 flex flex-col justify-between border-b border-slate-100">
                    <span className="self-start bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-sky-700 border border-sky-100 shadow-xs">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Content & Treatments List */}
                  <div className="p-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Procedures List */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Included Treatments
                      </span>
                      <ul className="space-y-1.5">
                        {service.treatments.slice(0, 3).map((treatment, idx) => (
                          <li key={idx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span className="truncate">{treatment}</span>
                          </li>
                        ))}
                        {service.treatments.length > 3 && (
                          <li className="text-[11px] font-semibold text-sky-600">
                            +{service.treatments.length - 3} more procedures
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-sky-500" /> {service.duration}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Activity className="w-4 h-4 text-amber-500" /> Recovery: {service.recovery}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-slate-50">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-slate-700 hover:text-sky-600 inline-flex items-center gap-1 transition-colors"
                  >
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/appointment"
                    className="px-4 py-2 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-600 hover:text-white transition-all shadow-xs"
                  >
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500">No services found under this specialty.</p>
          </div>
        )}
      </div>
    </section>
  );
}