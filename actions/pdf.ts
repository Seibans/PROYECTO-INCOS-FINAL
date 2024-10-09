'use server'

import PDFDocument from 'pdfkit'
import ExcelJS from 'exceljs'
import { db } from "@/lib/db";
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';

export async function generatePDF() {
  try {
    const mascotas = await db.mascota.findMany();

    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({
    //   // headless: 'new',
    //   headless: true,
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });

    const page = await browser.newPage();

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte Detallado de Mascotas - Veterinaria Gamaliel</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background-color: #f0f4f8;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 20px;
        }
        .logo-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }
        .logo {
            width: 10px;
            height: 10px;
            margin: 0 10px;
        }
        h1, h2 {
            color: #2c3e50;
            margin: 0;
        }
        h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        h2 {
            font-size: 20px;
            color: #7f8c8d;
        }
        .info-section {
            margin-bottom: 30px;
        }
        .info-section h3 {
            color: #3498db;
            border-bottom: 1px solid #3498db;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 30px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #e0e0e0;
        }
        th {
            background-color: #3498db;
            color: #ffffff;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 14px;
        }
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        td {
            font-size: 14px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #7f8c8d;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
        }
        .mascota-details {
            background-color: #ecf0f1;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .mascota-details h4 {
            color: #2980b9;
            margin-top: 0;
        }
        .vacunas-list, .citas-list {
            list-style-type: none;
            padding-left: 0;
        }
        .vacunas-list li, .citas-list li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="logo-container">
            SVGS
            </div>
            <h1>Reporte Detallado de Mascotas</h1>
            <h2>Veterinaria Gamaliel</h2>
        </header>

        <section class="info-section">
            <h3>Resumen General</h3>
            <p>Total de mascotas registradas: ${mascotas.length}</p>
            <p>Fecha del reporte: ${new Date().toLocaleDateString()}</p>
        </section>

        <section class="info-section">
            <h3>Listado de Mascotas</h3>
            ${mascotas.map(mascota => `
                <div class="mascota-details">
                    <h4>${mascota.nombre}</h4>
                    <p><strong>Especie:</strong> ${mascota.especie}</p>
                    <p><strong>Raza:</strong> ${mascota.raza || 'N/A'}</p>
                    <p><strong>Sexo:</strong> ${mascota.sexo}</p>
                    <p><strong>Fecha de Nacimiento:</strong> ${mascota.fechaNacimiento
        ? new Date(mascota.fechaNacimiento).toLocaleDateString()
        : 'N/A'}</p>
                    <p><strong>Propietario:</strong> ${mascota.nombre ? mascota.nombre : 'No registrado'}</p>
                    
                    <h5>Vacunas:</h5>
                    <ul class="vacunas-list">
                        
                    </ul>
                    
                    <h5>Últimas Citas:</h5>
                    <ul class="citas-list">
                        
                    </ul>
                </div>
            `).join('')}
        </section>

        <footer class="footer">
            <p>Este reporte fue generado automáticamente por el sistema de Veterinaria Gamaliel.</p>
            <p>© ${new Date().getFullYear()} Veterinaria Gamaliel. Todos los derechos reservados.</p>
        </footer>
    </div>
</body>
</html>
    `;

    // VACUNAS
    //   ${mascota.vacunas.map(vacuna => `
    //     <li>${vacuna.nombre} - ${new Date(vacuna.fecha).toLocaleDateString()}</li>
    // `).join('') || '<li>No hay vacunas registradas</li>'}
    // CITAS
    //   ${mascota.citas.map(cita => `
    //     <li>${new Date(cita.fecha).toLocaleDateString()} - ${cita.motivo}</li>
    // `).join('') || '<li>No hay citas registradas</li>'}

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      // displayHeaderFooter: true,
      // headerTemplate: '<div></div>',
      // footerTemplate: `
      // <div style="font-size: 10px; text-align: center; width: 100%;">
      //     <span class="pageNumber"></span> / <span class="totalPages"></span>
      //   </div>`,
      // scale: 0.8
    });

    await browser.close();

    const pdfPath = path.join(process.cwd(), 'public', 'mascotas-report.pdf');
    await fs.writeFile(pdfPath, pdfBuffer);

    return '/mascotas-report.pdf';
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    throw new Error('No se pudo generar el PDF');
  }
}

// export async function generatePDFFromURL(url: string) {
//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();

//     await page.goto(url, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       margin: {
//         top: '20mm',
//         right: '20mm',
//         bottom: '20mm',
//         left: '20mm'
//       },
//       displayHeaderFooter: true,
//       headerTemplate: '<div></div>',
//       footerTemplate: `
//         <div style="font-size: 10px; text-align: center; width: 100%;">
//           <span class="pageNumber"></span> / <span class="totalPages"></span>
//         </div>
//       `,
//       scale: 0.8
//     });

