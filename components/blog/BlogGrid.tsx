"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";

export function BlogGrid() {
  return (
    <section
      id="articles"
      className="border-t border-slate-200 bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-amber-600">
            Latest Insights
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Latest Articles
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Practical dental guidance from the specialists at Hibir Specialty
            Dental Clinic, covering prevention, oral hygiene, children's
            dentistry, orthodontics, dental implants, and more.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center border-b border-slate-200 bg-slate-100">
                <span className="px-6 text-center text-xs text-slate-400">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col">
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      {post.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="mb-3 line-clamp-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-sky-600">
                    {post.title}
                  </h3>

                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-6 py-5">
                  <span className="text-xs font-medium text-slate-500">
                    {post.author}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 transition-colors group-hover:text-sky-600"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}