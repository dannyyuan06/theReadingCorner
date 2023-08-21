/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "UserPasswords" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "UserPasswords_pkey" PRIMARY KEY ("username")
);
