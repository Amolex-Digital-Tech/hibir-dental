import { Hero } from "@/components/blog/Hero";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Categories } from "@/components/blog/Categories";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { PopularPosts } from "@/components/blog/PopularPosts";
import { OralHealthTips } from "@/components/blog/OralHealthTips";
import { Newsletter } from "@/components/blog/Newsletter";
import { Cta } from "@/components/blog/Cta";

export const metadata = {
  title: "Dental Health Blog | Hibir Specialty Dental Clinic",
  description:
    "Expert dental health advice, oral hygiene tips, preventive care guides, children's dentistry, orthodontics, dental implants, and emergency dental information from Hibir Specialty Dental Clinic in Ethiopia.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Hero />

      <FeaturedPost />

      <Categories />

      <BlogGrid />

      <PopularPosts />

      <OralHealthTips />

      <Newsletter />

      <Cta />
    </main>
  );
}