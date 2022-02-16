/*
  Warnings:

  - You are about to drop the `LeagueMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `League` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `League` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `League` ADD COLUMN `adminId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `LeagueMember`;
