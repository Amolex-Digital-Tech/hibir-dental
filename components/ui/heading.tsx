import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function Heading({
  title,
 subtitle,
  align = "left",
}: HeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center"
      )}
    >
      {subtitle && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}