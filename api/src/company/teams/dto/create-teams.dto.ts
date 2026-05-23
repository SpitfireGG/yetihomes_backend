import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsOptional,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  expertise: string[];

  @IsString()
  @IsNotEmpty()
  education: string;
}
