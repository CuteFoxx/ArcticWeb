"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Button } from "./button";

interface ModalContextValue {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal components must be used within <Modal>");
  return ctx;
}

function Root({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <ModalContext value={{ open, onOpen, onClose }}>{children}</ModalContext>
  );
}

function Trigger({ className, children, ...props }: ComponentProps<"button">) {
  const { onOpen } = useModal();
  return (
    <Button onClick={onOpen} className={className} {...props}>
      {children}
    </Button>
  );
}

function Content({ className, children, ...props }: ComponentProps<"div">) {
  const { open, onClose } = useModal();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "bg-background relative z-50 w-full max-w-lg rounded-lg border p-6 shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function Close({ className, children, ...props }: ComponentProps<"button">) {
  const { onClose } = useModal();
  return (
    <button type="button" onClick={onClose} className={className} {...props}>
      {children ?? "Close"}
    </button>
  );
}

export const Modal = { Root, Trigger, Content, Close };
