"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppointmentSchema,
  AppointmentFormData,
  SERVICES_LIST,
  DOCTORS_LIST,
} from "@/lib/data/appointment";
import { supabase } from "@/lib/supabase";
import {
  CheckCircle2,
  User,
  Calendar,
  FileText,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Clock,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ClinicSchedule = {
  day_of_week: number;
  opening_time: string | null;
  closing_time: string | null;
  is_open: boolean;
  slot_duration: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/*
 * Fallback schedule.
 *
 * This exactly matches the schedule currently stored
 * in your Supabase clinic_schedule table:
 *
 * Sunday    08:30 - 17:00
 * Monday    08:30 - 17:00
 * Tuesday   08:30 - 17:00
 * Wednesday 08:30 - 17:00
 * Thursday  08:30 - 17:00
 * Friday    08:30 - 17:00
 * Saturday  08:30 - 13:00
 */
const FALLBACK_SCHEDULE: ClinicSchedule[] = [
  {
    day_of_week: 0,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 1,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 2,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 3,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 4,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 5,
    opening_time: "08:30:00",
    closing_time: "17:00:00",
    is_open: true,
    slot_duration: 30,
  },
  {
    day_of_week: 6,
    opening_time: "08:30:00",
    closing_time: "13:00:00",
    is_open: true,
    slot_duration: 30,
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDateForDatabase(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.substring(0, 5).split(":").map(Number);

  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:00`;
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function isSameDate(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function getScheduleForDate(
  schedules: ClinicSchedule[],
  date: Date
): ClinicSchedule | undefined {
  return schedules.find(
    (item) => Number(item.day_of_week) === date.getDay()
  );
}

function generateAvailableSlots(
  schedule: ClinicSchedule | undefined,
  bookedTimes: string[]
) {
  if (
    !schedule ||
    !schedule.is_open ||
    !schedule.opening_time ||
    !schedule.closing_time
  ) {
    return [];
  }

  const opening = parseTimeToMinutes(schedule.opening_time);
  const closing = parseTimeToMinutes(schedule.closing_time);
  const slotDuration = Number(schedule.slot_duration) || 30;

  const booked = new Set(
    bookedTimes.map((time) => time.substring(0, 5))
  );

  const slots: string[] = [];

  for (
    let minutes = opening;
    minutes + slotDuration <= closing;
    minutes += slotDuration
  ) {
    const time = minutesToTime(minutes).substring(0, 5);

    if (!booked.has(time)) {
      slots.push(time);
    }
  }

  return slots;
}

/* =========================================================
   COMPONENT
========================================================= */

export function BookingForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [submitted, setSubmitted] = useState(false);

  /* =======================================================
     DATE
  ======================================================= */

  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );
  });

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  /* =======================================================
     SUPABASE SCHEDULE
  ======================================================= */

  const [clinicSchedule, setClinicSchedule] =
    useState<ClinicSchedule[]>(FALLBACK_SCHEDULE);

  const [loadingSchedule, setLoadingSchedule] =
    useState(true);

  /* =======================================================
     AVAILABILITY
  ======================================================= */

  const [bookedTimes, setBookedTimes] =
    useState<string[]>([]);

  const [availableTimes, setAvailableTimes] =
    useState<string[]>([]);

  const [loadingTimes, setLoadingTimes] =
    useState(false);

  /* =======================================================
     BOOKING
  ======================================================= */

  const [booking, setBooking] =
    useState(false);

  const [bookingError, setBookingError] =
    useState("");

  /* =======================================================
     TODAY
  ======================================================= */

  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  /* =======================================================
     FORM
  ======================================================= */

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentSchema),

    defaultValues: {
      doctor: "No Preference",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      service: "",
      message: "",
    },
  });

  const selectedTime = watch("appointmentTime");

  const selectedService = watch("service");

  const selectedDoctor = watch("doctor");

  const appointmentDate = watch("appointmentDate");

  /* =========================================================
     LOAD CLINIC SCHEDULE
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadSchedule() {
      setLoadingSchedule(true);

      const { data, error } = await supabase
        .from("clinic_schedule")
        .select(
          "day_of_week, opening_time, closing_time, is_open, slot_duration"
        )
        .order("day_of_week");

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Failed to load clinic schedule:",
          error
        );

        /*
         * Keep the fallback schedule.
         */
        setClinicSchedule(FALLBACK_SCHEDULE);
      } else {
        const normalizedSchedule: ClinicSchedule[] =
  (data || []).map((item: ClinicSchedule) => ({
    day_of_week: Number(item.day_of_week),
    opening_time: item.opening_time,
    closing_time: item.closing_time,
            is_open: Boolean(item.is_open),
            slot_duration:
              Number(item.slot_duration) || 30,
          }));

        /*
         * Only replace the fallback when Supabase
         * actually returned schedule records.
         */
        if (normalizedSchedule.length > 0) {
          setClinicSchedule(normalizedSchedule);
        } else {
          setClinicSchedule(FALLBACK_SCHEDULE);
        }
      }

      setLoadingSchedule(false);
    }

    loadSchedule();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     LOAD AVAILABILITY FOR SELECTED DATE
  ========================================================= */

  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      setAvailableTimes([]);
      setLoadingTimes(false);

      return;
    }

    const date = new Date(selectedDate);

    let cancelled = false;

    async function loadAvailability() {
      setLoadingTimes(true);
      setBookingError("");
      setBookedTimes([]);
      setAvailableTimes([]);

      const dateString =
        formatDateForDatabase(date);

      /*
       * Get appointments already booked for this date.
       */
      const { data, error } = await supabase.rpc(
        "get_booked_times",
        {
          p_appointment_date: dateString,
        }
      );

      if (cancelled) {
        return;
      }

      if (error) {
        console.error(
          "Failed to load booked times:",
          error
        );

        setBookingError(
          "We couldn't load the available times. Please try again."
        );

        setLoadingTimes(false);

        return;
      }

      const booked = (data || []).map(
        (item: { appointment_time: string }) =>
          item.appointment_time.substring(0, 5)
      );

      setBookedTimes(booked);

      /*
       * Find schedule for the selected weekday.
       */
      const schedule = getScheduleForDate(
        clinicSchedule,
        date
      );

      /*
       * Generate only slots inside the clinic's
       * opening/closing time.
       */
      const available =
        generateAvailableSlots(
          schedule,
          booked
        );

      setAvailableTimes(available);

      setLoadingTimes(false);
    }

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [selectedDate, clinicSchedule]);

  /* =========================================================
     CALENDAR
  ========================================================= */

  const calendarDays = useMemo(
    () =>
      getMonthDays(
        currentMonth.getFullYear(),
        currentMonth.getMonth()
      ),
    [currentMonth]
  );

  const monthTitle = currentMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  /* =========================================================
     DATE HELPERS
  ========================================================= */

  function isPastDate(date: Date) {
    return date < today;
  }

  function isClinicClosed(date: Date) {
    const schedule = getScheduleForDate(
      clinicSchedule,
      date
    );

    return !schedule || schedule.is_open !== true;
  }

  /*
   * IMPORTANT:
   *
   * We intentionally DO NOT disable dates because
   * the schedule is loading.
   *
   * Future dates remain clickable.
   */
  function selectDate(date: Date) {
    if (isPastDate(date)) {
      return;
    }

    /*
     * Once schedule is available, genuinely closed
     * weekdays can be rejected.
     */
    if (
      !loadingSchedule &&
      isClinicClosed(date)
    ) {
      return;
    }

    setSelectedDate(date);

    setValue(
      "appointmentDate",
      formatDateForDatabase(date),
      {
        shouldValidate: true,
      }
    );

    /*
     * Changing the date always clears the
     * previous time.
     */
    setValue("appointmentTime", "", {
      shouldValidate: false,
    });

    setBookedTimes([]);

    setAvailableTimes([]);

    setBookingError("");
  }

  function selectTime(time: string) {
    setValue("appointmentTime", time, {
      shouldValidate: true,
    });

    setBookingError("");
  }

  /* =========================================================
     MONTH NAVIGATION
  ========================================================= */

  function previousMonth() {
    const previous = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const minimumMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous < minimumMonth) {
      return;
    }

    setCurrentMonth(previous);

    /*
     * Clear selected date when changing month.
     */
    setSelectedDate(null);

    setValue("appointmentDate", "");

    setValue("appointmentTime", "");

    setBookedTimes([]);

    setAvailableTimes([]);

    setBookingError("");
  }

  function nextMonth() {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    setCurrentMonth(next);

    setSelectedDate(null);

    setValue("appointmentDate", "");

    setValue("appointmentTime", "");

    setBookedTimes([]);

    setAvailableTimes([]);

    setBookingError("");
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function onSubmit(
    data: AppointmentFormData
  ) {
    setBooking(true);

    setBookingError("");

    const patientName =
      `${data.firstName.trim()} ${data.lastName.trim()}`;

    /*
     * Final availability check immediately before
     * inserting the appointment.
     *
     * This protects against two people selecting
     * the same slot at nearly the same time.
     */
    const { data: latestBookedData, error: latestBookedError } =
      await supabase.rpc("get_booked_times", {
        p_appointment_date: data.appointmentDate,
      });

    if (latestBookedError) {
      console.error(
        "Failed final availability check:",
        latestBookedError
      );

      setBookingError(
        "We couldn't verify the appointment time. Please try again."
      );

      setBooking(false);

      return;
    }

    const latestBooked = (
      latestBookedData || []
    ).map(
      (item: { appointment_time: string }) =>
        item.appointment_time.substring(0, 5)
    );

    if (
      latestBooked.includes(
        data.appointmentTime.substring(0, 5)
      )
    ) {
      setBookingError(
        "Sorry, that time was just booked by another patient. Please choose another time."
      );

      /*
       * Refresh displayed availability.
       */
      if (selectedDate) {
        const freshAvailable =
          generateAvailableSlots(
            getScheduleForDate(
              clinicSchedule,
              selectedDate
            ),
            latestBooked
          );

        setBookedTimes(latestBooked);

        setAvailableTimes(freshAvailable);
      }

      setValue("appointmentTime", "");

      setBooking(false);

      return;
    }

    /*
     * Insert appointment.
     */
    const { error } = await supabase
      .from("appointments")
      .insert({
        patient_name: patientName,
        phone: data.phone.trim(),
        email: data.email.trim(),
        appointment_date: data.appointmentDate,
        appointment_time:
          `${data.appointmentTime}:00`,
        service: data.service,
        doctor:
          data.doctor || "No Preference",
        message:
          data.message?.trim() || null,
        status: "confirmed",
      });

    if (error) {
      console.error(
        "Appointment booking failed:",
        error
      );

      /*
       * PostgreSQL unique constraint violation.
       */
      if (error.code === "23505") {
        setBookingError(
          "Sorry, that time was just booked by another patient. Please choose another time."
        );

        if (selectedDate) {
          const { data: freshData } =
            await supabase.rpc(
              "get_booked_times",
              {
                p_appointment_date:
                  formatDateForDatabase(
                    selectedDate
                  ),
              }
            );

          const freshBooked =
            (freshData || []).map(
              (item: {
                appointment_time: string;
              }) =>
                item.appointment_time.substring(
                  0,
                  5
                )
            );

          setBookedTimes(freshBooked);

          const schedule =
            getScheduleForDate(
              clinicSchedule,
              selectedDate
            );

          setAvailableTimes(
            generateAvailableSlots(
              schedule,
              freshBooked
            )
          );
        }

        setValue("appointmentTime", "");
      } else {
        setBookingError(
          "We couldn't complete your booking. Please check your information and try again."
        );
      }

      setBooking(false);

      return;
    }

    setBooking(false);

    setSubmitted(true);
  }

  /* =========================================================
     RESET BOOKING
  ========================================================= */

  function resetBooking() {
    setSubmitted(false);

    setStep(1);

    setSelectedDate(null);

    setBookedTimes([]);

    setAvailableTimes([]);

    setBookingError("");

    reset({
      doctor: "No Preference",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      appointmentDate: "",
      appointmentTime: "",
      service: "",
      message: "",
    });

    const now = new Date();

    setCurrentMonth(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-white border border-slate-200 text-center shadow-lg my-8">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Appointment Confirmed!
        </h2>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Thank you for choosing Hibir Specialty Dental
          Clinic. Your appointment has been successfully
          booked.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left space-y-2">
          <p className="text-sm">
            <strong>Date:</strong>{" "}
            {selectedDate?.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </p>

          <p className="text-sm">
            <strong>Time:</strong>{" "}
            {selectedTime
              ? formatTime(selectedTime)
              : ""}
          </p>

          <p className="text-sm">
            <strong>Service:</strong>{" "}
            {selectedService}
          </p>

          <p className="text-sm">
            <strong>Doctor:</strong>{" "}
            {selectedDoctor ||
              "No Preference"}
          </p>
        </div>

        <button
          onClick={resetBooking}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  /* =========================================================
     MAIN FORM
  ========================================================= */

  return (
    <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-10">

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">

        <div
          className={`flex items-center gap-2 ${
            step >= 1
              ? "text-amber-600 font-bold"
              : "text-slate-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
              step >= 1
                ? "bg-amber-500 text-slate-900"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            1
          </div>

          <span className="hidden sm:inline text-xs">
            Personal Info
          </span>
        </div>

        <div className="h-0.5 flex-1 mx-4 bg-slate-200" />

        <div
          className={`flex items-center gap-2 ${
            step >= 2
              ? "text-amber-600 font-bold"
              : "text-slate-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
              step >= 2
                ? "bg-amber-500 text-slate-900"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            2
          </div>

          <span className="hidden sm:inline text-xs">
            Appointment Details
          </span>
        </div>

        <div className="h-0.5 flex-1 mx-4 bg-slate-200" />

        <div
          className={`flex items-center gap-2 ${
            step >= 3
              ? "text-amber-600 font-bold"
              : "text-slate-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
              step >= 3
                ? "bg-amber-500 text-slate-900"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            3
          </div>

          <span className="hidden sm:inline text-xs">
            Review & Submit
          </span>
        </div>

      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* ===================================================
            STEP 1
        =================================================== */}

        {step === 1 && (
          <div className="space-y-4">

            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-amber-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Step 1: Patient Details
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name *
                </label>

                <input
                  {...register("firstName")}
                  placeholder="John"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />

                {errors.firstName && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name *
                </label>

                <input
                  {...register("lastName")}
                  placeholder="Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />

                {errors.lastName && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>

                <input
                  {...register("phone")}
                  placeholder="+251 9..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />

                {errors.phone && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
                />

                {errors.email && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-6 w-full py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#ff9900",
                color: "#0f172a",
              }}
            >
              Next Step

              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

        {/* ===================================================
            STEP 2
        =================================================== */}

        {step === 2 && (
          <div className="space-y-5">

            <div className="flex items-center gap-2 mb-2">

              <Calendar className="w-5 h-5 text-amber-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Step 2: Service & Schedule
              </h2>

            </div>

            {/* SERVICE */}

            <div>

              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service Needed *
              </label>

              <select
                {...register("service")}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              >

                <option value="">
                  Select a treatment
                </option>

                {SERVICES_LIST.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}

              </select>

              {errors.service && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.service.message}
                </p>
              )}

            </div>

            {/* CALENDAR */}

            <div>

              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Date *
              </label>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">

                {/* Calendar Header */}

                <div className="flex items-center justify-between mb-5">

                  <button
                    type="button"
                    onClick={previousMonth}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="text-center">

                    <h3 className="font-bold text-slate-900">
                      {monthTitle}
                    </h3>

                    {loadingSchedule && (
                      <p className="text-[9px] text-slate-400 mt-1">
                        Loading clinic schedule...
                      </p>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={nextMonth}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-amber-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>

                {/* Week Days */}

                <div className="grid grid-cols-7 mb-2">

                  {WEEK_DAYS.map((day) => (
                    <div
                      key={day}
                      className="text-center text-[10px] font-bold text-slate-400 py-2"
                    >
                      {day}
                    </div>
                  ))}

                </div>

                {/* Calendar Days */}

                <div className="grid grid-cols-7 gap-1">

                  {calendarDays.map(
                    (date, index) => {

                      if (!date) {
                        return (
                          <div
                            key={`empty-${index}`}
                          />
                        );
                      }

                      const past =
                        isPastDate(date);

                      /*
                       * IMPORTANT:
                       *
                       * We only use closed to change
                       * the visual appearance.
                       *
                       * The button is NOT disabled because
                       * of loadingSchedule.
                       */
                      const closed =
                        !loadingSchedule &&
                        isClinicClosed(date);

                      const selected =
                        selectedDate &&
                        isSameDate(
                          date,
                          selectedDate
                        );

                      const todayDate =
                        isSameDate(
                          date,
                          today
                        );

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"

                          /*
                           * ONLY past dates are disabled
                           * at the HTML button level.
                           */
                          disabled={past}

                          onClick={() =>
                            selectDate(date)
                          }

                          className={`
                            relative aspect-square rounded-xl text-xs font-semibold transition-all

                            ${
                              selected
                                ? "bg-slate-900 text-white shadow-md"
                                : past
                                ? "text-slate-300 bg-slate-100 cursor-not-allowed"
                                : closed
                                ? "text-slate-400 bg-slate-100 hover:bg-amber-50 hover:text-slate-700 cursor-pointer"
                                : "text-slate-700 bg-white hover:border-amber-400 hover:bg-amber-50 border border-transparent cursor-pointer"
                            }
                          `}
                        >

                          {date.getDate()}

                          {todayDate &&
                            !selected && (
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                            )}

                        </button>
                      );
                    }
                  )}

                </div>

                {/* Legend */}

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[10px] text-slate-500">

                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Today
                  </span>

                  <span>
                    Past dates unavailable
                  </span>

                  <span>
                    Select a date to check available times
                  </span>

                </div>

              </div>

              {errors.appointmentDate && (
                <p className="text-rose-500 text-xs mt-1">
                  {errors.appointmentDate.message}
                </p>
              )}

            </div>

            {/* SELECTED DATE */}

            {selectedDate && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">

                <p className="text-xs font-semibold text-slate-700">
                  Selected Date
                </p>

                <p className="text-sm font-bold text-slate-900 mt-1">
                  {selectedDate.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>

                {!loadingSchedule &&
                  isClinicClosed(
                    selectedDate
                  ) && (
                    <p className="text-xs text-rose-600 mt-2">
                      The clinic schedule shows this
                      day as closed.
                    </p>
                  )}

              </div>
            )}

            {/* TIME SLOTS */}

            {selectedDate && (
              <div>

                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Available Time *
                </label>

                {loadingTimes ? (

                  <div className="flex items-center justify-center py-8 text-slate-500">

                    <Loader2 className="w-5 h-5 animate-spin mr-2" />

                    <span className="text-xs">
                      Checking available times...
                    </span>

                  </div>

                ) : availableTimes.length ===
                  0 ? (

                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">

                    <Clock className="w-6 h-6 text-slate-400 mx-auto mb-2" />

                    <p className="text-sm font-semibold text-slate-700">
                      No available times
                    </p>

                    <p className="text-xs text-slate-500 mt-1">

                      {isClinicClosed(
                        selectedDate
                      )
                        ? "The clinic is closed on this day."
                        : "All appointment times may be booked. Please select another date."}

                    </p>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                    {availableTimes.map(
                      (time) => (

                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            selectTime(time)
                          }
                          className={`
                            py-2.5 px-3 rounded-xl border text-xs font-medium transition-all

                            ${
                              selectedTime ===
                              time
                                ? "bg-slate-900 border-slate-900 text-white font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50"
                            }
                          `}
                        >
                          {formatTime(time)}
                        </button>

                      )
                    )}

                  </div>

                )}

                {errors.appointmentTime && (
                  <p className="text-rose-500 text-xs mt-1">
                    {errors.appointmentTime.message}
                  </p>
                )}

              </div>
            )}

            {/* DOCTOR */}

            <div>

              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Doctor (Optional)
              </label>

              <select
                {...register("doctor")}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              >

                {DOCTORS_LIST.map(
                  (doctor) => (
                    <option
                      key={doctor}
                      value={doctor}
                    >
                      {doctor}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* ERROR */}

            {bookingError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {bookingError}
              </div>
            )}

            {/* NAVIGATION */}

            <div className="flex gap-3 pt-4">

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl font-bold text-sm bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />

                Back
              </button>

              <button
                type="button"
                onClick={() => {

                  if (
                    !appointmentDate ||
                    !selectedTime
                  ) {
                    setBookingError(
                      "Please select a date and available time."
                    );

                    return;
                  }

                  setBookingError("");

                  setStep(3);
                }}
                className="w-2/3 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#ff9900",
                  color: "#0f172a",
                }}
              >
                Review Booking

                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        )}

        {/* ===================================================
            STEP 3
        =================================================== */}

        {step === 3 && (
          <div className="space-y-4">

            <div className="flex items-center gap-2 mb-2">

              <FileText className="w-5 h-5 text-amber-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Step 3: Notes & Confirm
              </h2>

            </div>

            {/* NOTES */}

            <div>

              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Visit / Additional Notes
              </label>

              <textarea
                {...register("message")}
                rows={3}
                placeholder="Mention any specific concerns or pain..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
              />

            </div>

            {/* REVIEW */}

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-2">

              <p>
                <strong>Patient:</strong>{" "}
                {watch("firstName")}{" "}
                {watch("lastName")}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {selectedService ||
                  "Not specified"}
              </p>

              <p>
                <strong>Doctor:</strong>{" "}
                {selectedDoctor ||
                  "No Preference"}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {selectedDate?.toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {selectedTime
                  ? formatTime(selectedTime)
                  : "Not specified"}
              </p>

            </div>

            {/* ERROR */}

            {bookingError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {bookingError}
              </div>
            )}

            {/* BUTTONS */}

            <div className="flex gap-3 pt-4">

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={booking}
                className="w-1/3 py-3 rounded-xl font-bold text-sm bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
              >

                <ArrowLeft className="w-4 h-4" />

                Back

              </button>

              <button
                type="submit"
                disabled={booking}
                className="w-2/3 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                style={{
                  backgroundColor: "#ff9900",
                  color: "#0f172a",
                }}
              >

                {booking ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />

                    Booking...
                  </>
                ) : (
                  <>
                    Book Appointment

                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}

              </button>

            </div>

          </div>
        )}

      </form>
    </div>
  );
}