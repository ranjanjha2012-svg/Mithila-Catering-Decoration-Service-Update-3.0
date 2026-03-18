import React from 'react';
import { createRoot } from 'react-dom/client';
import PageLayout from './components/PageLayout';
import Contact from './pages/Contact';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <Contact />
    </PageLayout>
  </React.StrictMode>
);
