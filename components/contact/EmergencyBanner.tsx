"use client";

import { AlertTriangle, Phone, MessageSquare } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function EmergencyBanner() {
  return (
    <section className="py-16 bg-amber-50 border-y border-amber-200 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-900 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Need Immediate Dental Care?</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              If you're experiencing severe tooth pain, trauma, or another dental emergency, contact our clinic as soon as possible.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          <a
            href={`tel:${CLINIC_CONTACT.phone}`}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" /> Call Now
          </a>
          <a
            href={`https://wa.me/${CLINIC_CONTACT.phone.replace(/[^0-9]/g, "")}`}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}