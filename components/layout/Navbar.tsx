"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Calendar,
  LogIn,
} from "lucide-react";

import { navigation } from "@/constants/navigation";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-3 border-b border-slate-200/50"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">

          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <Image
              src="/branding/logo-blue.png"
              alt="Hibir Specialty Dental Clinic"
              width={200}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>


          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-full border border-slate-200/60">

            {navigation.map((item) => {

              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}

          </nav>


          {/* =====================================================
              DESKTOP ACTIONS
          ===================================================== */}

          <div className="hidden lg:flex items-center gap-3">

            {/* Call */}

            <a
              href="tel:+251900000000"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-600" />

              <span>Call Us</span>
            </a>


            {/* Divider */}

            <div className="h-5 w-px bg-slate-200" />


            {/* Admin Login */}

            <Link
              href="/admin/login"
              className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-500 transition-all hover:bg-sky-50 hover:text-sky-700"
            >
              <LogIn className="w-4 h-4 text-sky-500 transition-transform group-hover:translate-x-0.5" />

              <span>Admin Login</span>
            </Link>


            {/* Book Now */}

            <Link
              href="/appointment"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-sky-600/25 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />

              <span>Book Now</span>
            </Link>

          </div>


          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            className="lg:hidden p-2 text-slate-700 hover:text-sky-600 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </Container>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>

        {mobileMenuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >

            <Container className="py-6 flex flex-col gap-4">

              {/* Navigation */}

              <nav className="flex flex-col gap-1">

                {navigation.map((item) => {

                  const isActive =
                    pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-sky-50 text-sky-600 font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}

              </nav>


              {/* Mobile actions */}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">

                {/* Call */}

                <a
                  href="tel:+251900000000"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Phone className="w-4 h-4 text-sky-600" />

                  Call Us
                </a>


                {/* Book */}

                <Link
                  href="/appointment"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white py-3 rounded-xl font-medium shadow-md"
                >
                  <Calendar className="w-4 h-4" />

                  Book Appointment
                </Link>


                {/* Admin Login */}

                <Link
                  href="/admin/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
                >
                  <LogIn className="w-4 h-4" />

                  Admin Login
                </Link>

              </div>

            </Container>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}