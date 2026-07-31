import { cn } from "@/lib/utils";

type GlassProps = {
  children: React.ReactNode;
  className?: string;
};

export function Glass({
  children,
  className,
}: GlassProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/30 bg-white/15 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}