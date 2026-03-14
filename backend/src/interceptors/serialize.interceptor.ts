import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: unknown[]): object;
}

interface MongooseDocument {
  _id?: string;
  toJSON?(): Record<string, unknown>;
}

interface PaginatedResponse {
  data: MongooseDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  private toPlain(data: MongooseDocument): Record<string, unknown> {
    const obj: Record<string, unknown> = data.toJSON
      ? data.toJSON()
      : { ...data };
    if (obj._id != null) {
      obj.id = (obj._id as { toString(): string }).toString();
    }
    return obj;
  }

  intercept(_context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      map((data: MongooseDocument | PaginatedResponse) => {
        if ('data' in data && Array.isArray(data.data) && 'total' in data) {
          const paginated = data;
          return {
            data: paginated.data.map((item) =>
              plainToInstance(this.dto, this.toPlain(item), {
                excludeExtraneousValues: true,
              }),
            ),
            total: paginated.total,
            page: paginated.page,
            limit: paginated.limit,
            totalPages: paginated.totalPages,
          };
        }

        return plainToInstance(
          this.dto,
          this.toPlain(data as MongooseDocument),
          {
            excludeExtraneousValues: true,
          },
        );
      }),
    );
  }
}
