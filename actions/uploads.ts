// "use server";
// import * as z from "zod";
// import { db } from "@/lib/db";
// import { usuarioActual, usuarioIdActual } from "@/lib/auth";
// import fs from 'fs-extra';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { unstable_update } from "@/auth";
// import { getUserById } from "@/data/user";

// export const editarEsquema = async (
// 	idTabla: number,
// 	archivo: FormData,
// 	ruta: string,
// ) => {
// 	try {
// 		const file = archivo.get('file') as File;

// 		if (!file) {
// 			return { error: "La imagen es requerida" };
// 		}

// 		let rutaImagen: string | null = null;
// 		const nombre = archivo.get('nombre') as string;

// 		if (ruta === 'medicamento') {
// 			const medicamentoExistente = await db.medicamento.findUnique({
// 				where: { id: idTabla },
// 			});

// 			if (!medicamentoExistente) {
// 				return { error: "Medicamento no encontrado." };
// 			}

// 			if (file) {
// 				if (medicamentoExistente.imagen) {
// 					const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', 'medicamentos', path.basename(medicamentoExistente.imagen));
// 					if (fs.existsSync(rutaImagenAnterior)) {
// 						await fs.unlink(rutaImagenAnterior).catch((error) => {
// 							console.error("Error al eliminar la imagen anterior:", error);
// 						});
// 					} else {
// 						console.warn("La imagen anterior no existe:", rutaImagenAnterior);
// 					}
// 				}

// 				// const nombreUnico = `${uuidv4()}_${file.name}`;
// 				const nombreUnico = `${uuidv4()}`;
// 				const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'medicamentos', nombreUnico);
// 				await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

// 				const buffer = Buffer.from(await file.arrayBuffer());
// 				await fs.writeFile(rutaDeAlmacenamiento, buffer);

// 				rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/medicamentos/${nombreUnico}`;
// 			} else {
// 				rutaImagen = medicamentoExistente.imagen;
// 			}


// 			const medicamentoActualizado = await db.medicamento.update({
// 				where: { id: idTabla },
// 				data: {
// 					imagen: rutaImagen,
// 					idUsuario: await usuarioIdActual(),
// 				},
// 			});

// 			return { success: "Imagen de Medicamento actualizada correctamente!" };
// 		} else if (ruta === 'usuario') {
// 			const nombre = archivo.get('nombre') as string;
// 			const usuarioExistente = await db.user.findUnique({
// 				where: { id: idTabla },
// 			});

// 			if (!usuarioExistente) {
// 				return { error: "Usuario no encontrado." };
// 			}

// 			if (file) {
// 				if (usuarioExistente.image) {
// 					const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', 'usuarios', path.basename(usuarioExistente.image));
// 					if (fs.existsSync(rutaImagenAnterior)) {
// 						await fs.unlink(rutaImagenAnterior).catch((error) => {
// 							console.error("Error al eliminar la imagen anterior:", error);
// 						});
// 					} else {
// 						console.warn("La imagen anterior no existe:", rutaImagenAnterior);
// 					}
// 				}

// 				// const nombreUnico = `${uuidv4()}_${file.name}`;
// 				const nombreUnico = `${uuidv4()}`;
// 				const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'usuarios', nombreUnico);
// 				await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

// 				const buffer = Buffer.from(await file.arrayBuffer());
// 				await fs.writeFile(rutaDeAlmacenamiento, buffer);

// 				rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/usuarios/${nombreUnico}`;
// 			} else {
// 				rutaImagen = usuarioExistente.image;
// 			}

// 			const usuarioActualizado = await db.user.update({
// 				where: { id: idTabla },
// 				data: {
// 					image: rutaImagen,
// 					idUsuario: await usuarioIdActual(),
// 				},
// 			});

// 			return { success: "Imagen de Usuario actualizada correctamente!" };
// 		} else if (ruta === 'mascota') {
// 			const mascotaExistente = await db.mascota.findUnique({
// 				where: { id: idTabla },
// 			});

// 			if (!mascotaExistente) {
// 				return { error: "Mascota no encontrada." };
// 			}

// 			if (file) {
// 				// Eliminar imagen anterior si existe
// 				if (mascotaExistente.imagen) {
// 					const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', 'mascotas', path.basename(mascotaExistente.imagen));
// 					if (fs.existsSync(rutaImagenAnterior)) {
// 						await fs.unlink(rutaImagenAnterior);
// 					}
// 				}

// 				// const nombreUnico = `${uuidv4()}_${file.name}`;
// 				const nombreUnico = `${uuidv4()}`;

// 				const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'mascotas', nombreUnico);
// 				await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

// 				const buffer = Buffer.from(await file.arrayBuffer());
// 				await fs.writeFile(rutaDeAlmacenamiento, buffer);

