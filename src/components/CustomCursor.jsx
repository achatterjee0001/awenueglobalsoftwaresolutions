'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let glowX = 0, glowY = 0;
    let isHidden = true;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHidden) {
        isHidden = false;
        dot.style.opacity = '1';
        glow.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isHidden = true;
      dot.style.opacity = '0';
      glow.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const hoverElements = 'a, button, .card-premium, .card-product-horizontal, input, textarea, select, .interactive-item';

    const handleMouseOver = (e) => {
      if (e.target.closest(hoverElements)) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(hoverElements)) {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let animationFrameId;
    const renderCursor = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      glow.style.left = `${glowX}px`;
      glow.style.top = `${glowY}px`;

      animationFrameId = requestAnimationFrame(renderCursor);
    };

    renderCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="custom-cursor" 
        style={{
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s',
          width: hovered ? '24px' : '8px',
          height: hovered ? '24px' : '8px',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.1)' : 'var(--text-primary)',
          border: hovered ? '1px solid rgba(255, 255, 255, 0.6)' : 'none'
        }}
      />
      <div 
        ref={glowRef} 
        className="custom-cursor-glow" 
        style={{ opacity: 0 }}
      />
    </>
  );
}
