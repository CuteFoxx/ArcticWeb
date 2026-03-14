"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  snippetSchema,
  type SnippetFormValues,
} from "@/lib/schemas/snippet.schema";
import { SnippetType, type Snippet } from "@/types/snippet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field-group";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormItem } from "@/components/ui/form-item";
import { Tag } from "@/components/ui/tag";

interface SnippetFormProps {
  defaultValues?: Snippet;
  onSubmit: (data: SnippetFormValues) => Promise<void>;
}

export function SnippetForm({ defaultValues, onSubmit }: SnippetFormProps) {
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          content: defaultValues.content,
          tags: defaultValues.tags,
          type: defaultValues.type,
        }
      : {
          title: "",
          content: "",
          tags: [],
          type: "note",
        },
  });

  const tags = watch("tags") ?? [];

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup label="Title" htmlFor="title" error={errors.title?.message}>
        <Input id="title" type="text" {...register("title")} />
      </FieldGroup>

      <FieldGroup
        label="Content"
        htmlFor="content"
        error={errors.content?.message}
      >
        <Textarea id="content" rows={4} {...register("content")} />
      </FieldGroup>

      <FieldGroup label="Type" htmlFor="type" error={errors.type?.message}>
        <Select id="type" {...register("type")}>
          {Object.values(SnippetType).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </FieldGroup>

      <FieldGroup label="Tags">
        <FormItem>
          {tags.map((t) => (
            <Tag key={t} label={t} onRemove={() => removeTag(t)} />
          ))}
        </FormItem>
        <FormItem className="flex gap-2">
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add a tag..."
            className="flex-1"
          />
          <Button type="button" onClick={addTag}>
            Add
          </Button>
        </FormItem>
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : defaultValues
            ? "Update Snippet"
            : "Create Snippet"}
      </Button>
    </form>
  );
}
