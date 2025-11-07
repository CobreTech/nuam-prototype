'use client'

/**
 * Componente ReportsSection (Sección de Reportes)
 * 
 * Esta sección proporciona la interfaz para que los usuarios generen diferentes tipos
 * de reportes tributarios. Incluye filtros para acotar los datos y tarjetas que
 * representan cada tipo de reporte disponible.
 * 
 * Funcionalidades:
 * - Panel de filtros por evento de capital y rango de fechas.
 * - Grid de tarjetas de reportes, cada una con un título, descripción y un botón.
 * - Los botones de generación de PDF están deshabilitados para la demostración y muestran una alerta.
 */

import Icons from '../../utils/icons'

export default function ReportsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* --- PANEL DE FILTROS --- */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4">Filtros de Reporte</h2>
        {/* Grid que organiza los campos de filtro. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div>
            <label htmlFor="event-filter" className="block text-xs lg:text-sm font-medium mb-2">Evento de Capital</label>
            <select 
              id="event-filter"
              className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            >
              <option value="">Todos los eventos</option>
              <option value="dividend">Dividendos</option>
              <option value="split">División de acciones</option>
              <option value="merger">Fusión</option>
            </select>
          </div>
          <div>
            <label htmlFor="date-from" className="block text-xs lg:text-sm font-medium mb-2">Fecha Desde</label>
            <input
              id="date-from"
              type="date"
              className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            />
          </div>
          <div>
            <label htmlFor="date-to" className="block text-xs lg:text-sm font-medium mb-2">Fecha Hasta</label>
            <input
              id="date-to"
              type="date"
              className="w-full px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm lg:text-base"
            />
          </div>
        </div>
      </div>

      {/* --- TARJETAS DE REPORTES --- */}
      {/* Grid que muestra los diferentes tipos de reportes disponibles. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {/* Ejemplo de Tarjeta de Reporte */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
          <div className="flex items-start justify-between mb-3 lg:mb-4">
            <div>
              <h3 className="text-sm lg:text-lg font-semibold">Calificaciones por Evento de Capital</h3>
              <p className="text-xs lg:text-sm text-gray-400">Reporte detallado de calificaciones agrupadas por evento</p>
            </div>
            <Icons.BarChart className="w-8 h-8 lg:w-10 lg:h-10 text-orange-400" />
          </div>
          {/* Botón deshabilitado para la demo. */}
          <button
            onClick={() => alert('Pendiente de implementación')}
            className="w-full px-3 lg:px-4 py-2 bg-gray-600/50 text-gray-400 rounded-xl cursor-not-allowed text-xs lg:text-sm"
            disabled
          >
            Generar PDF (Demo)
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
          <div className="flex items-start justify-between mb-3 lg:mb-4">
            <div>
              <h3 className="text-sm lg:text-lg font-semibold">Resumen por Período</h3>
              <p className="text-xs lg:text-sm text-gray-400">Consolidado trimestral de calificaciones tributarias</p>
            </div>
            <Icons.TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-green-400" />
          </div>
          <button
            onClick={() => alert('Pendiente de implementación')}
            className="w-full px-3 lg:px-4 py-2 bg-gray-600/50 text-gray-400 rounded-xl cursor-not-allowed text-xs lg:text-sm"
            disabled
          >
            Generar PDF (Demo)
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
          <div className="flex items-start justify-between mb-3 lg:mb-4">
            <div>
              <h3 className="text-sm lg:text-lg font-semibold">Factores por Instrumento</h3>
              <p className="text-xs lg:text-sm text-gray-400">Análisis de factores F8-F19 por tipo de instrumento</p>
            </div>
            <Icons.ClipboardList className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400" />
          </div>
          <button
            onClick={() => alert('Pendiente de implementación')}
            className="w-full px-3 lg:px-4 py-2 bg-gray-600/50 text-gray-400 rounded-xl cursor-not-allowed text-xs lg:text-sm"
            disabled
          >
            Generar PDF (Demo)
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 lg:p-6">
          <div className="flex items-start justify-between mb-3 lg:mb-4">
            <div>
              <h3 className="text-sm lg:text-lg font-semibold">Reporte DJ1948</h3>
              <p className="text-xs lg:text-sm text-gray-400">Declaración jurada según formato oficial</p>
            </div>
            <Icons.File className="w-8 h-8 lg:w-10 lg:h-10 text-purple-400" />
          </div>
          <button
            onClick={() => alert('Pendiente de implementación')}
            className="w-full px-3 lg:px-4 py-2 bg-gray-600/50 text-gray-400 rounded-xl cursor-not-allowed text-xs lg:text-sm"
            disabled
          >
            Generar PDF (Demo)
          </button>
        </div>
      </div>
    </div>
  )
}
