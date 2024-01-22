-- CreateTable
CREATE TABLE "UserSignUp" (
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSignUp_pkey" PRIMARY KEY ("email")
);
