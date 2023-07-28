/*
  Warnings:

  - You are about to drop the column `bookid` on the `BulletinBoardMessages` table. All the data in the column will be lost.
  - Added the required column `bulletinboardbookid` to the `BulletinBoardMessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BulletinBoardMessages" DROP CONSTRAINT "BulletinBoardMessages_bookid_fkey";

-- AlterTable
ALTER TABLE "BulletinBoardMessages" DROP COLUMN "bookid",
ADD COLUMN     "bulletinboardbookid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BulletinBoardBooks" (
    "bulletinboardbookid" SERIAL NOT NULL,
    "bookid" TEXT NOT NULL,
    "messageid" INTEGER NOT NULL,

    CONSTRAINT "BulletinBoardBooks_pkey" PRIMARY KEY ("bulletinboardbookid")
);

-- AddForeignKey
ALTER TABLE "BulletinBoardBooks" ADD CONSTRAINT "BulletinBoardBooks_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardBooks" ADD CONSTRAINT "BulletinBoardBooks_messageid_fkey" FOREIGN KEY ("messageid") REFERENCES "BulletinBoardMessages"("messageid") ON DELETE RESTRICT ON UPDATE CASCADE;
