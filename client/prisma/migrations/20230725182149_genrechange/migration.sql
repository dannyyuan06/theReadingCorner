/*
  Warnings:

  - You are about to drop the column `genreid` on the `GenreSuggestion` table. All the data in the column will be lost.
  - You are about to drop the `Genres` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genre` to the `GenreSuggestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GenreSuggestion" DROP CONSTRAINT "GenreSuggestion_genreid_fkey";

-- AlterTable
ALTER TABLE "GenreSuggestion" DROP COLUMN "genreid",
ADD COLUMN     "genre" TEXT NOT NULL;

-- DropTable
DROP TABLE "Genres";
