"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  AppointmentSchema, 
  AppointmentFormData, 
  SERVICES_LIST, 
  DOCTORS_LIST, 
  TIME_SLOTS 
} from "@/lib/data/appointment";
import { CheckCircle2, User, Calendar, FileText, ArrowRight, ArrowLeft } from "lucide-react";

export function BookingForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      doctor: "No Preference",
    },
  });

  const selectedTime = watch("appointmentTime");
  const selectedService = watch("service");

  const onSubmit = (data: AppointmentFormData) => {
    console.log("Appointment Form Submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-white border border-slate-200 text-center shadow-lg my-8">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Appointment Request Received!</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Thank you for choosing Hibir Specialty Dental Clinic. Our team will review your requested time slot and call you shortly to confirm your booking.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-md p-6 sm:p-10">
      {/* Progress Steps */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-amber-600 font-bold" : "text-slate-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-amber-500 text-slate-900" : "bg-slate-100 text-slate-400"}`}>1</div>
          <span className="hidden sm:inline text-xs">Personal Info</span>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-slate-200" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-amber-600 font-bold" : "text-slate-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-amber-500 text-slate-900" : "bg-slate-100 text-slate-400"}`}>2</div>
          <span className="hidden sm:inline text-xs">Appointment Details</span>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-slate-200" />
        <div className={`flex items-center gap-2 ${step >= 3 ? "text-amber-600 font-bold" : "text-slate-400"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-amber-500 text-slate-900" : "bg-slate-100 text-slate-400"}`}>3</div>
          <span className="hidden sm:inline text-xs">Review & Submit</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Step 1: Patient Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
                <input {...register("firstName")} placeholder="John" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
                {errors.firstName && <p className="text-rose-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
                <input {...register("lastName")} placeholder="Doe" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
                {errors.lastName && <p className="text-rose-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input {...register("phone")} placeholder="+251 9..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
                {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input {...register("email")} type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mt-6 w-full py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Appointment Details */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Step 2: Service & Schedule</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Needed *</label>
              <select {...register("service")} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500">
                <option value="">Select a treatment</option>
                {SERVICES_LIST.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <p className="text-rose-500 text-xs mt-1">{errors.service.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date *</label>
                <input {...register("appointmentDate")} type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500 text-slate-700" />
                {errors.appointmentDate && <p className="text-rose-500 text-xs mt-1">{errors.appointmentDate.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Doctor (Optional)</label>
                <select {...register("doctor")} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500">
                  {DOCTORS_LIST.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Select Time Slot *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setValue("appointmentTime", t, { shouldValidate: true })}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedTime === t
                        ? "bg-slate-900 border-slate-900 text-white font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.appointmentTime && <p className="text-rose-500 text-xs mt-1">{errors.appointmentTime.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl font-bold text-sm bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
              >
                Review Booking <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Additional Notes */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Step 3: Notes & Confirm</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Visit / Additional Notes</label>
              <textarea {...register("message")} rows={3} placeholder="Mention any specific concerns or pain..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-amber-500" />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1">
              <p><strong>Selected Service:</strong> {selectedService || "Not specified"}</p>
              <p><strong>Time Slot:</strong> {selectedTime || "Not specified"}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl font-bold text-sm bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: "#ff9900", color: "#0f172a" }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}