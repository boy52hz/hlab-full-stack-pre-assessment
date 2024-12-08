import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class PaginateQueryDto {
  @IsString({
    message: 'search query (q) must be string',
  })
  @IsNotEmpty({
    message: 'search query (q) is required',
  })
  q: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
