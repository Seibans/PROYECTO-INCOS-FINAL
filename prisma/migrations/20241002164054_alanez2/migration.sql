/*
  Warnings:

  - You are about to drop the column `costo` on the `servicio` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `tratamiento` table. All the data in the column will be lost.
  - Added the required column `precio` to the `Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `servicio` DROP COLUMN `costo`,
    ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `tratamiento` DROP COLUMN `precio`;
