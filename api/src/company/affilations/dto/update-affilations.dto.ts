import { PartialType } from '@nestjs/mapped-types';
import { CreateAffiliationDto } from './create-affilations.dto';

export class UpdateAffilationDto extends PartialType(CreateAffiliationDto) {}
