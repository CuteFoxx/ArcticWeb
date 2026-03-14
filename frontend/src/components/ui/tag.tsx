import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export function Tag({ label, onRemove, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded bg-gray-200 px-2 py-0.5 text-xs",
        className,
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      )}
    </span>
  );
}
