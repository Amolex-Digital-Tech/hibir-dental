"use client";

import { useState } from "react";
import { BLOG_CATEGORIES } from "@/lib/data/blog";

export function Categories() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="border-b border-slate-200 bg-slate-100/70 py-8">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6">
        <div className="flex min-w-max items-center justify-center gap-2">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-amber-500 bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}