import { PrismaClient } from '@prisma/client'
import { advocateData } from './data'

const prisma = new PrismaClient()

async function main() {
  for (const advocate of advocateData) {
    await prisma.advocate.create({
      data: {
        first_name: advocate.firstName,
        last_name: advocate.lastName,
        city: advocate.city,
        degree: advocate.degree,
        payload: advocate.specialties,
        years_of_experience: advocate.yearsOfExperience,
        phone_number: advocate.phoneNumber,
      },
    })
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
