import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import {
  BLOG_POSTS,
  type BlogPost,
} from "@/lib/data/blog";

interface RelatedArticlesProps {
  post: BlogPost;
}

export function RelatedArticles({
  post,
}: RelatedArticlesProps) {
  const relatedPosts = BLOG_POSTS
    .filter(
      (article) =>
        article.slug !== post.slug &&
        article.category === post.category
    )
    .slice(0, 3);

  // If there aren't enough articles in the same category,
  // fill the remaining slots with other relevant articles.
  if (relatedPosts.length < 3) {
    const additionalPosts = BLOG_POSTS
      .filter(
        (article) =>
          article.slug !== post.slug &&
          !relatedPosts.some(
            (related) => related.slug === article.slug
          )
      )
      .slice(0, 3 - relatedPosts.length);

    relatedPosts.push(...additionalPosts);
  }

  if (!relatedPosts.length) {
    return null;
  }

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Continue Reading
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Related Dental Insights
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-sky-600 transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {relatedPosts.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                    {article.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  {article.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-4">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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