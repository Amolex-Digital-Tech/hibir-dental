"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { 
  Grid, 
  Search, 
  Stethoscope, 
  ActivitySquare, 
  Baby, 
  ShieldAlert, 
  Scissors, 
  Sparkles, 
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

export function ServiceCategories() {
  const [active, setActive] = useState("All Specialties");

  return (
    <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs py-4 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Filter by Clinical Specialty
          </span>
          <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
            Showing: <strong className="text-sky-800 font-semibold">{active}</strong>
          </span>
        </div>

        {/* Scrollable Categories Bar */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 -mx-2 px-2">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const Icon = CATEGORY_ICONS[cat] || Grid;

            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? "text-white border-sky-600 shadow-md shadow-sky-600/25 scale-[1.02]"
                    : "text-slate-600 bg-slate-50 border-slate-200/80 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200"
                }`}
              >
                {/* Active Background Fill with Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-sky-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-sky-500 group-hover:text-sky-600"
                  }`}
                />

                {/* Title */}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}