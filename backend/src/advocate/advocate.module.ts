import { Module } from '@nestjs/common'
import { AdvocateController } from './advocate.controller'
import { AdvocateService } from './advocate.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [AdvocateController],
  providers: [AdvocateService, PrismaService],
})
export class AdvocateModule {}
