"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { SnippetForm } from "@/components/snippetForm";
import { SnippetSearch } from "@/components/snippetSearch";
import { SnippetList } from "@/components/snippetList";
import { useSnippets } from "@/context/snippetsContext";
import { api } from "@/lib/api";
import type { SnippetFormValues } from "@/lib/schemas/snippet.schema";
import type { Snippet } from "@/types/snippet";

export function SnippetsView() {
  const { snippets, setSnippets } = useSnippets();
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);

  const handleCreate = async (data: SnippetFormValues) => {
    const res = await api.post<Snippet>("/snippets", data);
    setSnippets([res.data, ...snippets]);
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
  };

  const handleUpdate = async (data: SnippetFormValues) => {
    if (!editingSnippet) return;
    const res = await api.patch<Snippet>(
      `/snippets/${editingSnippet.id}`,
      data,
    );
    setSnippets(snippets.map((s) => (s.id === res.data.id ? res.data : s)));
    setEditingSnippet(null);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/snippets/${id}`);
    setSnippets(snippets.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Snippets</h1>

        <Modal.Root>
          <Modal.Trigger>New Snippet</Modal.Trigger>
          <Modal.Content>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Create Snippet</h2>
              <Modal.Close />
            </div>
            <SnippetForm onSubmit={handleCreate} />
          </Modal.Content>
        </Modal.Root>
      </div>

      <SnippetSearch />

      <SnippetList
        snippets={snippets}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {editingSnippet && (
        <Modal.Root
          defaultOpen
          onOpenChange={(open) => {
            if (!open) setEditingSnippet(null);
          }}
        >
          <Modal.Content>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit Snippet</h2>
              <Modal.Close />
            </div>
            <SnippetForm
              defaultValues={editingSnippet}
              onSubmit={handleUpdate}
            />
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
}
