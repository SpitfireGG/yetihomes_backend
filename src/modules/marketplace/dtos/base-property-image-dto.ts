import { IsString, IsOptional, IsInt, IsBoolean, IsUrl } from 'class-validator';

export class CreateBasePropertyImageDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  altText?: string;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
