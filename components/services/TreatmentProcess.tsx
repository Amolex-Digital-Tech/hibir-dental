"use client";

import { motion } from "framer-motion";
import { 
  Stethoscope, 
  FileText, 
  Sparkles, 
  HeartPulse, 
  ChevronRight 
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation & Examination",
    category: "Step 1",
    description: "Comprehensive oral checkup, digital X-rays, and discussing your personal health goals.",
    icon: Stethoscope,
  },
  {
    step: "02",
    title: "Customized Treatment Plan",
    category: "Step 2",
    description: "Detailed, transparent breakdown of recommended procedures, timelines, and cost estimates.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Expert Clinical Care",
    category: "Step 3",
    description: "Gentle, precise treatment performed using state-of-the-art dental technology.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Post-Treatment & Aftercare",
    category: "Step 4",
    description: "Personalized follow-up guidelines and routine checkups to ensure lasting results.",
    icon: HeartPulse,
  },
];

export function TreatmentProcess() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Radial Glow using #ff9900 */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[160px] pointer-events-none rounded-full opacity-15"
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
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Your Treatment Process
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed">
            A structured, step-by-step approach designed to make your dental care journey seamless, comfortable, and predictable.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="group relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-[#ff9900] transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Top Bar: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span 
                      className="text-2xl font-black tracking-tight"
                      style={{ color: "#ff9900" }}
                    >
                      {item.step}
                    </span>

                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: "rgba(255, 153, 0, 0.12)", 
                        border: "1px solid rgba(255, 153, 0, 0.3)",
                        color: "#ff9900" 
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff9900] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Tag & Arrow */}
                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
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

                  <ChevronRight 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    style={{ color: "#ff9900" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}