"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, GraduationCap } from "lucide-react";

export function DoctorSpotlight() {
  const spotlightDoctors = [
    {
      slug: "dr-haregwoin-eshetu",
      name: "Dr. Haregewoin  Eshetu",
      title: "Chief Expert Dental Surgeon",
      experience: "30+ Years",
      languages: "English, Amharic, Polish",
      image: "/images/doctors/haregewoin.jpg",
      biography:
        "Dr. Haregewoin is a senior specialist orthodontist with over 20 years of clinical experience in advanced aligner therapy and complex bite corrections.",
      education: "MSc in Orthodontics - Addis Ababa University",
      certification: "Certified Invisalign Provider",
      philosophy:
        "Creating natural, functional, and aesthetically harmonious smiles through minimal intervention and modern technology.",
    },
    {
      slug: "dr-tsigeweini-gebremedhin",
      name: "Dr. Tsegeweini  G/medhin",
      title: "Chief Expert Dental Surgeon",
      experience: "30+ Years",
      languages: "English, Amharic, Spanish",
      image: "/images/doctors/tsige.jpg",
      biography:
        "Dr. Tsige specializes in transforming smiles using high-precision digital smile design, porcelain veneers, dental implants, and aesthetic makeovers over 20 years.",
      education: "Master in Orthodontics - Addis Ababa University",
      certification: "Digital Smile Design (DSD) Specialist",
      philosophy:
        "A healthy smile is the foundation of self-confidence; perfection lies in the finest details.",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-sky-600 font-semibold uppercase text-xs tracking-wider block text-center mb-2">
          Featured Specialists
        </span>

        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Doctor Spotlight
        </h2>

        {/* 2-Column Side-by-Side Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {spotlightDoctors.map((doc) => (
            <div
              key={doc.slug}
              className="grid sm:grid-cols-2 gap-8 items-center bg-slate-50 p-8 rounded-3xl border border-slate-200/80 shadow-sm"
            >
              {/* Doctor Photo */}
              <div className="relative h-80 sm:h-full min-h-[260px] rounded-2xl overflow-hidden bg-slate-200">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content */}
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  {doc.title}
                </span>

                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-1">
                  {doc.name}
                </h3>

                <p className="text-xs text-slate-500 mb-3 font-medium">
                  {doc.experience} Experience • {doc.languages}
                </p>

                <p className="text-slate-600 leading-relaxed text-xs mb-4 line-clamp-3">
                  {doc.biography}
                </p>

                <div className="space-y-2 mb-6 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="truncate">{doc.education}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{doc.certification}</span>
                  </div>
                </div>

                <blockquote className="p-3 bg-sky-50 rounded-xl border-l-4 border-sky-600 text-xs italic text-slate-700 mb-6 line-clamp-2">
                  "{doc.philosophy}"
                </blockquote>

                <Link
                  href={`/doctors/${doc.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-full font-semibold text-xs hover:bg-sky-700 transition-colors shadow-sm"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}