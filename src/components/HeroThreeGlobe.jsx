'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeGlobe() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth || 500;
    let height = containerRef.current.clientHeight || 450;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Dynamic Canvas Texture Helper for Glowing Particles
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    // 3. Globe Node Group Setup
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 4. Generate Node Particles
    const particleCount = 260;
    const radius = 110;
    const positions = [];
    const nodePoints = [];

    // Distribute nodes evenly on the sphere using Fibonacci Sphere logic
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
      nodePoints.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5.5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: createGlowTexture(),
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    globeGroup.add(particles);

    // 5. Connect Nearby Nodes with Network Lines
    const linePositions = [];
    for (let i = 0; i < particleCount; i++) {
      const p1 = nodePoints[i];
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = nodePoints[j];
        const dist = p1.distanceTo(p2);
        
        // Connect points that are close to each other
        if (dist < 34) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    globeGroup.add(lines);

    // 6. Interactive Mouse Events & Cursor Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      // Convert to normalized coordinates (-1 to 1)
      mouse.targetX = (clientX / width) * 2 - 1;
      mouse.targetY = -(clientY / height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mouseleave', handleMouseLeave);

    // 7. Responsive Resizer
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation and Render Loop
    let time = 0;
    let reqId;

    const animate = () => {
      time += 0.005;

      // Base rotation
      globeGroup.rotation.y += 0.0015;
      globeGroup.rotation.x += 0.0008;

      // Interpolate rotation based on mouse coordinates for soft easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate group toward cursor
      globeGroup.rotation.y += mouse.x * 0.4;
      globeGroup.rotation.x -= mouse.y * 0.4;

      // Subtle scaling pulsation
      const pulseScale = 1.0 + Math.sin(time * 3) * 0.015;
      globeGroup.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      if (domElement) {
        domElement.removeEventListener('mousemove', handleMouseMove);
        domElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  );
}
