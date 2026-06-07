ALTER TABLE "User" ADD COLUMN "resetPasswordToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetPasswordTokenExp" TIMESTAMP(3);
ALTER TABLE "UserMovie" ADD COLUMN "notes" TEXT;
