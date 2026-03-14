import { SnippetType } from '../snippet.schema';

export class SnippetDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: Date;
  updatedAt: Date;
}
