"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSnippets } from "@/context/snippetsContext";
import { searchSnippets } from "@/app/actions";

export function SnippetSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSnippets } = useSnippets();
  const searchRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = searchRef.current?.value ?? "";
    const tag = tagRef.current?.value ?? "";

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (tag) params.set("tag", tag);
    router.push(`?${params.toString()}`);

    const result = await searchSnippets({
      search: search || undefined,
      tag: tag || undefined,
    });
    setSnippets(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <Input
        ref={searchRef}
        type="text"
        placeholder="Search snippets..."
        defaultValue={searchParams.get("search") ?? ""}
        className="max-w-sm"
      />
      <Input
        ref={tagRef}
        type="text"
        placeholder="Filter by tag..."
        defaultValue={searchParams.get("tag") ?? ""}
        className="max-w-xs"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
