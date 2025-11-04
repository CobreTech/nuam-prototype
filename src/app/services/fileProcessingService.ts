/**
 * @file fileProcessingService.ts
 * @description Servicio de procesamiento de archivos CSV y Excel
 * Implementa RF-01: Carga masiva de datos tributarios
 * Soporta archivos CSV y Excel con validación de datos
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { TaxQualification, TaxFactors, ProcessedRecord, ValidationError } from '../dashboard/components/types';
import { validateTaxQualification, sanitizeData } from './taxValidationService';

/**
 * Columnas esperadas en el archivo de carga masiva
 */
export const EXPECTED_COLUMNS = [
  'instrumento',
  'mercado',
  'periodo',
  'tipo_calificacion',
  'f8',
  'f9',
  'f10',
  'f11',
  'f12',
  'f13',
  'f14',
  'f15',
  'f16',
  'f17',
  'f18',
  'f19',
  'monto',
  'es_oficial'
];

/**
 * Interfaz para las filas del archivo CSV/Excel
 */
interface FileRow {
  instrumento: string;
  mercado: string;
  periodo: string;
  tipo_calificacion: string;
  f8: string | number;
  f9: string | number;
  f10: string | number;
  f11: string | number;
  f12: string | number;
  f13: string | number;
  f14: string | number;
  f15: string | number;
  f16: string | number;
  f17: string | number;
  f18: string | number;
  f19: string | number;
  monto: string | number;
  es_oficial: string | boolean;
}

/**
 * Convierte una fila del archivo a un objeto TaxQualification
 */
function rowToTaxQualification(row: FileRow, brokerId: string): Partial<TaxQualification> {
  const parseNumber = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Reemplazar comas por puntos para decimales
      const cleaned = value.replace(',', '.');
      return parseFloat(cleaned) || 0;
    }
    return 0;
  };

  const factors: TaxFactors = {
    f8: parseNumber(row.f8),
    f9: parseNumber(row.f9),
    f10: parseNumber(row.f10),
    f11: parseNumber(row.f11),
    f12: parseNumber(row.f12),
    f13: parseNumber(row.f13),
    f14: parseNumber(row.f14),
    f15: parseNumber(row.f15),
    f16: parseNumber(row.f16),
    f17: parseNumber(row.f17),
    f18: parseNumber(row.f18),
    f19: parseNumber(row.f19),
  };

  return {
    brokerId,
    instrument: String(row.instrumento || '').trim(),
    market: String(row.mercado || '').trim(),
    period: String(row.periodo || '').trim(),
    qualificationType: String(row.tipo_calificacion || '').trim(),
    factors,
    amount: parseNumber(row.monto),
    isOfficial: row.es_oficial === 'true' || row.es_oficial === true || row.es_oficial === '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Procesa un archivo CSV
 * RF-01: Carga masiva de datos tributarios
 */
export async function processCSVFile(
  file: File,
  brokerId: string
): Promise<ProcessedRecord[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<FileRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => {
        // Normalizar nombres de columnas
        return header.toLowerCase().trim().replace(/\s+/g, '_');
      },
      complete: (results) => {
        try {
          const processedRecords: ProcessedRecord[] = [];

          results.data.forEach((row, index) => {
            const rowNumber = index + 2; // +2 porque index es 0-based y la primera fila es el header
            
            try {
              const taxQualification = rowToTaxQualification(row, brokerId);
              const sanitized = sanitizeData(taxQualification);
              const validationErrors = validateTaxQualification(sanitized, rowNumber);

              if (validationErrors.length > 0) {
                processedRecords.push({
                  rowNumber,
                  data: null,
                  status: 'error',
                  errors: validationErrors,
                  isDuplicate: false,
                });
              } else {
                processedRecords.push({
                  rowNumber,
                  data: sanitized as TaxQualification,
                  status: 'success',
                  errors: [],
                  isDuplicate: false,
                });
              }
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
              processedRecords.push({
                rowNumber,
                data: null,
                status: 'error',
                errors: [{
                  row: rowNumber,
                  field: 'general',
                  value: row,
                  message: `Error al procesar la fila: ${errorMessage}`,
                  errorType: 'format'
                }],
                isDuplicate: false,
              });
            }
          });

          resolve(processedRecords);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`Error al parsear CSV: ${error.message}`));
      }
    });
  });
}

/**
 * Procesa un archivo Excel (XLSX)
 * RF-01: Carga masiva de datos tributarios
 */
export async function processExcelFile(
  file: File,
  brokerId: string
): Promise<ProcessedRecord[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error('No se pudo leer el archivo'));
          return;
        }

        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir a JSON con headers (devuelve array de arrays)
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
          header: 1,
          defval: '',
        });

        if (jsonData.length === 0) {
          reject(new Error('El archivo está vacío'));
          return;
        }

        // La primera fila son los headers
        const headers = (jsonData[0] as any[]).map((h: any) => 
          String(h).toLowerCase().trim().replace(/\s+/g, '_')
        );

        const processedRecords: ProcessedRecord[] = [];

        // Procesar cada fila (saltando el header)
        for (let i = 1; i < jsonData.length; i++) {
          const rowArray = jsonData[i] as any[];
          const rowNumber = i + 1;

          // Convertir array a objeto usando los headers
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = rowArray[index];
          });

          try {
            const taxQualification = rowToTaxQualification(row as FileRow, brokerId);
            const sanitized = sanitizeData(taxQualification);
            const validationErrors = validateTaxQualification(sanitized, rowNumber);

            if (validationErrors.length > 0) {
              processedRecords.push({
                rowNumber,
                data: null,
                status: 'error',
                errors: validationErrors,
                isDuplicate: false,
              });
            } else {
              processedRecords.push({
                rowNumber,
                data: sanitized as TaxQualification,
                status: 'success',
                errors: [],
                isDuplicate: false,
              });
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            processedRecords.push({
              rowNumber,
              data: null,
              status: 'error',
              errors: [{
                row: rowNumber,
                field: 'general',
                value: row,
                message: `Error al procesar la fila: ${errorMessage}`,
                errorType: 'format'
              }],
              isDuplicate: false,
            });
          }
        }

        resolve(processedRecords);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        reject(new Error(`Error al procesar Excel: ${errorMessage}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsBinaryString(file);
  });
}

/**
 * Procesa un archivo según su tipo (CSV o Excel)
 * RF-01: Carga masiva de datos tributarios
 */
export async function processFile(
  file: File,
  brokerId: string
): Promise<ProcessedRecord[]> {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();

  if (fileExtension === 'csv') {
    return processCSVFile(file, brokerId);
  } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
    return processExcelFile(file, brokerId);
  } else {
    throw new Error('Formato de archivo no soportado. Use CSV o XLSX');
  }
}

/**
 * Genera una plantilla CSV de ejemplo para guiar a los usuarios
 */
export function generateTemplateCSV(): string {
  const headers = EXPECTED_COLUMNS.join(',');
  const exampleRow = [
    'Acción ABC',
    'BVC',
    '2024-Q1',
    'Dividendos',
    '0.1',
    '0.1',
    '0.1',
    '0.1',
    '0.1',
    '0.1',
    '0.1',
    '0.1',
    '0.05',
    '0.05',
    '0.05',
    '0.05',
    '15000',
    'false'
  ].join(',');

  return `${headers}\n${exampleRow}`;
}

/**
 * Descarga una plantilla CSV de ejemplo
 */
export function downloadTemplateCSV(): void {
  const csvContent = generateTemplateCSV();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'plantilla_carga_masiva.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
