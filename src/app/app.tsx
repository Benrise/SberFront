import { FunctionComponent, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { PreprocessingPage } from '@/pages/PreprocessingPage'
import { DistributionPage } from '@/pages/DistributionPage'

import { DefaultLayout, AuthLayout } from '@/app/layout'
import { ProtectedRoute } from './router';
import { AuthModel } from '@/entities/auth'
import { AnimatePresence } from 'framer-motion'
import { UserModel } from '@/entities/user'
import { TableModel } from '@/entities/table'
import { observer } from 'mobx-react-lite';

export const App: FunctionComponent = observer(() => {

  const { authStore } = AuthModel;
  const { userStore } = UserModel;
  const { tableStore } = TableModel;

  useEffect(() => {
    authStore.initialize();
    if (!authStore.isAuthorized) {
      return;
    }
    userStore.me();
  }, [authStore, authStore.isAuthorized]);

  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="preprocessing" element={<PreprocessingPage />} />
            <Route path="distribution" element={<DistributionPage />} />
            <Route path="/distribution/:id" element={<DistributionPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
})
