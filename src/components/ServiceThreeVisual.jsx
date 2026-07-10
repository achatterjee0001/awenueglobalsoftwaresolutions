'use client';

import React, { useEffect, useRef } from 'react';

export default function ServiceThreeVisual() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, gridGroup;
    let cubes = [];
    let animationFrameId;
    let mouseX = 0, mouseY = 0;
    
    const width = container.clientWidth || 300;
    const height = 220;

    // 1. Dynamic import of Three.js to prevent Next.js SSR failures
    let THREE;
    try {
      THREE = require('three');
    } catch (e) {
      console.error('Three.js load error:', e);
      return;
    }

    try {
      // 2. Setup Scene, Camera and WebGL Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 4.5, 6);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 3. Create Group to contain the 3D motherboard grid
      gridGroup = new THREE.Group();
      gridGroup.rotation.y = 0.25; // Subtle default rotate angle
      scene.add(gridGroup);

      // 4. Add a scanning grid helper at the base
      const gridHelper = new THREE.GridHelper(4.5, 10, 0x00f2fe, 0x1f262f);
      gridHelper.position.y = -0.55;
      gridHelper.material.opacity = 0.4;
      gridHelper.material.transparent = true;
      gridGroup.add(gridHelper);

      // 5. Build 5x5 Grid of Cyber CPU pillars
      const pillarGeo = new THREE.BoxGeometry(0.35, 1.2, 0.35);
      const rows = 5;
      const cols = 5;
      const spacing = 0.65;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Center the grid around origin (0, 0, 0)
          const posX = (c - (cols - 1) / 2) * spacing;
          const posZ = (r - (rows - 1) / 2) * spacing;

          // Wireframe neon style material
          const pillarMat = new THREE.MeshStandardMaterial({
            color: 0x00f2fe, // Cyan cyber glow
            wireframe: true,
            roughness: 0.1,
            metalness: 0.9,
            transparent: true,
            opacity: 0.7
          });

          const pillar = new THREE.Mesh(pillarGeo, pillarMat);
          pillar.position.set(posX, 0, posZ);
          
          // Initial base values
          pillar.userData = {
            baseX: posX,
            baseZ: posZ,
            speed: 0.05 + Math.random() * 0.05,
            phase: Math.random() * Math.PI * 2
          };

          gridGroup.add(pillar);
          cubes.push(pillar);
        }
      }

      // 6. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0x00f2fe, 2.0);
      directionalLight.position.set(5, 10, 5);
      scene.add(directionalLight);

      const pointLight = new THREE.PointLight(0xff007f, 1.5, 10);
      pointLight.position.set(-3, 2, 2);
      scene.add(pointLight);

      // 7. Interactive cursor tracking event listeners
      const onMouseMove = (event) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Map viewport normalized coordinates to local 3D grid space bounds
        mouseX = ((x / rect.width) - 0.5) * 4.5;
        mouseY = ((y / rect.height) - 0.5) * 4.5;
      };

      container.addEventListener('mousemove', onMouseMove);

      const onTouchMove = (event) => {
        if (event.touches.length > 0) {
          const rect = container.getBoundingClientRect();
          const x = event.touches[0].clientX - rect.left;
          const y = event.touches[0].clientY - rect.top;
          mouseX = ((x / rect.width) - 0.5) * 4.5;
          mouseY = ((y / rect.height) - 0.5) * 4.5;
        }
      };

      container.addEventListener('touchmove', onTouchMove, { passive: true });

      // 8. Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Slow automatic rotation of the whole grid
        gridGroup.rotation.y = 0.25 + Math.sin(time * 0.2) * 0.15;

        // Animate each microchip pillar
        cubes.forEach((cube) => {
          // Calculate distance from cursor to cube in the 2D plane (X-Z grid plane)
          const dx = cube.userData.baseX - mouseX;
          const dz = cube.userData.baseZ - mouseY;
          const distance = Math.sqrt(dx * dx + dz * dz);

          // Ripple effect calculation: height is inverse to distance
          // Normal breathing wave fallback when mouse is inactive (0, 0)
          const rippleEffect = Math.max(0, 2.2 - distance * 0.85);
          
          // Idle sinus breathing wave
          const idleWave = Math.sin(time * 2.0 + cube.userData.phase) * 0.22;

          // Combine scroll/mouse ripple with base height
          const targetScaleY = Math.max(0.15, 0.4 + rippleEffect + idleWave);

          // Smooth height interpolation (lerp)
          cube.scale.y += (targetScaleY - cube.scale.y) * 0.12;

          // Adjust position so scale happens from the bottom grid plate upwards
          cube.position.y = (cube.scale.y * 0.6) - 0.6;

          // Pulse coloring based on height
          const hue = 0.5 + (cube.scale.y * 0.08); // Shift color from cyan to blue-magenta when tall
          cube.material.color.setHSL(hue % 1.0, 0.9, 0.5);
          cube.material.opacity = Math.min(0.9, 0.45 + cube.scale.y * 0.12);
        });

        renderer.render(scene, camera);
      };

      animate();

      // 9. Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const w = entry.contentRect.width || width;
          const h = height;
          if (renderer) {
            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
          }
        }
      });
      resizeObserver.observe(container);

      // Cleanups
      return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('touchmove', onTouchMove);
        resizeObserver.disconnect();

        // Dispose geometries
        pillarGeo.dispose();
        cubes.forEach(cube => {
          cube.material.dispose();
        });
        gridHelper.geometry.dispose();
        gridHelper.material.dispose();

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };

    } catch (err) {
      console.error("Three.js CPU grid initialization failure:", err);
      container.innerHTML = "<div style='color:var(--text-secondary);font-size:0.8rem;text-align:center;padding-top:80px;'>3D Matrix Core in Standby.</div>";
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-container" 
      style={{ 
        width: '100%', 
        height: '220px', 
        position: 'relative', 
        overflow: 'hidden', 
        cursor: 'crosshair' 
      }} 
    />
  );
}
