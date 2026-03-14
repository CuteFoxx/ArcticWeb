import { Controller } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SnippetDto } from './dto/snippet.dto';

@Serialize(SnippetDto)
@Controller('snippets')
export class SnippetsController {}
