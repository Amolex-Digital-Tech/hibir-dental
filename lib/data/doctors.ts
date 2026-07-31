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
    slug: "dr-abebe-bekele",
    name: "Dr. Abebe Bekele",
    title: "Specialist Orthodontist",
    image: "/images/doctors/dr-abebe.jpg",
    experience: "15+ Years",
    specialties: ["Braces", "Invisalign", "Smile Design"],
    languages: ["English", "Amharic"],
    education: "DDS, MSc in Orthodontics - Addis Ababa University",
    biography: "Dr. Abebe Bekele is a senior specialist orthodontist with over 15 years of clinical experience in advanced aligner therapy and complex bite corrections.",
    philosophy: "Creating natural, functional, and aesthetically harmonious smiles through minimal intervention and modern technology.",
    certifications: ["Certified Invisalign Provider", "Member of Ethiopian Dental Association"],
    treatmentsOffered: ["Metal Braces", "Clear Ceramic Braces", "Invisalign® Aligners", "Early Interceptive Orthodontics"],
    spotlight: true,
  },
  {
    id: 2,
    slug: "dr-sara-mekonnen",
    name: "Dr. Sara Mekonnen",
    title: "Cosmetic & Restorative Dentist",
    image: "/images/doctors/dr-sara.jpg",
    experience: "10+ Years",
    specialties: ["Veneers", "Dental Implants", "Smile Makeovers"],
    languages: ["English", "Amharic"],
    education: "DDS - Master in Aesthetic Dentistry",
    biography: "Dr. Sara specializes in transforming smiles using high-precision digital smile design and ultra-thin porcelain veneers.",
    philosophy: "A healthy smile is the foundation of self-confidence; perfection lies in the finest details.",
    certifications: ["Digital Smile Design (DSD) Specialist", "International Academy of Cosmetic Dentistry"],
    treatmentsOffered: ["Porcelain Veneers", "Composite Bonding", "Full Mouth Reconstruction", "Laser Teeth Whitening"],
  },
  {
    id: 3,
    slug: "dr-daniel-girma",
    name: "Dr. Daniel Girma",
    title: "Oral & Maxillofacial Surgeon",
    image: "/images/doctors/dr-daniel.jpg",
    experience: "12+ Years",
    specialties: ["Wisdom Tooth Extraction", "Dental Implants", "Bone Grafting"],
    languages: ["English", "Amharic"],
    education: "DDS, Residency in Oral & Maxillofacial Surgery",
    biography: "Dr. Daniel leads surgical procedures at Hibir Specialty Dental Clinic, focusing on pain-free wisdom tooth extractions and implantology.",
    philosophy: "Precision surgical excellence delivered with compassion, safety, and utmost patient comfort.",
    certifications: ["Board Certified Oral Surgeon", "Advanced Surgical Implantology Fellow"],
    treatmentsOffered: ["Implant Surgery", "Wisdom Tooth Extraction", "Sinus Lift", "Bone Regeneration"],
  },
];