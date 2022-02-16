/*
  Warnings:

  - You are about to drop the column `userId` on the `League` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `League` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `LeagueMember` (
    `userId` VARCHAR(191) NOT NULL,
    `leagueId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL DEFAULT 'user',

    PRIMARY KEY (`userId`, `leagueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
