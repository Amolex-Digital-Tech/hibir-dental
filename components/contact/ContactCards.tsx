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
      action: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        CLINIC_CONTACT.email
      )}`,
      icon: Mail,
      btnText: "Send Mail",
    },
    {
      title: "Visit Us",
      subtitle: `${CLINIC_CONTACT.address.line1}, ${CLINIC_CONTACT.address.line2}`,
      action:
        "https://www.google.com/maps/place/Hibr+Special+Dental+Care+Service/@9.0291987,38.7514604,2267m/data=!3m2!1e3!4b1!4m6!3m5!1s0x164b857f38d5dba7:0xe42eb576e484274!8m2!3d9.0291987!4d38.7540353!16s%2Fg%2F11mrdpg1b_!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",
      icon: MapPin,
      btnText: "View Map",
    },
    {
      title: "WhatsApp",
      subtitle: "Instant messaging & inquiries",
      action: `https://wa.me/${CLINIC_CONTACT.phone.replace(
        /[^0-9]/g,
        ""
      )}`,
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
                target={
                  c.title === "Email" ||
                  c.title === "Visit Us" ||
                  c.title === "WhatsApp"
                    ? "_blank"
                    : undefined
                }
                rel={
                  c.title === "Email" ||
                  c.title === "Visit Us" ||
                  c.title === "WhatsApp"
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: "rgba(255, 153, 0, 0.12)",
                      color: "#d97706",
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed truncate">
                    {c.subtitle}
                  </p>
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