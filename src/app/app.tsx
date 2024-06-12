import { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthPage } from '@/pages/AuthPage'
import { HomePage } from '@/pages/HomePage'
import { PreprocessingPage } from '@/pages/PreprocessingPage'
import { DistributionPage } from '@/pages/DistributionPage'

import { DefaultLayout, AuthLayout } from '@/app/layout'


export const App: FunctionComponent = () => (
  <>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="preprocessing" element={<PreprocessingPage />} />
        <Route path="distribution" element={<DistributionPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<AuthPage />} />
      </Route>
    </Routes>
  </>
)
