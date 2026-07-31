"use client";

import { useState } from "react";
import { BLOG_CATEGORIES } from "@/lib/data/blog";

export function Categories() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-8 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-center gap-2 min-w-max">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "#ff9900" : "#ffffff",
                  color: isActive ? "#0f172a" : "#475569",
                  border: isActive ? "1px solid #ff9900" : "1px solid #e2e8f0",
                  boxShadow: isActive ? "0 4px 12px rgba(255, 153, 0, 0.25)" : "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}