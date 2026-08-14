"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ClinicIntro() {
  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden">
      {/* Soft Background Atmosphere */}
      <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-sky-50 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* =====================================================
            TEXT CONTENT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Section Label */}
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-sky-500" />

            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-sky-600">
              The Hibir Experience
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Excellence Begins with{" "}
            <span className="relative inline-block text-sky-600">
              Compassion
              
              <motion.span
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="absolute left-0 right-0 -bottom-1 h-[3px] bg-sky-200 rounded-full origin-left"
              />
            </span>
          </h2>

          {/* Paragraph 1 */}
          <p className="mt-6 text-slate-600 leading-relaxed">
            Hibir Specialty Dental Clinic was founded with a clear vision:
            to redefine the dental care experience by combining clinical
            excellence with genuine compassion.
          </p>

          {/* Paragraph 2 */}
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our clinic provides comprehensive dental services in a modern,
            welcoming environment where every patient is treated with
            professionalism, respect, and personalized attention. From
            preventive dentistry to advanced cosmetic and restorative
            procedures, our team is committed to helping patients achieve
            healthy, confident smiles using evidence-based treatments and
            state-of-the-art technology.
          </p>

          {/* Closing Statement */}
          <p className="mt-4 text-slate-700 font-medium leading-relaxed">
            Every visit is designed to be comfortable, transparent, and
            focused on long-term oral health.
          </p>

          {/* Decorative Line */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 70,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
            className="mt-7 h-px bg-sky-200"
          />
        </motion.div>

        {/* =====================================================
            CLINIC IMAGE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-96 md:h-[430px]"
        >
          {/* Soft Glow Behind Image */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.45, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-[30px] bg-sky-200/30 blur-2xl"
          />

          {/* Main Image Frame */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group relative h-full w-full rounded-[26px] overflow-hidden border border-sky-100 bg-white shadow-xl"
          >
            {/* Clinic Image */}
            <Image
              src="/clinic/clinic-interior.jpg"
              alt="Interior of Hibir Specialty Dental Clinic"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />

            {/* Soft Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-white/5 pointer-events-none" />

            {/* =================================================
                CINEMATIC LIGHT SWEEP
            ================================================= */}

            <motion.div
              initial={{
                x: "-150%",
              }}
              whileInView={{
                x: "150%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.8,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
            />

            {/* =================================================
                TOP LEFT GLASS LABEL
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="absolute top-5 left-5"
            >
              <div className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-lg">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-sky-500"
                  />

                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-700">
                    Hibir Clinic
                  </span>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                BOTTOM INFORMATION CARD
            ================================================= */}

            <motion.div
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
                duration: 0.7,
                delay: 0.8,
              }}
              className="absolute bottom-5 left-5 right-5"
            >
              <div className="flex items-center justify-between gap-4">

                {/* Glass Information Card */}
                <div className="px-4 py-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/70 shadow-lg">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                    Our Environment
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-800">
                    Modern. Welcoming. Comfortable.
                  </p>
                </div>

                {/* Floating Plus */}
                <motion.div
                  animate={{
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="hidden sm:flex w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white/70 shadow-lg items-center justify-center"
                >
                  <span className="text-sky-500 text-lg">
                    +
                  </span>
                </motion.div>

              </div>
            </motion.div>

            {/* Animated Border */}
            <motion.div
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-[26px] border border-sky-300/50 pointer-events-none"
            />
          </motion.div>

          {/* =================================================
              FLOATING CORNER CARD
          ================================================= */}

          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl bg-white border border-sky-100 shadow-lg flex items-center justify-center"
          >
            <div className="text-center">
              <span className="block text-xl font-bold text-sky-600">
                01
              </span>

              <span className="text-[8px] uppercase tracking-[0.18em] text-slate-400">
                Clinic
              </span>
            </div>
          </motion.div>

          {/* Small Decorative Corner */}
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
              delay: 1,
            }}
            className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-sky-300/60 rounded-tl-xl pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default ClinicIntro;