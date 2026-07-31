"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden shadow-xl"
        >
          {/* Subtle Accent Background Glow */}
          <div 
            className="absolute -top-20 -right-20 w-80 h-80 blur-[120px] pointer-events-none rounded-full opacity-30"
            style={{ backgroundColor: "#ff9900" }}
          />

          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6 text-amber-400">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Get Oral Health Tips in Your Inbox
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Receive expert advice, dental care guides, and exclusive clinic updates from Hibir Specialty Dental Clinic.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 flex-1"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 flex-1"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}