import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AuthModel } from '@/entities/auth';

import './styles.scss';

export const ProtectedRoute: React.FC = observer(() => {
  const { authStore } = AuthModel;
  const location = useLocation();

  if (!authStore.isInitialized) {
    return (
      <>
        <div className="protected-route__fallback">
          <img src="/images/svg/logo/sber.svg" className='w-[124px] h-[124px]' alt="Сбер" />
        </div>
      </>
    );
  }

  if (!authStore.isAuthorized) {
    return <Navigate to={`/auth`} state={{ from: location }} replace />;
  }

  return <Outlet />;
});
