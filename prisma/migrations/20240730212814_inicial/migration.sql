-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NULL,
    `correo` VARCHAR(150) NULL,
    `correoVerificado` DATETIME(3) NULL,
    `imagen` VARCHAR(255) NULL,
    `contrasena` VARCHAR(200) NULL,
    `rol` ENUM('Administrador', 'Usuario') NOT NULL DEFAULT 'Usuario',
    `celular` VARCHAR(16) NULL,
    `autenticacionDobleFactor` BOOLEAN NOT NULL DEFAULT false,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,
    `proveedor` VARCHAR(50) NOT NULL,
    `idCuentaProveedor` VARCHAR(100) NOT NULL,
    `tokenActualizacion` TEXT NULL,
    `tokenAcceso` TEXT NULL,
    `expiraEn` INTEGER NULL,
    `tipoToken` VARCHAR(50) NULL,
    `alcance` VARCHAR(255) NULL,
    `idToken` TEXT NULL,
    `estadoSesion` VARCHAR(100) NULL,
    `tokenActualizacionExpiraEn` INTEGER NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cuenta_usuarioId_key`(`usuarioId`),
    INDEX `Cuenta_usuarioId_idx`(`usuarioId`),
    UNIQUE INDEX `Cuenta_proveedor_idCuentaProveedor_key`(`proveedor`, `idCuentaProveedor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenVerificacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TokenVerificacion_token_key`(`token`),
    UNIQUE INDEX `TokenVerificacion_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenReestablecimientoPassword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TokenReestablecimientoPassword_token_key`(`token`),
    UNIQUE INDEX `TokenReestablecimientoPassword_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TokenDobleFactor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TokenDobleFactor_token_key`(`token`),
    UNIQUE INDEX `TokenDobleFactor_email_token_key`(`email`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfirmacionDobleFactor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `ConfirmacionDobleFactor_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autenticador` (
    `idCredencial` VARCHAR(255) NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `idCuentaProveedor` VARCHAR(100) NOT NULL,
    `clavePublicaCredencial` VARCHAR(255) NOT NULL,
    `contador` INTEGER NOT NULL,
    `tipoDispositivoCredencial` VARCHAR(50) NOT NULL,
    `respaldadoCredencial` BOOLEAN NOT NULL,
    `transportes` VARCHAR(100) NULL,

    UNIQUE INDEX `Autenticador_idCredencial_key`(`idCredencial`),
    PRIMARY KEY (`usuarioId`, `idCredencial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mascota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `especie` ENUM('Perro', 'Gato', 'Otro') NOT NULL,
    `raza` VARCHAR(60) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `sexo` ENUM('Macho', 'Hembra') NOT NULL,
    `detalles` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NULL,
    `idPropietario` INTEGER NULL DEFAULT 0,
    `estado` VARCHAR(191) NOT NULL DEFAULT '0',
    `esterilizado` BOOLEAN NULL,
    `alergias` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialMedico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mascotaId` INTEGER NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `HistorialMedico_mascotaId_key`(`mascotaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tratamiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` DOUBLE NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `historialMedicoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` VARCHAR(191) NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NULL,
    `stock` INTEGER NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `tipo` ENUM('Pastilla', 'Vacuna', 'Inyeccion', 'Crema', 'Suero', 'Polvo', 'Gel', 'Otro') NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TratamientoMedicamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tratamientoId` INTEGER NOT NULL,
    `medicamentoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `total` DECIMAL(18, 2) NOT NULL,
    `cuotas` INTEGER NOT NULL,
    `montoCuota` DECIMAL(18, 2) NOT NULL,
    `estado` ENUM('Pendiente', 'Pagado') NOT NULL DEFAULT 'Pendiente',
    `fechaPago` DATETIME(3) NULL,
    `detalle` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservaMedica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaReserva` DATETIME(3) NOT NULL,
    `detalles` VARCHAR(191) NULL,
    `usuarioId` INTEGER NULL,
    `servicio` VARCHAR(100) NOT NULL,
    `estado` ENUM('Pendiente', 'Confirmada', 'Cancelada') NOT NULL DEFAULT 'Pendiente',
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cuenta` ADD CONSTRAINT `Cuenta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfirmacionDobleFactor` ADD CONSTRAINT `ConfirmacionDobleFactor_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Autenticador` ADD CONSTRAINT `Autenticador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mascota` ADD CONSTRAINT `mascota_idPropietario_fkey` FOREIGN KEY (`idPropietario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialMedico` ADD CONSTRAINT `HistorialMedico_mascotaId_fkey` FOREIGN KEY (`mascotaId`) REFERENCES `mascota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tratamiento` ADD CONSTRAINT `Tratamiento_historialMedicoId_fkey` FOREIGN KEY (`historialMedicoId`) REFERENCES `HistorialMedico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TratamientoMedicamento` ADD CONSTRAINT `TratamientoMedicamento_tratamientoId_fkey` FOREIGN KEY (`tratamientoId`) REFERENCES `Tratamiento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TratamientoMedicamento` ADD CONSTRAINT `TratamientoMedicamento_medicamentoId_fkey` FOREIGN KEY (`medicamentoId`) REFERENCES `Medicamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservaMedica` ADD CONSTRAINT `ReservaMedica_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
