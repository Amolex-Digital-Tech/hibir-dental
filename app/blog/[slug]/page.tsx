// app/blog/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
} from "lucide-react";

import {
  BLOG_POSTS,
  getBlogPostBySlug,
} from "@/lib/data/blog";

import { ArticleToc } from "@/components/blog/ArticleToc";


/* =========================================================
   STATIC PARAMS
========================================================= */

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
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

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Hibir Specialty Dental Clinic",
    };
  }

  return {
    title: post.seoTitle,

    description: post.metaDescription,

    keywords: post.keywords,

    authors: [
      {
        name: post.author,
      },
    ],

    openGraph: {
      title: post.seoTitle,

      description: post.metaDescription,

      type: "article",

      publishedTime: post.publishedAt,

      modifiedTime: post.updatedAt ?? post.publishedAt,

      authors: [post.author],

      images: [
        {
          url: post.image,

          width: 1200,

          height: 630,

          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: post.seoTitle,

      description: post.metaDescription,

      images: [post.image],
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

  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }


  /* =======================================================
     TABLE OF CONTENTS
  ======================================================= */

  const tocItems = post.sections.map((section) => ({
    id: section.id,
    label: section.heading,
  }));


  /* =======================================================
     RELATED POSTS
  ======================================================= */

  const relatedPosts = BLOG_POSTS
    .filter(
      (item) =>
        item.slug !== post.slug &&
        item.category === post.category
    )
    .slice(0, 3);


  /* =======================================================
     READING TIME
  ======================================================= */

  const readingMinutes = post.readingTime
    .replace("min read", "")
    .trim();


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

          {/* Back link */}

          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Dental Journal
          </Link>


          {/* Category */}

          <div className="mb-6 flex items-center gap-3">

            <span className="rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
              {post.category}
            </span>

            {post.isFeatured && (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                Featured
              </span>
            )}

          </div>


          {/* Title */}

          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-7xl">
            {post.title}
          </h1>


          {/* Excerpt */}

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            {post.excerpt}
          </p>


          {/* Metadata */}

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-sky-600" />

              <span>{post.readingTime}</span>
            </div>


            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-sky-600" />

              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(
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

            <span>{post.author}</span>

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
          ARTICLE LAYOUT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_minmax(0,760px)] xl:grid-cols-[260px_minmax(0,780px)_220px]">


          {/* =================================================
              LEFT TOC
          ================================================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-28">

              <ArticleToc items={tocItems} />

            </div>

          </aside>


          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0">


            {/* INTRODUCTION */}

            <div className="mb-14">

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
                The conversation we need to have
              </p>

              <p className="text-xl leading-9 text-slate-700 sm:text-2xl sm:leading-10">
                {post.introduction}
              </p>

            </div>


            {/* KEY TAKEAWAYS */}

            <section className="mb-16 rounded-3xl border border-sky-100 bg-sky-50/70 p-7 sm:p-9">

              <div className="mb-6">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                  Before you continue
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  What you should know
                </h2>

              </div>


              <div className="space-y-4">

                {post.keyTakeaways.map(
                  (takeaway, index) => (

                    <div
                      key={index}
                      className="flex gap-4"
                    >

                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />

                      <p className="text-[15px] leading-7 text-slate-700">
                        {takeaway}
                      </p>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* ARTICLE SECTIONS */}

            <div className="space-y-16">

              {post.sections.map(
                (section, sectionIndex) => (

                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >

                    {/* Section number */}

                    <div className="mb-4 flex items-center gap-3">

                      <span className="text-xs font-bold tracking-[0.18em] text-sky-600">
                        {String(sectionIndex + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="h-px w-8 bg-sky-200" />

                    </div>


                    {/* Heading */}

                    <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-slate-950 sm:text-4xl">
                      {section.heading}
                    </h2>


                    {/* Paragraphs */}

                    <div className="mt-7 space-y-6">

                      {section.paragraphs.map(
                        (paragraph, index) => {

                          const isShortStatement =
                            paragraph.length < 90 &&
                            (
                              paragraph.includes(
                                "“"
                              ) ||
                              paragraph.includes(
                                "→"
                              ) ||
                              paragraph.includes(
                                "peace of mind"
                              ) ||
                              paragraph.includes(
                                "The earlier"
                              )
                            );


                          if (isShortStatement) {

                            return (
                              <blockquote
                                key={index}
                                className="my-8 border-l-2 border-sky-500 pl-6 text-xl font-medium leading-8 text-slate-800"
                              >
                                {paragraph}
                              </blockquote>
                            );

                          }


                          return (
                            <p
                              key={index}
                              className="text-[17px] leading-8 text-slate-700"
                            >
                              {paragraph}
                            </p>
                          );

                        }
                      )}

                    </div>


                    {/* Bullets */}

                    {section.bullets &&
                      section.bullets.length > 0 && (

                        <ul className="mt-8 space-y-4">

                          {section.bullets.map(
                            (bullet, index) => (

                              <li
                                key={index}
                                className="flex gap-4 text-[16px] leading-7 text-slate-700"
                              >

                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-500" />

                                <span>
                                  {bullet}
                                </span>

                              </li>

                            )
                          )}

                        </ul>

                      )}

                  </section>

                )
              )}

            </div>


            {/* =================================================
                FAQ
            ================================================= */}

            {post.faqs.length > 0 && (

              <section
                id="faq"
                className="mt-20 scroll-mt-28 border-t border-slate-200 pt-16"
              >

                <div className="mb-10">

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                    Common questions
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                    Frequently Asked Questions
                  </h2>

                </div>


                <div className="divide-y divide-slate-200 border-y border-slate-200">

                  {post.faqs.map(
                    (faq, index) => (

                      <details
                        key={index}
                        className="group py-6"
                      >

                        <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-slate-900 marker:hidden">
                          <div className="flex items-start justify-between gap-5">

                            <span>
                              {faq.question}
                            </span>

                            <span className="text-sky-600 transition-transform group-open:rotate-45">
                              +
                            </span>

                          </div>
                        </summary>


                        <p className="mt-4 max-w-2xl text-[16px] leading-7 text-slate-600">
                          {faq.answer}
                        </p>

                      </details>

                    )
                  )}

                </div>

              </section>

            )}


            {/* =================================================
                DISCLAIMER
            ================================================= */}

            <div className="mt-14 border-t border-slate-200 pt-8">

              <p className="text-sm leading-6 text-slate-500">
                This article is intended for general dental
                education and does not replace a professional
                dental examination or individualized medical
                advice.
              </p>

            </div>


            {/* =================================================
                CTA
            ================================================= */}

            <section className="mt-14 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-10">

              <div className="max-w-2xl">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                  Hibir Specialty Dental Clinic
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your mouth does not need to be in pain before it deserves attention.
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
                      {post.readingTime}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Category
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {post.category}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs text-slate-400">
                      Published
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {new Date(
                        post.publishedAt
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
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
                >

                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-600">
                    {related.category}
                  </span>


                  <h3 className="mt-4 text-xl font-semibold leading-tight text-slate-950">
                    {related.title}
                  </h3>


                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                    {related.excerpt}
                  </p>


                  <div className="mt-6 flex items-center justify-between text-sm">

                    <span className="text-slate-400">
                      {related.readingTime}
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