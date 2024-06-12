import { FunctionComponent } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { HomePage } from '@/pages/HomePage'
import { AuthPage } from '@/pages/AuthPage'


export const App: FunctionComponent = () => (
  <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </div>
)
