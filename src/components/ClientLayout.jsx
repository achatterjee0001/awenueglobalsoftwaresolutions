'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import MobileNav from './MobileNav';
import Footer from './Footer';
import ParticleCanvas from './ParticleCanvas';
import CustomCursor from './CustomCursor';
import Preloader from './Preloader';

export default function ClientLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) {
      // Trigger entrance animations for any hero reveal elements currently present on the DOM
      const revealElements = document.querySelectorAll('.hero-reveal');
      revealElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 150);
      });
    }
  }, [hasLoaded]);

  return (
    <>
      <Preloader onComplete={() => setHasLoaded(true)} />
      <ParticleCanvas />
      <CustomCursor />
      
      <Header onMobileMenuToggle={() => setMobileOpen(!mobileOpen)} isOpen={mobileOpen} />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer />
    </>
  );
}
