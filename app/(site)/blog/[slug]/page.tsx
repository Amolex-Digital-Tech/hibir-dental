// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MessageCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { ArticleToc } from "@/components/blog/ArticleToc";


/* =========================================================
   TYPES
========================================================= */

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category: string | null;
  author: string | null;
  status: string;
  published_at: string | null;
  created_at?: string;
  updated_at?: string | null;
};


/* =========================================================
   HELPERS
========================================================= */

function calculateReadingTime(content: string) {
  const text = content.replace(/<[^>]*>/g, " ").trim();

  const words = text
    ? text.split(/\s+/).length
    : 0;

  return Math.max(1, Math.ceil(words / 200));
}


function createSectionsFromHtml(content: string) {
  if (!content) return [];

  const sections: {
    id: string;
    heading: string;
    paragraphs: string[];
  }[] = [];

  const headingRegex =
    /<h2[^>]*>(.*?)<\/h2>/gi;

  const headings = [...content.matchAll(headingRegex)];

  if (headings.length === 0) {
    return [
      {
        id: "article",
        heading: "",
        paragraphs: [],
      },
    ];
  }

  headings.forEach((match, index) => {
    const headingHtml = match[1];

    const heading = headingHtml
      .replace(/<[^>]*>/g, "")
      .trim();

    const start =
      (match.index ?? 0) + match[0].length;

    const end =
      index + 1 < headings.length
        ? headings[index + 1].index ?? content.length
        : content.length;

    const sectionHtml =
      content.substring(start, end);

    const paragraphs = [
      ...sectionHtml.matchAll(
        /<p[^>]*>(.*?)<\/p>/gi
      ),
    ].map((item) =>
      item[1]
        .replace(/<[^>]*>/g, "")
        .trim()
    );

    sections.push({
      id:
        heading
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 80) ||
        `section-${index + 1}`,

      heading,

      paragraphs,
    });
  });

  return sections;
}


/* =========================================================
   GET POST
========================================================= */

