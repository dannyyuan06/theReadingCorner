/*
  Warnings:

  - You are about to drop the column `daysRead` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numReview` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "daysRead",
DROP COLUMN "numReview";
