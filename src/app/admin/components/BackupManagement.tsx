"use client";

import { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { useAuth } from '@/app/context/AuthContext';
import { logDataExport } from '@/app/services/auditService';
import Icons from '@/app/utils/icons';

/**
 * Componente de Gestión de Respaldos
 * Permite exportar datos del sistema
 */
export default function BackupManagement() {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [exportStatus, setExportStatus] = useState<string>('');

  const exportAllData = async () => {
    if (!confirm('¿Exportar datos administrativos del sistema (usuarios y logs)? Las calificaciones NO se incluyen por seguridad.')) return;

    try {
      setLoading(true);
      setExportStatus('Exportando usuarios...');

      // Exportar usuarios
      const usersSnap = await getDocs(collection(db, 'users'));
      const users = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        FechaCreacion: doc.data().FechaCreacion?.toDate?.()?.toISOString() || null,
      }));

      setExportStatus('Exportando logs de auditoría...');

      // Exportar logs de auditoría
      let auditLogs: any[] = [];
      try {
        const logsSnap = await getDocs(collection(db, 'auditLogs'));
        auditLogs = logsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || null,
        }));
      } catch (error) {
        console.log('Logs de auditoría no disponibles');
      }

      setExportStatus('Generando archivo...');

      // Crear objeto de respaldo (SIN CALIFICACIONES por seguridad RBAC)
      const backup = {
        exportDate: new Date().toISOString(),
        version: '1.0.0',
        data: {
          users,
          auditLogs,
          // taxQualifications: NO INCLUIDAS - Administrador NO debe acceder
        },
        metadata: {
          totalUsers: users.length,
          totalLogs: auditLogs.length,
          note: 'Las calificaciones tributarias NO están incluidas por políticas de seguridad RBAC',
        },
      };

      // Convertir a JSON
      const json = JSON.stringify(backup, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      
      // Descargar archivo
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nuam-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);

      // Registrar en auditoría
      if (userProfile) {
        await logDataExport(
          userProfile.uid,
          userProfile.email,
          `${userProfile.Nombre} ${userProfile.Apellido}`,
          'Admin Data (Users + Logs)',
          users.length + auditLogs.length
        );
      }

      setExportStatus('✓ Exportación completada');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Error exportando datos:', error);
      setExportStatus('❌ Error al exportar');
      setTimeout(() => setExportStatus(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const exportUsers = async () => {
    try {
      setLoading(true);
      const usersSnap = await getDocs(collection(db, 'users'));
      const users = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        FechaCreacion: doc.data().FechaCreacion?.toDate?.()?.toISOString() || null,
      }));

      const csv = convertToCSV(users, ['id', 'Nombre', 'Apellido', 'email', 'Rut', 'rol', 'activo', 'FechaCreacion']);
      downloadCSV(csv, `usuarios-${new Date().toISOString().split('T')[0]}.csv`);

      if (userProfile) {
        await logDataExport(
          userProfile.uid,
          userProfile.email,
          `${userProfile.Nombre} ${userProfile.Apellido}`,
          'Users',
          users.length
        );
      }

      setExportStatus('✓ Usuarios exportados');
      setTimeout(() => setExportStatus(''), 3000);
    } catch (error) {
      console.error('Error exportando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (data: any[], headers: string[]) => {
    const headerRow = headers.join(',');
    const rows = data.map(item =>
      headers.map(header => {
        const value = item[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    );
    return [headerRow, ...rows].join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">Respaldos y Mantenimiento</h2>
        <p className="text-gray-400">Exportación y gestión de datos del sistema</p>
      </div>

      {/* Estado de exportación */}
      {exportStatus && (
        <div className="backdrop-blur-xl bg-blue-500/20 border border-blue-500/50 rounded-xl p-4 text-center">
          <p className="text-blue-400">{exportStatus}</p>
        </div>
      )}

      {/* Exportación de datos administrativos */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-500/20 border border-orange-500/50 rounded-xl">
            <Icons.Database className="w-6 h-6 text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Exportar Datos Administrativos</h3>
            <p className="text-sm text-gray-400 mb-2">
              Exporta usuarios y logs de auditoría en formato JSON.
            </p>
            <div className="flex items-center gap-2 mb-4 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
              <Icons.Shield className="w-4 h-4 flex-shrink-0" />
              <span>Las calificaciones NO se exportan (política RBAC - solo accesibles por corredores)</span>
            </div>
            <button
              onClick={exportAllData}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icons.Download className="w-4 h-4" />
              {loading ? 'Exportando...' : 'Exportar Usuarios y Logs (JSON)'}
            </button>
          </div>
        </div>
      </div>

      {/* Exportaciones específicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 border border-blue-500/50 rounded-xl">
              <Icons.Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Exportar Usuarios</h3>
              <p className="text-sm text-gray-400 mb-4">
                Lista de todos los usuarios en formato CSV.
              </p>
              <button
                onClick={exportUsers}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all disabled:opacity-50"
              >
                <Icons.Download className="w-4 h-4" />
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-xl">
              <Icons.Cloud className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Respaldos Automáticos de Firebase</h3>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400">
                  Firebase Firestore mantiene respaldos automáticos de toda la base de datos.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icons.Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-400">PITR habilitado:</span>
                      <span className="text-gray-400"> Recuperación punto a punto hasta 7 días atrás</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icons.Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-400">Replicación:</span>
                      <span className="text-gray-400"> Datos replicados en múltiples zonas</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icons.Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-green-400">Cifrado:</span>
                      <span className="text-gray-400"> AES-256 en reposo y TLS en tránsito</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://firebase.google.com/docs/firestore/backups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 mt-2"
                >
                  <Icons.ExternalLink className="w-3 h-3" />
                  Documentación de Respaldos Firebase
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información importante */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="backdrop-blur-xl bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Icons.Warning className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-400 mb-1">Seguridad RBAC</h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>Los administradores NO tienen acceso a calificaciones tributarias</li>
                <li>Solo los corredores dueños pueden exportar sus calificaciones</li>
                <li>Todas las exportaciones quedan registradas en auditoría</li>
                <li>Los respaldos de usuarios contienen información sensible</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <Icons.Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-400 mb-1">Recuperación de Datos</h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                <li>PITR permite restaurar a cualquier punto de los últimos 7 días</li>
                <li>Contacta al equipo técnico para recuperaciones PITR</li>
                <li>Los respaldos automáticos están siempre activos</li>
                <li>No se requiere configuración adicional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
