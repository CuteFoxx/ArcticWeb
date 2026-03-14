import { Expose } from 'class-transformer';
import { SnippetType } from '../snippet.schema';

export class SnippetDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  tags: string[];

  @Expose()
  type: SnippetType;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
