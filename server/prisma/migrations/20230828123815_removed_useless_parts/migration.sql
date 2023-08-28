/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `currentlyReadingBook` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `numOfBooksRead` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `numOfMembers` on the `Statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "averageRating",
DROP COLUMN "currentlyReadingBook",
DROP COLUMN "numOfBooksRead",
DROP COLUMN "numOfMembers";
