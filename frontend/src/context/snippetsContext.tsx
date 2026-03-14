"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Snippet } from "@/types/snippet";

interface SnippetsContextValue {
  snippets: Snippet[];
  setSnippets: (snippets: Snippet[]) => void;
}

const SnippetsContext = createContext<SnippetsContextValue | null>(null);

export function useSnippets() {
  const ctx = useContext(SnippetsContext);
  if (!ctx)
    throw new Error("useSnippets must be used within <SnippetsProvider>");
  return ctx;
}

export function SnippetsProvider({
  initialSnippets = [],
  children,
}: {
  initialSnippets?: Snippet[];
  children: ReactNode;
}) {
  const [snippets, setSnippets] = useState<Snippet[]>(initialSnippets);

  return (
    <SnippetsContext value={{ snippets, setSnippets }}>
      {children}
    </SnippetsContext>
  );
}
