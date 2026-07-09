'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function NotfoundPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = 120;
    let mouse = { x: null, y: null, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = () => {
      particles.forEach((p) => {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          p.vx = (dx / dist) * 12;
          p.vy = (dy / dist) * 12;
        }
      });
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    class GravNode {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (mouse.active && mouse.x !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400 && dist > 10) {
            // Pull node towards cursor
            let force = (400 - dist) / 4000;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Wrap borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new GravNode());
    }

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="page-route-not-found">
      <section className="error-section">
        <canvas ref={canvasRef} id="gravity-canvas" style={{ zIndex: 1, pointerEvents: 'auto' }} />
        
        <div className="error-content-box" style={{ zIndex: 10 }}>
          <div className="error-code text-gradient-chrome">404</div>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-2)', letterSpacing: '0.12em' }}>
            Lost in the Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
            The system routing resolved an invalid node path. Restore coordinates using the command below.
          </p>
          <div className="btn-wrapper">
            <Link href="/" className="btn btn-primary">
              Return to Base Node
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
