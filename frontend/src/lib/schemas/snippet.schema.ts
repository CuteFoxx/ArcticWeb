import { z } from "zod";

export const snippetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
  type: z.enum(["link", "note", "command"], {
    message: "Type is required",
  }),
});

export type SnippetFormValues = z.infer<typeof snippetSchema>;
