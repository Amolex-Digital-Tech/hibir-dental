"use client";

import { motion } from "framer-motion";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialGallery() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
          Stay Connected
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Instagram / Social Highlights</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="h-60 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-xs text-slate-400 gap-2 hover:border-amber-500 transition-colors shadow-sm"
            >
              <InstagramIcon className="w-6 h-6 text-amber-600" />
              <span>[ Social Post Embed ]</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}