// 				rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/mascotas/${nombreUnico}`;
// 			} else {
// 				rutaImagen = mascotaExistente.imagen;
// 			}

// 			await db.mascota.update({
// 				where: { id: idTabla },
// 				data: {
// 					imagen: rutaImagen,
// 					idUsuario: await usuarioIdActual(),
// 				},
// 			});

// 			return { success: "Imagen de Mascota actualizada correctamente!" };

// 		} else if (ruta === 'perfil') {
// 			const usuario = await usuarioActual();

// 			if (!usuario) {
// 				return { error: "No tienes permisos para cambiar la configuración" };
// 			}

// 			const dbUsuario = await getUserById(Number(usuario.id));

// 			if (!dbUsuario) {
// 				return { error: "No se ha podido obtener la configuración" };
// 			}

// 			if (file) {
// 				// Eliminar imagen anterior si existe
// 				if (dbUsuario.image) {
// 					const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', 'usuarios', path.basename(dbUsuario.image));
// 					if (fs.existsSync(rutaImagenAnterior)) {
// 						await fs.unlink(rutaImagenAnterior);
// 					}
// 				}

// 				// const nombreUnico = `${uuidv4()}_${file.name}`;
// 				const nombreUnico = `${uuidv4()}`;
// 				const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'usuarios', nombreUnico);
// 				await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

// 				const buffer = Buffer.from(await file.arrayBuffer());
// 				await fs.writeFile(rutaDeAlmacenamiento, buffer);

// 				rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/usuarios/${nombreUnico}`;
// 			} else {
// 				rutaImagen = dbUsuario.image;
// 			}

// 			const usuarioActualizado = await db.user.update({
// 				where: { id: dbUsuario.id },
// 				data: {
// 					image: rutaImagen,
// 					idUsuario: dbUsuario.id,
// 				},
// 			});

// 			unstable_update({
// 				user: {
// 					image: usuarioActualizado.image,
// 					idUsuario:  dbUsuario.id,
// 				}
// 			});

// 			return { success: "Imagen de Perfil actualizada correctamente!" };
// 		} else {
// 			return { success: "Imagen actualizada correctamente!" };
// 		}

// 	} catch (error) {
// 		console.error("Error al editar medicamento:", error);
// 		return { error: "Ocurrió un error al Subir la Imagen." };
// 	}
// };

"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { usuarioActual, usuarioIdActual } from "@/lib/auth";
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { unstable_update } from "@/auth";
import { getUserById } from "@/data/user";

// Función auxiliar para manejar el procesamiento de archivos
async function procesarArchivo(file: File, rutaAnterior: string | null, carpeta: string): Promise<string> {
	// Eliminar archivo anterior si existe
	if (rutaAnterior) {
		const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', carpeta, path.basename(rutaAnterior));
		if (await fs.pathExists(rutaImagenAnterior)) {
			await fs.remove(rutaImagenAnterior);
		}
	}

	// Generar nombre único para el nuevo archivo
	const extension = path.extname(file.name);
	const nombreBase = path.basename(file.name, extension)
		.replace(/[^a-z0-9]/gi, '_')
		.toLowerCase().slice(0, 5);
	const nombreUnico = `${uuidv4()}_${nombreBase}${extension}`;

	const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', carpeta, nombreUnico);
	await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

	const buffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(rutaDeAlmacenamiento, buffer);

	return `${process.env.NEXT_PUBLIC_APP_URL}/uploads/${carpeta}/${nombreUnico}`;
}

