import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Patch,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ImageUploadInterceptor } from 'src/utils/image-upload.interceptor';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateTeamMemberDto } from './dto/create-teams.dto';
import { UpdateTeamMemberDto } from './dto/update-teams.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ImageUploadInterceptor('images', 'teams', 2, 3))
  async create(
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Team data is missing.`);

    let payload: object;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(CreateTeamMemberDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const thumbnail =
      files && files[0] ? `/uploads/teams/${files[0].filename}` : undefined;
    const image =
      files && files[1] ? `/uploads/teams/${files[1].filename}` : undefined;

    const finalPayload = {
      ...dto,
      thumbnail,
      image,
    };

    const teamMember = await this.teamService.create(finalPayload);

    return {
      success: true,
      message: 'Team member created successfully',
      data: teamMember,
    };
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(ImageUploadInterceptor('images', 'teams', 2, 3))
  async update(
    @Param('id') id: string,
    @Body('data') dataString: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!dataString) throw new BadRequestException(`Team data is missing.`);

    let payload: object;
    try {
      payload = JSON.parse(dataString);
    } catch (e) {
      throw new BadRequestException('Invalid JSON format in data field');
    }

    const dto = plainToInstance(UpdateTeamMemberDto, payload);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      const msg = errors
        .map((err: any) => Object.values(err.constraints))
        .flat();
      throw new BadRequestException(msg);
    }

    const thumbnail =
      files && files[0] ? `/uploads/teams/${files[0].filename}` : undefined;
    const image =
      files && files[1] ? `/uploads/teams/${files[1].filename}` : undefined;

    const finalPayload = {
      ...dto,
      ...(thumbnail && { thumbnail }),
      ...(image && { image }),
    };

    const updatedMember = await this.teamService.update(id, finalPayload);

    return {
      success: true,
      message: 'Team member updated successfully',
      data: updatedMember,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.delete(id);
  }
}
