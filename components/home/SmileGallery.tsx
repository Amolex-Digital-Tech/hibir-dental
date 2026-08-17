"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Sparkles,
  ArrowLeftRight,
  CheckCircle2,
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  treatmentDuration: string;
  beforeImage?: string;
  afterImage?: string;
}

const cases: CaseStudy[] = [
  {
    id: "case-1",
    title: "Full Smile Transformation",
    category: "Veneers & Smile Enhancement",
    description:
      "A combination of cosmetic treatments designed to improve tooth appearance, balance, and brightness while maintaining a natural look.",
    beforeLabel: "Discolored & Uneven",
    afterLabel: "Bright & Aligned",
    treatmentDuration: "Based on individual treatment plans",

    // VENEERS & SMILE ENHANCEMENT
    beforeImage: "/before-1.jpg",
    afterImage: "/after-1.jpg",
  },

  {
    id: "case-2",
    title: "Clear Aligner Straightening",
    category: "Orthodontics",
    description:
      "Discrete clear aligners used to correct crowding and spacing without traditional metal braces.",
    beforeLabel: "Crowded Teeth",
    afterLabel: "Perfect Alignment",
    treatmentDuration: "6 Months",

    // ORTHODONTIC BEFORE & AFTER
    beforeImage: "/before-ortho.jpg",
    afterImage: "/after-ortho.jpg",
  },

  {
    id: "case-3",
    title: "Single Tooth Implant Restoration",
    category: "Implants",
    description:
      "Replacement of a missing molar using a precision titanium implant and custom ceramic crown.",
    beforeLabel: "Missing Molar",
    afterLabel: "Natural Crown",
    treatmentDuration: "3 Months",

    // IMPLANT BEFORE & AFTER
    beforeImage: "/before-3.jpg",
    afterImage: "/after-3.jpg",
  },
];

export function SmileGallery() {
  const [activeCase, setActiveCase] = useState<CaseStudy>(cases[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-slate-200/60">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Real Results</span>
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Before & After Smile Transformations
          </h2>

          <p className="text-slate-600 text-base md:text-lg">
            Every smile is unique. Through customized treatment planning,
            we help patients improve their oral health, function, and
            confidence.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCase(c);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCase.id === c.id
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {c.category}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Interactive Visual Comparison */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden select-none bg-slate-900 shadow-inner">

                {/* AFTER Layer */}
                <div className="absolute inset-0">

                  {activeCase.afterImage ? (
                    <img
                      src={activeCase.afterImage}
                      alt={`${activeCase.title} - After Treatment`}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-900 to-sky-600 flex items-center justify-center text-white p-6">
                      <div className="text-center space-y-2">

                        <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                          After Treatment
                        </span>

                        <p className="text-2xl font-bold">
                          {activeCase.afterLabel}
                        </p>

                        <p className="text-xs text-sky-200/80">
                          Flawless, Natural & Confident
                        </p>

                      </div>
                    </div>
                  )}

                </div>

                {/* AFTER LABEL */}
                {activeCase.afterImage && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-emerald-500/90 border border-emerald-300 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md">
                      After Treatment
                    </span>
                  </div>
                )}

                {/* BEFORE Layer */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white"
                  style={{
                    width: `${sliderPosition}%`,
                  }}
                >
                  <div className="relative h-full w-full">

                    {activeCase.beforeImage ? (
                      <img
                        src={activeCase.beforeImage}
                        alt={`${activeCase.title} - Before Treatment`}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{
                          width: `${100 / (sliderPosition / 100)}%`,
                          maxWidth: "none",
                        }}
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 text-slate-300 flex items-center justify-center p-6">

                        <div className="text-center space-y-2 whitespace-nowrap overflow-hidden">

                          <span className="bg-slate-900/60 border border-slate-600 text-slate-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                            Before Treatment
                          </span>

                          <p className="text-2xl font-bold text-white">
                            {activeCase.beforeLabel}
                          </p>

                          <p className="text-xs text-slate-400">
                            Initial Patient Consultation
                          </p>

                        </div>

                      </div>
                    )}

                  </div>
                </div>

                {/* BEFORE LABEL */}
                {activeCase.beforeImage && (
                  <div
                    className="absolute top-4 left-4 z-10"
                    style={{
                      maxWidth: `${sliderPosition}%`,
                    }}
                  >
                    <span className="bg-slate-900/80 border border-slate-600 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider shadow-md whitespace-nowrap">
                      Before Treatment
                    </span>
                  </div>
                )}

                {/* Slider Handle Divider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none flex items-center justify-center z-20"
                  style={{
                    left: `${sliderPosition}%`,
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-white text-sky-600 shadow-lg flex items-center justify-center border-2 border-sky-600">
                    <ArrowLeftRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Invisible Range Input Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Drag to compare before and after"
                />

              </div>

              {/* Slider Instruction */}
              <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5" />

                <span>
                  Drag handle left or right to compare
                </span>
              </p>
            </div>

            {/* Right Column: Case Information */}
            <div className="lg:col-span-5 space-y-6">

              <AnimatePresence mode="wait">

                <motion.div
                  key={activeCase.id}
                  initial={{
                    opacity: 0,
                    x: 10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="space-y-4"
                >

                  {/* Category */}
                  <span className="text-sky-600 text-xs uppercase tracking-wider font-bold bg-sky-100/80 px-3 py-1 rounded-full">
                    {activeCase.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900">
                    {activeCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activeCase.description}
                  </p>

                  {/* Treatment Duration */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-3">

                    <div className="flex items-center gap-2 text-sm text-slate-700">

                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />

                      <span>
                        <strong>Duration:</strong>{" "}
                        {activeCase.treatmentDuration}
                      </span>

                    </div>

                  </div>

                  {/* Treatment Features */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-3">

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />

                      <span>
                        Digital treatment planning
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />

                      <span>
                        Personalized smile design
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />

                      <span>
                        Comfortable clinical experience
                      </span>
                    </div>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}