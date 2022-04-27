-- CreateTable
CREATE TABLE "Verification" (
    "verification_id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_in" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("verification_id")
);

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
