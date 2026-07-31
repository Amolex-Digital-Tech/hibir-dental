export const SERVICE_CATEGORIES = [
  "All Specialties",
  "Consultation & Diagnosis",
  "Restorative Dentistry",
  "Root Canal Treatment",
  "Pediatric Dentistry",
  "Periodontics",
  "Oral Surgery",
  "Prosthodontics",
  "Cosmetic Dentistry",
  "Emergency Dental Care",
] as const;

export interface Service {
  slug: string;
  title: string;
  category: typeof SERVICE_CATEGORIES[number];
  shortDescription: string;
  duration: string;
  recovery: string;
  treatments: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "consultation-diagnosis",
    title: "Consultation & Diagnosis",
    category: "Consultation & Diagnosis",
    shortDescription: "Helping patients understand their oral health through comprehensive examinations and precise diagnostic X-rays.",
    duration: "30 - 45 mins",
    recovery: "Immediate",
    treatments: ["Consultation", "Peri Apical Single X-ray Examination"],
  },
  {
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    category: "Restorative Dentistry",
    shortDescription: "Repairing damaged or decayed teeth using durable, tooth-colored composite and glass ionomer restorations.",
    duration: "45 - 60 mins",
    recovery: "Immediate",
    treatments: [
      "Temporary Filling",
      "Composite Filling – Anterior (Cosmetic)",
      "Composite Filling – Posterior (One Surface)",
      "Composite Filling – Posterior (Multi-Surface)",
      "Fissure Sealant",
    ],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Root Canal Treatment",
    shortDescription: "Saving infected or damaged teeth through precision endodontic therapy and periapical procedures.",
    duration: "60 - 90 mins",
    recovery: "1 - 3 Days",
    treatments: [
      "Root Canal Treatment (Anterior)",
      "Root Canal Treatment (Pre-Molars)",
      "Root Canal Treatment (Molars)",
      "Peri Apical Surgery (Apicoectomy)",
    ],
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    category: "Pediatric Dentistry",
    shortDescription: "Gentle dental care designed specifically for children to keep young teeth healthy and strong.",
    duration: "30 - 45 mins",
    recovery: "Same Day",
    treatments: [
      "Fissure Sealant",
      "Extraction of Deciduous Teeth",
      "Pediatric Root Canal Therapy",
      "Composite Fillings",
    ],
  },
  {
    slug: "periodontics",
    title: "Gum Treatment (Periodontics)",
    category: "Periodontics",
    shortDescription: "Protecting and restoring healthy gums to preserve long-term oral health and prevent disease.",
    duration: "45 - 60 mins",
    recovery: "1 - 2 Days",
    treatments: [
      "Scaling & Polishing",
      "Excision of Pericoronal Flap (Operculectomy)",
      "Epulis (Gum Growth) Removal",
    ],
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    category: "Oral Surgery",
    shortDescription: "Safe surgical extractions, wisdom teeth disimpactions, and minor oral surgical care.",
    duration: "45 - 90 mins",
    recovery: "3 - 7 Days",
    treatments: [
      "Tooth Extraction",
      "Wisdom Tooth Extraction",
      "Surgical Extraction (Disimpaction)",
      "Minor Surgical Incision / Abscess Drainage",
    ],
  },
  {
    slug: "prosthodontics",
    title: "Tooth Replacement (Prosthodontics)",
    category: "Prosthodontics",
    shortDescription: "Custom crowns, bridges, and partial or full dentures built for natural appearance and function.",
    duration: "Multiple Visits",
    recovery: "Immediate",
    treatments: [
      "Permanent & Ceramic Crowns",
      "Chrome Cobalt Dentures",
      "Full & Removable Partial Dentures",
      "Denture Repair & Relining",
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    category: "Cosmetic Dentistry",
    shortDescription: "Aesthetic enhancement for smiles including composite cosmetic fillings, ceramic crowns, and night guards.",
    duration: "45 - 60 mins",
    recovery: "Immediate",
    treatments: ["Composite Cosmetic Fillings", "Ceramic Single Crowns", "Night Guard"],
  },
  {
    slug: "emergency-dental-care",
    title: "Dental Trauma & Emergency Care",
    category: "Emergency Dental Care",
    shortDescription: "Prompt emergency care for tooth displacement, facial trauma, and jaw fractures.",
    duration: "Urgent Care",
    recovery: "Varies",
    treatments: [
      "Immobilization / Arch Bar",
      "Simple Tooth Displacement Immobilization",
      "Fractured Jaw Immobilization",
    ],
  },
];