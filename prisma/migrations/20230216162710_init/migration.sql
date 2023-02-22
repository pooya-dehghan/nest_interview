-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "financialCredit" INTEGER NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "phoneNumbers" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
