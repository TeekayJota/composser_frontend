// ./src/components/ProtectedRoute.tsx
import { useAuth } from '../contexts/authProvider';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige a la página de inicio
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado, renderiza el componente hijo
  return <>{children}</>;
}

export default ProtectedRoute;
