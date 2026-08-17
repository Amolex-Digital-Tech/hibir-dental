"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TEAM_IMAGES = [
  {
    title: "Clinical Consultations",
    image: "/images/team/IMG_0236.jpg",
  },
  {
    title: "Specialist Briefings",
    image: "/images/team/team-consultation.jpg",
  },
  {
    title: "Continuous Training",
    image: "/images/team/IMG_0173.jpg",
  },
];

export function TeamGallery() {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold uppercase text-xs tracking-widest block mb-2 text-amber-600">
            Behind The Scenes
          </span>

          <h2 className="text-3xl md:text-4xl font-bold">
            Our Team in Action
          </h2>
        </div>

        {/* Team Gallery */}
        <div className="grid sm:grid-cols-3 gap-6">
          {TEAM_IMAGES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.05,
              }}
              className="group relative h-64 overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={`Hibir Specialty Dental Clinic - ${item.title}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-sm font-bold text-white">
                  {item.title}
                </h3>

                <div className="mt-2 h-px w-8 bg-amber-400 transition-all duration-300 group-hover:w-14" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}