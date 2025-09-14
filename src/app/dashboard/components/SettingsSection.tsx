'use client'

/**
 * Componente SettingsSection (Sección de Configuración)
 * 
 * Permite a los usuarios personalizar el comportamiento de la aplicación según sus preferencias.
 * Las configuraciones se gestionan a través del estado del componente padre (Dashboard).
 * 
 * Funcionalidades:
 * - Selección de formato de fecha.
 * - Selección de separador de decimales.
 * - Configuración del tamaño de página para las tablas.
 * - Opciones de activación/desactivación para notificaciones y guardado automático (decorativas).
 * - Botón para guardar la configuración (simulado).
 *
 * @param {SettingsSectionProps} props - Propiedades del componente para gestionar el estado de la configuración.
 */

// Define la interfaz de las propiedades que el componente necesita para funcionar.
interface SettingsSectionProps {
  dateFormat: string; // Estado actual del formato de fecha.
  setDateFormat: (format: string) => void; // Función para actualizar el formato de fecha.
  decimalSeparator: string; // Estado actual del separador decimal.
  setDecimalSeparator: (separator: string) => void; // Función para actualizar el separador decimal.
  pageSize: number; // Estado actual del tamaño de página.
  setPageSize: (size: number) => void; // Función para actualizar el tamaño de página.
}

// Exporta el componente funcional SettingsSection.
export default function SettingsSection({
  dateFormat,
  setDateFormat,
  decimalSeparator,
  setDecimalSeparator,
  pageSize,
  setPageSize
}: SettingsSectionProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Contenedor principal de la sección de configuración. */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6">Configuración del Sistema</h2>
        
        <div className="space-y-4 lg:space-y-6">
          {/* --- Opción: Formato de Fecha --- */}
          <div>
            <label htmlFor="date-format" className="block text-xs lg:text-sm font-medium mb-2">Formato de Fecha</label>
            <select
              id="date-format"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full sm:w-auto px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              <option value="DD/MM/AAAA">DD/MM/AAAA</option>
              <option value="AAAA-MM-DD">AAAA-MM-DD</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Formato actual: {dateFormat}</p>
          </div>

          {/* --- Opción: Separador Decimal --- */}
          <div>
            <label htmlFor="decimal-separator" className="block text-xs lg:text-sm font-medium mb-2">Separador Decimal</label>
            <select
              id="decimal-separator"
              value={decimalSeparator}
              onChange={(e) => setDecimalSeparator(e.target.value)}
              className="w-full sm:w-auto px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              <option value="coma">Coma (,)</option>
              <option value="punto">Punto (.)</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Ejemplo: {decimalSeparator === 'coma' ? '1.234,56' : '1,234.56'}
            </p>
          </div>

          {/* --- Opción: Tamaño de Página --- */}
          <div>
            <label htmlFor="page-size" className="block text-xs lg:text-sm font-medium mb-2">Tamaño de Página (Tablas)</label>
            <select
              id="page-size"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-full sm:w-auto px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              <option value={10}>10 registros</option>
              <option value={25}>25 registros</option>
              <option value={50}>50 registros</option>
              <option value={100}>100 registros</option>
            </select>
          </div>

          {/* --- Opción: Notificaciones (Toggle Switch) --- */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs lg:text-sm font-medium">Notificaciones</h4>
              <p className="text-xs text-gray-400">Recibir alertas sobre actualizaciones</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* --- Opción: Guardado Automático (Toggle Switch) --- */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs lg:text-sm font-medium">Guardado Automático</h4>
              <p className="text-xs text-gray-400">Guardar cambios automáticamente</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {/* --- Botón de Guardar --- */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => alert('Configuración guardada (demo)')} // Simula la acción de guardar.
              className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
