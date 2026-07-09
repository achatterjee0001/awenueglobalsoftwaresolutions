'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Lock scroll during load
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setFadeOut(true);
          document.body.style.overflow = '';
          setTimeout(() => {
            setHidden(true);
            if (onComplete) onComplete();
          }, 600);
        }, 500);
      }
      setProgress(currentProgress);
    }, 55);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div 
      id="loading-screen" 
      style={{
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? 'hidden' : 'visible',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s'
      }}
    >
      <div className="loader-container">
        {/* Actual Chrome Logo Asset */}
        <div className="loader-logo-wrapper" style={{ width: '280px', height: '90px', marginBottom: '24px' }}>
          <img 
            src="/assets/logo-dark.png" 
            alt="AWENUE logo" 
            className="loader-logo" 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
          />
        </div>
        
        {/* Correct Progress bar Classes */}
        <div className="loader-progress-track">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
          ></div>
        </div>
        
        <div className="loader-percentage">{progress}%</div>
      </div>
    </div>
  );
}
