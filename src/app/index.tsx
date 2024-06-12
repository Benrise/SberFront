import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

import '@/app/styles/index.scss'

const reactRoot = createRoot(
  document.getElementById('root')!,
)

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
