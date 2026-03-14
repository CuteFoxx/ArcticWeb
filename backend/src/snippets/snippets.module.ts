import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './snippet.schema';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  providers: [SnippetsService],
  controllers: [SnippetsController],
  exports: [MongooseModule],
})
export class SnippetsModule {}
