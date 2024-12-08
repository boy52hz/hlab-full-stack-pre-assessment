import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateProductTranslationDto } from './create-product-translation.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString({
    message: 'sku must be a string',
  })
  @IsNotEmpty({
    message: 'sku is required',
  })
  sku: string;

  @IsArray({
    message: 'translations must be an array',
  })
  @ArrayMinSize(1, {
    message: 'translations must have at least one element',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductTranslationDto)
  translations: CreateProductTranslationDto[];
}
