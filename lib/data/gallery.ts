export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  image: string;
  aspectRatio?: "portrait" | "landscape" | "square";
}

export const GALLERY_CATEGORIES = [
  "All",
  "Clinic",
  "Before & After",
  "Treatments",
  "Doctors",
  "Equipment",
  "Events",
  "Patients",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: "Clinic",
    title: "Modern Reception Area",
    image: "/images/gallery/reception.jpg",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    category: "Before & After",
    title: "Full Veneer Transformation",
    image: "/images/gallery/veneers-ba.jpg",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    category: "Treatments",
    title: "3D Guided Implant Placement",
    image: "/images/gallery/implant-surgery.jpg",
    aspectRatio: "square",
  },
  {
    id: 4,
    category: "Equipment",
    title: "3D Digital Intraoral Scanner",
    image: "/images/gallery/scanner.jpg",
    aspectRatio: "landscape",
  },
  {
    id: 5,
    category: "Doctors",
    title: "Clinical Consultation",
    image: "/images/gallery/consultation.jpg",
    aspectRatio: "portrait",
  },
  {
    id: 6,
    category: "Clinic",
    title: "Sterilization Suite",
    image: "/images/gallery/sterilization.jpg",
    aspectRatio: "square",
  },
];