"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function ContactCards() {
  const cards = [
    {
      title: "Call Us",
      subtitle: CLINIC_CONTACT.phone,
      action: `tel:${CLINIC_CONTACT.phone}`,
      icon: Phone,
      btnText: "Call Now",
    },
    {
      title: "Email",
      subtitle: CLINIC_CONTACT.email,
      action: `mailto:${CLINIC_CONTACT.email}`,
      icon: Mail,
      btnText: "Send Mail",
    },
    {
      title: "Visit Us",
      subtitle: `${CLINIC_CONTACT.address.line1}, ${CLINIC_CONTACT.address.line2}`,
      action: "#map",
      icon: MapPin,
      btnText: "View Map",
    },
    {
      title: "WhatsApp",
      subtitle: "Instant messaging & inquiries",
      action: `https://wa.me/${CLINIC_CONTACT.phone.replace(/[^0-9]/g, "")}`,
      icon: MessageSquare,
      btnText: "Start Chat",
    },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.title}
                href={c.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(255, 153, 0, 0.12)", color: "#d97706" }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed truncate">{c.subtitle}</p>
                </div>
                <span className="mt-6 text-xs font-bold text-amber-600 group-hover:underline flex items-center gap-1">
                  {c.btnText} →
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}