//     await browser.close();

//     const pdfPath = path.join(process.cwd(), 'public', 'url-report.pdf');
//     await fs.writeFile(pdfPath, pdfBuffer);

//     return '/url-report.pdf';
//   } catch (error) {
//     console.error('Error al generar el PDF desde URL:', error);
//     throw new Error('No se pudo generar el PDF desde la URL');
//   }
// }

export async function generatePDFFromURL(url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Aumentar el tiempo de espera y manejar la carga de la página
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 60000 // Aumentar el tiempo de espera a 60 segundos
    });

    // Esperar un poco más para asegurarse de que todo el contenido se haya cargado
    // await page.waitForTimeout(5000);

    // Ajustar el viewport para que coincida con el tamaño del papel
    await page.setViewport({
      width: 1240,
      height: 1754, // Altura aproximada de A4 a 96 DPI
      deviceScaleFactor: 1,
    });

    // Ajustar el contenido para la impresión
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body {
            margin: 0;
            padding: 20mm;
            box-sizing: border-box;
          }
          /* Ajusta otros estilos según sea necesario */
        }
      `;
      document.head.appendChild(style);
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `,
      scale: 0.8
    });

    await browser.close();

    const pdfPath = path.join(process.cwd(), 'public', 'url-report.pdf');
    await fs.writeFile(pdfPath, pdfBuffer);

    return '/url-report.pdf';
  } catch (error) {
    console.error('Error al generar el PDF desde URL:', error);
    throw new Error('No se pudo generar el PDF desde la URL. Por favor, inténtelo de nuevo más tarde.');
  }
}

export async function generateExcel(userId: number) {
  const user = await db.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new Error('Usuario no encontrado')
  }

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Informe de Usuario')

  worksheet.columns = [
    { header: 'Campo', key: 'campo', width: 20 },
    { header: 'Valor', key: 'valor', width: 30 }
  ]

  worksheet.addRows([
    { campo: 'Nombre', valor: `${user.name} ${user.apellidoPat || ''} ${user.apellidoMat || ''}` },
    { campo: 'CI', valor: user.ci || 'No especificado' },
    { campo: 'Email', valor: user.email },
    { campo: 'Celular', valor: user.celular || 'No especificado' },
    { campo: 'Dirección', valor: user.direccion || 'No especificada' },
    { campo: 'Rol', valor: user.rol }
  ])

  const buffer = await workbook.xlsx.writeBuffer()

  return { buffer: Buffer.from(buffer).toString('base64'), fileName: `informe_usuario_${userId}.xlsx` }
}




// OPCIONES DE CONFIGURACION DE PUPPETEER
/*const pdfBuffer = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  },
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Veterinaria Gamaliel</div>',
  footerTemplate: `
    <div style="font-size: 10px; text-align: center; width: 100%;">
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>
  `,
  landscape: false,
  scale: 1,
  pageRanges: '',
  preferCSSPageSize: false,
  omitBackground: false,
  timeout: 30000
});
 */

// MANEJAR LOS SVG
/*
<div style="width: 100px; height: 100px; overflow: hidden;">
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
    <!-- SVG content -->
  </svg>
</div> */

// FLEXIBILIDAD CON GRID
/*
<style>
  .grid-table {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin-bottom: 30px;
  }
  .grid-header, .grid-cell {
    padding: 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
  }
  .grid-header {
    background-color: #3498db;
    color: #ffffff;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
  }
</style>

<div class="grid-table">
  <div class="grid-header">Nombre</div>
  <div class="grid-header">Especie</div>
  <div class="grid-header">Raza</div>
  <div class="grid-header">Sexo</div>
  <div class="grid-header">Fecha de Nacimiento</div>
  <!-- Añade más encabezados según sea necesario -->
  
  ${mascotas.map(mascota => `
    <div class="grid-cell">${mascota.nombre}</div>
    <div class="grid-cell">${mascota.especie}</div>
    <div class="grid-cell">${mascota.raza || 'N/A'}</div>
    <div class="grid-cell">${mascota.sexo}</div>
    <div class="grid-cell">${mascota.fechaNacimiento
      ? new Date(mascota.fechaNacimiento).toLocaleDateString()
      : 'N/A'}</div>
    <!-- Añade más celdas según sea necesario -->
  `).join('')}
</div>*/





