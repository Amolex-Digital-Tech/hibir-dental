"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Globe, ArrowRight } from "lucide-react";

// =====================================================
// DOCTORS DATA
// =====================================================

const DOCTORS = [
  {
    slug: "dr-haregewoin",
    name: "Dr. Haregewoin",
    title: "Chief Expert Dental Surgeon",
    experience: "20+ Years",
    languages: ["English", "Amharic"],
    specialties: [
      "Dental Implants",
      "Cosmetic Dentistry",
      "Smile Makeovers",
    ],
    image: "/doctors/doctor-haregewoin-profile.jpg",
  },
  {
    slug: "dr-tsige",
    name: "Dr. Tsige",
    title: "Chief Expert Dental Surgeon",
    experience: "20+ Years",
    languages: ["English", "Amharic"],
    specialties: [
      "Invisalign®",
      "Clear Braces",
      "Jaw Alignment",
    ],
    image: "/doctors/doctor-tsige-profile.jpg",
  },
];

// =====================================================
// DOCTORS GRID
// =====================================================

export function DoctorsGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* =================================================
            SECTION HEADER
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Medical Specialists
          </h2>

          <p className="mt-3 text-slate-600">
            Choose a specialist to view their complete credentials and book
            a direct consultation.
          </p>
        </motion.div>

        {/* =================================================
            DOCTORS
        ================================================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-8">

          {DOCTORS.map((doc, index) => (
            <motion.div
              key={doc.slug}
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
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col justify-between"
            >

              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div>

                {/* =================================================
                    DOCTOR IMAGE
                ================================================= */}

                <div className="h-[360px] sm:h-[390px] bg-slate-100 relative overflow-hidden">

                  <Image
                    src={doc.image}
                    alt={`${doc.name} - ${doc.title}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Soft image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />

                  {/* Doctor title badge */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-sky-700 shadow-sm">
                    {doc.title}
                  </span>

                </div>

                {/* =================================================
                    DOCTOR DETAILS
                ================================================= */}

                <div className="p-6">

                  {/* Doctor Name */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {doc.name}
                  </h3>

                  {/* Experience + Languages */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">

                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-sky-500" />
                      {doc.experience}
                    </span>

                    <span className="flex items-center gap-1 font-medium">
                      <Globe className="w-3.5 h-3.5 text-amber-500" />
                      {doc.languages.join(", ")}
                    </span>

                  </div>

                  {/* Specialties */}
                  <div className="mt-4 flex flex-wrap gap-1.5">

                    {doc.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 bg-sky-50 text-sky-800 text-[11px] font-medium rounded-md border border-sky-100"
                      >
                        {spec}
                      </span>
                    ))}

                  </div>

                </div>
              </div>

              {/* =================================================
                  CARD FOOTER
              ================================================= */}

              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-50 mt-4">

                <Link
                  href={`/doctors/${doc.slug}`}
                  className="text-xs font-semibold text-slate-700 hover:text-sky-600 inline-flex items-center gap-1 transition-colors"
                >
                  View Profile

                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/appointment"
                  className="px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-all shadow-sm"
                >
                  Book →
                </Link>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default DoctorsGrid;