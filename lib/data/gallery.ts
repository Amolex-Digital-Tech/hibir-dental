export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Clinic",
  "Technology",
  "Care",
  "Treatment",
  "Team",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Hibir Specialty Dental Clinic",
    category: "Clinic",
    image: "/gallery/IMG_0332.jpg",
  },
  {
    id: 2,
    title: "Modern Dental Care",
    category: "Clinic",
    image: "/gallery/IMG_0197.jpg",
  },
  {
    id: 3,
    title: "Advanced Dental Experience",
    category: "Technology",
    image: "/gallery/dental-team.jpg",
  },
  {
    id: 4,
    title: "Patient Care",
    category: "Care",
    image: "/gallery/IMG_0114.jpg",
  },
  {
    id: 5,
    title: "Specialized Dentistry",
    category: "Treatment",
    image: "/gallery/IMG_0236.jpg",
  },
  {
    id: 6,
    title: "Hibir Dental Team",
    category: "Team",
    image: "/gallery/IMG_0283.jpg",
  },
];