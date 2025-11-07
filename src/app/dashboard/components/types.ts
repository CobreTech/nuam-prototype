/**
 * @file types.ts
 * @description Define las interfaces y tipos de TypeScript utilizados en toda la sección del dashboard.
 * Esto asegura la consistencia de los datos y mejora la legibilidad y mantenibilidad del código.
 */

// Define la estructura de factores tributarios (F8-F19)
export interface TaxFactors {
  f8: number;   // Factor 8 (0-1)
  f9: number;   // Factor 9 (0-1)
  f10: number;  // Factor 10 (0-1)
  f11: number;  // Factor 11 (0-1)
  f12: number;  // Factor 12 (0-1)
  f13: number;  // Factor 13 (0-1)
  f14: number;  // Factor 14 (0-1)
  f15: number;  // Factor 15 (0-1)
  f16: number;  // Factor 16 (0-1)
  f17: number;  // Factor 17 (0-1)
  f18: number;  // Factor 18 (0-1)
  f19: number;  // Factor 19 (0-1)
}

// Define la estructura de un objeto de Calificación Tributaria con factores detallados.
export interface TaxQualification {
  id: string;                    // Identificador único de la calificación.
  brokerId: string;              // ID del corredor propietario (segregación).
  instrument: string;            // Nombre del instrumento financiero.
  market: string;                // Mercado al que pertenece (ej. BVC, COLCAP).
  period: string;                // Período fiscal al que aplica (ej. 2024-Q1).
  qualificationType: string;     // Tipo de calificación (ej. Dividendos, Intereses).
  factors: TaxFactors;           // Factores tributarios F8-F19.
  amount: number;                // Monto asociado a la calificación.
  createdAt: Date;               // Fecha de creación.
  updatedAt: Date;               // Fecha de última actualización.
  isOfficial: boolean;           // Si está inscrita oficialmente o es local.
}

// Define la estructura de un objeto de Calificación Tributaria (versión simplificada para UI).
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

// Define los errores de validación de un registro
export interface ValidationError {
  row: number;               // Número de fila con error
  field: string;             // Campo con error
  value: any;                // Valor que causó el error
  message: string;           // Mensaje de error
  errorType: 'validation' | 'duplicate' | 'format' | 'factorSum'; // Tipo de error
}

// Define el resultado del procesamiento de un registro
export interface ProcessedRecord {
  rowNumber: number;
  data: TaxQualification | null;
  status: 'success' | 'error' | 'updated';
  errors: ValidationError[];
  isDuplicate: boolean;
  existingId?: string;
}

// Define el resultado completo de la carga masiva
export interface BulkUploadResult {
  totalRecords: number;      // Total de registros procesados
  added: number;             // Registros nuevos agregados
  updated: number;           // Registros actualizados
  errors: number;            // Registros con errores
  successRecords: ProcessedRecord[];  // Registros exitosos
  errorRecords: ProcessedRecord[];    // Registros con errores
  processingTime: number;    // Tiempo de procesamiento en ms
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
  validationErrors?: ValidationError[]; // Errores detectados en la validación
}

// Define la estructura de un elemento en el menú de navegación.
export interface MenuItem {
  id: string;      // Identificador único para la pestaña.
  label: string;   // Texto que se mostrará en el menú.
  icon: React.ReactNode;    // Componente de icono para representar la sección.
}

// Define los posibles valores para la pestaña activa en el dashboard.
export type ActiveTab = 'overview' | 'qualifications' | 'upload' | 'reports' | 'settings';
