"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dr. Henok and his team completely changed my perspective on dental visits. The implant procedure was smooth, pain-free, and the results look completely natural!",
    author: "Selamawit T.",
    role: "Verified Patient",
    rating: 5,
  },
  {
    quote:
      "I got clear aligners here and the whole experience was fantastic. State-of-the-art clinic with very professional doctors who take time to explain everything.",
    author: "Amanuel K.",
    role: "Orthodontic Patient",
    rating: 5,
  },
  {
    quote:
      "Extremely clean and modern dental clinic in Addis. The staff is warm and compassionate, and emergency appointments are handled very quickly.",
    author: "Helen B.",
    role: "Verified Patient",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sky-600 font-semibold text-sm tracking-wider uppercase bg-sky-100/80 px-3.5 py-1.5 rounded-full">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Loved by Our Patients
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Our patients appreciate our professional approach, comfortable environment, and commitment to providing personalized dental solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-sky-600/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-sky-500/30" />
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{item.author}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}