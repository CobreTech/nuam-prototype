/**
 * Utilidades para manejo de rutas en GitHub Pages
 * Maneja las rutas de assets considerando el basePath del repositorio
 */

const basePath = process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS 
  ? '/nuam-prototype' 
  : '';

/**
 * Genera la ruta correcta para imágenes y assets
 * @param path - Ruta relativa del asset (ej: '/images/logo.jpg')
 * @returns Ruta completa considerando el basePath
 */
export function getAssetPath(path: string): string {
  // Asegurar que la ruta comience con /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

/**
 * Ruta del logo NUAM
 */
export const NUAM_LOGO_PATH = getAssetPath('/images/NuamLogo.jpg');
