import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn("w-full rounded border px-3 py-2", className)}
      {...props}
    />
  );
}
