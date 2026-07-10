'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroThreeGeometry() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth || window.innerWidth;
    let height = containerRef.current.clientHeight || 750;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 350;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Light Setup for Chrome Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Neon blue backlight
    const pointLight1 = new THREE.PointLight(0x00d2ff, 1.8, 400);
    pointLight1.position.set(-150, 100, 100);
    scene.add(pointLight1);

    // Soft magenta sidelight
    const pointLight2 = new THREE.PointLight(0xff00b4, 1.2, 400);
    pointLight2.position.set(150, -100, 100);
    scene.add(pointLight2);

    // 3. Create Geometries Group
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Chrome standard material properties
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.12,
      flatShading: false
    });

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8A95A5,
      metalness: 0.9,
      roughness: 0.18
    });

    // Shape 1: Torus Knot (Central/Right floating body)
    const knotGeo = new THREE.TorusKnotGeometry(32, 9, 120, 16);
    const knotMesh = new THREE.Mesh(knotGeo, chromeMaterial);
    knotMesh.position.set(110, 30, 0);
    shapesGroup.add(knotMesh);

    // Shape 2: Octahedron (Bottom/Left diamond)
    const octGeo = new THREE.OctahedronGeometry(28, 0);
    const octMesh = new THREE.Mesh(octGeo, steelMaterial);
    octMesh.position.set(-140, -60, -30);
    shapesGroup.add(octMesh);

    // Shape 3: Torus Ring (Top/Left ring)
    const torusGeo = new THREE.TorusGeometry(22, 6, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeo, chromeMaterial);
    torusMesh.position.set(-90, 80, -50);
    shapesGroup.add(torusMesh);

    // 4. Interactive Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Map to normalized coordinates (-1 to 1)
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

      // Rotate shapes independently
      knotMesh.rotation.y += 0.006;
      knotMesh.rotation.x += 0.003;

      octMesh.rotation.y -= 0.004;
      octMesh.rotation.z += 0.005;

      torusMesh.rotation.x += 0.005;
      torusMesh.rotation.y += 0.003;

      // Float shapes vertically using sine wave equations
      knotMesh.position.y = 30 + Math.sin(time) * 12;
      octMesh.position.y = -60 + Math.sin(time * 0.8) * 8;
      torusMesh.position.y = 80 + Math.sin(time * 1.2) * 10;

      // Mouse tracking easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Apply parallax translation offset to the group
      shapesGroup.position.x = mouse.x * 45;
      shapesGroup.position.y = mouse.y * 35;

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
      knotGeo.dispose();
      octGeo.dispose();
      torusGeo.dispose();
      chromeMaterial.dispose();
      steelMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />
  );
}
