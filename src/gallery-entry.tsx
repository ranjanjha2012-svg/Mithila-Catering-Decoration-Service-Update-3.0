import React from 'react';
import { createRoot } from 'react-dom/client';
import PageLayout from './components/PageLayout';
import Gallery from './pages/Gallery';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <Gallery />
    </PageLayout>
  </React.StrictMode>
);
