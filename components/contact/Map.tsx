"use client";

import { ExternalLink, Navigation, MapPin } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function Map() {
  const mapUrl =
    "https://www.google.com/maps/place/Hibr+Special+Dental+Care+Service/data=!4m2!3m1!1s0x0:0xe42eb576e484274?sa=X&ved=1t:2428&ictx=111&cshid=1786980028774335";

  return (
    <section id="map" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">
              Location
            </span>

            <h2 className="text-2xl font-bold text-slate-900">
              Find Our Clinic
            </h2>
          </div>

          {/* Get Directions Button */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors w-fit"
          >
            <Navigation className="w-4 h-4 text-amber-600" />

            Get Directions

            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Clickable Location Box */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Hibr Special Dental Care Service on Google Maps"
          className="group relative block h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 cursor-pointer"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300" />

          {/* Map-style decorative grid */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(100,116,139,0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(100,116,139,0.15) 1px, transparent 1px)
              `,
              backgroundSize: "45px 45px",
            }}
          />

          {/* Decorative roads */}
          <div className="absolute w-[140%] h-8 bg-white/70 rotate-[18deg] top-28 -left-20 shadow-sm" />

          <div className="absolute w-[130%] h-6 bg-white/60 -rotate-[28deg] bottom-28 -left-10 shadow-sm" />

          <div className="absolute w-6 h-[140%] bg-white/50 rotate-[12deg] top-[-80px] right-40" />

          {/* Location marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Pulse */}
                <span className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />

                {/* Marker */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-white shadow-xl border-4 border-white transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="h-7 w-7" />
                </div>
              </div>

              {/* Clinic label */}
              <div className="mt-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg px-6 py-4 text-center transition-all duration-300 group-hover:-translate-y-1">
                <p className="text-sm font-bold text-slate-900">
                  Hibr Special Dental Care Service
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Click to open in Google Maps
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-900">
              <Navigation className="h-3.5 w-3.5" />

              Open Location

              <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}