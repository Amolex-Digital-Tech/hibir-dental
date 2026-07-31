export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SERVICES: FooterSection = {
  title: "Services",
  links: [
    { label: "Dental Checkups", href: "/services#checkups" },
    { label: "Teeth Cleaning", href: "/services#cleaning" },
    { label: "Root Canal Treatment", href: "/services#root-canal" },
    { label: "Dental Implants", href: "/services#implants" },
    { label: "Braces & Invisalign", href: "/services#orthodontics" },
    { label: "Teeth Whitening", href: "/services#whitening" },
    { label: "Smile Makeover", href: "/services#cosmetic" },
  ],
};

export const FOOTER_CLINIC: FooterSection = {
  title: "Clinic",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const FOOTER_PATIENT_SUPPORT: FooterSection = {
  title: "Patient Support",
  links: [
    { label: "Book Appointment", href: "/appointment" },
    { label: "Emergency Dentistry", href: "/contact#emergency" },
    { label: "FAQ", href: "/appointment#faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};