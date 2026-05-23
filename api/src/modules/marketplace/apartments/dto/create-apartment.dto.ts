import { ValidateNested } from 'class-validator';
import { BasePropertyDto } from '../../dtos/base-property-dto';
import { Type } from 'class-transformer';
import { CreateApartmentDetailsDto } from './create-apartment-details.dto';

export class CreateApartmentDtos extends BasePropertyDto {
  @ValidateNested()
  @Type(() => CreateApartmentDetailsDto)
  details: CreateApartmentDetailsDto;
}
