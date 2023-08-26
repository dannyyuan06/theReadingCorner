-- CreateTable
CREATE TABLE "DiscountDirectory" (
    "discountdirectoryid" SERIAL NOT NULL,
    "imageLink" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "DiscountDirectory_pkey" PRIMARY KEY ("discountdirectoryid")
);
