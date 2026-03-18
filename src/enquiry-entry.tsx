import React from 'react';
import { createRoot } from 'react-dom/client';
import PageLayout from './components/PageLayout';
import Enquiry from './pages/Enquiry';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageLayout>
      <Enquiry />
    </PageLayout>
  </React.StrictMode>
);
