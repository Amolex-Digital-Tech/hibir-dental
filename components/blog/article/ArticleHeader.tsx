import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

import type { BlogPost } from "@/lib/data/blog";


interface ArticleHeaderProps {
  post: BlogPost;
}


export function ArticleHeader({
  post,
}: ArticleHeaderProps) {

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-sky-100">

      {/* Background decoration */}

      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />


      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">

        {/* Back to Blog */}

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />

          Back to Dental Insights
        </Link>


        {/* Category */}

        <div className="mb-5">

          <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
            {post.category}
          </span>

        </div>


        {/* Title */}

        <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-950">
          {post.title}
        </h1>


        {/* Description */}

        <p className="max-w-3xl mt-7 text-lg md:text-xl leading-relaxed text-slate-600">
          {post.excerpt}
        </p>


        {/* Meta */}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500">

          <span className="font-semibold text-slate-700">
            {post.author}
          </span>

          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />

            {post.publishedAt}
          </span>

          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />

            {post.readingTime}
          </span>

        </div>

      </div>

    </header>
  );
}