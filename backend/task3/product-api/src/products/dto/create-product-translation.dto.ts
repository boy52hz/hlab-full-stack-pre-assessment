import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProductTranslationDto {
  @IsString({
    message: 'name must be a string',
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  @IsString({
    message: 'description must be a string',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;

  @IsString({
    message: 'language must be a string',
  })
  @IsNotEmpty({
    message: 'language is required',
  })
  @Matches(/^[a-z]{2}$/, {
    message: 'language must contain only 2 lowercase letters',
  })
  language: string;
}
