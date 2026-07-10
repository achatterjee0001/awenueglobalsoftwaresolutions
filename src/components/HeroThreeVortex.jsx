'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeVortex() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth || 500;
    let height = containerRef.current.clientHeight || 450;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Glowing Particle Texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(230, 240, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(200, 220, 255, 0.2)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    // 3. Create Swirling Particles
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Store properties for animation updates
    const initialData = [];

    for (let i = 0; i < particleCount; i++) {
      // Swirl parameters
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 95 + 10; // Radius from center
      const y = (Math.random() - 0.5) * 160; // Height distribution
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color mapping: Silver / Steel-Blue / Chrome gradients
      const ratio = r / 105;
      let color = new THREE.Color();
      if (ratio < 0.35) {
        color.setHSL(0.55, 0.1, 0.95); // Silver-white core
      } else if (ratio < 0.7) {
        color.setHSL(0.6, 0.2, 0.8);  // Steel blue
      } else {
        color.setHSL(0.58, 0.35, 0.6); // Soft chrome cyan
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random sizes
      sizes[i] = Math.random() * 4 + 2;

      initialData.push({
        angle: angle,
        radius: r,
        y: y,
        speed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.3 ? 1 : -0.5), // Variable rotation speed
        waveSpeed: Math.random() * 1.5 + 0.5
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom shader-like materials via PointsMaterial
    const material = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: createParticleTexture(),
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 4. Interactive Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Track relative to window dimensions for fullscreen background
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 5. Responsive Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let time = 0;
    let reqId;

    const animate = () => {
      time += 0.01;

      // Rotate scene slowly
      particles.rotation.y += 0.001;

      // Mouse tracking easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Dynamic tilt based on cursor position
      particles.rotation.z = mouse.x * 0.3;
      particles.rotation.x = -mouse.y * 0.3;

      // Update particle positions to swirl
      const posArr = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const data = initialData[i];
        
        // Update angle for swirling
        data.angle += data.speed;

        // Apply a radial oscillation based on time (swells the spiral vortex)
        const waveRadius = data.radius + Math.sin(time * data.waveSpeed) * 4;
        
        // Update x & z coordinates in the float array
        posArr[i * 3] = Math.cos(data.angle) * waveRadius;
        // Y rises and falls organically
        posArr[i * 3 + 1] = data.y + Math.sin(time * 2 + data.radius * 0.1) * 6;
        posArr[i * 3 + 2] = Math.sin(data.angle) * waveRadius;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Unmount Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />
  );
}
