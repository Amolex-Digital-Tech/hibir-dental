import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Hibir Specialty Dental Clinic",
  description: "Committed to Dental Excellence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">
        <Navbar />
        <PageWrapper>
          <main className="flex-grow">{children}</main>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}