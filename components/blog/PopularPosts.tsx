"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { TrendingUp, ArrowRight } from "lucide-react";

export function PopularPosts() {
  const popular = BLOG_POSTS.filter((p) => p.isPopular);

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-10">
          <TrendingUp className="w-5 h-5 text-amber-600" />
          <h2 className="text-2xl font-bold text-slate-900">Popular Articles</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 mb-2 block">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2">
                  {post.title}
                </h3>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1 transition-colors"
              >
                Read Article <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}