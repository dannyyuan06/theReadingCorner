/*
  Warnings:

  - You are about to drop the column `bookid` on the `Meetings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_bookid_fkey";

-- AlterTable
ALTER TABLE "Meetings" DROP COLUMN "bookid";
