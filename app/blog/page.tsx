import { Hero } from "@/components/blog/Hero";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Categories } from "@/components/blog/Categories";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { PopularPosts } from "@/components/blog/PopularPosts";
import { OralHealthTips } from "@/components/blog/OralHealthTips";
import { Newsletter } from "@/components/blog/Newsletter";
import { Cta } from "@/components/blog/Cta";

export default function BlogPage() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
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