-- CreateTable
CREATE TABLE `Bike` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `bikeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bike_bikeId_key`(`bikeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BikeSetup` (
    `id` VARCHAR(191) NOT NULL,
    `bikeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
