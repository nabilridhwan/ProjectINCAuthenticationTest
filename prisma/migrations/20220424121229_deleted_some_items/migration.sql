/*
  Warnings:

  - You are about to drop the column `activated` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `registered` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "activated",
DROP COLUMN "registered";
