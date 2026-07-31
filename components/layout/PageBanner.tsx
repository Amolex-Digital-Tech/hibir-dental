import { Container } from "@/components/ui/container";

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

export function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <div className="relative pt-36 pb-20 bg-gradient-to-b from-sky-50 via-slate-50 to-white overflow-hidden border-b border-slate-100">
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] -z-10" />
      <Container className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}