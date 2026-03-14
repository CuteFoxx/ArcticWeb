"use client";

import { Input } from "@/components/ui/input";

interface SnippetSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  tag: string;
  onTagChange: (value: string) => void;
}

export function SnippetSearch({
  search,
  onSearchChange,
  tag,
  onTagChange,
}: SnippetSearchProps) {
  return (
    <div className="flex items-center gap-4">
      <Input
        type="text"
        placeholder="Search snippets..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Input
        type="text"
        placeholder="Filter by tag..."
        value={tag}
        onChange={(e) => onTagChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
}
