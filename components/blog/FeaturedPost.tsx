"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Clock, Calendar, User, ArrowRight } from "lucide-react";

export function FeaturedPost() {
  const featured = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all"
        >
          {/* Cover Image Container */}
          <div className="lg:col-span-7 h-72 md:h-96 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-sm">
            [ Featured Image: {featured.title} ]
          </div>

          {/* Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span 
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border w-fit block mb-4"
                style={{ 
                  backgroundColor: "rgba(255, 153, 0, 0.15)",
                  borderColor: "rgba(255, 153, 0, 0.4)",
                  color: "#d97706"
                }}
              >
                Featured Article • {featured.category}
              </span>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-4">
                {featured.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-8 border-t border-b border-slate-100 py-3">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {featured.publishedAt}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {featured.readingTime}</span>
              </div>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm w-fit transition-all shadow-md"
              style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}