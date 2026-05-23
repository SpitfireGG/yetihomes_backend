import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateCompanyInfoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  mission?: string;

  @IsString()
  @IsOptional()
  vision?: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
