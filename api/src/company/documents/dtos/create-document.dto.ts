import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { LegalDocType } from '@prisma/client';

export class CreateLegalDocumentDto {
  @IsEnum(LegalDocType)
  @IsNotEmpty()
  type: LegalDocType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
