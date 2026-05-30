import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SocialPlatform } from '@prisma/client';

export class CreateSocialMediaDto {
  @IsEnum(SocialPlatform)
  @IsNotEmpty()
  platform: SocialPlatform;

  @IsString()
  @IsNotEmpty()
  url: string;
}
