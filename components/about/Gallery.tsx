"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/gallery/clinic-01.jpg",
    alt: "Interior of Hibir Specialty Dental Clinic",
  },
  {
    src: "/gallery/clinic-02.jpg",
    alt: "Treatment area at Hibir Specialty Dental Clinic",
  },
  {
    src: "/gallery/clinic-03.jpg",
    alt: "Modern dental environment at Hibir Specialty Dental Clinic",
  },
  {
    src: "/gallery/clinic-04.jpg",
    alt: "Patient care environment at Hibir Specialty Dental Clinic",
  },
];

export function Gallery() {
  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sky-50 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          {/* Small label */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-sky-500" />

            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600">
              Our Environment
            </span>

            <span className="w-8 h-px bg-sky-500" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Inside Hibir Specialty Dental Clinic
          </h2>

          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Explore our thoughtfully designed clinic, modern treatment rooms,
            and welcoming environment created around patient comfort.
          </p>
        </motion.div>


        {/* =====================================================
            IMAGE GRID
        ===================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >

              {/* Image container */}
              <motion.div
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="relative h-48 md:h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-shadow duration-500"
              >

                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

                {/* Light sweep */}
                <motion.div
                  initial={{
                    x: "-150%",
                  }}
                  whileHover={{
                    x: "150%",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Image number */}
                <div className="absolute top-3 left-3">
                  <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-md flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-700">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <div className="px-3 py-2 rounded-lg bg-white/80 backdrop-blur-md border border-white/60">
                    <p className="text-[10px] font-semibold tracking-wide text-slate-700">
                      HIBIR SPECIALTY DENTAL CLINIC
                    </p>
                  </div>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-sky-300/60 transition-colors duration-500 pointer-events-none" />

              </motion.div>
            </motion.div>
          ))}

        </div>


        {/* =====================================================
            BOTTOM ACCENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="w-12 h-px bg-sky-200" />

          <span className="w-2 h-2 rounded-full bg-sky-400" />

          <span className="w-20 h-px bg-sky-200" />

          <span className="w-2 h-2 rounded-full bg-sky-400" />

          <span className="w-12 h-px bg-sky-200" />
        </motion.div>

      </div>
    </section>
  );
}

export default Gallery;