'use client';

import React, { useEffect, useRef } from 'react';

export default function WebThreeVisual() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, browserGroup;
    let uiElements = [];
    let animationFrameId;
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;

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
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 3. Create Group for the 3D Browser window
      browserGroup = new THREE.Group();
      scene.add(browserGroup);

      // 4. Build the Browser Frame (Glass panel)
      const frameGeo = new THREE.BoxGeometry(3.6, 2.2, 0.08);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        roughness: 0.1,
        metalness: 0.9,
        flatShading: true
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      browserGroup.add(frameMesh);

      // Wireframe contour outline for the browser window
      const edges = new THREE.EdgesGeometry(frameGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, linewidth: 1, transparent: true, opacity: 0.45 });
      const lineMesh = new THREE.LineSegments(edges, lineMat);
      browserGroup.add(lineMesh);

      // 5. Add Browser Window Control Buttons (Red, Yellow, Green dots)
      const dotGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const colors = [0xff5f56, 0xffbd2e, 0x27c93f];
      
      colors.forEach((color, i) => {
        const dotMat = new THREE.MeshBasicMaterial({ color });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        // Position top-left corner
        dotMesh.position.set(-1.6 + i * 0.18, 0.95, 0.05);
        browserGroup.add(dotMesh);
      });

      // Address Bar Mockup
      const barGeo = new THREE.BoxGeometry(1.8, 0.09, 0.02);
      const barMat = new THREE.MeshBasicMaterial({ color: 0x1f262f, transparent: true, opacity: 0.8 });
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(0.1, 0.95, 0.05);
      browserGroup.add(barMesh);

      // 6. Build Layout Components inside browser (HTML nodes representation)
      // Sidebar node
      const sidebarGeo = new THREE.BoxGeometry(0.7, 1.4, 0.05);
      const sidebarMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe, // Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const sidebarMesh = new THREE.Mesh(sidebarGeo, sidebarMat);
      sidebarMesh.position.set(-1.2, -0.15, 0.1);
      browserGroup.add(sidebarMesh);
      uiElements.push({ mesh: sidebarMesh, parallaxFactor: 0.25 });

      // Main Hero header block
      const heroGeo = new THREE.BoxGeometry(2.1, 0.6, 0.05);
      const heroMat = new THREE.MeshStandardMaterial({
        color: 0xff007f, // Pink magenta
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const heroMesh = new THREE.Mesh(heroGeo, heroMat);
      heroMesh.position.set(0.4, 0.25, 0.12);
      browserGroup.add(heroMesh);
      uiElements.push({ mesh: heroMesh, parallaxFactor: 0.45 });

      // Cards Grid (3 boxes at bottom right)
      const cardGeo = new THREE.BoxGeometry(0.62, 0.65, 0.05);
      for (let i = 0; i < 3; i++) {
        const cardMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.set(-0.34 + i * 0.74, -0.52, 0.1);
        browserGroup.add(cardMesh);
        uiElements.push({ mesh: cardMesh, parallaxFactor: 0.3 + i * 0.08 });
      }

      // 7. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0x00f2fe, 1.8);
      directionalLight1.position.set(5, 5, 5);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xff007f, 1.2);
      directionalLight2.position.set(-5, -5, 5);
      scene.add(directionalLight2);

      // 8. Event listeners for mouse tracking
      const onMouseMove = (event) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Normalize coordinates to range [-0.5, 0.5]
        mouseX = (x / rect.width) - 0.5;
        mouseY = (y / rect.height) - 0.5;
      };

      container.addEventListener('mousemove', onMouseMove);

      const onTouchMove = (event) => {
        if (event.touches.length > 0) {
          const rect = container.getBoundingClientRect();
          const x = event.touches[0].clientX - rect.left;
          const y = event.touches[0].clientY - rect.top;
          mouseX = (x / rect.width) - 0.5;
          mouseY = (y / rect.height) - 0.5;
        }
      };

      container.addEventListener('touchmove', onTouchMove, { passive: true });

      // 9. Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Base idle floating effect
        browserGroup.position.y = Math.sin(time * 1.5) * 0.08;
        browserGroup.position.x = Math.cos(time * 1.0) * 0.04;

        // Interpolate target rotations based on cursor
        targetRotationX = mouseY * -0.7; // Tilt forwards/backwards
        targetRotationY = mouseX * 0.8;  // Twist left/right

        browserGroup.rotation.x += (targetRotationX - browserGroup.rotation.x) * 0.07;
        browserGroup.rotation.y += (targetRotationY - browserGroup.rotation.y) * 0.07;

        // Animate DOM UI layers with Z-axis parallax offsets based on mouse proximity
        uiElements.forEach((el) => {
          const targetZ = 0.05 + Math.abs(mouseX) * el.parallaxFactor * 1.2;
          el.mesh.position.z += (targetZ - el.mesh.position.z) * 0.1;
        });

        renderer.render(scene, camera);
      };

      animate();

      // 10. Resize Observer
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

        // Dispose geometries and materials
        frameGeo.dispose();
        frameMat.dispose();
        edges.dispose();
        lineMat.dispose();
        dotGeo.dispose();
        barGeo.dispose();
        barMat.dispose();
        sidebarGeo.dispose();
        sidebarMat.dispose();
        heroGeo.dispose();
        heroMat.dispose();
        cardGeo.dispose();

        uiElements.forEach((el) => {
          el.mesh.material.dispose();
        });

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };

    } catch (err) {
      console.error("Three.js Web mock initialization failure:", err);
      container.innerHTML = "<div style='color:var(--text-secondary);font-size:0.8rem;text-align:center;padding-top:80px;'>3D Interface Core in Standby.</div>";
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
        cursor: 'grab' 
      }} 
    />
  );
}
