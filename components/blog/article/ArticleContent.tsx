import type { BlogPost } from "@/lib/data/blog";


interface ArticleContentProps {
  post: BlogPost;
}


export function ArticleContent({
  post,
}: ArticleContentProps) {

  return (
    <section className="py-16 md:py-24 bg-white">

      <div className="max-w-4xl mx-auto px-6">

        {/* Introduction */}

        <div className="mb-14">

          <p className="text-lg md:text-xl leading-relaxed text-slate-700">
            {post.introduction}
          </p>

        </div>


        {/* Key Takeaways */}

        {post.keyTakeaways.length > 0 && (

          <aside className="mb-16 rounded-3xl border border-sky-100 bg-sky-50/70 p-7 md:p-9">

            <h2 className="text-xl font-extrabold text-slate-900 mb-5">
              Key Takeaways
            </h2>

            <ul className="space-y-3">

              {post.keyTakeaways.map((takeaway) => (

                <li
                  key={takeaway}
                  className="flex gap-3 text-sm md:text-base leading-relaxed text-slate-700"
                >

                  <span className="mt-2 w-2 h-2 shrink-0 rounded-full bg-sky-500" />

                  <span>
                    {takeaway}
                  </span>

                </li>

              ))}

            </ul>

          </aside>

        )}


        {/* Table of Contents */}

        {post.sections.length > 0 && (

          <nav
            aria-label="Article contents"
            className="mb-16 rounded-3xl border border-slate-200 bg-slate-50 p-7 md:p-9"
          >

            <h2 className="text-lg font-extrabold text-slate-900 mb-5">
              In This Article
            </h2>

            <ol className="space-y-3">

              {post.sections.map((section, index) => (

                <li key={section.id}>

                  <a
                    href={`#${section.id}`}
                    className="group flex gap-3 text-sm text-slate-600 hover:text-sky-600 transition-colors"
                  >

                    <span className="font-bold text-slate-400 group-hover:text-sky-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      {section.heading}
                    </span>

                  </a>

                </li>

              ))}

            </ol>

          </nav>

        )}


        {/* Main Article */}

        <article className="prose prose-slate prose-lg max-w-none">

          {post.sections.map((section) => (

            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 mb-14"
            >

              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
                {section.heading}
              </h2>


              <div className="space-y-5">

                {section.paragraphs.map((paragraph, index) => (

                  <p
                    key={`${section.id}-${index}`}
                    className="text-base md:text-lg leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>

                ))}

              </div>


              {section.bullets &&
                section.bullets.length > 0 && (

                  <ul className="mt-7 space-y-3">

                    {section.bullets.map((bullet) => (

                      <li
                        key={bullet}
                        className="flex gap-3 text-base leading-7 text-slate-700"
                      >

                        <span className="mt-3 w-2 h-2 shrink-0 rounded-full bg-amber-500" />

                        <span>
                          {bullet}
                        </span>

                      </li>

                    ))}

                  </ul>

                )}

            </section>

          ))}

        </article>

      </div>

    </section>
  );
}