async function getPostBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Supabase blog post error:",
      error
    );
  }

  return data as BlogPost | null;
}


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title:
        "Article Not Found | Hibir Specialty Dental Clinic",
    };
  }

  const description =
    post.excerpt ||
    "Dental health information from Hibir Specialty Dental Clinic.";

  return {
    title: `${post.title} | Hibir Specialty Dental Clinic`,

    description,

    authors: [
      {
        name:
          post.author ||
          "Hibir Specialty Dental Clinic",
      },
    ],

    openGraph: {
      title: post.title,

      description,

      type: "article",

      publishedTime:
        post.published_at || undefined,

      modifiedTime:
        post.updated_at ||
        post.published_at ||
        undefined,

      authors: [
        post.author ||
          "Hibir Specialty Dental Clinic",
      ],

      images: post.featured_image
        ? [
            {
              url: post.featured_image,

              width: 1200,

              height: 630,

              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title: post.title,

      description,

      images: post.featured_image
        ? [post.featured_image]
        : undefined,
    },
  };
}


/* =========================================================
   PAGE
========================================================= */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = post.content || "";

  const readingMinutes =
    calculateReadingTime(content);

  const sections =
    createSectionsFromHtml(content);

  const tocItems = sections
    .filter((section) => section.heading)
    .map((section) => ({
      id: section.id,
      label: section.heading,
    }));


  /* =======================================================
     RELATED POSTS
  ======================================================= */

  let relatedPosts: BlogPost[] = [];

  if (post.category) {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("category", post.category)
      .neq("id", post.id)
      .order("published_at", {
        ascending: false,
      })
      .limit(3);

    relatedPosts = (data || []) as BlogPost[];
  }


  /* =======================================================
     DATE
  ======================================================= */

  const publishedDate =
    post.published_at ||
    post.created_at ||
    new Date().toISOString();


  return (
    <main className="min-h-screen bg-[#f8fbff] text-slate-900">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl" />

          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

        </div>


        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-36">


          {/* Back */}

          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700"
          >

            <ArrowLeft className="h-4 w-4" />

            Back to Dental Journal

          </Link>


          {/* Category */}

          <div className="mb-6 flex items-center gap-3">

            {post.category && (
              <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
                {post.category}
              </span>
            )}

          </div>


          {/* Title */}

          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">

            {post.title}

          </h1>


          {/* Excerpt */}

          {post.excerpt && (
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">

              {post.excerpt}

            </p>
          )}


          {/* Metadata */}

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-500">

            <div className="flex items-center gap-2">

              <Clock3 className="h-4 w-4 text-sky-600" />

              <span>
                {readingMinutes} min read
              </span>

            </div>


            <div className="flex items-center gap-2">

              <CalendarDays className="h-4 w-4 text-sky-600" />

              <time dateTime={publishedDate}>

                {new Date(
                  publishedDate
                ).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}

              </time>

            </div>


            <div className="h-1 w-1 rounded-full bg-slate-300" />


            <span>

              {post.author ||
                "Hibir Specialty Dental Clinic"}

            </span>

          </div>


          {/* Reading indicator */}

          <div className="mt-10 max-w-xl">

            <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">

              <span>
                Estimated reading time
              </span>

              <span>
                {readingMinutes} minutes
              </span>

            </div>


            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-sky-600"
                style={{
                  width: "12%",
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED IMAGE
      ===================================================== */}

      {post.featured_image && (

        <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">

          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full max-h-[650px] rounded-3xl object-cover shadow-sm"
          />

        </section>

      )}


      {/* =====================================================
          ARTICLE
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,760px)] xl:grid-cols-[260px_minmax(0,780px)_220px]">


          {/* =================================================
              LEFT TOC
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-28">

              {tocItems.length > 0 && (
                <ArticleToc items={tocItems} />
              )}

            </div>

          </aside>


          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0">


            {/* CONTENT */}

            <div
              className="
                prose
                prose-lg
                max-w-none

                prose-headings:text-slate-950
                prose-headings:font-semibold

                prose-p:text-slate-700
                prose-p:leading-8

                prose-a:text-sky-700
                prose-a:font-medium

                prose-strong:text-slate-950

                prose-ul:text-slate-700
                prose-ol:text-slate-700

                prose-li:leading-7

                prose-blockquote:border-sky-500
                prose-blockquote:text-slate-700

                prose-img:rounded-2xl
                prose-img:w-full

                prose-h2:scroll-mt-28
                prose-h2:text-3xl
                prose-h2:mt-14

                prose-h3:text-2xl
                prose-h3:mt-10
              "
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />


            {/* DISCLAIMER */}

            <div className="mt-14 border-t border-slate-200 pt-8">

              <p className="text-sm leading-6 text-slate-500">

                This article is intended for general dental
                education and does not replace a professional
                dental examination or individualized medical
                advice.

              </p>

            </div>


            {/* CTA */}

            <section className="mt-14 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-10">

              <div className="max-w-2xl">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">

                  Hibir Specialty Dental Clinic

                </p>


                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">

                  Your oral health deserves attention.

                </h2>


                <p className="mt-5 text-[16px] leading-7 text-slate-300">

                  If you have been postponing a dental visit,
                  our team can help you understand your current
                  oral health and discuss appropriate treatment
                  options.

                </p>


                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    href="/appointment"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-50"
                  >

                    Book an Appointment

                    <ArrowRight className="h-4 w-4" />

                  </Link>


                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >

                    <MessageCircle className="h-4 w-4" />

                    Contact Us

                  </Link>

                </div>

              </div>

            </section>

          </article>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="hidden xl:block">

            <div className="sticky top-28">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">

                  Article

                </p>


                <div className="mt-5 space-y-4">

                  <div>

                    <p className="text-xs text-slate-400">
                      Reading time
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">

                      {readingMinutes} min read

                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">

                      {post.category ||
                        "Dental Health"}

                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Published
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">

                      {new Date(
                        publishedDate
                      ).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>


      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      {relatedPosts.length > 0 && (

        <section className="border-t border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

            <div className="mb-10 flex items-end justify-between gap-6">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">

                  Continue reading

                </p>


                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">

                  More from the Dental Journal

                </h2>

              </div>


              <Link
                href="/blog"
                className="hidden items-center gap-2 text-sm font-semibold text-sky-700 sm:flex"
              >

                View all articles

                <ArrowRight className="h-4 w-4" />

              </Link>

            </div>


            <div className="grid gap-6 md:grid-cols-3">

              {relatedPosts.map((related) => (

                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                >

                  {related.category && (
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-600">

                      {related.category}

                    </span>
                  )}


                  <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-950">

                    {related.title}

                  </h3>


                  {related.excerpt && (
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">

                      {related.excerpt}

                    </p>
                  )}


                  <div className="mt-6 flex items-center justify-between text-sm">

                    <span className="text-slate-400">

                      {related.published_at
                        ? new Date(
                            related.published_at
                          ).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : ""}

                    </span>


                    <span className="flex items-center gap-1 font-semibold text-sky-700 transition group-hover:gap-2">

                      Read article

                      <ArrowRight className="h-4 w-4" />

                    </span>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>

      )}

    </main>
  );
}