import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/app/store';

export const ProtectedRoute = observer(() => {
  const { authStore } = useRootStore();
  const location = useLocation()

  return authStore.isAuthorized ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
});
