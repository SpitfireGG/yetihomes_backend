import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyInfoDto } from './create-about-dto';

export class UpdateCompanyInfoDto extends PartialType(CreateCompanyInfoDto) {}
