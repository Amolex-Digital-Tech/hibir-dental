"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  User,
  Phone,
  Mail,
  Stethoscope,
  X,
  CheckCircle2,
  CircleAlert,
  Plus,
  Loader2,
  Ban,
  RefreshCw,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Appointment = {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: string;
  created_at: string;
  service: string | null;
  doctor: string | null;
  message: string | null;
  booking_source: string | null;
  created_by: string | null;
};

type ClinicSchedule = {
  id: number;
  day_of_week: number;
  opening_time: string | null;
  closing_time: string | null;
  is_open: boolean;
  slot_duration: number;
};

/* =========================================================
   SERVICES
========================================================= */

const SERVICES = [
  "General Check-up",
  "Teeth Cleaning",
  "Teeth Whitening",
  "Dental Implants",
  "Root Canal",
  "Braces",
  "Invisalign",
  "Veneers",
  "Emergency Dental Care",
  "Pediatric Dentistry",
  "Other",
];

/* =========================================================
   DOCTORS
========================================================= */

const DOCTORS = [
  "No Preference",
  "Dr. Haregewoin  Eshetu (Chief Expert Dental Surgeon)",
  "Dr. Tsegeweini  G/medhin (Chief Expert Dental Surgeon)",
];

/* =========================================================
   FALLBACK CLINIC SCHEDULE
   Used only if schedule cannot be loaded.
========================================================= */

