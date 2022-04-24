/*
  Warnings:

  - You are about to drop the column `accessid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `access_level` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "fk_accessid";

-- DropIndex
DROP INDEX "fki_fk_accessid";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "accessid",
ADD COLUMN     "privillegeid" BIGINT NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "access_level";

-- CreateTable
CREATE TABLE "privillege" (
    "privillegeid" BIGINT NOT NULL,
    "description" VARCHAR
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_privillegeid" ON "privillege"("privillegeid");

-- CreateIndex
CREATE INDEX "fki_fk_privillegeid" ON "user"("privillegeid");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_privillegeid" FOREIGN KEY ("privillegeid") REFERENCES "privillege"("privillegeid") ON DELETE SET NULL ON UPDATE SET NULL;
