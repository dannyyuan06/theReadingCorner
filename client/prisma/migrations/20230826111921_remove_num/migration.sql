/*
  Warnings:

  - You are about to drop the column `numBooksRead` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `numBulletinPosts` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "numBooksRead",
DROP COLUMN "numBulletinPosts";
