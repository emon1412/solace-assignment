import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AdvocateModule } from './advocate/advocate.module'

@Module({
  imports: [AdvocateModule],
  providers: [PrismaService],
})

export class AppModule {}

