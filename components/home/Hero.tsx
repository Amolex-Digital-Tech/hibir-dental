"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ShieldCheck, Star, Award, ArrowRight, Sparkles, Activity } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/50 to-indigo-100/60 text-slate-900">
      {/* Vibrant Background Glassmorphism Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-400/30 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-sky-400/25 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-indigo-300/30 rounded-full blur-[90px] pointer-events-none -z-10" />
      
      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c710_1px,transparent_1px),linear-gradient(to_bottom,#0284c710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Bright Glass Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 border border-white/80 backdrop-blur-md text-sky-700 text-xs md:text-sm font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>LEADING DENTAL SPECIALTY CLINIC IN ADDIS ABABA</span>
            </div>

            {/* Main Heading with Bright Gradients */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900">
              Healthy Smiles Begin With <br className="hidden sm:block" />
              for Your <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Professional Dental Care</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              At Hibir Dental Care Service, we provide comprehensive dental solutions designed around your comfort, health, and confidence. Our experienced team combines modern techniques with personalized care to help you maintain a healthy and beautiful smile.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/appointment"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/80 hover:bg-white border border-white/80 backdrop-blur-xl text-slate-700 font-semibold px-8 py-4 rounded-2xl shadow-sm hover:border-sky-200 transition-all text-base"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-sky-600" />
              </Link>
            </div>

            {/* Trust Markers - Bright Frosted Glass Cards */}
            <div className="pt-8 border-t border-sky-100 grid grid-cols-3 gap-3 md:gap-4 text-left">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-md shadow-sm">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm md:text-base">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Sterilized & Safe</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-md shadow-sm">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm md:text-base">15+ Yrs</p>
                  <p className="text-xs text-slate-500 font-medium">Specialist Exp</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-md shadow-sm">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-sm md:text-base">500+</p>
                  <p className="text-xs text-slate-500 font-medium">Happy Patients</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bright Frosted Glass Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Glow Ring Backdrop */}
            <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-tr from-sky-400/40 via-blue-400/30 to-cyan-300/40 blur-xl opacity-70" />

            <div className="relative mx-auto max-w-md lg:max-w-none rounded-[28px] bg-white/40 border border-white/80 p-2 backdrop-blur-2xl shadow-2xl overflow-hidden">
              <div className="bg-white/70 rounded-[22px] p-8 text-slate-900 space-y-6 border border-white/60 shadow-inner">
                
                {/* Header inside card */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-700 text-xs font-bold uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Specialized Dentistry</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Modern Dentistry With Personalized Care</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    We combine advanced dental technology with professional clinical expertise to deliver accurate diagnosis, effective treatments, and a comfortable patient experience.
                  </p>
                </div>

                {/* Sub-glass Card */}
                <div className="p-4 rounded-2xl bg-white/80 border border-white/90 backdrop-blur-md space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-semibold">Next Available Slot</span>
                    <span className="text-emerald-700 font-bold bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 rounded-full text-xs">
                      Today Open
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/75 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-500 to-emerald-500 w-4/5 h-full rounded-full" />
                  </div>
                  <p className="text-xs text-slate-500">For urgent dental concerns and consultations, our team is available to assist you.</p>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}