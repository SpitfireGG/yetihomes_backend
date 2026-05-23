import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  authorRole: string;

  @IsString()
  @IsNotEmpty()
  readTime: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
