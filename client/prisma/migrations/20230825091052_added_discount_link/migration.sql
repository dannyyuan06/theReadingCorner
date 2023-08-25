/*
  Warnings:

  - Added the required column `link` to the `DiscountDirectory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscountDirectory" ADD COLUMN     "link" TEXT NOT NULL;
