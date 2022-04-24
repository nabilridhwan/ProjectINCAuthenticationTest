-- CreateTable
CREATE TABLE "access_level" (
    "accessid" BIGINT NOT NULL,
    "access_name" VARCHAR(10)
);

-- CreateTable
CREATE TABLE "user" (
    "userid" BIGSERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "registered" BOOLEAN NOT NULL DEFAULT false,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "accessid" BIGINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userid" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_accessid" ON "access_level"("accessid");

-- CreateIndex
CREATE UNIQUE INDEX "uq_username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "uq_email" ON "user"("email");

-- CreateIndex
CREATE INDEX "fki_fk_accessid" ON "user"("accessid");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "fk_accessid" FOREIGN KEY ("accessid") REFERENCES "access_level"("accessid") ON DELETE NO ACTION ON UPDATE NO ACTION;
