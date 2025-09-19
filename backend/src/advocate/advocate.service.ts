import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Advocate, Prisma } from '@prisma/client'

export interface PaginationResult<T> {
  total: number
  items: T[]
}

@Injectable()
export class AdvocateService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    where?: Prisma.AdvocateWhereInput
    skip?: number
    take?: number
  }): Promise<PaginationResult<Advocate>> {
    const { where = {}, skip = 0, take = 10 } = params

    const [items, total] = await Promise.all([
      this.prisma.advocate.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.advocate.count({ where }),
    ])

    return { total, items }
  }
}
