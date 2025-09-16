import { PrismaClient } from '@prisma/client'
import { advocateData } from './data'

const prisma = new PrismaClient()

async function main() {
  for (const { firstName, lastName, city, degree, specialties, yearsOfExperience, phoneNumber } of advocateData) {
    await prisma.advocate.create({
      data: {
        firstName,
        lastName,
        city,
        degree,
        specialties,
        yearsOfExperience,
        phoneNumber,
      },
    })
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
