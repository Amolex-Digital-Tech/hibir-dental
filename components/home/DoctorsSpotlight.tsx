"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

interface Doctor {
  id: string;
  name: string;
  role: string;
  rating?: number; // Optional property prevents build errors when omitted
  yearsExperience: number;
  specialties: string[];
  languages: string[];
}

const doctors: Doctor[] = [
  {
    id: "dr-1",
    name: "Dr. Haregewoin",
    role: "Chief Dental Surgeon",
    yearsExperience: 15,
    rating: 5,
    specialties: ["Dental Implants", "Cosmetic Dentistry", "Smile Makeovers"],
    languages: ["English", "Amharic"],
  },
  {
    id: "dr-2",
    name: "Dr. Tsige",
    role: "Orthodontic Director",
    yearsExperience: 12,
    rating: 5,
    specialties: ["Invisalign®", "Clear Braces", "Jaw Alignment"],
    languages: ["English", "Amharic"],
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function DoctorsSpotlight() {
  return (
    <section className="relative w-full bg-gradient-to-b from-white via-sky-50/30 to-sky-50/60 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#0EA5E9] bg-sky-100/70 border border-sky-200 mb-4 uppercase">
              Clinical Excellence
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Meet Our Experienced Dental Professionals
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Each specialist focuses on delivering personalized treatment while helping patients make informed decisions about their oral health.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center justify-center self-start md:self-auto px-6 py-3.5 rounded-full font-medium text-slate-700 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 hover:text-[#0EA5E9] transition-all duration-300 group"
          >
            View All Doctors
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* 2x2 Grid Layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {doctors.map((doctor) => (
            <motion.article
              key={doctor.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative bg-white/80 backdrop-blur-md rounded-[30px] border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start"
            >
              {/* Doctor Image Placeholder */}
              <div className="relative w-full sm:w-48 h-64 sm:h-full min-h-[240px] rounded-2xl overflow-hidden bg-slate-100/80 border border-slate-200/60 flex-shrink-0 flex items-center justify-center group-hover:bg-sky-50/50 transition-colors duration-300">
                <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-sky-300 transition-colors duration-300">
                  <svg
                    className="w-16 h-16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-400 mt-2">Photo Placeholder</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="flex flex-col flex-grow justify-between w-full h-full">
                <div>
                  {/* Badge & Role */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#0EA5E9] bg-sky-50 px-2.5 py-1 rounded-md">
                      👨‍⚕️ {doctor.role}
                    </span>
                    {doctor.rating !== undefined && (
                      <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                        <span>★</span>
                        <span className="text-slate-700">{doctor.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Doctor Name */}
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#0EA5E9] transition-colors duration-200">
                    {doctor.name}
                  </h3>

                  {/* Experience */}
                  <p className="text-xs font-medium text-slate-500 mt-1 mb-4">
                    {doctor.yearsExperience}+ Years Clinical Experience
                  </p>

                  <hr className="border-slate-100 my-3" />

                  {/* Specialties List */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Specialties
                    </span>
                    <ul className="space-y-1.5">
                      {doctor.specialties.map((spec, idx) => (
                        <li key={idx} className="text-sm font-medium text-slate-700 flex items-center gap-2">
                          <span className="text-[#0EA5E9]">✓</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages */}
                  <div className="mb-6">
                    <span className="text-xs text-slate-500">
                      <strong className="text-slate-700">Languages:</strong> {doctor.languages.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Book Appointment CTA */}
                <Link
                  href={`/appointment?doctor=${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-slate-900 text-white font-medium text-sm group-hover:bg-[#0EA5E9] transition-colors duration-300 shadow-md"
                >
                  Book Appointment
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom Banner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold">Looking for the right specialist?</h3>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Our experienced dental team is here to provide personalized care tailored to your specific needs.
            </p>
          </div>
          <Link
            href="/doctors"
            className="whitespace-nowrap px-8 py-4 rounded-full bg-[#0EA5E9] hover:bg-sky-400 text-white font-semibold text-sm shadow-lg hover:shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Meet All Doctors
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DoctorsSpotlight;