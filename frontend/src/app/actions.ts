"use server";

import { serverApi } from "@/lib/api.server";
import type { Snippet } from "@/types/snippet";
import type { PaginatedResponse } from "@/types/paginated";

export async function searchSnippets(params: {
  search?: string;
  tag?: string;
}) {
  const { data } = await serverApi.get<PaginatedResponse<Snippet>>(
    "/snippets",
    { params },
  );
  return data;
}
