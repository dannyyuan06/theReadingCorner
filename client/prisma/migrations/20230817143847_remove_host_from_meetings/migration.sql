/*
  Warnings:

  - You are about to drop the column `hostid` on the `Meetings` table. All the data in the column will be lost.
  - Added the required column `host` to the `Meetings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meetings" DROP CONSTRAINT "Meetings_hostid_fkey";

-- AlterTable
ALTER TABLE "Meetings" DROP COLUMN "hostid",
ADD COLUMN     "host" TEXT NOT NULL;
