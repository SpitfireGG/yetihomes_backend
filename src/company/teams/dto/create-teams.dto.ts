import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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
