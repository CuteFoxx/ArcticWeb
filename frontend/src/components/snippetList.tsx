import type { Snippet } from "@/types/snippet";
import { SnippetCard } from "@/components/snippetCard";

interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

export function SnippetList({ snippets, onEdit, onDelete }: SnippetListProps) {
  if (snippets.length === 0) {
    return <p className="text-center text-gray-500">No snippets found.</p>;
  }

  return (
    <div className="grid gap-4">
      {snippets.map((snippet) => (
        <SnippetCard
          key={snippet.id}
          snippet={snippet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
