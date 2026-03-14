export enum SnippetType {
  LINK = "link",
  NOTE = "note",
  COMMAND = "command",
}

export interface Snippet {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}
