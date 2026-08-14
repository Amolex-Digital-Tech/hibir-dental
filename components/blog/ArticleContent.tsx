"use client";

import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/data/blog";

interface ArticleContentProps {
  post: BlogPost;
}

export function ArticleContent({
  post,
}: ArticleContentProps) {
  return (
    <article>

      {/* Introduction */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-medium">
          {post.introduction}
        </p>
      </motion.div>


      {/* Key Takeaways */}

      {post.keyTakeaways &&
        post.keyTakeaways.length > 0 && (
          <section className="mb-14 rounded-2xl border border-sky-100 bg-sky-50/60 p-6 md:p-8">

            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Key Takeaways
            </h2>

            <ul className="space-y-3">

              {post.keyTakeaways.map((takeaway) => (
                <li
                  key={takeaway}
                  className="flex gap-3 text-sm md:text-base text-slate-700 leading-relaxed"
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-sky-500 shrink-0" />

                  <span>{takeaway}</span>
                </li>
              ))}

            </ul>

          </section>
        )}


      {/* Article Sections */}

      <div className="space-y-12">

        {post.sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.45,
            }}
            className="scroll-mt-28"
          >

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-5">
              {section.heading}
            </h2>

            <div className="space-y-5">

              {section.paragraphs.map(
                (paragraph, paragraphIndex) => (
                  <p
                    key={`${section.id}-paragraph-${paragraphIndex}`}
                    className="text-base md:text-lg leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>
                )
              )}

            </div>


            {section.bullets &&
              section.bullets.length > 0 && (
                <ul className="mt-6 space-y-3 pl-1">

                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-base leading-7 text-slate-600"
                    >
                      <span className="mt-3 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />

                      <span>{bullet}</span>
                    </li>
                  ))}

                </ul>
              )}

          </motion.section>
        ))}

      </div>


      {/* FAQ */}

      {post.faqs &&
        post.faqs.length > 0 && (
          <section
            id="frequently-asked-questions"
            className="mt-16 pt-12 border-t border-slate-200 scroll-mt-28"
          >

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">

              {post.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white border border-slate-200 p-6"
                >

                  <h3 className="text-lg font-bold text-slate-900">
                    {faq.question}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {faq.answer}
                  </p>

                </div>
              ))}

            </div>

          </section>
        )}


      {/* Medical Disclaimer */}

      <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-100/70 p-6">

        <p className="text-xs md:text-sm leading-6 text-slate-500">
          <strong className="text-slate-700">
            Medical information:
          </strong>{" "}
          The information provided in this article is intended for
          general educational purposes and should not be considered
          a substitute for an individual dental examination,
          diagnosis, or professional medical advice. Dental
          conditions and treatment recommendations vary from
          patient to patient.
        </p>

      </div>

    </article>
  );
}