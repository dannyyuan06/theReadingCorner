/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "averageRating";
