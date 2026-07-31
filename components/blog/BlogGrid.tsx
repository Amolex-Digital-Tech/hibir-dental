"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Clock, ArrowRight } from "lucide-react";

export function BlogGrid() {
  return (
    <section id="articles" className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-bold uppercase text-xs tracking-widest block mb-1 text-amber-600">
              Latest Insights
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Latest Articles</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="h-48 bg-slate-100 border-b border-slate-200 flex items-center justify-center text-xs text-slate-400">
                  [ Image: {post.title} ]
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">{post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1 transition-colors"
                >
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}