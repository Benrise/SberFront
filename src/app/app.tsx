import { FunctionComponent, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { PreprocessingPage } from '@/pages/PreprocessingPage'
import { DistributionPage } from '@/pages/DistributionPage'

import { DefaultLayout, AuthLayout } from '@/app/layout'
import { ProtectedRoute } from './router';
import { AuthModel } from '@/entities/auth'

export const App: FunctionComponent = () => {

  const { authStore } = AuthModel;

  useEffect(() => {
    authStore.initialize();
  }, [authStore]);

  return (
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
  );
}
