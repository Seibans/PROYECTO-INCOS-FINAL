/*
  Warnings:

  - You are about to alter the column `descripcion` on the `medicamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(150)`.
  - Added the required column `costoUnitario` to the `TratamientoMedicamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicamento` ADD COLUMN `cantidadPorUnidad` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `indicaciones` VARCHAR(200) NULL,
    ADD COLUMN `sobrante` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `unidadMedida` VARCHAR(50) NULL,
    MODIFY `descripcion` VARCHAR(150) NULL;

-- AlterTable
ALTER TABLE `tratamientomedicamento` ADD COLUMN `costoUnitario` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `dosificacion` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `costo` DECIMAL(10, 2) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `creadoEn` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` TIMESTAMP(3) NULL,
    `idUsuario` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `Servicio_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ServicioToTratamiento` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_ServicioToTratamiento_AB_unique`(`A`, `B`),
    INDEX `_ServicioToTratamiento_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ServicioToTratamiento` ADD CONSTRAINT `_ServicioToTratamiento_A_fkey` FOREIGN KEY (`A`) REFERENCES `Servicio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicioToTratamiento` ADD CONSTRAINT `_ServicioToTratamiento_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tratamiento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
