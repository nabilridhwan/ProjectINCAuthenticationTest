/*
  Warnings:

  - You are about to drop the `privillege` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "fk_privillegeid";

-- DropTable
DROP TABLE "privillege";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Privilege" (
    "privilegeid" INTEGER NOT NULL,
    "description" VARCHAR(50)
);

-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "privilegeid" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE INDEX "Privilege_privilegeid_idx" ON "Privilege"("privilegeid");

-- CreateIndex
CREATE UNIQUE INDEX "Privilege_privilegeid_key" ON "Privilege"("privilegeid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userid_idx" ON "User"("userid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_privilegeid_fkey" FOREIGN KEY ("privilegeid") REFERENCES "Privilege"("privilegeid") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT;
