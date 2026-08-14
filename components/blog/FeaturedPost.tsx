"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
} from "lucide-react";

export function FeaturedPost() {
  const featured =
    BLOG_POSTS.find((post) => post.isFeatured) || BLOG_POSTS[0];

  const formattedDate = new Date(
    featured.publishedAt
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="border-b border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8 lg:grid-cols-12"
        >
          {/* Featured Image */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block h-72 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 md:h-96 lg:col-span-7"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

            <div className="absolute left-5 top-5">
              <span className="rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm backdrop-blur-md">
                Featured Article
              </span>
            </div>
          </Link>

          {/* Details */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <span className="mb-4 block w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                {featured.category}
              </span>

              <Link href={`/blog/${featured.slug}`}>
                <h2 className="text-2xl font-extrabold leading-tight text-slate-900 transition-colors duration-200 hover:text-amber-600 md:text-3xl">
                  {featured.title}
                </h2>
              </Link>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {featured.excerpt}
              </p>

              {/* Article Meta */}
              <div className="my-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-100 py-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  {featured.author}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {formattedDate}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {featured.readingTime}
                </span>
              </div>
            </div>

            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundColor: "#ff9900",
                color: "#0f172a",
              }}
            >
              Read Featured Article
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}