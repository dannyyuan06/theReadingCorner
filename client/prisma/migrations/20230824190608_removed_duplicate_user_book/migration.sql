/*
  Warnings:

  - The primary key for the `UserBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userbookid` on the `UserBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_pkey",
DROP COLUMN "userbookid",
ADD CONSTRAINT "UserBook_pkey" PRIMARY KEY ("bookid");
