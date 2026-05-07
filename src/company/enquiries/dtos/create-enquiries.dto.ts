import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { InquiryType } from '@prisma/client';

export class CreateInquiryDto {
  @IsUUID()
  @IsOptional()
  propertyId?: string;

  @IsEnum(InquiryType)
  @IsOptional()
  type?: InquiryType;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
