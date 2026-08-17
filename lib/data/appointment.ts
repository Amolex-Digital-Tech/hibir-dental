import { z } from "zod";

export const AppointmentSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time slot"),
  service: z.string().min(1, "Please select a service"),
  doctor: z.string().optional(),
  message: z.string().optional(),
});

export type AppointmentFormData = z.infer<typeof AppointmentSchema>;

export const SERVICES_LIST = [
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

export const DOCTORS_LIST = [
  "No Preference",
  "Dr. Haregewoin  Eshetu (Chief Expert Dental Surgeon)",
  "Dr. Tsegeweini  G/medhin (Chief Expert Dental Surgeon)",
];

export const TIME_SLOTS = [
  "08:30 AM (2:30 LT)",
  "09:30 AM (3:30 LT)",
  "10:30 AM (4:30 LT)",
  "11:30 AM (5:30 LT)",
  "02:00 PM (8:00 LT)",
  "03:00 PM (9:00 LT)",
  "04:00 PM (10:00 LT)",
  "05:00 PM (11:00 LT)",
];

export const WHAT_TO_EXPECT_STEPS = [
  { step: "01", title: "Submit Request", desc: "Fill out the online booking form with your preferred details." },
  { step: "02", title: "Confirmation Call", desc: "Our team reviews and calls you to confirm availability." },
  { step: "03", title: "Visit Clinic", desc: "Arrive at Wastna Building, 3rd Floor in Piassa." },
  { step: "04", title: "Consultation", desc: "Meet with our specialists for a thorough examination." },
  { step: "05", title: "Treatment Plan", desc: "Receive a tailored care plan designed for your goals." },
  { step: "06", title: "Follow-Up", desc: "Ongoing care to ensure lasting oral health." },
];

export const APPOINTMENT_FAQS = [
  {
    q: "How long does an appointment take?",
    a: "Standard consultations and routine cleanings usually take 30–45 minutes. Specialized treatments may take up to an hour or more.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes. Please notify us at least 24 hours in advance by phone or WhatsApp so we can adjust our schedule.",
  },
  {
    q: "Do I need to arrive early?",
    a: "We recommend arriving 10–15 minutes before your scheduled time to complete any brief intake details.",
  },
  {
    q: "What should I bring for my first visit?",
    a: "Please bring a photo ID and any previous dental records or X-rays if you have them available.",
  },
  {
    q: "Do you accept walk-in patients?",
    a: "Walk-ins are accepted based on daily availability, but scheduling ahead guarantees your time slot with minimal waiting.",
  },
];