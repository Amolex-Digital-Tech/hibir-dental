"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterCardProps {
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

function BeforeAfterCard({
  title,
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: BeforeAfterCardProps) {
  const [position, setPosition] = useState(50);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPosition(Number(e.target.value));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
    >
      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        {title}
      </h3>

      {/* Interactive Before / After */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 select-none">

        {/* AFTER IMAGE - BASE */}
        <img
          src={afterImage}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
          draggable={false}
        />

        {/* AFTER LABEL */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="bg-emerald-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            After
          </span>
        </div>

        {/* BEFORE IMAGE - CLIPPED */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white"
          style={{
            width: `${position}%`,
          }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="absolute top-0 left-0 h-full object-cover"
            style={{
              width: `${100 / (position / 100)}%`,
              maxWidth: "none",
            }}
            draggable={false}
          />
        </div>

        {/* BEFORE LABEL */}
        <div
          className="absolute top-4 left-4 z-10 pointer-events-none"
          style={{
            maxWidth: `${position}%`,
          }}
        >
          <span className="bg-slate-900/85 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
            Before
          </span>
        </div>

        {/* SLIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl pointer-events-none z-20"
          style={{
            left: `${position}%`,
          }}
        />

        {/* DRAG HANDLE */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{
            left: `${position}%`,
          }}
        >
          <div className="w-11 h-11 rounded-full bg-white border-2 border-sky-600 shadow-xl flex items-center justify-center text-sky-600">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </div>

        {/* INVISIBLE INTERACTIVE SLIDER */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label={`Drag to compare before and after for ${title}`}
        />
      </div>

      {/* Instruction */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
        <ArrowLeftRight className="w-4 h-4" />
        <span>Drag to compare</span>
      </div>
    </motion.div>
  );
}

export function BeforeAfter() {
  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Real Results
          </span>

          <h2 className="text-3xl md:text-4xl font-bold">
            Before & After Smiles
          </h2>

          <p className="mt-3 text-slate-600 text-sm">
            Slide to explore patient transformations achieved through custom
            cosmetic and restorative care.
          </p>
        </div>

        {/* Before / After Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* VENEERS */}
          <BeforeAfterCard
            title="Porcelain Veneers Makeover"
            beforeImage="/before-1.jpg"
            afterImage="/after-1.jpg"
            beforeAlt="Before porcelain veneers treatment"
            afterAlt="After porcelain veneers treatment"
          />

        </div>
      </div>
    </section>
  );
}