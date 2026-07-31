"use client";

import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/data/gallery";
import { Maximize2 } from "lucide-react";

export function GalleryGrid() {
  return (
    <section className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative h-72 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              {/* Photo Placeholder */}
              <div className="text-slate-400 text-xs font-medium">[ Image: {item.title} ]</div>

              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border w-fit"
                  style={{ 
                    backgroundColor: "rgba(255, 153, 0, 0.2)",
                    borderColor: "rgba(255, 153, 0, 0.5)",
                    color: "#fef3c7"
                  }}
                >
                  {item.category}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
                    style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}