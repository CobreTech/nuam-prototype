'use client'

/**
 * Componente UploadSection (Sección de Carga Masiva)
 * 
 * Gestiona la subida de archivos de calificaciones. Permite a los usuarios seleccionar
 * un archivo desde su equipo o arrastrarlo y soltarlo en un área designada.
 * 
 * Funcionalidades:
 * - Carga de archivos mediante un input o drag-and-drop.
 * - Validación del tamaño del archivo (máximo 10MB) y tipo (CSV, XLSX).
 * - Simulación de lectura y previsualización del contenido del archivo.
 * - Muestra un resumen de los datos a procesar (agregados, actualizados, errores).
 * - Permite remover el archivo seleccionado para empezar de nuevo.
 *
 * @param {UploadSectionProps} props - Propiedades para manejar el estado de los archivos.
 */

import { useRef } from 'react' // Hook de React para acceder a elementos del DOM.
import { FilePreview } from './types' // Importa los tipos de datos necesarios.

// Define la interfaz de las propiedades que el componente necesita.
interface UploadSectionProps {
  selectedFile: File | null; // El archivo que ha sido seleccionado por el usuario.
  setSelectedFile: (file: File | null) => void; // Función para actualizar el archivo seleccionado.
  filePreview: FilePreview | null; // Objeto con los datos para la vista previa del archivo.
  setFilePreview: (preview: FilePreview | null) => void; // Función para actualizar la vista previa.
}

