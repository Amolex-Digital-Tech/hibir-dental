"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CLINIC_CONTACT } from "@/lib/data/contact";

export function ClinicInfo() {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
      <h2 className="text-xl font-bold text-amber-400">
        Clinic Information
      </h2>

      <div className="space-y-4 text-sm">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

          <div>
            <h4 className="font-bold text-white">Address</h4>

            <a
              href={CLINIC_CONTACT.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-300 text-xs mt-0.5 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Hibir Specialty Dental Clinic
              <br />
              {CLINIC_CONTACT.address.line1}
              <br />
              {CLINIC_CONTACT.address.line2}
              <br />
              {CLINIC_CONTACT.address.city}
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

          <div>
            <h4 className="font-bold text-white">Phone</h4>

            <p className="text-slate-300 text-xs mt-0.5">
              {CLINIC_CONTACT.phone}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

          <div>
            <h4 className="font-bold text-white">Email</h4>

            <p className="text-slate-300 text-xs mt-0.5">
              {CLINIC_CONTACT.email}
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />

          <div>
            <h4 className="font-bold text-white">Working Hours</h4>

            <div className="mt-1 space-y-1">
              <p className="text-slate-300 text-xs">
                <span className="font-medium text-white">
                  Monday – Friday:
                </span>{" "}
                2:00 LT – 11:00 LT
              </p>

              <p className="text-slate-300 text-xs">
                <span className="font-medium text-white">
                  Saturday:
                </span>{" "}
                2:00 LT – 06:00 LT
              </p>

              <p className="text-slate-400 text-xs">
                <span className="font-medium text-slate-300">
                  Sunday:
                </span>{" "}
                Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}