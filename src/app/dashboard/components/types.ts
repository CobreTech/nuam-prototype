/**
 * @file types.ts
 * @description Define las interfaces y tipos de TypeScript utilizados en toda la sección del dashboard.
 * Esto asegura la consistencia de los datos y mejora la legibilidad y mantenibilidad del código.
 */

// Define la estructura de un objeto de Calificación Tributaria.
export interface Qualification {
  id: string;          // Identificador único de la calificación.
  instrument: string;  // Nombre del instrumento financiero.
  market: string;      // Mercado al que pertenece (ej. BVC, COLCAP).
  period: string;      // Período fiscal al que aplica (ej. 2024-Q1).
  factors: string;     // Rango de factores aplicados (ej. F8-F12).
  amount: string;      // Monto asociado a la calificación.
  lastUpdate: string;  // Fecha de la última actualización.
}

// Define la estructura de un registro en la lista de Actividad Reciente.
export interface RecentActivity {
  id: number;        // Identificador único de la actividad.
  action: string;    // Descripción de la acción realizada.
  time: string;      // Tiempo transcurrido desde que se realizó la acción.
  status: 'success' | 'warning' | 'error'; // Estado de la actividad para visualización.
}

// Define la estructura del objeto para la previsualización de un archivo cargado.
export interface FilePreview {
  fileName: string;    // Nombre del archivo.
  size: number;        // Tamaño del archivo en bytes.
  rows: number;        // Número total de filas detectadas en el archivo.
  columns: string[];   // Nombres de las columnas detectadas.
  preview: string[][]; // Muestra de las primeras filas de datos.
  summary: {           // Resumen del análisis del archivo.
    added: number;     // Registros a ser agregados.
    updated: number;   // Registros a ser actualizados.
    errors: number;    // Registros con errores.
  };
}

// Define la estructura de un elemento en el menú de navegación.
export interface MenuItem {
  id: string;      // Identificador único para la pestaña.
  label: string;   // Texto que se mostrará en el menú.
  icon: string;    // Emoji o ícono para representar la sección.
}

// Define los posibles valores para la pestaña activa en el dashboard.
export type ActiveTab = 'overview' | 'qualifications' | 'upload' | 'reports' | 'settings';