export const editarEsquema = async (
	idTabla: number,
	archivo: FormData,
	ruta: string,
) => {
	try {
		const file = archivo.get('file') as File;

		if (!file) { return { error: "La imagen es requerida" }; }

		let rutaImagen: string | null = null;
		let entidadExistente: any;
		let carpeta: string;

		switch (ruta) {
			case 'medicamento':
				entidadExistente = await db.medicamento.findUnique({ where: { id: idTabla } });
				carpeta = 'medicamentos';
				break;
			case 'usuario':
				entidadExistente = await db.user.findUnique({ where: { id: idTabla } });
				carpeta = 'usuarios';
				break;
			case 'mascota':
				entidadExistente = await db.mascota.findUnique({ where: { id: idTabla } });
				carpeta = 'mascotas';
				break;
			case 'perfil':
				entidadExistente = await usuarioActual();
				if (!entidadExistente) {
					return { error: "No tienes permisos para cambiar la configuración" };
				}
				entidadExistente = await getUserById(Number(entidadExistente.id));
				carpeta = 'usuarios';
				break;
			default:
				return { error: "Ruta no válida" };
		}

		if (!entidadExistente) {
			return { error: `${ruta.charAt(0).toUpperCase() + ruta.slice(1)} no encontrado.` };
		}

		if (file) {
			rutaImagen = await procesarArchivo(file, entidadExistente.imagen || entidadExistente.image, carpeta);
		} else {
			rutaImagen = entidadExistente.imagen || entidadExistente.image;
		}

		const usuarioActualId = await usuarioIdActual();

		// Actualizar la entidad en la base de datos
		let entidadActualizada;
		switch (ruta) {
			case 'medicamento':
				entidadActualizada = await db.medicamento.update({
					where: { id: idTabla },
					data: { imagen: rutaImagen, idUsuario: usuarioActualId },
				});
				break;
			case 'usuario':
				entidadActualizada = await db.user.update({
					where: { id: idTabla },
					data: {
						image: rutaImagen,
						idUsuario: usuarioActualId,
					},
				});
			case 'perfil':
				entidadActualizada = await db.user.update({
					where: { id: entidadExistente.id },
					data: { image: rutaImagen, idUsuario: usuarioActualId },
				});
				if (ruta === 'perfil') {
					unstable_update({
						user: {
							image: entidadActualizada.image,
							idUsuario: usuarioActualId,
						}
					});
				}
				break;
			case 'mascota':
				entidadActualizada = await db.mascota.update({
					where: { id: idTabla },
					data: { imagen: rutaImagen, idUsuario: usuarioActualId },
				});
				break;
		}

		return { success: `Imagen de ${ruta} actualizada correctamente!` };

	} catch (error) {
		console.error(`Error al editar ${ruta}:`, error);
		return { error: "Ocurrió un error al Subir la Imagen." };
	}
};
// export const eliminarEsquema = async (id: number) => {
// 	try {
// 		const medicamento = await db.medicamento.delete({
// 			where: { id },
// 		});

// 		if (!medicamento) return { error: "Medicamento no Encontrado" };
// 		return { success: "El Medicamento fue Removido Correctamente" };
// 	} catch (error) {
// 		console.error("Error al eliminar el medicamento:", error);
// 		return { error: "Ocurrió un error al eliminar el medicamento." };
// 	}
// };

// export const deshabilitarEsquema = async (id: number) => {
// 	try {
// 		const usuarioActualId = await usuarioIdActual();

// 		if (!usuarioActualId || isNaN(usuarioActualId)) {
// 			throw new Error('ID del usuario autenticado no es válido');
// 		}

// 		const medicamento = await db.medicamento.update({
// 			where: { id },
// 			data: {
// 				estado: 0,
// 				idUsuario: usuarioActualId,
// 			},
// 		});

// 		if (!medicamento) return { error: "Medicamento no Encontrado" };
// 		return { success: "El Medicamento fue Deshabilitado Correctamente" };
// 	} catch (error) {
// 		console.error("Error al deshabilitar el medicamento:", error);
// 		return { error: "Ocurrió un error al deshabilitar el medicamento." };
// 	}
// };






// // const nombre = formMedicamento.get('nombre') as string;
// // const descripcion = formMedicamento.get('descripcion') as string;
// // const stock = parseInt(formMedicamento.get('stock') as string, 10);
// // const precio = formMedicamento.get('precio') as string;
// // const tipo = formMedicamento.get('tipo') as TipoMedicamento;
// // const archivo = formMedicamento.get("archivo") as File | null;


// // let rutaImagen: string | null = null;

// // const medicamentoExistente = await db.medicamento.findUnique({
// //     where: { id: idMedicamento },
// // });

// // if (!medicamentoExistente) {
// //     return { error: "Medicamento no encontrado." };
// // }

// // if (archivo) {
// //     if (medicamentoExistente.imagen) {
// //         const rutaImagenAnterior = path.join(process.cwd(), 'public', 'uploads', 'medicamentos', path.basename(medicamentoExistente.imagen));
// //         if (fs.existsSync(rutaImagenAnterior)) {
// //             await fs.unlink(rutaImagenAnterior).catch((error) => {
// //                 console.error("Error al eliminar la imagen anterior:", error);
// //             });
// //         } else {
// //             console.warn("La imagen anterior no existe:", rutaImagenAnterior);
// //         }
// //     }

// //     const nombreUnico = `${uuidv4()}_${archivo.name}`;
// //     const rutaDeAlmacenamiento = path.join(process.cwd(), 'public', 'uploads', 'medicamentos', nombreUnico);
// //     await fs.ensureDir(path.dirname(rutaDeAlmacenamiento));

// //     const buffer = Buffer.from(await archivo.arrayBuffer());
// //     await fs.writeFile(rutaDeAlmacenamiento, buffer);

// //     rutaImagen = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/medicamentos/${nombreUnico}`;
// // }else{
// //     rutaImagen = medicamentoExistente.imagen;
// // }
