"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14 8h3V4h-3c-3.3 0-5 1.7-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.6 7.2c-1.7-.1-3-1.1-3.6-2.7-.1-.4-.2-.9-.2-1.5h-3.6v12.3c0 1.5-1.2 2.6-2.7 2.6-1.4 0-2.5-1.1-2.5-2.5 0-1.5 1.2-2.6 2.7-2.6.3 0 .6 0 .9.1V9.2c-.3 0-.6-.1-.9-.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3c3.5 0 6.3-2.8 6.3-6.3V9.7c1.2.9 2.7 1.5 4.3 1.5V7.6c-.2 0-.5-.1-.7-.4Z" />
    </svg>
  );
}

/* -------------------------------------------------------
   Simple illustrations
------------------------------------------------------- */

function SmileIllustration() {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      className="h-28 w-40 text-sky-300"
    >
      <path
        d="M25 42 C55 95 125 95 155 42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M48 55 C67 76 113 76 132 55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />

      <circle
        cx="38"
        cy="31"
        r="4"
        fill="currentColor"
        opacity="0.4"
      />

      <circle
        cx="142"
        cy="31"
        r="3"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

function ClinicIllustration() {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      className="h-28 w-40 text-sky-300"
    >
      <rect
        x="45"
        y="30"
        width="90"
        height="65"
        rx="10"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M60 52 H120"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      <path
        d="M60 67 H105"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />

      <path
        d="M60 82 H90"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />

      <circle
        cx="119"
        cy="78"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />

      <path
        d="M119 73 V83 M114 78 H124"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToothIllustration() {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      className="h-28 w-40 text-sky-300"
    >
      <path
        d="
          M90 15
          C68 15 51 30 51 51
          C51 69 60 78 61 94
          C62 103 68 107 74 105
          C82 103 83 87 90 76
          C97 87 98 103 106 105
          C112 107 118 103 119 94
          C120 78 129 69 129 51
          C129 30 112 15 90 15Z
        "
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <path
        d="M75 48 C83 43 97 43 105 48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />

      <circle
        cx="42"
        cy="31"
        r="3"
        fill="currentColor"
        opacity="0.3"
      />

      <circle
        cx="138"
        cy="76"
        r="4"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}

function SpecialistIllustration() {
  return (
    <svg
      viewBox="0 0 180 120"
      fill="none"
      className="h-28 w-40 text-sky-300"
    >
      <circle
        cx="90"
        cy="42"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M53 99 C57 76 71 65 90 65 C109 65 123 76 127 99"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M77 42 C82 37 98 37 103 42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />

      <circle
        cx="90"
        cy="18"
        r="4"
        fill="currentColor"
        opacity="0.3"
      />

      <circle
        cx="44"
        cy="70"
        r="3"
        fill="currentColor"
        opacity="0.25"
      />

      <circle
        cx="136"
        cy="70"
        r="3"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
  );
}

/* -------------------------------------------------------
   Social categories
------------------------------------------------------- */

const SOCIAL_CARDS = [
  {
    number: "01",
    title: "Smile Stories",
    description:
      "Discover the smiles, journeys, and moments that make every patient experience special.",
    illustration: SmileIllustration,
  },
  {
    number: "02",
    title: "Inside Hibir",
    description:
      "Take a closer look at our clinic, our environment, and the details behind the experience.",
    illustration: ClinicIllustration,
  },
  {
    number: "03",
    title: "Dental Insights",
    description:
      "Simple, useful insights to help you understand your smile and care for it every day.",
    illustration: ToothIllustration,
  },
  {
    number: "04",
    title: "Meet Our Specialists",
    description:
      "Get to know the people behind Hibir and the expertise that guides every treatment.",
    illustration: SpecialistIllustration,
  },
];

export function SocialGallery() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-24 text-slate-900">
      {/* -------------------------------------------------
          Background decoration
      -------------------------------------------------- */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

      {/* Decorative smile line */}

      <motion.svg
        initial={{
          opacity: 0,
          pathLength: 0,
        }}
        whileInView={{
          opacity: 1,
          pathLength: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.5,
        }}
        className="pointer-events-none absolute right-[-70px] top-20 hidden h-40 w-80 text-sky-200/40 lg:block"
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
        {/* -------------------------------------------------
            Header
        -------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          {/* Instagram icon */}

          <div className="mb-5 flex justify-center">
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-white text-sky-600 shadow-sm"
            >
              <InstagramIcon className="h-5 w-5" />
            </motion.div>
          </div>

          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-sky-600">
            Stay Connected
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Follow the
            <span className="text-slate-400"> Hibir journey.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500">
            A glimpse into the people, care, and smiles behind Hibir
            Specialty Dental Clinic.
          </p>
        </motion.div>

        {/* -------------------------------------------------
            Editorial cards
        -------------------------------------------------- */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_CARDS.map((card, index) => {
            const Illustration = card.illustration;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 40,
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
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-500 hover:shadow-xl"
              >
                {/* Number */}

                <span className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-slate-200">
                  {card.number}
                </span>

                {/* Illustration */}

                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-32 items-center justify-center"
                >
                  <Illustration />
                </motion.div>

                {/* Card content */}

                <div className="relative">
                  <h3 className="text-lg font-bold text-slate-900">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {card.description}
                  </p>
                </div>

                {/* Bottom detail */}

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-sky-600">
                    Discover
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:bg-sky-600 group-hover:text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Hover border */}

                <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-transparent transition-colors duration-500 group-hover:border-sky-200" />

                {/* Subtle glow */}

                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-sky-100/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        {/* -------------------------------------------------
            Social Media CTA
        -------------------------------------------------- */}

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
            duration: 0.8,
            delay: 0.4,
          }}
          className="mt-14 flex flex-col items-center justify-center"
        >
          <div className="mb-5 h-px w-12 bg-sky-200" />

          <p className="mb-4 text-xs text-slate-400">
            Follow Hibir Specialty Dental Clinic
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Instagram */}

            <a
              href="https://www.instagram.com/hibir_dental_speciality_clinic?igsh=MXN2ZGlnZ2dja2dhaA==&igsi=MXN2ZGlnZ2dja2dhaA=="
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl"
            >
              <InstagramIcon className="h-4 w-4" />

              <span>@hibirspecialtydental</span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Facebook */}

            <a
              href="https://www.facebook.com/share/1DAKo1DPTb/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl"
            >
              <FacebookIcon className="h-4 w-4" />

              <span>Hibir Specialty Dental Clinic</span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* TikTok */}

            <a
              href="https://www.tiktok.com/@hibir_dental_speciality?_r=1&_t=ZS-98xXmKkUyTR"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl"
            >
              <TikTokIcon className="h-4 w-4" />

              <span>@hibirspecialtydental</span>

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

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
            delay: 0.5,
          }}
          className="mt-14 h-px origin-left bg-slate-200"
        />
      </div>
    </section>
  );
}