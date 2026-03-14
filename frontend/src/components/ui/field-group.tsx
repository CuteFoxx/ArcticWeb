import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface FieldGroupProps extends ComponentProps<"div"> {
  label: string;
  htmlFor?: string;
  error?: string;
}

export function FieldGroup({
  label,
  htmlFor,
  error,
  children,
  className,
  ...props
}: FieldGroupProps) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
