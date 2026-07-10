'use client';

import React, { useEffect, useRef } from 'react';

export default function Hero3DGridWave() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.width = containerRef.current?.clientWidth || 500;
    let height = canvas.height = containerRef.current?.clientHeight || 450;

    // Grid size parameters
    const cols = 22;
    const rows = 22;
    const spacing = 18;
    const focalLength = 300;
    
    // Initial camera rotation
    const angleX = 0.65; // Tilt downward
    let angleY = 0.55;  // Tilt sideways

    let time = 0;
    const mouse = { x: null, y: null, targetX: null, targetY: null };

    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        width = canvas.width = containerRef.current.clientWidth;
        height = canvas.height = containerRef.current.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse movements relative to canvas center
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouse.targetX = (mx - width / 2) * 0.3;
      mouse.targetY = (my - height / 2) * 0.3;
    };

    const handleMouseLeave = () => {
      mouse.targetX = null;
      mouse.targetY = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.035;

      // Smooth mouse tracking
      if (mouse.targetX !== null && mouse.targetY !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = 0;
        mouse.y = 0;
      }

      // Scale camera tilt and rotation dynamically based on mouse
      const currentAngleY = angleY + (mouse.x * 0.002);
      const currentAngleX = angleX + (mouse.y * 0.002);

      const sinX = Math.sin(currentAngleX);
      const cosX = Math.cos(currentAngleX);
      const sinY = Math.sin(currentAngleY);
      const cosY = Math.cos(currentAngleY);

      const projectedPoints = [];

      // Calculate 3D points, apply sine ripples, rotate, and project
      for (let r = 0; r < rows; r++) {
        projectedPoints[r] = [];
        for (let c = 0; c < cols; c++) {
          // Center the grid elements
          const x3d = (c - cols / 2) * spacing;
          const z3d = (r - rows / 2) * spacing;

          // Undulating height (Y) based on distance from center
          const distFromCenter = Math.sqrt(x3d * x3d + z3d * z3d);
          const waveSpeed = time - distFromCenter * 0.04;
          const y3d = Math.sin(waveSpeed) * Math.cos(distFromCenter * 0.02) * 22;

          // Apply rotation matrices
          // Y rotation
          let xRotY = x3d * cosY - z3d * sinY;
          let zRotY = x3d * sinY + z3d * cosY;

          // X rotation
          let yRotX = y3d * cosX - zRotY * sinX;
          let zRotX = y3d * sinX + zRotY * cosX;

          // Perspective projection formula
          const scale = focalLength / (focalLength + zRotX);
          const screenX = width / 2 + xRotY * scale;
          const screenY = height / 2 + yRotX * scale;

          projectedPoints[r][c] = {
            x: screenX,
            y: screenY,
            z: zRotX,
            scale: scale
          };
        }
      }

      // Draw grid lines
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = projectedPoints[r][c];

          // Draw line to right neighbor
          if (c < cols - 1) {
            const nextC = projectedPoints[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextC.x, nextC.y);
            
            // Opacity maps to Z depth
            const alpha = Math.max(0.01, Math.min(0.25, (1 - pt.z / 200) * 0.15));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }

          // Draw line to bottom neighbor
          if (r < rows - 1) {
            const nextR = projectedPoints[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextR.x, nextR.y);
            
            const alpha = Math.max(0.01, Math.min(0.25, (1 - pt.z / 200) * 0.15));
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }

          // Draw node dot
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(0.5, pt.scale * 1.4), 0, Math.PI * 2);
          const dotAlpha = Math.max(0.05, Math.min(0.65, (1 - pt.z / 200) * 0.35));
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }} />
    </div>
  );
}
