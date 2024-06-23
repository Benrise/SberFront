import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AuthModel } from '@/entities/auth';

import './styles.scss';
import { motion } from 'framer-motion';

export const ProtectedRoute: React.FC = observer(() => {
  const { authStore } = AuthModel;
  const location = useLocation();

  if (!authStore.isInitialized) {
    return (
      <>
      <div className="protected-route__fallback">
        <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.7 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
              <img src="/images/svg/logo/sber.svg" className='w-[124px] h-[124px]' alt="Сбер" />
          </motion.div>
        </div>
      </>
    );
  }

  if (!authStore.isAuthorized) {
    return <Navigate to={`/auth`} state={{ from: location }} replace />;
  }

  return <Outlet />;
});
