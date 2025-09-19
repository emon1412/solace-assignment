# Solace Candidate Assignment

Frontend is built with [Next.js](https://nextjs.org/) and [Material-UI](https://mui.com/).
Backend is built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

# Getting Started
## Database
From the root directory
  
```bash
docker compose up -d
```
This will start a PostgreSQL database on port `5432`.

## Backend
From the `backend` directory
1. Install dependencies
```bash
npm i
```
2. Run database migrations, generate Prisma types, and seed the database
```bash
npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
```
You can reset the database using the following command. You will need to re-run the migration and seed commands after resetting.
```bash
npm run prisma:reset
```

1. Start the development server:
```bash
npm run start:watch
```

The backend server will be running at `http://localhost:8888`.

## Frontend
From the `frontend` directory, in a separate terminal
1. Install dependencies
```bash
npm i
```

2. Start the development server:
```bash
npm run dev
```

The frontend server will be running at `http://localhost:3000`.