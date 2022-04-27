/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guid` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Verification" ADD COLUMN     "guid" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Verification_guid_key" ON "Verification"("guid");
