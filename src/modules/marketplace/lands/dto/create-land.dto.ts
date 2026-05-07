import { ValidateNested } from 'class-validator';
import { BasePropertyDto } from '../../dtos/base-property-dto';
import { CreateLandDetailsDto } from './create-land-details-dto';
import { Type } from 'class-transformer';

export class CreateLandDto extends BasePropertyDto {
  @ValidateNested()
  @Type(() => CreateLandDetailsDto)
  details: CreateLandDetailsDto;
}
