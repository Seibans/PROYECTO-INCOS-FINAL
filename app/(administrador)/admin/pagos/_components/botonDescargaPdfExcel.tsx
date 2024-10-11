'use client'

import { useState } from 'react'
import { generatePDF, generateExcel } from '@/actions/pdf'

export default function DownloadButtons({ userId }: { userId: number }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async (action: () => Promise<{ buffer: string, fileName: string }>) => {
    setIsLoading(true)
    try {
      const { buffer, fileName } = await action()
      const decodedBuffer = Uint8Array.from(atob(buffer), c => c.charCodeAt(0))
      const blob = new Blob([decodedBuffer], { type: fileName.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al generar el archivo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGeneratePDF = async () => {
    setIsLoading(true)
    try {
      const pdfPath = await generatePDF()
      window.open(pdfPath, '_blank')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="space-x-4">
      <button 
      onClick={handleGeneratePDF} 
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isLoading ? 'Generating PDF...' : 'Generate PDF'}
    </button>
      <button
        onClick={() => handleDownload(() => generateExcel(userId))}
        disabled={isLoading}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Generando Excel...' : 'Descargar Excel'}
      </button>
    </div>
  )
}