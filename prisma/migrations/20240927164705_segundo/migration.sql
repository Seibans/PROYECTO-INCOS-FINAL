/*
  Warnings:

  - You are about to drop the column `alergias` on the `mascota` table. All the data in the column will be lost.
  - You are about to drop the column `observaciones` on the `mascota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mascota` DROP COLUMN `alergias`,
    DROP COLUMN `observaciones`;
