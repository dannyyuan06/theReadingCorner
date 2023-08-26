/*
  Warnings:

  - The primary key for the `UserBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userbookid` on the `UserBook` table. All the data in the column will be lost.
  - You are about to drop the column `daysRead` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `meanScore` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numBooksRead` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numBulletinPosts` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numReview` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CurrentlyReading" ADD COLUMN     "affiliateLink" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_pkey",
DROP COLUMN "userbookid",
ADD CONSTRAINT "UserBook_pkey" PRIMARY KEY ("bookid", "username");

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "daysRead",
DROP COLUMN "meanScore",
DROP COLUMN "numBooksRead",
DROP COLUMN "numBulletinPosts",
DROP COLUMN "numReview";

-- CreateTable
CREATE TABLE "DiscountDirectory" (
    "discountdirectoryid" SERIAL NOT NULL,
    "imageLink" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "DiscountDirectory_pkey" PRIMARY KEY ("discountdirectoryid")
);
