'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeSciFi() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth || window.innerWidth;
    let height = containerRef.current.clientHeight || 750;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 280;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Node Glow Texture
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
    const nodeTexture = createGlowTexture();

    // 3. Sci-Fi Reactor Core Group Setup
    const reactorGroup = new THREE.Group();
    scene.add(reactorGroup);

    // Common holographic wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    // Ring material
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });

    // Central Core: Geodesic Geosphere
    const coreGeo = new THREE.IcosahedronGeometry(18, 1);
    const coreMesh = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    }));
    reactorGroup.add(coreMesh);

    // Inner orbiting Ring (Tilted X)
    const ringInnerGeo = new THREE.RingGeometry(40, 41.5, 64);
    const ringInner = new THREE.Mesh(ringInnerGeo, ringMaterial);
    ringInner.rotation.x = Math.PI / 4;
    reactorGroup.add(ringInner);

    // Middle orbiting Ring (Tilted Y)
    const ringMidGeo = new THREE.RingGeometry(60, 61.5, 64);
    const ringMid = new THREE.Mesh(ringMidGeo, ringMaterial);
    ringMid.rotation.y = Math.PI / 4;
    reactorGroup.add(ringMid);

    // Outer orbiting Ring (Horizontal)
    const ringOuterGeo = new THREE.RingGeometry(80, 81.5, 64);
    const ringOuter = new THREE.Mesh(ringOuterGeo, ringMaterial);
    ringOuter.rotation.x = Math.PI / 2;
    reactorGroup.add(ringOuter);

    // Outer Geodesic Cage
    const cageGeo = new THREE.IcosahedronGeometry(105, 1);
    const cageMesh = new THREE.Mesh(cageGeo, wireframeMaterial);
    reactorGroup.add(cageMesh);

    // Orbiting Data Packets (Points)
    const nodeCount = 18;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeGeometry = new THREE.BufferGeometry();
    const nodesData = [];

    for (let i = 0; i < nodeCount; i++) {
      const orbitType = i % 3; // 0: Inner, 1: Mid, 2: Outer
      const baseRadius = orbitType === 0 ? 40.75 : orbitType === 1 ? 60.75 : 80.75;
      const angle = (i / nodeCount) * Math.PI * 2 + Math.random() * 0.5;

      nodesData.push({
        orbitType: orbitType,
        baseRadius: baseRadius,
        radius: baseRadius,
        angle: angle,
        speed: (Math.random() * 0.015 + 0.01) * (Math.random() > 0.4 ? 1 : -1),
        exploded: false,
        burstVelocity: 0
      });
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodePointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 5.5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: nodeTexture,
      depthWrite: false
    });
    const orbitingNodes = new THREE.Points(nodeGeometry, nodePointsMaterial);
    reactorGroup.add(orbitingNodes);

    // 4. Interactive Mouse Event Binding
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 5. Click Interactive Event (Quantum Core Overload)
    let speedMultiplier = 1.0;
    let flashIntensity = 0;

    const handleClick = () => {
      speedMultiplier = 6.0;
      flashIntensity = 1.0;
      
      nodesData.forEach((node) => {
        node.exploded = true;
        node.burstVelocity = Math.random() * 2.8 + 2.2;
      });
    };

    window.addEventListener('click', handleClick);

    // 6. Responsive Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let time = 0;
    let reqId;

    const animate = () => {
      time += 0.015;

      // Decay click multipliers smoothly back to base states
      speedMultiplier += (1.0 - speedMultiplier) * 0.04;
      flashIntensity += (0.0 - flashIntensity) * 0.08;

      // Apply dynamic flash values to materials
      ringMaterial.opacity = 0.35 + flashIntensity * 0.55;
      coreMesh.material.opacity = 0.28 + flashIntensity * 0.52;
      wireframeMaterial.opacity = 0.12 + flashIntensity * 0.28;
      nodePointsMaterial.size = 5.5 + flashIntensity * 6;

      // Rotate HUD elements
      coreMesh.rotation.y += 0.015 * speedMultiplier;
      coreMesh.rotation.x += 0.008 * speedMultiplier;

      ringInner.rotation.z += 0.008 * speedMultiplier;
      ringMid.rotation.z -= 0.012 * speedMultiplier;
      ringOuter.rotation.z += 0.006 * speedMultiplier;

      cageMesh.rotation.y -= 0.002 * speedMultiplier;
      cageMesh.rotation.x -= 0.001 * speedMultiplier;

      // Update orbiting nodes position arrays
      const posArr = nodeGeometry.attributes.position.array;
      for (let i = 0; i < nodeCount; i++) {
        const node = nodesData[i];
        
        // Progress angle using the speed multiplier
        node.angle += node.speed * speedMultiplier;

        if (node.exploded) {
          // Push coordinates outwards
          node.radius += node.burstVelocity;
          node.burstVelocity *= 0.92; // decel
          
          if (node.burstVelocity < 0.15) {
            node.radius += (node.baseRadius - node.radius) * 0.08;
            if (Math.abs(node.radius - node.baseRadius) < 1.5) {
              node.radius = node.baseRadius;
              node.exploded = false;
            }
          }
        } else {
          // Re-align node positions smoothly
          node.radius += (node.baseRadius - node.radius) * 0.08;
        }

        let x = 0, y = 0, z = 0;

        if (node.orbitType === 0) {
          const rx = Math.cos(node.angle) * node.radius;
          const ry = Math.sin(node.angle) * node.radius;
          x = rx;
          y = ry * Math.cos(Math.PI / 4);
          z = -ry * Math.sin(Math.PI / 4);
        } else if (node.orbitType === 1) {
          const rx = Math.cos(node.angle) * node.radius;
          const rz = Math.sin(node.angle) * node.radius;
          x = rx * Math.cos(Math.PI / 4);
          y = -rx * Math.sin(Math.PI / 4);
          z = rz;
        } else {
          x = Math.cos(node.angle) * node.radius;
          z = Math.sin(node.angle) * node.radius;
          y = 0;
        }

        posArr[i * 3] = x;
        posArr[i * 3 + 1] = y;
        posArr[i * 3 + 2] = z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Mouse tracking easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Apply tilt to reactor group
      reactorGroup.rotation.y = mouse.x * 0.35;
      reactorGroup.rotation.x = -mouse.y * 0.35;

      // Apply subtle translation parallax drift + vertical offset to shift core downward
      reactorGroup.position.x = mouse.x * 35;
      reactorGroup.position.y = -15 + mouse.y * 25;

      // Minor breathing animation scale + click expansion pulse
      const pulseScale = (1.0 + Math.sin(time) * 0.015) * (1.0 + flashIntensity * 0.22);
      reactorGroup.scale.set(pulseScale, pulseScale, pulseScale);

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Unmount Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      ringInnerGeo.dispose();
      ringMidGeo.dispose();
      ringOuterGeo.dispose();
      cageGeo.dispose();
      nodeGeometry.dispose();
      wireframeMaterial.dispose();
      ringMaterial.dispose();
      nodePointsMaterial.dispose();
      nodeTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />
  );
}
