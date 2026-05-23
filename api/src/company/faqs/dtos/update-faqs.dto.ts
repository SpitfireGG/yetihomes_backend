import { PartialType } from '@nestjs/mapped-types';
import { CreateFaqDto } from './create-faqs.dto';

export class UpdateFaqsDto extends PartialType(CreateFaqDto) {}
