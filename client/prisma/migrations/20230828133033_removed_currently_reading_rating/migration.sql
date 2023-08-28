/*
  Warnings:

  - You are about to drop the column `averageRating` on the `CurrentlyReading` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "averageRating" SET DEFAULT -1;

-- AlterTable
ALTER TABLE "CurrentlyReading" DROP COLUMN "averageRating";
