import { PartialType } from '@nestjs/mapped-types';
import { CreateApartmentDtos } from './create-apartment.dto';

export class UpdateApartmentDto extends PartialType(CreateApartmentDtos) {}
