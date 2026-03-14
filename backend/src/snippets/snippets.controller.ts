import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { SnippetDto } from './dto/snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetsService } from './snippets.service';

@Serialize(SnippetDto)
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.snippetsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.snippetsService.remove(id);
  }
}
