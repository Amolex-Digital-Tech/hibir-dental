"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
      <div className="mb-8">
        <span className="font-bold uppercase text-xs tracking-widest text-amber-600 block mb-1">
          Online Inquiry
        </span>
        <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
        <p className="text-slate-500 text-xs mt-1">Fill out the form below and our clinic staff will get back to you shortly.</p>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-amber-50 rounded-2xl border border-amber-200 my-8">
          <CheckCircle2 className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">Message Sent Successfully</h3>
          <p className="text-xs text-slate-600 mt-1">Thank you for reaching out to Hibir Specialty Dental Clinic. We will contact you soon!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input required type="text" placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input required type="tel" placeholder="+251 9..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Needed</label>
              <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500 text-slate-700">
                <option value="">General Consultation</option>
                <option value="cosmetic">Cosmetic Dentistry</option>
                <option value="implants">Dental Implants</option>
                <option value="orthodontics">Orthodontics (Braces)</option>
                <option value="pediatric">Children's Dentistry</option>
                <option value="emergency">Emergency Care</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500 text-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
              <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500 text-slate-700">
                <option value="morning">Morning (2:00 LT - 6:00 LT)</option>
                <option value="afternoon">Afternoon (6:00 LT - 11:00 LT)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Details</label>
            <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
          >
            <Send className="w-4 h-4" /> Send Inquiry
          </button>
        </form>
      )}
    </div>
  );
}