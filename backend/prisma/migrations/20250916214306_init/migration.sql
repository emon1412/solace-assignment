-- CreateTable
CREATE TABLE "public"."Advocate" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "specialties" TEXT[],
    "years_of_experience" INTEGER NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advocate_pkey" PRIMARY KEY ("id")
);
