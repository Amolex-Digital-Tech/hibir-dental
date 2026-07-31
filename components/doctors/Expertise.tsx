"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Smile, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Baby, 
  Grid, 
  AlertCircle,
  ArrowUpRight 
} from "lucide-react";

interface Specialty {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
}

const EXPERTISE_ITEMS: Specialty[] = [
  {
    title: "Cosmetic Dentistry",
    category: "Aesthetics",
    description: "Porcelain veneers, composite bonding, and full-mouth smile enhancements.",
    icon: Sparkles,
  },
  {
    title: "Smile Makeovers",
    category: "Aesthetics & Function",
    description: "Comprehensive multi-treatment transformation tailored to facial anatomy.",
    icon: Smile,
  },
  {
    title: "Preventive Dentistry",
    category: "Oral Health",
    description: "Advanced cleanings, digital checkups, and early disease interception.",
    icon: ShieldCheck,
  },
  {
    title: "Root Canal Therapy",
    category: "Endodontics",
    description: "Microscopic endodontics ensuring high tooth preservation and zero pain.",
    icon: Activity,
  },
  {
    title: "Dental Implants",
    category: "Restorative",
    description: "Precision 3D-guided implant placement for permanent tooth replacement.",
    icon: Layers,
  },
  {
    title: "Pediatric Dentistry",
    category: "Specialized Care",
    description: "Gentle, specialized dental treatments tailored for growing children.",
    icon: Baby,
  },
  {
    title: "Orthodontics",
    category: "Alignment",
    description: "Customized braces and clear Invisalign® aligners for all ages.",
    icon: Grid,
  },
  {
    title: "Emergency Care",
    category: "Urgent Care",
    description: "Immediate clinical intervention for acute pain, trauma, and dental injuries.",
    icon: AlertCircle,
  },
];

export function Expertise() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Radial Glow using #ff9900 */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] pointer-events-none rounded-full opacity-20"
        style={{ backgroundColor: "#ff9900" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span 
              className="font-semibold uppercase text-xs tracking-widest block mb-2"
              style={{ color: "#ff9900" }}
            >
              Clinical Specializations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Areas of Expertise
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            Our multi-disciplinary team brings together years of specialized training to cover every facet of modern clinical dentistry under one roof.
          </p>
        </div>

        {/* Expertise Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTISE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-[#ff9900] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Top Bar: Icon with #ff9900 background & Category Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: "rgba(255, 153, 0, 0.15)", 
                        border: "1px solid rgba(255, 153, 0, 0.3)",
                        color: "#ff9900" 
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{ 
                        backgroundColor: "rgba(255, 153, 0, 0.08)",
                        borderColor: "rgba(255, 153, 0, 0.25)",
                        color: "#fef3c7"
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff9900] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div 
                  className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs transition-colors"
                  style={{ color: "#ff9900" }}
                >
                  <span className="font-semibold text-[11px]">Learn about treatment</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}