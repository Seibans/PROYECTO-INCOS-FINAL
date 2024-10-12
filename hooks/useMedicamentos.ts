import { useState, useEffect } from 'react'
import { prisma } from "@/lib/prisma"

export function useMedicamentos() {
  const [medicamentos, setMedicamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMedicamentos() {
      try {
        const data = await prisma.medicamento.findMany({
          where: { estado: 1 },
          select: { id: true, nombre: true, stock: true, precio: true }
        })
        setMedicamentos(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamentos()
  }, [])

  return { medicamentos, loading, error }
}