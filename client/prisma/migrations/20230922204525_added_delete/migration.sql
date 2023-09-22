-- DropForeignKey
ALTER TABLE "BulletinBoardBooks" DROP CONSTRAINT "BulletinBoardBooks_messageid_fkey";

-- AddForeignKey
ALTER TABLE "BulletinBoardBooks" ADD CONSTRAINT "BulletinBoardBooks_messageid_fkey" FOREIGN KEY ("messageid") REFERENCES "BulletinBoardMessages"("messageid") ON DELETE CASCADE ON UPDATE CASCADE;
