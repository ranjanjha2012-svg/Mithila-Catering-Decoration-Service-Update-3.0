import React from 'react';
import { createRoot } from 'react-dom/client';
import PageLayout from './components/PageLayout';
import Services from './pages/Services';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <Services />
    </PageLayout>
  </React.StrictMode>
);
