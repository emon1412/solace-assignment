import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })

  await app.listen(8888) // Run NestJS on a different port than Next.js
  console.log(`NestJS API is running on: http://localhost:8888`)
}

bootstrap()
