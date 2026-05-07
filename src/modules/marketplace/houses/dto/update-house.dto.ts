import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseDto } from './create-houses.dto';

export class UpdateHouseDto extends PartialType(CreateHouseDto) {}
