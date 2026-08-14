import { ChevronDown } from "lucide-react";

interface ArticleFaqItem {
  question: string;
  answer: string;
}

interface ArticleFaqProps {
  faqs?: ArticleFaqItem[];
}

export function ArticleFaq({ faqs = [] }: ArticleFaqProps) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Common Questions
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Here are some common questions patients ask about this topic.
            Individual treatment recommendations should always be based on a
            professional dental assessment.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-bold text-slate-900">
                <span>{faq.question}</span>

                <ChevronDown className="w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-6">
                <p className="text-sm md:text-base leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}