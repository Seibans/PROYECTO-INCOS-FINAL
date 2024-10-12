/*
  Warnings:

  - You are about to drop the column `pagoId` on the `tratamiento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tratamiento` DROP FOREIGN KEY `Tratamiento_pagoId_fkey`;

-- AlterTable
ALTER TABLE `pago` ADD COLUMN `metodoPago` VARCHAR(50) NULL,
    MODIFY `id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `tratamiento` DROP COLUMN `pagoId`;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_id_fkey` FOREIGN KEY (`id`) REFERENCES `Tratamiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
