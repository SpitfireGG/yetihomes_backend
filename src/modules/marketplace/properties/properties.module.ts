import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PropertiesController],
  providers: [PrismaService],
})
export class PropertiesModule {}