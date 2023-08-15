-- CreateEnum
CREATE TYPE "transmissionType" AS ENUM ('Manual', 'Automatic', 'SemiAutomatic');

-- CreateEnum
CREATE TYPE "carCategory" AS ENUM ('Saloon', 'Estate', 'Suv', 'Off_Road', 'Coupe', 'Convertible', 'Sports_car', 'Hatchback', 'Mini_Van');

-- CreateEnum
CREATE TYPE "fuelType" AS ENUM ('Diesel', 'Petrol', 'Petrol_Electric', 'Diesel_Electric');

-- CreateTable
CREATE TABLE "Engine" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "configuration" TEXT NOT NULL,
    "fuelType" "fuelType" NOT NULL,
    "displacement" DECIMAL(65,30) NOT NULL,
    "mark" TEXT NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transmission" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "numOfGears" INTEGER NOT NULL,

    CONSTRAINT "Transmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "category" "carCategory" NOT NULL,
    "yearFrom" INTEGER NOT NULL,
    "yearTo" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "refernceNumber" TEXT NOT NULL,
    "imgURLs" TEXT[],
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "paragraphs" TEXT[],
    "imgURLs" TEXT[],
    "tools" TEXT NOT NULL,
    "parts" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,

    CONSTRAINT "PartCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartSubCategory" (
    "id" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,
    "partCategoryId" TEXT NOT NULL,

    CONSTRAINT "PartSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityAndState" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EngineToPart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CarToEngine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CarToTransmission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CarToPart" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PartToTransmission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PartCategory_name_key" ON "PartCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EngineToPart_AB_unique" ON "_EngineToPart"("A", "B");

-- CreateIndex
CREATE INDEX "_EngineToPart_B_index" ON "_EngineToPart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarToEngine_AB_unique" ON "_CarToEngine"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToEngine_B_index" ON "_CarToEngine"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarToTransmission_AB_unique" ON "_CarToTransmission"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToTransmission_B_index" ON "_CarToTransmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CarToPart_AB_unique" ON "_CarToPart"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToPart_B_index" ON "_CarToPart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PartToTransmission_AB_unique" ON "_PartToTransmission"("A", "B");

-- CreateIndex
CREATE INDEX "_PartToTransmission_B_index" ON "_PartToTransmission"("B");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartSubCategory" ADD CONSTRAINT "PartSubCategory_partCategoryId_fkey" FOREIGN KEY ("partCategoryId") REFERENCES "PartCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EngineToPart" ADD CONSTRAINT "_EngineToPart_A_fkey" FOREIGN KEY ("A") REFERENCES "Engine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EngineToPart" ADD CONSTRAINT "_EngineToPart_B_fkey" FOREIGN KEY ("B") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToEngine" ADD CONSTRAINT "_CarToEngine_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToEngine" ADD CONSTRAINT "_CarToEngine_B_fkey" FOREIGN KEY ("B") REFERENCES "Engine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToTransmission" ADD CONSTRAINT "_CarToTransmission_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToTransmission" ADD CONSTRAINT "_CarToTransmission_B_fkey" FOREIGN KEY ("B") REFERENCES "Transmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToPart" ADD CONSTRAINT "_CarToPart_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToPart" ADD CONSTRAINT "_CarToPart_B_fkey" FOREIGN KEY ("B") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartToTransmission" ADD CONSTRAINT "_PartToTransmission_A_fkey" FOREIGN KEY ("A") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartToTransmission" ADD CONSTRAINT "_PartToTransmission_B_fkey" FOREIGN KEY ("B") REFERENCES "Transmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