// Exporta el componente funcional UploadSection.
export default function UploadSection({ 
  selectedFile, 
  setSelectedFile, 
  filePreview, 
  setFilePreview 
}: UploadSectionProps) {
  // Referencia al input de tipo 'file' para poder activarlo programáticamente.
  const fileInputRef = useRef<HTMLInputElement>(null)

  // --- MANEJADORES DE EVENTOS ---

  // Se activa cuando un usuario selecciona un archivo a través del diálogo del sistema.
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Valida el tamaño del archivo.
      if (file.size > 10 * 1024 * 1024) { // Límite de 10MB
        alert('El archivo es demasiado grande. Máximo 10MB.')
        return
      }
      setSelectedFile(file)
      
      // Simula la lectura y generación de una vista previa del archivo.
      const reader = new FileReader()
      reader.onload = (e) => {
        const mockPreview: FilePreview = {
          fileName: file.name,
          size: file.size,
          rows: 150,
          columns: ['Instrumento', 'Mercado', 'Período', 'F8', 'F9', 'F10', 'Monto'],
          preview: [
            ['Acción ABC', 'BVC', '2024-Q1', '0.85', '0.90', '0.88', '15000'],
            ['Bono XYZ', 'COLCAP', '2024-Q1', '0.92', '0.89', '0.91', '25000'],
            ['ETF 123', 'BVC', '2024-Q1', '0.78', '0.82', '0.80', '8500']
          ],
          summary: { added: 120, updated: 25, errors: 5 }
        }
        setFilePreview(mockPreview)
      }
      reader.readAsText(file) // Inicia la lectura (aunque el resultado no se usa en la simulación).
    }
  }

  // Previene el comportamiento por defecto del navegador cuando se arrastra un archivo sobre el área.
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Se activa cuando un usuario suelta un archivo en el área designada.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      // Valida el tipo de archivo.
      if (file.type === 'text/csv' || file.name.endsWith('.xlsx')) {
        // Valida el tamaño del archivo.
        if (file.size > 10 * 1024 * 1024) {
          alert('El archivo es demasiado grande. Máximo 10MB.')
          return
        }
        setSelectedFile(file)
        
        // Simula la generación de la vista previa (igual que en handleFileSelect).
        const mockPreview: FilePreview = {
          fileName: file.name,
          size: file.size,
          rows: 150,
          columns: ['Instrumento', 'Mercado', 'Período', 'F8', 'F9', 'F10', 'Monto'],
          preview: [
            ['Acción ABC', 'BVC', '2024-Q1', '0.85', '0.90', '0.88', '15000'],
            ['Bono XYZ', 'COLCAP', '2024-Q1', '0.92', '0.89', '0.91', '25000'],
            ['ETF 123', 'BVC', '2024-Q1', '0.78', '0.82', '0.80', '8500']
          ],
          summary: { added: 120, updated: 25, errors: 5 }
        }
        setFilePreview(mockPreview)
      } else {
        alert('Solo se aceptan archivos CSV y XLSX')
      }
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Carga Masiva de Calificaciones</h2>
        
        {/* Renderizado condicional: muestra la zona de carga o la vista previa del archivo. */}
        {!selectedFile ? (
          // --- ZONA DE CARGA DE ARCHIVOS ---
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-white/30 rounded-xl p-6 lg:p-8 text-center hover:border-orange-500/50 transition-colors"
          >
            <div className="text-4xl lg:text-6xl mb-4">📤</div>
            <h3 className="text-base lg:text-lg font-semibold mb-2">Arrastra tu archivo aquí</h3>
            <p className="text-gray-400 mb-4 text-sm lg:text-base">o haz clic para seleccionar</p>
            {/* Input oculto que se activa con el botón. */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Seleccionar archivo"
            />
            <button
              onClick={() => fileInputRef.current?.click()} // Activa el input de archivo.
              className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              Seleccionar Archivo
            </button>
            <p className="text-xs lg:text-xs text-gray-500 mt-4">Formatos soportados: CSV, XLSX (máx. 10MB)</p>
          </div>
        ) : (
          // --- VISTA PREVIA DEL ARCHIVO CARGADO ---
          <div className="space-y-4 lg:space-y-6">
            {/* Información del archivo seleccionado */}
            <div className="bg-white/10 rounded-xl p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm lg:text-base">{selectedFile.name}</h4>
                  <p className="text-xs lg:text-sm text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null)
                    setFilePreview(null)
                  }} // Limpia el estado para volver a la zona de carga.
                  className="text-red-400 hover:text-red-300 focus:outline-none text-lg lg:text-xl"
                  aria-label="Remover archivo"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Solo se muestra si la vista previa ha sido generada. */}
            {filePreview && (
              <>
                {/* Tabla de Vista Previa */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-3 lg:p-4">
                  <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Vista Previa</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs lg:text-sm min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          {filePreview.columns.map((col: string, i: number) => (
                            <th key={i} className="text-left py-2 px-2 lg:px-3">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filePreview.preview.map((row: string[], i: number) => (
                          <tr key={i} className="border-b border-white/5">
                            {row.map((cell: string, j: number) => (
                              <td key={j} className="py-2 px-2 lg:px-3">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Resumen de la validación */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3 lg:p-4">
                    <div className="text-xl lg:text-2xl font-bold text-green-400">{filePreview.summary.added}</div>
                    <div className="text-xs lg:text-sm text-green-300">Agregados</div>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/50 rounded-xl p-3 lg:p-4">
                    <div className="text-xl lg:text-2xl font-bold text-blue-400">{filePreview.summary.updated}</div>
                    <div className="text-xs lg:text-sm text-blue-300">Actualizados</div>
                  </div>
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 lg:p-4">
                    <div className="text-xl lg:text-2xl font-bold text-red-400">{filePreview.summary.errors}</div>
                    <div className="text-xs lg:text-sm text-red-300">Errores</div>
                  </div>
                </div>

                {/* Botón para procesar el archivo (deshabilitado en la demo). */}
                <div className="flex justify-end">
                  <button
                    onClick={() => alert('Procesamiento deshabilitado (vista demo)')}
                    className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-600/50 text-gray-400 rounded-xl cursor-not-allowed text-sm lg:text-base"
                    disabled
                  >
                    Procesar (Demo)
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
