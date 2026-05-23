import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemberDto } from './create-teams.dto';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {}
