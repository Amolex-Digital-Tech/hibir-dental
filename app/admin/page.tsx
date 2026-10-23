
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
  BookOpen,
  Activity,
  ChevronRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Appointment = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
};

type BlogPost = {
  id: string | number;
  title: string;
  slug: string;
  status: string;
  created_at?: string;
  published_at?: string;
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  const [stats, setStats] = useState({
    today: 0,
    pending: 0,
    confirmed: 0,
    published: 0,
  });

  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    await Promise.all([loadAppointments(), loadBlogPosts()]);
  }

  /*
   * LOAD APPOINTMENTS
   */
  async function loadAppointments() {
    setLoadingAppointments(true);

    try {
      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          id,
          first_name,
          last_name,
          phone,
          service,
          appointment_date,
          appointment_time,
          status
          `
        )
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

      if (error) {
        console.error("Error loading appointments:", error);
        setAppointments([]);
        setStats((previous) => ({
          ...previous,
          today: 0,
          pending: 0,
          confirmed: 0,
        }));
        return;
      }

      const appointmentData = (data ?? []) as Appointment[];

      setAppointments(appointmentData);

      const todayAppointments = appointmentData.filter(
        (appointment: Appointment) =>
          appointment.appointment_date === today
      );

      const pending = appointmentData.filter(
        (appointment: Appointment) =>
          appointment.status?.toLowerCase() === "pending"
      );

      const confirmed = appointmentData.filter(
        (appointment: Appointment) =>
          appointment.status?.toLowerCase() === "confirmed"
      );

      setStats((previous) => ({
        ...previous,
        today: todayAppointments.length,
        pending: pending.length,
        confirmed: confirmed.length,
      }));
    } catch (error) {
      console.error("Unexpected error loading appointments:", error);
    } finally {
      setLoadingAppointments(false);
    }
  }

  /*
   * LOAD BLOG POSTS
   */
  async function loadBlogPosts() {
    setLoadingBlogs(true);

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error loading blog posts:", error);
        setBlogPosts([]);
        setStats((previous) => ({
          ...previous,
          published: 0,
        }));
        return;
      }

      const postData = (data ?? []) as BlogPost[];

      setBlogPosts(postData);

      const published = postData.filter(
        (post: BlogPost) =>
          post.status?.toLowerCase() === "published"
      );

      setStats((previous) => ({
        ...previous,
        published: published.length,
      }));
    } catch (error) {
      console.error("Unexpected error loading blog posts:", error);
    } finally {
      setLoadingBlogs(false);
    }
  }

  /*
   * NEXT FIVE UPCOMING APPOINTMENTS
   */
  const now = new Date();

  const upcomingAppointments = appointments
    .filter((appointment: Appointment) => {
      if (!appointment.appointment_date) {
        return false;
      }

      const appointmentDateTime = new Date(
        `${appointment.appointment_date}T${
          appointment.appointment_time || "00:00:00"
        }`
      );

      const status = appointment.status?.toLowerCase();

      const isCancelled =
        status === "cancelled" || status === "canceled";

      return appointmentDateTime >= now && !isCancelled;
    })
    .slice(0, 5);

  const recentPosts = blogPosts.slice(0, 5);

  /*
   * FORMAT TIME
   */
  function formatTime(time: string) {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  /*
   * FORMAT DATE
   */
  function formatDate(date: string) {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  /*
   * STATUS STYLE
   */
  function statusStyle(status: string) {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "cancelled":
      case "canceled":
        return "bg-rose-50 text-rose-700 border-rose-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50/60">
      {/* HEADER */}
      <section className="border-b border-sky-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Admin Dashboard
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Here&apos;s what&apos;s happening at Hibir Specialty Dental Clinic today.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/appointments"
                className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                <CalendarDays className="h-4 w-4" />
                Appointments
              </Link>

              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-sky-600 hover:to-blue-600"
              >
                <Plus className="h-4 w-4" />
                New Article
              </Link>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <Clock3 className="h-4 w-4" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* STAT CARDS */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Today&apos;s Appointments
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.today}
                </p>
              </div>
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
              <Activity className="h-3.5 w-3.5" />
              Scheduled for today
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.pending}
                </p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="h-3.5 w-3.5" />
              Require attention
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Confirmed
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.confirmed}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Confirmed appointments
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Published Articles
                </p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stats.published}
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-blue-600">
              <BookOpen className="h-3.5 w-3.5" />
              Dental Journal
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* UPCOMING APPOINTMENTS */}
          <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
                  Schedule
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Next 5 Appointments
                </h2>
              </div>

              <Link
                href="/admin/appointments"
                className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {loadingAppointments ? (
              <div className="px-6 py-12 text-center text-sm text-slate-400">
                Loading appointments...
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  No upcoming appointments
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  There are currently no upcoming appointments scheduled.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {upcomingAppointments.map((appointment: Appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-4 px-6 py-5 transition hover:bg-sky-50/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 text-sm font-bold text-sky-700">
                        {appointment.first_name?.charAt(0)}
                        {appointment.last_name?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {appointment.first_name} {appointment.last_name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {appointment.service}
                        </p>
                        <p className="mt-1 text-xs font-medium text-sky-600">
                          {formatDate(appointment.appointment_date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatTime(appointment.appointment_time)}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {appointment.phone}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-semibold capitalize ${statusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status || "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QUICK ACTIONS */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
                Shortcuts
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Quick Actions
              </h2>
            </div>

            <div className="space-y-3">
              <Link
                href="/admin/appointments"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-sky-100 p-2 text-sky-600">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Manage Appointments
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Review and confirm bookings
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
              </Link>

              <Link
                href="/admin/blog/new"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Publish New Article
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Add content to the Dental Journal
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
              </Link>

              <Link
                href="/admin/blog"
                className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Manage Dental Journal
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Edit and manage published articles
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" />
              </Link>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Admin Portal Secure
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Your administrative workspace is protected by authenticated access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT BLOG POSTS */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
                Content
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Recent Dental Journal Articles
              </h2>
            </div>

            <Link
              href="/admin/blog"
              className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              Manage articles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {loadingBlogs ? (
            <div className="px-6 py-12 text-center text-sm text-slate-400">
              Loading articles...
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <FileText className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-600">
                No articles yet
              </p>
              <Link
                href="/admin/blog/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-600"
              >
                <Plus className="h-3.5 w-3.5" />
                Create Article
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentPosts.map((post: BlogPost) => (
                <div
                  key={post.id}
                  className="flex flex-col gap-4 px-6 py-5 transition hover:bg-sky-50/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      /blog/{post.slug}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-semibold capitalize ${
                        post.status?.toLowerCase() === "published"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-amber-200 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {post.status || "Draft"}
                    </span>

                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <div className="mt-8 flex items-center justify-center gap-2 pb-8 text-xs text-slate-400">
          <Users className="h-3.5 w-3.5" />
          <span>
            Hibir Specialty Dental Clinic · Administrative Workspace
          </span>
        </div>
      </div>
    </main>
  );
}
