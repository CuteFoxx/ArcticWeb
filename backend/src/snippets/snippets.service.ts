import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Snippet, SnippetDocument } from './snippet.schema';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name)
    private readonly snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    return this.snippetModel.create(createSnippetDto);
  }

  async findAll(query: PaginationQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = search
      ? { $text: { $search: search } }
      : {};

    const [data, total] = await Promise.all([
      this.snippetModel
        .find(filter)
        .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.snippetModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findById(id).exec();

    if (!snippet) {
      throw new NotFoundException(`Snippet not found`);
    }

    return snippet;
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Snippet> {
    const snippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!snippet) {
      throw new NotFoundException(`Snippet not found`);
    }

    return snippet;
  }

  async remove(id: string): Promise<Snippet> {
    const snippet = await this.snippetModel.findByIdAndDelete(id).exec();

    if (!snippet) {
      throw new NotFoundException(`Snippet not found`);
    }

    return snippet;
  }
}
