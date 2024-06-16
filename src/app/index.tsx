import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import '@/app/styles/index.scss';
import { Toaster } from '@/shared/ui/toaster';
import { Provider } from 'mobx-react';
import rootStore from '@/app/store';

const reactRoot = createRoot(
  document.getElementById('root')!,
);

reactRoot.render(
  <React.StrictMode>
    <Provider rootStore={rootStore}>
      <BrowserRouter>
        <App />
        <Toaster  />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
