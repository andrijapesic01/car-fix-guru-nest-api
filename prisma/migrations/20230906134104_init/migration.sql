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
    "torque" INTEGER NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "category" TEXT NOT NULL,
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
    "referenceNumber" TEXT NOT NULL,
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
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imgURLs" TEXT[],
    "tools" TEXT NOT NULL,
    "parts" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "engineId" TEXT NOT NULL,

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
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityAndState" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "orderedQunatity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_CarToPart" (
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
CREATE UNIQUE INDEX "_CarToPart_AB_unique" ON "_CarToPart"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToPart_B_index" ON "_CarToPart"("B");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_engineId_fkey" FOREIGN KEY ("engineId") REFERENCES "Engine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartSubCategory" ADD CONSTRAINT "PartSubCategory_partCategoryId_fkey" FOREIGN KEY ("partCategoryId") REFERENCES "PartCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EngineToPart" ADD CONSTRAINT "_EngineToPart_A_fkey" FOREIGN KEY ("A") REFERENCES "Engine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EngineToPart" ADD CONSTRAINT "_EngineToPart_B_fkey" FOREIGN KEY ("B") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToEngine" ADD CONSTRAINT "_CarToEngine_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToEngine" ADD CONSTRAINT "_CarToEngine_B_fkey" FOREIGN KEY ("B") REFERENCES "Engine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToPart" ADD CONSTRAINT "_CarToPart_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToPart" ADD CONSTRAINT "_CarToPart_B_fkey" FOREIGN KEY ("B") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;
