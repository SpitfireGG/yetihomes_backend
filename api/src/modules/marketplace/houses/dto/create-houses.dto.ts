import { ValidateNested } from 'class-validator';
import { BasePropertyDto } from '../../dtos/base-property-dto';
import { Type } from 'class-transformer';
import { CreateHouseDetailsDto } from './create-houses-details.dto';

export class CreateHouseDto extends BasePropertyDto {
  @ValidateNested()
  @Type(() => CreateHouseDetailsDto)
  details: CreateHouseDetailsDto;
}
