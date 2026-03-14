import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export function FormItem({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mb-2 flex gap-2", className)} {...props} />;
}
