/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bike` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `bike` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bike` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bike_name_key` ON `Bike`(`name`);