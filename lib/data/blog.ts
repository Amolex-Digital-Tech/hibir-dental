export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export const BLOG_CATEGORIES = [
  "All",
  "Preventive Care",
  "Cosmetic Dentistry",
  "Children's Dentistry",
  "Orthodontics",
  "Dental Implants",
  "Oral Hygiene",
  "Emergency Dentistry",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "10-daily-habits-healthy-teeth",
    title: "10 Daily Habits That Keep Your Teeth Healthy for Life",
    category: "Preventive Care",
    excerpt: "Discover daily routines recommended by top dentists to maintain strong enamel, healthy gums, and a bright smile.",
    image: "/images/blog/habits.jpg",
    author: "Dr. Tewodros Abrham",
    publishedAt: "2026-07-31",
    readingTime: "6 min read",
    isFeatured: true,
  },
  {
    slug: "signs-you-may-need-root-canal",
    title: "Signs You May Need a Root Canal",
    category: "Emergency Dentistry",
    excerpt: "Learn to recognize early warning signs of tooth infection and why modern root canal therapy is virtually painless.",
    image: "/images/blog/root-canal.jpg",
    author: "Dr. Sarah Jenkins",
    publishedAt: "2026-07-20",
    readingTime: "4 min read",
    isPopular: true,
  },
  {
    slug: "how-often-visit-dentist",
    title: "How Often Should You Visit the Dentist?",
    category: "Preventive Care",
    excerpt: "Is the 6-month rule right for everyone? Here is how to determine your ideal dental check-up schedule.",
    image: "/images/blog/checkup.jpg",
    author: "Dr. Tewodros Abrham",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    isPopular: true,
  },
  {
    slug: "benefits-of-professional-teeth-whitening",
    title: "The Benefits of Professional Teeth Whitening",
    category: "Cosmetic Dentistry",
    excerpt: "Why professional in-office whitening yields safer, longer-lasting results compared to over-the-counter options.",
    image: "/images/blog/whitening.jpg",
    author: "Dr. Sarah Jenkins",
    publishedAt: "2026-07-10",
    readingTime: "5 min read",
    isPopular: true,
  },
  {
    slug: "what-to-expect-dental-implants",
    title: "What to Expect During Dental Implant Treatment",
    category: "Dental Implants",
    excerpt: "A step-by-step roadmap for replacing missing teeth with durable, natural-looking dental implants.",
    image: "/images/blog/implants.jpg",
    author: "Dr. Michael Chen",
    publishedAt: "2026-07-02",
    readingTime: "7 min read",
    isPopular: true,
  },
  {
    slug: "braces-vs-clear-aligners",
    title: "Braces vs. Clear Aligners: Which Is Right for You?",
    category: "Orthodontics",
    excerpt: "Comparing aesthetics, treatment time, and lifestyle factors to help you pick your path to a straighter smile.",
    image: "/images/blog/ortho.jpg",
    author: "Dr. Michael Chen",
    publishedAt: "2026-06-25",
    readingTime: "6 min read",
  },
];