/*
  Warnings:

  - The primary key for the `UserBook` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_pkey",
ADD CONSTRAINT "UserBook_pkey" PRIMARY KEY ("bookid", "username");
