import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}