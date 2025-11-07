/**
 * Layout del Dashboard de Administrador
 * Protege todas las rutas /admin/* para que solo accedan usuarios con rol "Administrador"
 */

import ProtectedRoute from '../components/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="Administrador">
      {children}
    </ProtectedRoute>
  );
}
