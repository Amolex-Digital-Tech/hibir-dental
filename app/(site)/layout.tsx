import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageWrapper>
        <main className="flex-grow">
          {children}
        </main>
      </PageWrapper>

      <Footer />
    </div>
  );
}