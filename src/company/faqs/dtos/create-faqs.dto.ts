import { FaqCategory } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty({ message: 'Question cannot be empty' })
  question: string;

  @IsString()
  @IsNotEmpty({ message: 'Answer cannot be empty' })
  answer: string;

  @IsEnum(FaqCategory, { message: 'Must be a valid FAQ category' })
  @IsOptional()
  category?: FaqCategory;

  @IsInt()
  @Min(0)
  @IsOptional()
  sortOrder?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
