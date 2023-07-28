/*
  Warnings:

  - You are about to drop the column `uid` on the `BookSuggestions` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `BulletinBoardMessages` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `GenreSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `UserBook` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uid` on the `Users` table. All the data in the column will be lost.
  - Added the required column `username` to the `BookSuggestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `BulletinBoardMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `GenreSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookSuggestions" DROP CONSTRAINT "BookSuggestions_uid_fkey";

-- DropForeignKey
ALTER TABLE "BulletinBoardMessages" DROP CONSTRAINT "BulletinBoardMessages_uid_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_friend1id_fkey";

-- DropForeignKey
ALTER TABLE "Friends" DROP CONSTRAINT "Friends_friend2id_fkey";

-- DropForeignKey
ALTER TABLE "GenreSuggestion" DROP CONSTRAINT "GenreSuggestion_uid_fkey";

-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_hostid_fkey";

-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_uid_fkey";

-- AlterTable
ALTER TABLE "BookSuggestions" DROP COLUMN "uid",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BulletinBoardMessages" DROP COLUMN "uid",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Friends" ALTER COLUMN "friend1id" SET DATA TYPE TEXT,
ALTER COLUMN "friend2id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GenreSuggestion" DROP COLUMN "uid",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meetings" ALTER COLUMN "hostid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "uid",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "uid",
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("username");

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friend1id_fkey" FOREIGN KEY ("friend1id") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friend2id_fkey" FOREIGN KEY ("friend2id") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardMessages" ADD CONSTRAINT "BulletinBoardMessages_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_hostid_fkey" FOREIGN KEY ("hostid") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSuggestions" ADD CONSTRAINT "BookSuggestions_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreSuggestion" ADD CONSTRAINT "GenreSuggestion_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
