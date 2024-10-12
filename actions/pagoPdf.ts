"use server"
import puppeteer from 'puppeteer'
import { obtenerTratamientoCompleto } from './pagos'
import { TratamientoCompleto } from '@/types/pagos'
import fs from 'fs-extra';
import path from 'path';
import { convertirNumeroEspanyol } from '@/lib/numeroaTexto';

export async function generarPDFTratamiento(tratamientoId: number): Promise<string> {
  const tratamiento = await obtenerTratamientoCompleto(tratamientoId)
  if (!tratamiento) throw new Error('Tratamiento no encontrado')

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const html = generarHTMLTratamiento(tratamiento)
  // await page.setContent(html)
  await page.setContent(html, { waitUntil: 'networkidle0' });


  // const pdf = await page.pdf({ format: 'A4' })
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm'
    }
  });

  await browser.close()

  const pdfPath = path.join(process.cwd(), 'public', 'factura-tratamiento.pdf');
  await fs.writeFile(pdfPath, pdfBuffer);

  return '/factura-tratamiento.pdf';
}

function generarHTMLTratamiento(tratamiento: TratamientoCompleto): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Detalle de Tratamiento ${tratamiento.id}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #2c3e50; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Detalle de Tratamiento #${tratamiento.id}</h1>
        <p><strong>Fecha:</strong> ${tratamiento.fechaCreacion.toLocaleDateString()}</p>
        <p><strong>Descripción:</strong> ${tratamiento.descripcion}</p>
        <p><strong>Diagnóstico:</strong> ${tratamiento.diagnostico || 'No especificado'}</p>

        <h2>Servicios</h2>
        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            ${tratamiento.servicios.map(s => `
              <tr>
                <td>${s.nombre}</td>
                <td>Bs. ${s.precio.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Medicamentos</h2>
        <table>
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${tratamiento.medicamentos.map(m => `
              <tr>
                <td>${m.nombre}</td>
                <td>${m.cantidad}</td>
                <td>Bs. ${m.costoUnitario.toFixed(2)}</td>
                <td>Bs. ${m.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Resumen</h2>
        <table>
          <tr>
            <td>Subtotal Servicios</td>
            <td>Bs. ${tratamiento.sumaTotalServicios.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Subtotal Medicamentos</td>
            <td>Bs. ${tratamiento.sumaTotalMedicamentos.toFixed(2)}</td>
          </tr>
          <tr class="total">
            <td>Total</td>
            <td>Bs. ${(tratamiento.sumaTotalServicios + tratamiento.sumaTotalMedicamentos).toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="2">${convertirNumeroEspanyol((tratamiento.sumaTotalServicios + tratamiento.sumaTotalMedicamentos).toFixed(2))}</td>
          </tr>
        </table>

        <h2>Información de la Mascota</h2>
        <p><strong>Nombre:</strong> ${tratamiento.mascota.nombre}</p>
        <p><strong>Especie:</strong> ${tratamiento.mascota.especie}</p>
        <p><strong>Raza:</strong> ${tratamiento.mascota.raza || 'No especificada'}</p>

        ${tratamiento.propietario ? `
          <h2>Información del Propietario</h2>
          <p><strong>Nombre:</strong> ${tratamiento.propietario.nombre} ${tratamiento.propietario.apellidoPat || ''} ${tratamiento.propietario.apellidoMat || ''}</p>
          <p><strong>Email:</strong> ${tratamiento.propietario.email || 'No especificado'}</p>
          <p><strong>Celular:</strong> ${tratamiento.propietario.celular || 'No especificado'}</p>
        ` : ''}

        ${tratamiento.pago ? `
          <h2>Información de Pago</h2>
          <p><strong>Método:</strong> ${tratamiento.pago.metodoPago || 'No especificado'}</p>
          <p><strong>Fecha:</strong> ${tratamiento.pago.fechaPago?.toLocaleDateString() || 'No pagado'}</p>
          <p><strong>Estado:</strong> ${tratamiento.pago.estado === 2 ? 'Pagado' : 'Pendiente'}</p>
          <p><strong>Total:</strong> Bs. ${tratamiento.pago.total.toFixed(2)}</p>
        ` : ''}
      </div>
    </body>
    </html>
  `
}