/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BookSuggestions" DROP CONSTRAINT "BookSuggestions_bookid_fkey";

-- DropForeignKey
ALTER TABLE "BulletinBoardMessages" DROP CONSTRAINT "BulletinBoardMessages_bookid_fkey";

-- DropForeignKey
ALTER TABLE "CurrentlyReading" DROP CONSTRAINT "CurrentlyReading_bookid_fkey";

-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_bookid_fkey";

-- DropForeignKey
ALTER TABLE "UserBook" DROP CONSTRAINT "UserBook_bookid_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "bookid" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("bookid");

-- AlterTable
ALTER TABLE "BookSuggestions" ALTER COLUMN "bookid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "BulletinBoardMessages" ALTER COLUMN "bookid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "CurrentlyReading" ALTER COLUMN "bookid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Meetings" ALTER COLUMN "bookid" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserBook" ALTER COLUMN "bookid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardMessages" ADD CONSTRAINT "BulletinBoardMessages_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meetings" ADD CONSTRAINT "Meetings_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentlyReading" ADD CONSTRAINT "CurrentlyReading_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSuggestions" ADD CONSTRAINT "BookSuggestions_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;
