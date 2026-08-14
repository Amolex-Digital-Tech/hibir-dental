"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data/blog";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({
  posts,
}: RelatedPostsProps) {
  return (
    <section className="py-20 bg-white border-t border-slate-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-10">

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-600">
            Continue Reading
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Related Dental Articles
          </h2>

        </div>


        <div className="grid gap-7 md:grid-cols-3">

          {posts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
            >

              <Link href={`/blog/${post.slug}`}>

                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                </div>

              </Link>


              <div className="p-6">

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {post.category}
                </span>

                <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-sky-600 transition-colors">
                  {post.title}
                </h3>

                <div className="mt-4 flex items-center justify-between">

                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-sky-600"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}