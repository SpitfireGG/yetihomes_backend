import { IsEnum, IsNotEmpty } from 'class-validator';
import { InquiryStatus } from '@prisma/client';

export class UpdateInquiryStatusDto {
  @IsEnum(InquiryStatus)
  @IsNotEmpty({ message: 'You must provide a valid inquiry status.' })
  status: InquiryStatus;
}
