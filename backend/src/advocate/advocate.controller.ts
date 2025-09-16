import { Controller, Get } from '@nestjs/common'
import { AdvocateService } from './advocate.service'

@Controller('advocates')
export class AdvocateController {
  constructor(private readonly advocateService: AdvocateService) {}

  @Get()
  findAll() {
    return this.advocateService.findAll()
  }
}
