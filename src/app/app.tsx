import { FunctionComponent, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { PreprocessingPage } from '@/pages/PreprocessingPage'
import { DistributionPage } from '@/pages/DistributionPage'

import { DefaultLayout, AuthLayout } from '@/app/layout'
import { ProtectedRoute } from './router';
import { AuthModel } from '@/entities/auth'
import { UserModel } from '@/entities/user'

export const App: FunctionComponent = () => {

  const authStore = AuthModel.authStore;
  const userStore = UserModel.userStore;

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      return;
    }

    if (localStorage.getItem('accessToken') && !authStore.isAuthorized && localStorage.getItem('refreshToken')) {
      const refreshToken = localStorage.getItem('refreshToken')!;
      authStore.refresh(refreshToken);
    }
  }, [authStore, userStore]);

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
