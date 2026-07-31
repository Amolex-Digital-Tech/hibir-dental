"use client";

import { ExternalLink, Navigation } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function Map() {
  const mapUrl = "https://maps.google.com/?q=Piassa+Addis+Ababa";

  return (
    <section id="map" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">Location</span>
            <h2 className="text-2xl font-bold text-slate-900">Find Our Clinic</h2>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors w-fit"
          >
            <Navigation className="w-4 h-4 text-amber-600" /> Get Directions <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <div className="h-96 rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center text-slate-400 shadow-sm">
          <iframe
            title="Clinic Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=Piassa,%20Addis%20Ababa,%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </div>
    </section>
  );
}