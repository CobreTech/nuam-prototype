'use client'

/**
 * Componente QualificationsSection (Sección de Calificaciones)
 * 
 * Esta sección permite a los usuarios ver, buscar y filtrar las calificaciones tributarias.
 * Es responsiva y muestra los datos en tarjetas para móviles y en una tabla para escritorio.
 * 
 * Funcionalidades:
 * - Muestra un estado vacío si no hay datos, incitando al usuario a cargar un archivo.
 * - Proporciona una barra de búsqueda y filtros (actualmente decorativos) por mercado y período.
 * - Presenta los datos de forma clara y adaptada al tamaño de la pantalla.
 * - Incluye un control de paginación básico.
 *
 * @param {QualificationsSectionProps} props - Propiedades del componente.
 */

import { Qualification, ActiveTab } from './types' // Importa los tipos de datos necesarios.

// Define la interfaz de las propiedades que espera el componente.
interface QualificationsSectionProps {
  filteredQualifications: Qualification[]; // Array de calificaciones ya filtradas.
  searchTerm: string; // Término de búsqueda actual.
  setSearchTerm: (term: string) => void; // Función para actualizar el término de búsqueda.
  setActiveTab: (tab: ActiveTab) => void; // Función para cambiar la pestaña activa.
  pageSize: number; // Número de elementos a mostrar por página.
}

// Exporta el componente funcional QualificationsSection.
export default function QualificationsSection({ 
  filteredQualifications, 
  searchTerm, 
  setSearchTerm, 
  setActiveTab,
  pageSize 
}: QualificationsSectionProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Renderizado condicional: Muestra el estado vacío o la tabla de datos. */}
      {filteredQualifications.length === 0 && searchTerm === '' ? (
        // --- ESTADO VACÍO --- 
        // Se muestra solo si no hay calificaciones y no se ha realizado ninguna búsqueda.
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 text-center">
          <div className="text-4xl lg:text-6xl mb-4">📝</div>
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Aún no hay calificaciones cargadas</h2>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">Comienza cargando tu primer archivo de calificaciones tributarias</p>
          <button
            onClick={() => setActiveTab('upload')} // Navega a la sección de carga.
            className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            aria-label="Ir a Carga Masiva"
          >
            Ir a Carga Masiva
          </button>
        </div>
      ) : (
        // --- VISTA CON DATOS ---
        <>
          {/* Tarjeta de Búsqueda y Filtros */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              {/* Campo de búsqueda de texto */}
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">Buscar calificaciones</label>
                <input
                  id="search"
                  type="text"
                  placeholder="Buscar por instrumento o mercado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm lg:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select 
                  className="flex-1 px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
                  aria-label="Filtrar por mercado"
                >
                  <option value="">Todos los mercados</option>
                  <option value="BVC">BVC</option>
                  <option value="COLCAP">COLCAP</option>
                </select>
                <select 
                  className="flex-1 px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
                  aria-label="Filtrar por período"
                >
                  <option value="">Todos los períodos</option>
                  <option value="2024-Q1">2024-Q1</option>
                  <option value="2023-Q4">2023-Q4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Calificaciones */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h2 className="text-lg lg:text-xl font-bold">Calificaciones Tributarias</h2>
              <span className="text-xs lg:text-sm text-gray-400">{filteredQualifications.length} registros</span>
            </div>
            
            {/* --- VISTA DE TARJETAS (MÓVIL) --- */}
            <div className="block lg:hidden space-y-3">
              {filteredQualifications.map((qual, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{qual.instrument}</h3>
                    <span className="text-xs text-gray-400">{qual.market}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-400">Período:</span>
                      <span className="ml-1">{qual.period}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Factores:</span>
                      <span className="ml-1">{qual.factors}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Monto:</span>
                      <span className="ml-1">{qual.amount}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Actualizado:</span>
                      <span className="ml-1">{qual.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- VISTA DE TABLA (ESCRITORIO) --- */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm">Instrumento</th>
                      <th className="text-left py-3 px-4 text-sm">Mercado</th>
                      <th className="text-left py-3 px-4 text-sm">Período</th>
                      <th className="text-left py-3 px-4 text-sm">Factores</th>
                      <th className="text-left py-3 px-4 text-sm">Monto</th>
                      <th className="text-left py-3 px-4 text-sm">Última Act.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQualifications.map((qual, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-sm">{qual.instrument}</td>
                        <td className="py-3 px-4 text-sm">{qual.market}</td>
                        <td className="py-3 px-4 text-sm">{qual.period}</td>
                        <td className="py-3 px-4 text-sm">{qual.factors}</td>
                        <td className="py-3 px-4 text-sm">{qual.amount}</td>
                        <td className="py-3 px-4 text-sm text-gray-400">{qual.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* --- PAGINACIÓN --- */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 lg:mt-6 pt-4 border-t border-white/10 gap-2">
              <span className="text-xs lg:text-sm text-gray-400">
                Mostrando {Math.min(pageSize, filteredQualifications.length)} de {filteredQualifications.length} registros
              </span>
              {/* Controles de paginación (actualmente decorativos). */}
              <div className="flex gap-1 lg:gap-2">
                <button 
                  className="px-2 lg:px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 text-xs lg:text-sm"
                  disabled
                  aria-label="Página anterior"
                >
                  Anterior
                </button>
                <button 
                  className="px-2 lg:px-3 py-1 bg-orange-600/20 text-orange-300 rounded-lg text-xs lg:text-sm"
                  aria-current="page"
                >
                  1
                </button>
                <button 
                  className="px-2 lg:px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 text-xs lg:text-sm"
                  disabled
                  aria-label="Página siguiente"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
