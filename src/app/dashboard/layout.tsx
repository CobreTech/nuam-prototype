/**
 * Layout del Dashboard de Corredor
 * Protege todas las rutas /dashboard/* para que solo accedan usuarios con rol "Corredor"
 */

import ProtectedRoute from '../components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="Corredor">
      {children}
    </ProtectedRoute>
  );
}
