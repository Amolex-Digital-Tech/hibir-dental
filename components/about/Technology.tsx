"use client";

import { motion } from "framer-motion";
import { 
  ScanFace, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Armchair, 
  Layers, 
  ArrowUpRight 
} from "lucide-react";

interface TechItem {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
}

const TECH_ITEMS: TechItem[] = [
  {
    title: "Oral Hygiene & Gum Health",
    category: "Diagnostics",
    description: "We provide professional scaling, polishing, and periodontal care to help maintain healthy gums, fresh breath, and long-term oral health.",
    icon: ScanFace,
  },
  {
    title: "Sterilization Systems",
    category: "Safety & Hygiene",
    description: "Advanced sterilization equipment and infection prevention protocols help maintain a safe clinical environment.",
    icon: ShieldCheck,
  },
  {
    title: "Precision Dental Equipment",
    category: "Clinical Care",
    description: "Modern clinical instruments support accurate, efficient, and comfortable dental procedures.",
    icon: Cpu,
  },
  {
    title: "Dental Prosthetics",
    category: "Aesthetics",
    description: "We provide crowns, bridges, removable dentures, and other prosthetic solutions that restore chewing function, comfort, and confidence.",
    icon: Sparkles,
  },
  {
    title: "Patient Comfort",
    category: "Patient Comfort",
    description: "EOur treatment rooms are designed to provide a welcoming environment that supports a more comfortable dental experience.",
    icon: Armchair,
  },
  {
    title: "Restorative Solutions",
    category: "Restoration",
    description: "Modern restorative techniques help improve both the function and appearance of damaged or missing teeth.",
    icon: Layers,
  },
];

export function Technology() {
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
              Technology & Equipment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Modern Dentistry Powered by Innovation
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            We invest in advanced dental technology to improve diagnosis, treatment accuracy, patient comfort, and clinical outcomes.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_ITEMS.map((item, index) => {
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
                  {/* Top Bar: Icon Container & Category Tag */}
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
                  <span className="font-semibold text-[11px]">Explore technology</span>
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