import Link from "next/link";
import { serverApi } from "@/lib/api.server";
import { Tag } from "@/components/ui/tag";
import type { Snippet } from "@/types/snippet";

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: snippet } = await serverApi.get<Snippet>(`/snippets/${id}`);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        &larr; Back to snippets
      </Link>

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>
        <Tag
          label={snippet.type}
          className={
            snippet.type === "command"
              ? "bg-amber-100 text-amber-800"
              : snippet.type === "link"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
          }
        />
      </div>

      {snippet.type === "command" ? (
        <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
          <code>{snippet.content}</code>
        </pre>
      ) : snippet.type === "link" ? (
        <a
          href={snippet.content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {snippet.content}
        </a>
      ) : (
        <p className="text-gray-700">{snippet.content}</p>
      )}

      {snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Created {new Date(snippet.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
