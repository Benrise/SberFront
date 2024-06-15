import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { AuthModel } from '@/entities/auth';
import { UserModel } from '@/entities/user';

export const ProtectedRoute = observer(() => {
  const authStore = AuthModel.authStore;
  const userStore = UserModel.userStore;
  const location = useLocation()

  useEffect(() => {
    if (!authStore.isAuthorized) {
      return;
    }
    userStore.me();
  }, [authStore, userStore]);

  return authStore.isAuthorized ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
});
