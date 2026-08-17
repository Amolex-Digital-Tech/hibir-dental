export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    googleMapsUrl: string;
  };
  workingHours: {
    days: string;
    hours: string;
  }[];
}

export const CLINIC_CONTACT: ContactInfo = {
  phone: "+251 973 777 783",
  email: "hibirdentalcareservice@gmail.com",
  address: {
    line1: "Piassa, Next to Enrico Pastry",
    line2: "Wastna Building, 3rd Floor",
    city: "Addis Ababa, Ethiopia",
    googleMapsUrl:
      "https://www.google.com/maps/place/Hibr+Special+Dental+Care+Service/@9.0291987,38.7514604,2267m/data=!3m2!1e3!4b1!4m6!3m5!1s0x164b857f38d5dba7:0xe42eb576e484274!8m2!3d9.0291987!4d38.7540353!16s%2Fg%2F11mrdpg1b_!5m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D",
  },
  workingHours: [
    { days: "Monday", hours: "2:00 LT – 11:00 LT" },
    { days: "Tuesday", hours: "2:00 LT – 11:00 LT" },
    { days: "Wednesday", hours: "2:00 LT – 11:00 LT" },
    { days: "Thursday", hours: "2:00 LT – 11:00 LT" },
    { days: "Friday", hours: "2:00 LT – 11:00 LT" },
    { days: "Saturday", hours: "2:00 LT – 06:00 LT" },
    { days: "Sunday", hours: "Closed" },
  ],
};

export const CONTACT_FAQS = [
  {
    q: "Do I need an appointment?",
    a: "Walk-ins may be accepted based on daily availability, but booking an appointment in advance is highly recommended to ensure minimal wait time.",
  },
  {
    q: "Do you treat children?",
    a: "Yes! Our team provides comprehensive, gentle pediatric dental care in a welcoming environment.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash, Mobile Transfer (CBE Birr, Telebirr, Bank Transfer), and major local debit cards.",
  },
  {
    q: "Do you offer emergency treatment?",
    a: "Yes. If you have severe tooth pain or trauma, contact us immediately for urgent appointment scheduling.",
  },
];