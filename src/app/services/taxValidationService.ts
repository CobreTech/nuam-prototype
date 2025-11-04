/**
 * @file taxValidationService.ts
 * @description Servicio de validación de datos tributarios
 * Implementa RF-03: Validación automática de factores
 * Los factores F8-F19 no deben sumar más de 1 (100%)
 */

import { TaxFactors, TaxQualification, ValidationError } from '../dashboard/components/types';

/**
 * Valida que la suma de los factores F8-F19 no supere 1 (100%)
 * RF-03: Validación automática de factores
 */
export function validateFactorsSum(factors: TaxFactors): { isValid: boolean; sum: number; error?: string } {
  const sum = 
    factors.f8 + factors.f9 + factors.f10 + factors.f11 + 
    factors.f12 + factors.f13 + factors.f14 + factors.f15 + 
    factors.f16 + factors.f17 + factors.f18 + factors.f19;

  const isValid = sum <= 1;

  return {
    isValid,
    sum,
    error: isValid ? undefined : `La suma de los factores (${sum.toFixed(4)}) supera el límite permitido de 1 (100%)`
  };
}

/**
 * Valida un registro individual de calificación tributaria
 * Verifica todos los campos requeridos y las reglas de negocio
 */
export function validateTaxQualification(
  data: Partial<TaxQualification>,
  rowNumber: number
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validar campos requeridos
  if (!data.instrument || data.instrument.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'instrument',
      value: data.instrument,
      message: 'El campo instrumento es requerido',
      errorType: 'validation'
    });
  }

  if (!data.market || data.market.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'market',
      value: data.market,
      message: 'El campo mercado es requerido',
      errorType: 'validation'
    });
  }

  if (!data.period || data.period.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'period',
      value: data.period,
      message: 'El campo período es requerido',
      errorType: 'validation'
    });
  }

  if (!data.qualificationType || data.qualificationType.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'qualificationType',
      value: data.qualificationType,
      message: 'El campo tipo de calificación es requerido',
      errorType: 'validation'
    });
  }

  // Validar monto
  if (data.amount === undefined || data.amount === null) {
    errors.push({
      row: rowNumber,
      field: 'amount',
      value: data.amount,
      message: 'El campo monto es requerido',
      errorType: 'validation'
    });
  } else if (data.amount < 0) {
    errors.push({
      row: rowNumber,
      field: 'amount',
      value: data.amount,
      message: 'El monto no puede ser negativo',
      errorType: 'validation'
    });
  }

  // Validar factores
  if (!data.factors) {
    errors.push({
      row: rowNumber,
      field: 'factors',
      value: data.factors,
      message: 'Los factores tributarios son requeridos',
      errorType: 'validation'
    });
  } else {
    // Validar cada factor individualmente
    const factorKeys = ['f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19'];
    
    for (const key of factorKeys) {
      const value = data.factors[key as keyof TaxFactors];
      
      if (value === undefined || value === null) {
        errors.push({
          row: rowNumber,
          field: key,
          value: value,
          message: `El factor ${key.toUpperCase()} es requerido`,
          errorType: 'validation'
        });
      } else if (typeof value !== 'number' || isNaN(value)) {
        errors.push({
          row: rowNumber,
          field: key,
          value: value,
          message: `El factor ${key.toUpperCase()} debe ser un número válido`,
          errorType: 'format'
        });
      } else if (value < 0 || value > 1) {
        errors.push({
          row: rowNumber,
          field: key,
          value: value,
          message: `El factor ${key.toUpperCase()} debe estar entre 0 y 1`,
          errorType: 'validation'
        });
      }
    }

    // RF-03: Validar suma de factores
    if (errors.length === 0 || !errors.some(e => factorKeys.includes(e.field))) {
      const validation = validateFactorsSum(data.factors);
      if (!validation.isValid) {
        errors.push({
          row: rowNumber,
          field: 'factors',
          value: validation.sum,
          message: validation.error || 'La suma de factores supera el 100%',
          errorType: 'factorSum'
        });
      }
    }
  }

  return errors;
}

/**
 * Valida el formato de un período fiscal
 * Formatos aceptados: 2024-Q1, 2024-Q2, 2024-Q3, 2024-Q4, 2024-01, etc.
 */
export function validatePeriodFormat(period: string): boolean {
  const quarterPattern = /^\d{4}-Q[1-4]$/;
  const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;
  const yearPattern = /^\d{4}$/;
  
  return quarterPattern.test(period) || monthPattern.test(period) || yearPattern.test(period);
}

/**
 * Sanitiza y normaliza los datos antes de la validación
 */
export function sanitizeData(data: any): Partial<TaxQualification> {
  return {
    ...data,
    instrument: typeof data.instrument === 'string' ? data.instrument.trim() : '',
    market: typeof data.market === 'string' ? data.market.trim() : '',
    period: typeof data.period === 'string' ? data.period.trim() : '',
    qualificationType: typeof data.qualificationType === 'string' ? data.qualificationType.trim() : '',
    amount: typeof data.amount === 'number' ? data.amount : parseFloat(data.amount) || 0,
    isOfficial: data.isOfficial === true || data.isOfficial === 'true',
  };
}

/**
 * Verifica si dos calificaciones son duplicadas
 * Se considera duplicado si tienen el mismo instrumento, mercado y período
 */
export function isDuplicateQualification(
  qualification1: Partial<TaxQualification>,
  qualification2: Partial<TaxQualification>
): boolean {
  return (
    qualification1.instrument === qualification2.instrument &&
    qualification1.market === qualification2.market &&
    qualification1.period === qualification2.period &&
    qualification1.brokerId === qualification2.brokerId
  );
}
