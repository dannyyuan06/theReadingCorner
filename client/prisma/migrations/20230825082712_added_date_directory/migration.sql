/*
  Warnings:

  - Added the required column `expireDate` to the `DiscountDirectory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `DiscountDirectory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscountDirectory" ADD COLUMN     "expireDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
