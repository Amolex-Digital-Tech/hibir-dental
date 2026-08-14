export interface Doctor {
  id: number;
  slug: string;
  name: string;
  title: string;
  image: string;
  experience: string;
  specialties: string[];
  languages: string[];
  education: string;
  biography: string;
  philosophy: string;
  certifications: string[];
  treatmentsOffered: string[];
  spotlight?: boolean;
}

export const DOCTORS: Doctor[] = [
  {
    id: 1,
    slug: "dr-haregwoin",
    name: "Dr. Haregewoin",
    title: "Chief Expert Dental Surgeon",
    image: "/images/doctors/haregewoin.jpg",
    experience: "20+ Years",
    specialties: [
      "Orthodontics",
      "Braces",
      "Invisalign",
      "Smile Design",
    ],
    languages: ["English", "Amharic"],
    education: "MSc in Orthodontics - Addis Ababa University",
    biography:
      "Dr. Haregewoin is a senior specialist orthodontist with over 20 years of clinical experience in advanced aligner therapy and complex bite corrections.",
    philosophy:
      "Creating natural, functional, and aesthetically harmonious smiles through minimal intervention and modern technology.",
    certifications: [
      "Certified Invisalign Provider",
      "Member of Ethiopian Dental Association",
    ],
    treatmentsOffered: [
      "Metal Braces",
      "Clear Ceramic Braces",
      "Invisalign® Aligners",
      "Early Interceptive Orthodontics",
      "Complex Bite Correction",
      "Smile Design",
    ],
    spotlight: true,
  },

  {
    id: 2,
    slug: "dr-tsige",
    name: "Dr. Tsige",
    title: "Chief Expert Dental Surgeon",
    image: "/images/doctors/tsige.jpg",
    experience: "20+ Years",
    specialties: [
      "Cosmetic Dentistry",
      "Digital Smile Design",
      "Dental Implants",
      "Veneers",
    ],
    languages: ["English", "Amharic"],
    education: "Master in Orthodontics - Addis Ababa University",
    biography:
      "Dr. Tsige specializes in transforming smiles using high-precision digital smile design, porcelain veneers, dental implants, and aesthetic makeovers over 20 years.",
    philosophy:
      "A healthy smile is the foundation of self-confidence; perfection lies in the finest details.",
    certifications: [
      "Digital Smile Design (DSD) Specialist",
      "International Academy of Cosmetic Dentistry",
    ],
    treatmentsOffered: [
      "Porcelain Veneers",
      "Digital Smile Design",
      "Dental Implants",
      "Composite Bonding",
      "Full Mouth Reconstruction",
      "Laser Teeth Whitening",
      "Smile Makeovers",
    ],
    spotlight: true,
  },

  {
    id: 3,
    slug: "dr-daniel-girma",
    name: "Dr. Daniel Girma",
    title: "Oral & Maxillofacial Surgeon",
    image: "/images/doctors/dr-daniel.jpg",
    experience: "12+ Years",
    specialties: [
      "Wisdom Tooth Extraction",
      "Dental Implants",
      "Bone Grafting",
    ],
    languages: ["English", "Amharic"],
    education: "DDS, Residency in Oral & Maxillofacial Surgery",
    biography:
      "Dr. Daniel leads surgical procedures at Hibir Specialty Dental Clinic, focusing on pain-free wisdom tooth extractions and implantology.",
    philosophy:
      "Precision surgical excellence delivered with compassion, safety, and utmost patient comfort.",
    certifications: [
      "Board Certified Oral Surgeon",
      "Advanced Surgical Implantology Fellow",
    ],
    treatmentsOffered: [
      "Implant Surgery",
      "Wisdom Tooth Extraction",
      "Sinus Lift",
      "Bone Regeneration",
    ],
  },
];