/**
 * @file rbac.ts
 * @description Utilidades para Control de Acceso Basado en Roles (RBAC)
 * Implementa la matriz de permisos definida en los requisitos
 */

export type UserRole = 'Corredor' | 'Administrador';

/**
 * Verifica si un usuario puede ver calificaciones tributarias
 * Corredor: Solo las propias (brokerId === userId)
 * Administrador: NO puede ver ninguna calificación
 */
export function canViewQualifications(
  userRole: UserRole,
  resourceOwnerId: string,
  userId: string
): boolean {
  if (userRole === 'Administrador') return false; // Admin NO ve calificaciones
  if (userRole === 'Corredor') return resourceOwnerId === userId; // Solo las propias
  return false;
}

/**
 * Verifica si un usuario puede crear calificaciones tributarias
 * Corredor: Puede crear sus propias calificaciones
 * Administrador: NO puede crear calificaciones
 */
export function canCreateQualification(userRole: UserRole): boolean {
  return userRole === 'Corredor';
}

/**
 * Verifica si un usuario puede editar una calificación tributaria
 * Corredor: Solo las propias (brokerId === userId)
 * Administrador: NO puede editar calificaciones
 */
export function canEditQualification(
  userRole: UserRole,
  resourceOwnerId: string,
  userId: string
): boolean {
  if (userRole === 'Administrador') return false; // Admin NO edita calificaciones
  if (userRole === 'Corredor') return resourceOwnerId === userId; // Solo las propias
  return false;
}

/**
 * Verifica si un usuario puede eliminar una calificación tributaria
 * Corredor: Solo las propias (brokerId === userId)
 * Administrador: NO puede eliminar calificaciones
 */
export function canDeleteQualification(
  userRole: UserRole,
  resourceOwnerId: string,
  userId: string
): boolean {
  if (userRole === 'Administrador') return false; // Admin NO elimina calificaciones
  if (userRole === 'Corredor') return resourceOwnerId === userId; // Solo las propias
  return false;
}

/**
 * Verifica si un usuario puede realizar carga masiva
 * Corredor: Puede cargar sus propias calificaciones
 * Administrador: NO puede cargar calificaciones
 */
export function canBulkUpload(userRole: UserRole): boolean {
  return userRole === 'Corredor';
}

/**
 * Verifica si un usuario puede generar reportes
 * Corredor: Puede generar reportes de sus propias calificaciones
 * Administrador: NO puede generar reportes
 */
export function canGenerateReports(userRole: UserRole): boolean {
  return userRole === 'Corredor';
}

/**
 * Verifica si un usuario puede gestionar otros usuarios (crear, editar, desactivar)
 * Corredor: NO puede gestionar usuarios
 * Administrador: SÍ puede gestionar usuarios
 */
export function canManageUsers(userRole: UserRole): boolean {
  return userRole === 'Administrador';
}

/**
 * Verifica si un usuario puede ver logs de auditoría del sistema
 * Corredor: NO puede ver logs
 * Administrador: SÍ puede ver logs
 */
export function canViewAuditLogs(userRole: UserRole): boolean {
  return userRole === 'Administrador';
}

/**
 * Verifica si un usuario puede realizar tareas de mantenimiento del sistema
 * Corredor: NO puede realizar mantenimiento
 * Administrador: SÍ puede realizar mantenimiento
 */
export function canPerformMaintenance(userRole: UserRole): boolean {
  return userRole === 'Administrador';
}

/**
 * Verifica si un usuario puede acceder al dashboard de corredor
 * Corredor: SÍ
 * Administrador: NO
 */
export function canAccessBrokerDashboard(userRole: UserRole): boolean {
  return userRole === 'Corredor';
}

/**
 * Verifica si un usuario puede acceder al dashboard de administrador
 * Corredor: NO
 * Administrador: SÍ
 */
export function canAccessAdminDashboard(userRole: UserRole): boolean {
  return userRole === 'Administrador';
}

/**
 * Determina la ruta del dashboard según el rol del usuario
 * Corredor → /dashboard
 * Administrador → /admin
 */
export function getDashboardRoute(userRole: UserRole): string {
  if (userRole === 'Corredor') return '/dashboard';
  if (userRole === 'Administrador') return '/admin';
  return '/login';
}

/**
 * Resumen de permisos para debugging y documentación
 */
export function getUserPermissions(userRole: UserRole) {
  return {
    role: userRole,
    permissions: {
      viewQualifications: canAccessBrokerDashboard(userRole),
      createQualification: canCreateQualification(userRole),
      editQualification: userRole === 'Corredor',
      deleteQualification: userRole === 'Corredor',
      bulkUpload: canBulkUpload(userRole),
      generateReports: canGenerateReports(userRole),
      manageUsers: canManageUsers(userRole),
      viewAuditLogs: canViewAuditLogs(userRole),
      performMaintenance: canPerformMaintenance(userRole),
      accessBrokerDashboard: canAccessBrokerDashboard(userRole),
      accessAdminDashboard: canAccessAdminDashboard(userRole),
    },
  };
}