/*
SVGS
<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"
				fill="#000000">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<path
						d="M63.76 19.97c-29.09-.75-38.51 21.77-39.23 30.22c-.56 6.57-3.38 30.6 10.32 46.74c7.07 8.33 18.4 12.48 30.41 12.2c12.11-.28 23.05-2.69 30.41-12.39c12.39-16.33 11.07-40.73 9.39-48.62c-1.58-7.34-7.71-27.29-41.3-28.15z"
						fill="#ffeac8"></path>
					<path
						d="M96.82 64.43c1.03 7.81-2.36 15.26-11.29 15.79c-8.17.49-13.21-4.72-13.61-12.39c-.41-7.86 3.89-15.17 10.72-15.92c7.21-.79 13.16 4.71 14.18 12.52z"
						fill="#d27856"></path>
					<path
						d="M18.9 26.72s-9.83 3.85-12.2 9.57c-3.19 7.7-1.72 22.98 0 28.91c1.69 5.82 6.19 11.83 13.14 11.64s13.05-7.23 15.2-16.42c2.16-9.2 2.63-24.96 3.28-27.78s1.78-5.07 1.78-5.07s-8.63-8.36-21.2-.85z"
						fill="#d27856"></path>
					<path
						d="M101.21 25.5s13.33.47 16.52 1.88s6.1 7.79 5.82 16.33s-.84 22.35-5.16 27.12c-3.57 3.94-10.79 4.22-14.83-.66s-6.57-13.14-7.51-18.49c-.94-5.35-2.53-12.29-3.57-15.39c-1.03-3.1-3.57-9.29-4.88-10.7c-1.32-1.4 1.31-2.72 13.61-.09z"
						fill="#d27856"></path>
					<path
						d="M29.97 22.31c-7.23-.46-19.15 5.26-21.59 11.17S7.37 58.57 9.42 64.17c2.16 5.91 6.66 13.33 14.45 6.95s9.85-22.43 10.61-27.59c.75-5.16 1.78-11.45 2.91-12.76c1.13-1.31 2.72-3.19 2.72-3.19s-1.22-4.71-10.14-5.27z"
						fill="#865b51"></path>
					<path
						d="M102.8 21.09c6.79.47 14.17 3 16.89 8.92c2.72 5.91 1.69 19.9.66 26.56s-3.47 13.61-9.57 12.86s-9.2-9.01-11.07-16.8c-1.88-7.79-3.85-15.58-6.29-21.21c-1.47-3.4-6.57-5.91-6.57-5.91s2.25-5.36 15.95-4.42z"
						fill="#865b51"></path>
					<path
						d="M50.5 67.69c-.4 3.42-2.16 6.18-5.98 5.78c-2.71-.29-4.53-3.52-4.13-6.95c.4-3.42 1.59-5.88 4.79-5.82c4.97.09 5.72 3.56 5.32 6.99z"
						fill="#2f2f2f"></path>
					<path
						d="M89.74 66.73c.16 3.44-1.2 6.38-5.17 6.67c-3.45.25-5.22-2.74-5.37-6.18c-.16-3.44 1.55-6.2 4.84-6.61c4.27-.55 5.54 2.68 5.7 6.12z"
						fill="#2f2f2f"></path>
					<path
						d="M75.12 84.07c.16 3.44-2.16 6.66-9.39 6.57c-7.04-.09-9.6-2.94-9.76-6.38c-.16-3.44 3.84-6.53 9.57-6.66c7.89-.2 9.42 3.02 9.58 6.47z"
						fill="#2f2f2f"></path>
					<path
						d="M59.16 97.96s.85 8.17 1.69 10.61c1.78 5.16 9.28 4.3 10.61-.56c1.13-4.13.38-11.26.38-11.26l-6.66-.94l-6.02 2.15z"
						fill="#e94b8c"></path>
					<path
						d="M65.96 100.68c-1.17.05-1.13 1.13-1.13 3.61c0 2.49.14 3.99 1.27 3.94c1.13-.05.99-1.97.99-3.75s.09-3.85-1.13-3.8z"
						fill="#ef87b2"></path>
					<path
						d="M50.15 90.21c-1.35 1.99 1.27 3.75 3.43 5.21c2.16 1.45 4.78 3.66 7.88 3.61c3.47-.05 4.41-2.39 4.41-2.39s1.13 2.77 6.05 2.25c2.63-.28 5.87-3.23 6.85-3.89c1.88-1.27 4.13-2.86 3.14-4.18c-1.13-1.51-3.52.52-5.96 1.78c-2.44 1.27-3.28 1.88-5.11 1.88s-3.1-.75-3.19-3.8c-.08-2.49-.05-2.96-.05-2.96h-4.18s.14 2.63.14 3.38c0 1.97-1.03 2.82-3 2.91c-1.97.09-4.08-1.55-5.12-2.16c-1.02-.6-4.21-3.23-5.29-1.64z"
						fill="#2f2f30"></path>
				</g>
			</svg>
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet"
				fill="#000000">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<path
						d="M114.67 70.19C112.71 44.22 94.44 26.3 64 26.3S15.25 45.33 13.45 71.31c-1.05 15.14 4.58 28.63 15.91 36.32c7.46 5.07 17.88 7.88 34.77 7.88c17.18 0 27.03-3.71 34.49-8.73c12.43-8.35 17.18-21.67 16.05-36.59z"
						fill="#ffc022"> </path>
					<path
						d="M53.72 42.6C46.3 23.4 30.1 10.34 23.87 8.39c-2.35-.74-5.3-.81-6.63 1.35c-3.36 5.45-7.66 22.95 1.85 47.78L53.72 42.6z"
						fill="#ffc022"> </path>
					<path
						d="M36.12 34.21c1.54-1.29 2.29-2.55.6-5.16c-2.62-4.05-7.33-8.78-9.16-10.23c-3-2.38-5.32-3.18-6.21.65c-1.65 7.08-1.52 16.69.25 21.99c.62 1.87 2.54 2.86 4.02 1.57l10.5-8.82z"
						fill="#ffd1d1"> </path>
					<path
						d="M54.12 45.02c1.13.96 3.42.82 4.75-.72c1.61-1.87 3.29-8.17 2.24-17.91c-4.67.17-9.09.84-13.21 1.97c3.33 5.46 4.13 14.88 6.22 16.66z"
						fill="#ff9b31"> </path>
					<path
						d="M73.88 45.02c-1.13.96-3.42.82-4.75-.72c-1.61-1.87-3.29-8.17-2.24-17.91c4.67.17 9.09.84 13.21 1.97c-3.33 5.46-4.13 14.88-6.22 16.66z"
						fill="#ff9b31"> </path>
					<path
						d="M79.9 29.22c8.08-12.41 19.38-20.75 24.07-22.24c2.32-.74 5.02-.62 6.34 1.55c3.32 5.45 6.13 22.24-.42 45.75L85.96 42.74L79.9 29.22z"
						fill="#ffc022"> </path>
					<path
						d="M97.55 38.23c2.43 2.43 4.41 4.06 5.84 5.61c.95 1.03 2.69.56 2.97-.82c2.45-11.8 1.67-21.86 0-24.5c-.8-1.26-2.29-1.59-3.65-1.13c-2.44.81-8.66 5.45-13.05 12.22c-.51.79-.32 1.85.46 2.38c1.58 1.07 4.34 3.14 7.43 6.24z"
						fill="#ffd1d1"> </path>
					<path
						d="M55.67 77.75c-.05-3.08 4.37-4.55 8.54-4.62c4.18-.07 8.68 1.29 8.73 4.37c.05 3.08-5.22 7.13-8.54 7.13c-3.31 0-8.67-3.81-8.73-6.88z"
						fill="#000000"> </path>
					<g fill="none" stroke="#9e9e9e" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10">
						<path d="M6.7 71.03c.34.41 4.41.35 14.36 5.07"> </path>
						<path d="M2.9 82.86s6.42-2.24 17.46-.28"> </path>
						<path d="M8.81 92.29s2.74-1.38 12.67-2.25"> </path>
						<g>
							<path d="M120.87 67.51s-3.41.33-13.94 6.34"> </path>
							<path d="M122.42 78.49s-5.09-.36-16.05 1.97"> </path>
							<path d="M120.45 89.05s-4.83-1.71-14.78-2.25"> </path>
						</g>
					</g>
					<path
						d="M96.09 66.37c-.34 5.51-3.76 8.54-7.65 8.54s-7.04-3.88-7.04-8.66s3.28-8.71 7.65-8.47c5.07.29 7.32 4.09 7.04 8.59z"
						fill="#000200"> </path>
					<path
						d="M46 65.81c.78 5.61-1.58 9.03-5.49 9.82c-3.91.79-7.26-1.84-8.23-6.64c-.98-4.81.9-9.32 5.34-9.97c5.15-.75 7.74 2.2 8.38 6.79z"
						fill="#000200"> </path>
					<path
						d="M44.99 85.16c-2.57 1.67.47 5.54 2.25 6.85c1.78 1.31 4.98 2.92 9.67 2.44c5.54-.56 7.13-4.69 7.13-4.69s1.97 4.6 8.82 4.79c6.95.19 9.1-3.57 10.04-4.69c.94-1.13 1.88-4.04.28-5.16c-1.6-1.13-2.72.28-4.41 2.63c-1.69 2.35-5.16 3.66-8.54 2.06s-3.57-7.04-3.57-7.04l-4.79.28s-.75 4.69-2.91 6.19s-7.32 1.88-9.48-1.41c-.95-1.46-2.33-3.66-4.49-2.25z"
						fill="#000000"> </path>
				</g>
			</svg>
*/