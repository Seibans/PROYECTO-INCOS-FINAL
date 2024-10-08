/*
  Warnings:

  - Added the required column `precioServicio` to the `ServicioTratamiento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `serviciotratamiento` ADD COLUMN `precioServicio` DECIMAL(10, 2) NOT NULL;
