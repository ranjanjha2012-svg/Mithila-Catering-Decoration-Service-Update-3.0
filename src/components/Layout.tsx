import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg selection:bg-gold selection:text-black">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
