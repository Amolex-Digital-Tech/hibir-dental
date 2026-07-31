"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar, Sparkles } from "lucide-react";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { FOOTER_SERVICES, FOOTER_CLINIC, FOOTER_PATIENT_SUPPORT } from "@/lib/data/footer";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-sky-50 py-8 sm:py-12 px-3 sm:px-6 overflow-hidden">
      {/* Subtle Dental Watermark / Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />

      {/* Full Width Luxury Container */}
      <div className="relative w-full rounded-[36px] sm:rounded-[48px] border border-slate-200/80 bg-white/90 backdrop-blur-md p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/50">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Official Branding Logo */}
              <Link href="/" className="inline-block mb-3">
                <Image
                  src="/branding/logo-blue.png"
                  alt="Hibir Specialty Dental Clinic"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full">
                  Committed to Excellence
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
              Providing exceptional dental care through advanced technology, experienced specialists, and personalized treatment solutions designed around every patient's smile.
            </p>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Connect With Us</p>
              <SocialLinks />
            </div>

            {/* Contact Mini Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-white border border-sky-100 flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Need an Appointment?</p>
                  <a href={`tel:${CLINIC_CONTACT.phone}`} className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors">
                    {CLINIC_CONTACT.phone}
                  </a>
                </div>
              </div>

              <Link
                href="/appointment"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Now
              </Link>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4 lg:pt-0">
            {/* Column 1: Services */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                {FOOTER_SERVICES.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {FOOTER_SERVICES.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-sky-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Clinic */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                {FOOTER_CLINIC.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {FOOTER_CLINIC.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-sky-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Patient Support */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                {FOOTER_PATIENT_SUPPORT.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {FOOTER_PATIENT_SUPPORT.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-sky-600 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section Divider & Legal Links */}
        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Hibir Specialty Dental Clinic. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="text-slate-400 font-medium">
              Powered by <span className="text-sky-700 font-semibold">Amolex Digital Tech PLC</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-sky-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sky-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-sky-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}