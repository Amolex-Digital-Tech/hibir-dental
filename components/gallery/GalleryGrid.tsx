"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/gallery";

export function GalleryGrid() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 text-slate-900">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      {/* =========================================================
          SIMPLE DECORATIVE ILLUSTRATIONS
      ========================================================= */}

      {/* Large abstract smile curve - top right */}
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-80px] top-[100px] hidden h-[180px] w-[360px] text-sky-200/50 lg:block"
        viewBox="0 0 360 180"
        fill="none"
      >
        <motion.path
          d="M20 35 C100 145 260 145 340 35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Small smile curve - left */}
      <motion.svg
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute left-[-50px] top-[520px] hidden h-[120px] w-[220px] text-sky-200/40 md:block"
        viewBox="0 0 220 120"
        fill="none"
      >
        <motion.path
          d="M10 20 C55 100 165 100 210 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Decorative tooth outline */}
      <motion.svg
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: -10,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.4,
        }}
        className="pointer-events-none absolute right-[4%] bottom-[170px] hidden h-24 w-20 text-sky-200/30 lg:block"
        viewBox="0 0 80 100"
        fill="none"
      >
        <path
          d="M40 8
             C22 8 10 20 10 38
             C10 55 18 63 18 78
             C18 89 24 94 30 94
             C36 94 38 82 40 72
             C42 82 44 94 50 94
             C56 94 62 89 62 78
             C62 63 70 55 70 38
             C70 20 58 8 40 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Small floating dots */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[8%] top-[180px] hidden h-2 w-2 rounded-full bg-sky-300/50 lg:block"
      />

      <motion.div
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute right-[12%] top-[400px] hidden h-3 w-3 rounded-full border border-sky-300/40 lg:block"
      />

      <motion.div
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="pointer-events-none absolute left-[15%] bottom-[180px] hidden h-2 w-2 rounded-full bg-blue-300/40 lg:block"
      />

      {/* Small plus / medical-inspired marks */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute right-[7%] top-[250px] hidden text-2xl font-light text-sky-200/60 lg:block"
      >
        +
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 20 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute left-[5%] bottom-[300px] hidden text-xl font-light text-sky-200/50 lg:block"
      >
        +
      </motion.div>

      {/* Small dotted cluster */}
      <div className="pointer-events-none absolute right-[20%] top-[150px] hidden opacity-40 lg:block">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5 + index * 0.04,
                duration: 0.3,
              }}
              className="h-1 w-1 rounded-full bg-sky-300"
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-sky-600">
              Inside Hibir
            </span>

            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              A closer look at
              <span className="block text-slate-400">
                the Hibir experience.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-500">
            Modern dentistry, thoughtful details, and a comfortable
            environment designed around every patient's experience.
          </p>
        </motion.div>

        {/* Animated Gallery */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[120px]">
          {GALLERY_ITEMS.slice(0, 6).map((item, index) => {
            const layouts = [
              "md:col-span-7 md:row-span-4",
              "md:col-span-5 md:row-span-3",
              "md:col-span-5 md:row-span-3",
              "md:col-span-4 md:row-span-3",
              "md:col-span-4 md:row-span-3",
              "md:col-span-4 md:row-span-3",
            ];

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.96,
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
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative overflow-hidden rounded-[28px] bg-slate-200 shadow-sm transition-shadow duration-500 hover:shadow-2xl ${layouts[index]}`}
              >
                {/* Image */}
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
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1024px) 50vw,
                      60vw
                    "
                  />
                </motion.div>

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Top information */}
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                    }}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md"
                  >
                    {item.category}
                  </motion.span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-900">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.1 + 0.2,
                        }}
                        className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/60"
                      >
                        0{index + 1}
                      </motion.p>

                      <h3 className="text-lg font-semibold text-white md:text-xl">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-sky-500">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/0 transition-all duration-500 group-hover:border-white/30" />

                {/* Hover shine */}
                <motion.div
                  className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                  whileHover={{
                    left: "150%",
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          className="mt-12 h-px origin-left bg-slate-200"
        />

        {/* Small decorative caption */}
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
            delay: 0.6,
          }}
          className="mt-5 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400"
        >
          <span>Care · Precision · Comfort</span>

          <span className="hidden sm:block">
            Hibir Specialty Dental Clinic
          </span>
        </motion.div>
      </div>
    </section>
  );
}