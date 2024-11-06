import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import React from 'react';

const router = createHashRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
