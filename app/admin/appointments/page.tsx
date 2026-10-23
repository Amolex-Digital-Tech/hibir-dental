"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  CalendarDays,
  Clock,
  LogOut,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";

type Appointment = {
  id: number;
  patient_name: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  doctor: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export default function AdminAppointmentsPage() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");

  async function loadAppointments() {
    setLoading(true);

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

    let query = supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (selectedDate) {
      query = query.eq("appointment_date", selectedDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
    } else {
      setAppointments(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  async function updateStatus(id: number, status: string) {
    setUpdatingId(id);

    const { error } = await supabase
  .from("appointments")
  .update({ status } as never)
  .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update appointment.");
    } else {
      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status }
            : appointment
        )
      );
    }

    setUpdatingId(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatTime(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function statusStyle(status: string) {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";

      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Appointments
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage Hibir Specialty Dental Clinic appointments.
            </p>
          </div>

          <div className="flex items-center gap-3">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
            />

            {selectedDate && (
              <button
                onClick={() => setSelectedDate("")}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                All Dates
              </button>
            )}

          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500">
              Total
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-2">
              {appointments.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500">
              Confirmed
            </p>

            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {appointments.filter((a) => a.status === "confirmed").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500">
              Completed
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-2">
              {appointments.filter((a) => a.status === "completed").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs text-slate-500">
              Cancelled
            </p>

            <p className="text-2xl font-bold text-rose-600 mt-2">
              {appointments.filter((a) => a.status === "cancelled").length}
            </p>
          </div>

        </div>

        {/* Appointments */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">
              {selectedDate
                ? `Appointments for ${formatDate(selectedDate)}`
                : "All Appointments"}
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-20 px-6">
              <CalendarDays className="w-10 h-10 text-slate-300 mx-auto mb-3" />

              <p className="font-semibold text-slate-700">
                No appointments found
              </p>

              <p className="text-sm text-slate-500 mt-1">
                There are no appointments for the selected date.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">

              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                    {/* Patient */}
                    <div className="min-w-0">

                      <div className="flex items-center gap-3 mb-2">

                        <h4 className="font-bold text-slate-900">
                          {appointment.patient_name}
                        </h4>

                        <span
                          className={`px-2.5 py-1 rounded-full border text-[10px] font-bold capitalize ${statusStyle(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>

                      </div>

                      <div className="space-y-1.5 text-xs text-slate-500">

                        <p className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5" />
                          {appointment.phone}
                        </p>

                        <p className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" />
                          {appointment.email}
                        </p>

                      </div>
                    </div>

                    {/* Appointment details */}
                    <div className="lg:text-right">

                      <p className="font-bold text-slate-900">
                        {appointment.service}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {appointment.doctor || "No Preference"}
                      </p>

                      <div className="flex lg:justify-end items-center gap-3 mt-3 text-xs font-semibold text-slate-700">

                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
                          {formatDate(appointment.appointment_date)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {formatTime(appointment.appointment_time)}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Message */}
                  {appointment.message && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                        Patient Notes
                      </p>

                      <p className="text-xs text-slate-600">
                        {appointment.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    {appointment.status !== "confirmed" &&
                      appointment.status !== "completed" && (
                        <button
                          onClick={() =>
                            updateStatus(appointment.id, "confirmed")
                          }
                          disabled={updatingId === appointment.id}
                          className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                      )}

                    {appointment.status === "confirmed" && (
                      <button
                        onClick={() =>
                          updateStatus(appointment.id, "completed")
                        }
                        disabled={updatingId === appointment.id}
                        className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark Completed
                      </button>
                    )}

                    {appointment.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          updateStatus(appointment.id, "cancelled")
                        }
                        disabled={updatingId === appointment.id}
                        className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    )}

                    {appointment.status === "cancelled" && (
                      <button
                        onClick={() =>
                          updateStatus(appointment.id, "confirmed")
                        }
                        disabled={updatingId === appointment.id}
                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Restore
                      </button>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}