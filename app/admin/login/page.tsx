"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  HeartPulse,
  Sparkles,
  Activity,
  Stethoscope,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    // Verify that this authenticated user is actually an admin.
    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();

      setError("You do not have administrator access.");
      setLoading(false);
      return;
    }

    router.push("/admin/appointments");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50 px-5 py-12">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large soft blue circles */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-blue-200/40 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-3xl" />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0284c7 1px, transparent 1px), linear-gradient(90deg, #0284c7 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* =================================================
            DENTAL DECORATION — TOP LEFT
        ================================================= */}

        <div className="absolute left-[8%] top-[15%] hidden rotate-[-12deg] lg:block">

          <div className="relative flex h-24 w-20 items-center justify-center rounded-[45%_45%_48%_48%] border-2 border-sky-200/60 bg-white/50 shadow-lg shadow-sky-100/30">

            <div className="h-10 w-8 rounded-[45%] border-2 border-sky-200/70 bg-sky-50/60" />

            <Sparkles className="absolute -right-5 -top-5 h-5 w-5 text-sky-300" />

          </div>

        </div>

        {/* =================================================
            DENTAL DECORATION — RIGHT
        ================================================= */}

        <div className="absolute right-[8%] top-[20%] hidden rotate-[15deg] lg:block">

          <div className="flex h-20 w-16 items-center justify-center rounded-[48%_48%_45%_45%] border-2 border-blue-200/50 bg-white/50 shadow-xl shadow-blue-100/30">

            <div className="h-8 w-6 rounded-[45%] border-2 border-blue-200/60 bg-blue-50/50" />

          </div>

          <div className="absolute -bottom-6 -left-5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
            <HeartPulse className="h-4 w-4 text-sky-400" />
          </div>

        </div>

        {/* =================================================
            SECURITY DECORATION — BOTTOM LEFT
        ================================================= */}

        <div className="absolute bottom-[16%] left-[9%] hidden lg:block">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white/70 shadow-lg shadow-emerald-100/30">

            <ShieldCheck className="h-8 w-8 text-emerald-400" />

          </div>

        </div>

        {/* =================================================
            MEDICAL DECORATION — BOTTOM RIGHT
        ================================================= */}

        <div className="absolute bottom-[15%] right-[9%] hidden lg:block">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-100 bg-white/70 shadow-lg shadow-sky-100/30">

            <Stethoscope className="h-7 w-7 text-sky-400" />

          </div>

        </div>

        {/* Small floating dots */}
        <div className="absolute left-[25%] top-[18%] h-2 w-2 rounded-full bg-sky-300/60" />
        <div className="absolute right-[27%] top-[12%] h-3 w-3 rounded-full bg-blue-300/40" />
        <div className="absolute bottom-[20%] left-[28%] h-2 w-2 rounded-full bg-emerald-300/60" />
        <div className="absolute bottom-[27%] right-[26%] h-2 w-2 rounded-full bg-sky-300/50" />

      </div>

      {/* =====================================================
          LOGIN CONTAINER
      ===================================================== */}

      <div className="relative z-10 w-full max-w-md">

        {/* Top security label */}

        <div className="mb-5 flex justify-center">

          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[11px] font-semibold text-emerald-700">
              Secure Administrative Access
            </span>

          </div>

        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="rounded-[2rem] border border-sky-100 bg-white/95 p-7 shadow-[0_30px_80px_-30px_rgba(14,116,144,0.30)] backdrop-blur-xl sm:p-9">

          {/* Logo */}

          <div className="flex justify-center">

            <div className="relative flex h-20 w-48 items-center justify-center">

              <Image
                src="/branding/logo-blue.png"
                alt="Hibir Specialty Dental Clinic"
                width={220}
                height={90}
                priority
                className="h-auto max-h-20 w-auto object-contain"
              />

            </div>

          </div>

          {/* Heading */}

          <div className="mt-4 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 text-sky-600 shadow-sm ring-1 ring-sky-100">

              <LockKeyhole className="h-5 w-5" />

            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Admin Portal
            </h1>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Securely sign in to manage appointments,
              patients and your dental journal.
            </p>

          </div>

          {/* =================================================
              SECURITY FEATURES
          ================================================= */}

          <div className="mt-6 grid grid-cols-2 gap-2">

            <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5">

              <ShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />

              <span className="text-[10px] font-semibold text-sky-700">
                Protected Access
              </span>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5">

              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

              <span className="text-[10px] font-semibold text-emerald-700">
                Secure Session
              </span>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleLogin} className="mt-7 space-y-5">

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />

            </div>

            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />

                {/* Eye button */}

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-sky-50 hover:text-sky-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>

              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">

                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />

                <p>{error}</p>

              </div>
            )}

            {/* Login button */}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition-all hover:-translate-y-0.5 hover:from-sky-600 hover:to-blue-700 hover:shadow-xl hover:shadow-sky-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}

            </button>

          </form>

          {/* =================================================
              SECURITY FOOTER
          ================================================= */}

          <div className="mt-7 border-t border-slate-100 pt-6">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                <ShieldCheck className="h-4 w-4" />

              </div>

              <div>

                <p className="text-xs font-semibold text-slate-700">
                  Protected clinic workspace
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Your administrative session is authenticated
                  and protected before access to clinic data is granted.
                </p>

              </div>

            </div>

          </div>

          {/* Small medical status */}

          <div className="mt-5 flex items-center justify-center gap-2">

            <Activity className="h-3.5 w-3.5 text-sky-400" />

            <span className="text-[10px] font-medium text-slate-400">
              Hibir Specialty Dental Clinic • Secure Portal
            </span>

          </div>

        </div>

        {/* Bottom text */}

        <div className="mt-5 flex items-center justify-center gap-2 text-center">

          <HeartPulse className="h-3.5 w-3.5 text-sky-300" />

          <p className="text-[11px] text-slate-400">
            Caring for patients. Protecting their information.
          </p>

        </div>

      </div>

    </main>
  );
}