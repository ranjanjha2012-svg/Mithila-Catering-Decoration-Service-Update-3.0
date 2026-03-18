import React from 'react';
import { createRoot } from 'react-dom/client';
import PageLayout from './components/PageLayout';
import Tiffin from './pages/Tiffin';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <Tiffin />
    </PageLayout>
  </React.StrictMode>
);
