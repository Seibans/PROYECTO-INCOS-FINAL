const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
const especiales = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve']

export function numeroATexto(numero: number): string {
  const partes = numero.toFixed(2).split('.')
  const entero = parseInt(partes[0])
  const decimal = parseInt(partes[1])

  let resultado = ''

  if (entero === 0) {
    resultado = 'cero'
  } else if (entero <= 9) {
    resultado = unidades[entero]
  } else if (entero <= 19) {
    resultado = especiales[entero - 11]
  } else if (entero <= 99) {
    const unidad = entero % 10
    const decena = Math.floor(entero / 10)
    resultado = decenas[decena - 1]
    if (unidad > 0) {
      resultado += ' y ' + unidades[unidad]
    }
  } else {
    resultado = 'número fuera de rango'
  }

  resultado += ' bolivianos'

  if (decimal > 0) {
    resultado += ` con ${decimal} centavos`
  }

  return resultado.charAt(0).toUpperCase() + resultado.slice(1)
}