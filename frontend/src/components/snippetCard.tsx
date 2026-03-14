"use client";

import Link from "next/link";
import { useState } from "react";
import type { Snippet } from "@/types/snippet";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

interface SnippetCardProps {
  snippet: Snippet;
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <Link
          href={`/snippets/${snippet.id}`}
          className="text-lg font-semibold hover:underline"
        >
          {snippet.title}
        </Link>
        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
          {snippet.type}
        </span>
      </div>

      {snippet.type === "command" ? (
        <div className="relative mb-3">
          <pre className="overflow-x-auto rounded bg-gray-900 p-3 pr-16 text-sm text-gray-100">
            <code>{snippet.content}</code>
          </pre>
          <Button
            onClick={handleCopy}
            className="absolute right-2 top-2 bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      ) : snippet.type === "link" ? (
        <div className="mb-3 flex items-center gap-2">
          <a
            href={snippet.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            {snippet.content}
          </a>
          <Button
            onClick={handleCopy}
            className="bg-gray-200 px-2 py-0.5 text-xs text-gray-600 shadow-none hover:bg-gray-300"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      ) : (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {snippet.content}
        </p>
      )}

      {snippet.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {snippet.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => onEdit(snippet)}
          className="bg-gray-200 px-3 py-1 text-sm text-black shadow-none hover:bg-gray-300"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(snippet.id)}
          className="bg-red-500 px-3 py-1 text-sm hover:bg-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
