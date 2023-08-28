/*
  Warnings:

  - You are about to drop the column `currentlyReadingBook` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `numOfBooksRead` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `numOfMembers` on the `Statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "currentlyReadingBook",
DROP COLUMN "numOfBooksRead",
DROP COLUMN "numOfMembers";
