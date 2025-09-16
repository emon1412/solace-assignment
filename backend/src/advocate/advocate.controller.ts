import { Controller, Get, Query } from '@nestjs/common'
import { AdvocateService, PaginationResult } from './advocate.service'
import { Advocate, Prisma } from '@prisma/client';

@Controller('advocates')
export class AdvocateController {
  constructor(private readonly advocateService: AdvocateService) {}

  @Get()
  async getAdvocates(
    @Query('q') q: string,
    @Query('specialty') specialty: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginationResult<Advocate>> {
    const filters: Prisma.AdvocateWhereInput[] = []

    if (q) {
      filters.push({
        OR: [
          { firstName: { contains: q, mode: 'insensitive' } },
          { lastName: { contains: q, mode: 'insensitive' } },
          { city: { contains: q, mode: 'insensitive' } },
          { degree: { contains: q, mode: 'insensitive' } },
          { phoneNumber: { contains: q, mode: 'insensitive' } },
        ],
      })
    }

    if (specialty) {
      filters.push({
        specialties: { has: specialty },
      })
    }

    const where: Prisma.AdvocateWhereInput = filters.length > 0 ? { AND: filters } : {}

    const { items, total } = await this.advocateService.findAll({
      where,
      skip: Number((page - 1) * limit),
      take: Number(limit),
    })

    return { items, total }
  }
}
