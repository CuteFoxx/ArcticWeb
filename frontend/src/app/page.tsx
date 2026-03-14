import { serverApi } from "@/lib/api.server";
import { SnippetsProvider } from "@/context/snippetsContext";
import { SnippetsView } from "@/components/snippetsView";
import type { Snippet } from "@/types/snippet";
import type { PaginatedResponse } from "@/types/paginated";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tag?: string }>;
}) {
  const { search, tag } = await searchParams;
  const { data } = await serverApi.get<PaginatedResponse<Snippet>>(
    "/snippets",
    { params: { search, tag } },
  );

  return (
    <SnippetsProvider initialSnippets={data.data}>
      <SnippetsView />
    </SnippetsProvider>
  );
}
