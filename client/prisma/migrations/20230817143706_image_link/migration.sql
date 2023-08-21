/*
  Warnings:

  - Added the required column `imageLink` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetings" ADD COLUMN     "imageLink" TEXT NOT NULL;
