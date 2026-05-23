import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeoModule } from 'src/modules/seo/seo.module';

@Module({
  imports: [SeoModule],
  controllers: [TeamController],
  providers: [TeamService, PrismaService],
})
export class TeamModule {}
