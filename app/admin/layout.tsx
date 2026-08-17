"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  CalendarDays,
  CalendarRange,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: admin } = await supabase
        .from("admin_users")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!admin) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      if (mounted) {
        setCheckingAuth(false);
      }
    }

    checkAdmin();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    setSigningOut(true);

    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  /*
   * Login page gets no admin sidebar/header.
   */
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  /*
   * Prevent admin UI from flashing
   * before authentication is checked.
   */
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="flex flex-col items-center">

          <div className="relative mb-5 h-16 w-44">
            <Image
              src="/branding/logo-blue.png"
              alt="Hibir Specialty Dental Clinic"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-sky-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-sky-500" />
          </div>

          <p className="mt-4 text-xs font-medium text-slate-400">
            Securing admin portal...
          </p>

        </div>
      </div>
    );
  }

  /*
   * ADMIN NAVIGATION
   */
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments",
      href: "/admin/appointments",
      icon: CalendarDays,
    },
    {
      name: "Calendar",
      href: "/admin/calendar",
      icon: CalendarRange,
    },
    {
      name: "Dental Journal",
      href: "/admin/blog",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50/70 via-white to-blue-50/50 text-slate-900">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-col
          border-r border-sky-100
          bg-white/95
          shadow-[10px_0_40px_-30px_rgba(14,116,144,0.35)]
          backdrop-blur-xl
          transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =================================================
            BRAND
        ================================================= */}

        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">

          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className="relative h-12 w-40"
          >
            <Image
              src="/branding/logo-blue.png"
              alt="Hibir Specialty Dental Clinic"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* =================================================
            ADMIN BADGE
        ================================================= */}

        <div className="px-5 pt-6">

          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">
                  Admin Portal
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Hibir Specialty Dental
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="flex-1 px-4 py-7">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Management
          </p>

          <div className="space-y-1.5">

            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center justify-between
                    rounded-xl px-3.5 py-3
                    text-sm font-semibold
                    transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-100"
                        : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
                    }
                  `}
                >

                  <span className="flex items-center gap-3">

                    <span
                      className={`
                        flex h-9 w-9 items-center justify-center rounded-lg
                        ${
                          isActive
                            ? "bg-white/15"
                            : "bg-slate-50 group-hover:bg-white"
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    {item.name}

                  </span>

                  <ChevronRight
                    className={`
                      h-4 w-4 transition-transform
                      ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                      }
                    `}
                  />

                </Link>
              );
            })}

          </div>

          {/* =================================================
              WEBSITE SHORTCUT
          ================================================= */}

          <div className="mt-8 border-t border-slate-100 pt-6">

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Website
            </p>

            <Link
              href="/"
              target="_blank"
              className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-sky-700"
            >

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 group-hover:bg-sky-50">
                <ExternalLink className="h-4 w-4" />
              </span>

              View Website

            </Link>

          </div>

        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div className="border-t border-slate-100 p-4">

          <button
            onClick={handleLogout}
            disabled={signingOut}
            className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-60"
          >

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 transition group-hover:bg-rose-100">
              <LogOut className="h-4 w-4" />
            </span>

            {signingOut ? "Signing out..." : "Sign Out"}

          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <div className="lg:pl-[270px]">

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header className="sticky top-0 z-30 border-b border-sky-100/80 bg-white/85 backdrop-blur-xl">

          <div className="flex h-20 items-center justify-between px-5 sm:px-8">

            <div className="flex items-center gap-4">

              {/* Mobile menu */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600">
                  Hibir Specialty Dental Clinic
                </p>

                <h1 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">
                  Administration
                </h1>
              </div>

            </div>

            {/* =================================================
                HEADER STATUS
            ================================================= */}

            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2">

                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-emerald-700">
                  System Online
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="min-h-[calc(100vh-5rem)]">
          {children}
        </main>

      </div>

    </div>
  );
}