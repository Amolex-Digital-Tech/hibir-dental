"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const TOUR_ROOMS = [
  {
    title: "Reception & Waiting Area",
    image: "/images/clinic-tour/reception.jpg",
    number: "01",
  },
  {
    title: "Consultation Suites",
    image: "/images/clinic-tour/consultation.jpg",
    number: "02",
  },
  {
    title: "Treatment Rooms",
    image: "/images/clinic-tour/treatment.jpg",
    number: "03",
  },
  {
    title: "Sterilization Suite",
    image: "/images/clinic-tour/sterilization.jpg",
    number: "04",
  },
  {
    title: "Digital X-Ray Suite",
    image: "/images/clinic-tour/xray.jpg",
    number: "05",
  },
];

export function ClinicTour() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-24 text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      {/* Decorative smile */}
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute right-[-60px] top-20 hidden h-40 w-80 text-sky-200/40 lg:block"
        viewBox="0 0 320 160"
        fill="none"
      >
        <motion.path
          d="M15 30 C85 135 235 135 305 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-sky-600">
            Virtual Walkthrough
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Explore
            <span className="text-slate-400"> Hibir.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
            Take a closer look at the spaces where modern technology,
            thoughtful design, and patient comfort come together.
          </p>
        </motion.div>

        {/* Tour Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOUR_ROOMS.map((room, i) => (
            <motion.div
              key={room.title}
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-[26px] bg-white p-2 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-[20px] ${
                  i === 0
                    ? "h-72 md:h-[380px]"
                    : "h-64 md:h-[300px]"
                }`}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes={
                      i === 0
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                  />
                </motion.div>

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Number */}
                <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md">
                  {room.number}
                </div>

                {/* Arrow */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-900">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Hibir Specialty Dental Clinic
                  </span>

                  <h3 className="text-lg font-semibold text-white md:text-xl">
                    {room.title}
                  </h3>
                </div>
              </div>

              {/* Bottom subtle line */}
              <div className="px-3 pb-2 pt-3">
                <div className="h-px w-full bg-slate-100 transition-colors duration-500 group-hover:bg-sky-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="mt-12 flex flex-col items-center justify-center gap-3 text-center"
        >
          <div className="h-px w-12 bg-sky-200" />

          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
            Designed around your comfort
          </p>
        </motion.div>
      </div>
    </section>
  );
}