const FALLBACK_SCHEDULE: ClinicSchedule[] = [
  {
    id: 1,
    day_of_week: 1,
    opening_time: "08:00:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    id: 2,
    day_of_week: 2,
    opening_time: "08:00:00",
    closing_time: "17:00:00",
    slot_duration: 30,
    is_open: true,
  },
  {
    id: 3,
    day_of_week: 3,
    opening_time: "08:00:00",
    closing_time: "17:00:00",
    slot_duration: 30,
    is_open: true,
  },
  {
    id: 4,
    day_of_week: 4,
    opening_time: "08:00:00",
    closing_time: "17:00:00",
    slot_duration: 30,
    is_open: true,
  },
  {
    id: 5,
    day_of_week: 5,
    opening_time: "08:00:00",
    closing_time: "17:00:00",
    slot_duration: 30,
    is_open: true,
  },
  {
    id: 6,
    day_of_week: 6,
    opening_time: "08:00:00",
    closing_time: "12:00:00",
    slot_duration: 30,
    is_open: true,
  },
  {
    id: 7,
    day_of_week: 0,
    opening_time: null,
    closing_time: null,
    slot_duration: 30,
    is_open: false,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateKey(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatTime(time: string) {
  const [hourString, minuteString] = time.split(":");

  let hour = Number(hourString);
  const minute = Number(minuteString);

  const suffix = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function normalizeTime(time: string) {
  return time.slice(0, 5);
}

function generateTimeSlots(schedule: ClinicSchedule | undefined) {
  if (
    !schedule ||
    !schedule.is_open ||
    !schedule.opening_time ||
    !schedule.closing_time
  ) {
    return [];
  }

  const [openHour, openMinute] = schedule.opening_time
    .slice(0, 5)
    .split(":")
    .map(Number);

  const [closeHour, closeMinute] = schedule.closing_time
    .slice(0, 5)
    .split(":")
    .map(Number);

  const startMinutes = openHour * 60 + openMinute;
  const endMinutes = closeHour * 60 + closeMinute;

  const slots: string[] = [];

  for (
    let minutes = startMinutes;
    minutes < endMinutes;
    minutes += schedule.slot_duration || 30
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    slots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );
  }

  return slots;
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();

  const firstWeekday = firstDay.getDay();

  const days: Array<Date | null> = [];

  for (let i = 0; i < firstWeekday; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AdminCalendarPage() {
  /* =======================================================
     DATE STATE
  ======================================================= */

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDateKey(today)
  );

  /* =======================================================
     DATA
  ======================================================= */

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [schedule, setSchedule] =
    useState<ClinicSchedule[]>(FALLBACK_SCHEDULE);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     MODAL
  ======================================================= */

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string | null>(
    null
  );

  /* =======================================================
     FORM
  ======================================================= */

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("General Check-up");
  const [doctor, setDoctor] = useState("No Preference");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  /* =======================================================
     LOAD DATA
  ======================================================= */

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [
        appointmentsResponse,
        scheduleResponse,
      ] = await Promise.all([
        supabase
          .from("appointments")
          .select("*")
          .order("appointment_date", {
            ascending: true,
          })
          .order("appointment_time", {
            ascending: true,
          }),

        supabase
          .from("clinic_schedule")
          .select("*")
          .order("day_of_week", {
            ascending: true,
          }),
      ]);

      if (appointmentsResponse.error) {
        throw appointmentsResponse.error;
      }

      if (scheduleResponse.error) {
        console.warn(
          "Could not load clinic schedule:",
          scheduleResponse.error
        );

        setSchedule(FALLBACK_SCHEDULE);
      } else if (
        scheduleResponse.data &&
        scheduleResponse.data.length > 0
      ) {
        setSchedule(scheduleResponse.data);
      } else {
        setSchedule(FALLBACK_SCHEDULE);
      }

      setAppointments(
        (appointmentsResponse.data ?? []) as Appointment[]
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load the appointment calendar. Please refresh and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  /* =======================================================
     MONTH
  ======================================================= */

  const monthDays = useMemo(() => {
    return getMonthDays(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
  }, [currentMonth]);

  /* =======================================================
     SELECTED DATE
  ======================================================= */

  const selectedDateObject = parseDateKey(selectedDate);

  const selectedDayOfWeek = selectedDateObject.getDay();

  const selectedSchedule = schedule.find(
    (item) => item.day_of_week === selectedDayOfWeek
  );

  const selectedSlots = generateTimeSlots(
    selectedSchedule
  );

  /* =======================================================
     ACTIVE APPOINTMENTS
     
     CANCELLED APPOINTMENTS ARE NOT OCCUPIED.
  ======================================================= */

  const activeAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status !== "cancelled"
    );
  }, [appointments]);

  /* =======================================================
     SELECTED DATE APPOINTMENTS
  ======================================================= */

  const selectedDateAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.appointment_date === selectedDate
      )
      .sort((a, b) =>
        a.appointment_time.localeCompare(
          b.appointment_time
        )
      );
  }, [appointments, selectedDate]);

  /* =======================================================
     DATE STATUS
  ======================================================= */

  function getDateAppointments(date: Date) {
    const dateKey = formatDateKey(date);

    return activeAppointments.filter(
      (appointment) =>
        appointment.appointment_date === dateKey
    );
  }

  function getDateStatus(date: Date) {
    const dateKey = formatDateKey(date);

    const daySchedule = schedule.find(
      (item) => item.day_of_week === date.getDay()
    );

    const active = activeAppointments.filter(
      (appointment) =>
        appointment.appointment_date === dateKey
    );

    if (
      daySchedule &&
      !daySchedule.is_open
    ) {
      return "closed";
    }

    if (active.length > 0) {
      return "occupied";
    }

    return "available";
  }

  /* =======================================================
     MONTH NAVIGATION
  ======================================================= */

  function previousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  }

  function goToToday() {
    const todayKey = formatDateKey(new Date());

    setCurrentMonth(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      )
    );

    setSelectedDate(todayKey);
  }

  /* =======================================================
     OPEN ADD APPOINTMENT
  ======================================================= */

  function openAddAppointment(time: string) {
    setSelectedTime(time);

    setPatientName("");
    setPhone("");
    setEmail("");
    setService("General Check-up");
    setDoctor("No Preference");
    setReason("");
    setMessage("");

    setShowAddModal(true);
  }

  /* =======================================================
     CREATE ADMIN APPOINTMENT
  ======================================================= */

  async function createAppointment(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!selectedTime) {
      return;
    }

    if (!patientName.trim()) {
      setError("Please enter the patient's name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter the patient's phone number.");
      return;
    }

    /* -----------------------------------------------------
       DOUBLE CHECK OCCUPANCY BEFORE INSERT
    ----------------------------------------------------- */

    const alreadyBooked = activeAppointments.some(
      (appointment) =>
        appointment.appointment_date === selectedDate &&
        normalizeTime(
          appointment.appointment_time
        ) === selectedTime
    );

    if (alreadyBooked) {
      setError(
        "This appointment slot has already been booked."
      );

      setShowAddModal(false);

      return;
    }

    setSaving(true);
    setError("");

    try {
      /* ---------------------------------------------------
         GET LOGGED-IN ADMIN
      --------------------------------------------------- */

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Your admin session has expired. Please sign in again."
        );
      }

      /* ---------------------------------------------------
         DATABASE INSERT
      --------------------------------------------------- */

      const { data, error: insertError } =
        await supabase
          .from("appointments")
          .insert({
            patient_name: patientName.trim(),
            phone: phone.trim(),
            email: email.trim() || null,

            appointment_date: selectedDate,

            appointment_time: `${selectedTime}:00`,

            reason: reason.trim() || null,

            status: "confirmed",

            service,

            doctor,

            message: message.trim() || null,

            /* IMPORTANT */
            booking_source: "admin",

            /* IMPORTANT */
            created_by: user.id,
          })
          .select()
          .single();

      if (insertError) {
        console.error(insertError);

        if (
          insertError.code === "23505"
        ) {
          throw new Error(
            "This time slot has just been booked by someone else."
          );
        }

        throw insertError;
      }

      /* ---------------------------------------------------
         UPDATE LOCAL CALENDAR IMMEDIATELY
      --------------------------------------------------- */

      if (data) {
        setAppointments((previous) => [
          ...previous,
          data as Appointment,
        ]);
      }

      setShowAddModal(false);
      setSelectedTime(null);

      /* ---------------------------------------------------
         RESET FORM
      --------------------------------------------------- */

      setPatientName("");
      setPhone("");
      setEmail("");
      setReason("");
      setMessage("");

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create the appointment."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     CANCEL APPOINTMENT
     
     IMPORTANT:
     We UPDATE status.
     We DO NOT DELETE the appointment.
  ======================================================= */

  async function cancelAppointment(
    appointmentId: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment? The time slot will become available again."
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      const { error: updateError } =
        await supabase
          .from("appointments")
          .update({
            status: "cancelled",
          })
          .eq("id", appointmentId);

      if (updateError) {
        throw updateError;
      }

      /* ---------------------------------------------------
         UPDATE LOCAL STATE
      --------------------------------------------------- */

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === appointmentId
            ? {
                ...appointment,
                status: "cancelled",
              }
            : appointment
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to cancel this appointment."
      );
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/60">
      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 text-sky-600 shadow-sm">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Appointment Calendar
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage clinic availability and appointments.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading ? "animate-spin" : ""
                }`}
              />

              Refresh
            </button>

          </div>
        </div>
      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">
              {error}
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-rose-400 hover:text-rose-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* =================================================
            CALENDAR HEADER
        ================================================= */}

        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {currentMonth.toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                Has appointments
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                Closed
              </div>

            </div>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={goToToday}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              Today
            </button>

            <button
              type="button"
              onClick={previousMonth}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={nextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>

        {/* =================================================
            CALENDAR
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* WEEK DAYS */}

          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">

            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="px-2 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-400"
              >
                {day}
              </div>
            ))}

          </div>

          {/* DAYS */}

          <div className="grid grid-cols-7">

            {monthDays.map((date, index) => {

              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[120px] border-b border-r border-slate-100 bg-slate-50/40"
                  />
                );
              }

              const dateKey = formatDateKey(date);

              const isToday =
                dateKey ===
                formatDateKey(new Date());

              const isSelected =
                dateKey === selectedDate;

              const status =
                getDateStatus(date);

              const dateAppointments =
                getDateAppointments(date);

              const daySchedule =
                schedule.find(
                  (item) =>
                    item.day_of_week ===
                    date.getDay()
                );

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() =>
                    setSelectedDate(dateKey)
                  }
                  className={`
                    relative min-h-[120px] border-b border-r border-slate-100 p-3 text-left transition
                    hover:bg-sky-50/60
                    ${
                      isSelected
                        ? "bg-sky-50 ring-2 ring-inset ring-sky-400"
                        : "bg-white"
                    }
                  `}
                >

                  {/* DATE NUMBER */}

                  <div className="flex items-center justify-between">

                    <span
                      className={`
                        flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold
                        ${
                          isToday
                            ? "bg-sky-600 text-white"
                            : isSelected
                            ? "bg-sky-100 text-sky-700"
                            : "text-slate-700"
                        }
                      `}
                    >
                      {date.getDate()}
                    </span>

                    {status === "available" &&
                      daySchedule?.is_open && (
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      )}

                    {status === "occupied" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                    )}

                    {status === "closed" && (
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    )}

                  </div>

                  {/* APPOINTMENT COUNT */}

                  {dateAppointments.length > 0 && (
                    <div className="mt-4">

                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700">
                        <CalendarDays className="h-3 w-3" />

                        {dateAppointments.length}{" "}
                        appointment
                        {dateAppointments.length !==
                        1
                          ? "s"
                          : ""}
                      </div>

                    </div>
                  )}

                  {/* OPEN/CLOSED INFORMATION */}

                  <div className="absolute bottom-3 left-3 right-3">

                    {daySchedule?.is_open ? (
                      <span className="text-[10px] font-medium text-slate-400">
                        {formatTime(
                          daySchedule.opening_time!
                        )}{" "}
                        –{" "}
                        {formatTime(
                          daySchedule.closing_time!
                        )}
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-300">
                        Closed
                      </span>
                    )}

                  </div>

                </button>
              );
            })}

          </div>
        </div>

        {/* =================================================
            SELECTED DATE PANEL
        ================================================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* =================================================
              TIME SLOTS
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  Selected Date
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {selectedDateObject.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h3>
              </div>

              <div className="rounded-2xl bg-sky-50 p-3 text-sky-600">
                <CalendarDays className="h-5 w-5" />
              </div>

            </div>

            {/* CLOSED DAY */}

            {selectedSchedule &&
              !selectedSchedule.is_open && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Clock3 className="h-5 w-5" />
                  </div>

                  <h4 className="mt-4 font-semibold text-slate-700">
                    Clinic is closed
                  </h4>

                  <p className="mt-1 text-sm text-slate-400">
                    No appointment slots are available on this day.
                  </p>

                </div>
              )}

            {/* NO SCHEDULE RECORD */}

            {!selectedSchedule && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 text-center">

                <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-500" />

                <h4 className="mt-3 font-semibold text-slate-800">
                  Available for appointments
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  You can add an appointment to this day.
                </p>

              </div>
            )}

            {/* TIME SLOTS */}

            {selectedSlots.length > 0 && (
              <div>

                <div className="mb-4 flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Appointment Slots
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Click an available time to add a patient.
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">

                  {selectedSlots.map((time) => {

                    const appointment =
                      selectedDateAppointments.find(
                        (item) =>
                          normalizeTime(
                            item.appointment_time
                          ) === time &&
                          item.status !==
                            "cancelled"
                      );

                    const cancelledAppointment =
                      selectedDateAppointments.find(
                        (item) =>
                          normalizeTime(
                            item.appointment_time
                          ) === time &&
                          item.status ===
                            "cancelled"
                      );

                    const occupied =
                      Boolean(appointment);

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={occupied}
                        onClick={() =>
                          openAddAppointment(time)
                        }
                        className={`
                          group rounded-2xl border p-4 text-left transition
                          ${
                            occupied
                              ? "cursor-default border-sky-100 bg-sky-50"
                              : "border-emerald-100 bg-emerald-50/60 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                          }
                        `}
                      >

                        <div className="flex items-center justify-between">

                          <span
                            className={`
                              text-sm font-bold
                              ${
                                occupied
                                  ? "text-sky-700"
                                  : "text-emerald-700"
                              }
                            `}
                          >
                            {formatTime(time)}
                          </span>

                          {occupied ? (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                              <User className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                              <Plus className="h-3.5 w-3.5" />
                            </span>
                          )}

                        </div>

                        <p
                          className={`
                            mt-2 text-[11px] font-semibold
                            ${
                              occupied
                                ? "text-sky-600"
                                : "text-emerald-600"
                            }
                          `}
                        >
                          {occupied
                            ? appointment?.patient_name
                            : "Available"}
                        </p>

                        {cancelledAppointment &&
                          !occupied && (
                            <p className="mt-1 text-[9px] text-slate-400">
                              Previously cancelled
                            </p>
                          )}

                      </button>
                    );
                  })}

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              DAY APPOINTMENTS
          ================================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">

              <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                Daily Schedule
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Appointments
              </h3>

            </div>

            {selectedDateAppointments.length ===
            0 ? (
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-6 text-center">

                <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-500" />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No appointments
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  All available time slots are currently free.
                </p>

              </div>
            ) : (
              <div className="space-y-3">

                {selectedDateAppointments.map(
                  (appointment) => {

                    const cancelled =
                      appointment.status ===
                      "cancelled";

                    return (
                      <div
                        key={appointment.id}
                        className={`
                          rounded-2xl border p-4
                          ${
                            cancelled
                              ? "border-slate-200 bg-slate-50 opacity-70"
                              : "border-slate-200 bg-white"
                          }
                        `}
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <div className="flex items-center gap-2">

                              <Clock3 className="h-4 w-4 shrink-0 text-sky-500" />

                              <span className="text-sm font-bold text-slate-900">
                                {formatTime(
                                  appointment.appointment_time
                                )}
                              </span>

                            </div>

                            <h4 className="mt-3 truncate text-sm font-bold text-slate-800">
                              {appointment.patient_name}
                            </h4>

                            <p className="mt-1 text-xs text-slate-500">
                              {appointment.service ||
                                appointment.reason ||
                                "Dental appointment"}
                            </p>

                          </div>

                          <span
                            className={`
                              shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider
                              ${
                                cancelled
                                  ? "bg-slate-200 text-slate-500"
                                  : appointment.status ===
                                    "confirmed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }
                            `}
                          >
                            {appointment.status}
                          </span>

                        </div>

                        {!cancelled && (
                          <button
                            type="button"
                            onClick={() =>
                              cancelAppointment(
                                appointment.id
                              )
                            }
                            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 transition hover:text-rose-700"
                          >
                            <Ban className="h-3.5 w-3.5" />

                            Cancel appointment
                          </button>
                        )}

                        {cancelled && (
                          <p className="mt-3 text-[10px] font-medium text-emerald-600">
                            This time slot is available again.
                          </p>
                        )}

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ===================================================
          ADD APPOINTMENT MODAL
      =================================================== */}

      {showAddModal && selectedTime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Plus className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Add Appointment
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Create an appointment directly from the admin calendar.
                    </p>
                  </div>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                    {selectedDateObject.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>

                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {formatTime(selectedTime)}
                  </span>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedTime(null);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={createAppointment}
              className="space-y-5 p-6"
            >

              {/* PATIENT NAME */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Patient Name *
                </label>

                <div className="relative">

                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) =>
                      setPatientName(
                        e.target.value
                      )
                    }
                    placeholder="Patient full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />

                </div>

              </div>

              {/* PHONE + EMAIL */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Phone *
                  </label>

                  <div className="relative">

                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="+251..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="relative">

                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="patient@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />

                  </div>

                </div>

              </div>

              {/* SERVICE */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Service
                </label>

                <div className="relative">

                  <Stethoscope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={service}
                    onChange={(e) =>
                      setService(e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  >
                    {SERVICES.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              {/* DOCTOR */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Doctor
                </label>

                <select
                  value={doctor}
                  onChange={(e) =>
                    setDoctor(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                >
                  {DOCTORS.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* REASON */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Reason for Visit
                </label>

                <input
                  type="text"
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />

              </div>

              {/* NOTES */}

              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Notes
                </label>

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Additional notes..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />

              </div>

              {/* ADMIN NOTICE */}

              <div className="flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">

                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

                <div>

                  <p className="text-xs font-bold text-emerald-800">
                    Admin appointment
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-emerald-700">
                    This appointment will be saved as a confirmed appointment created by the admin.
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedTime(null);
                  }}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:from-sky-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Confirm Appointment
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}