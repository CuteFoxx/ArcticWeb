import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, SnippetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
