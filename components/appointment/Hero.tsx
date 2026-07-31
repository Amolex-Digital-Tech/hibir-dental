"use client";

import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function Hero() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-sky-100/60">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/80 rounded-full"
        >
          Simple & Fast Booking
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          Book Your <span className="text-sky-600">Appointment</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          Take the first step toward a healthier, more confident smile. Schedule your visit with our experienced dental specialists at a time that works best for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`tel:${CLINIC_CONTACT.phone}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <a
            href={`https://wa.me/${CLINIC_CONTACT.phone.replace(/[^0-9]/g, "")}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-sky-600" /> WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}