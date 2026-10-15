import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Fog, Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.05);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const isMobile = width < 640;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 10.8 : 8.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.className = 'w-full h-full block pointer-events-none';
    container.appendChild(renderer.domElement);

    // 3. Central Luxury Tech Kinetic Group
    const group = new THREE.Group();
    scene.add(group);

    // Main 3D Kinetic Sculpture: Torus Knot in Dark Obsidian Titanium
    const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.38, 128, 32, 2, 3);
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      roughness: 0.3,
      metalness: 0.9,
      flatShading: false
    });
    const mainMesh = new THREE.Mesh(torusGeo, obsidianMat);
    group.add(mainMesh);

    // Fine Champagne Gold (#D4AF37) Wireframe Overlay
    const wireGeo = new THREE.WireframeGeometry(torusGeo);
    const goldWireMat = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending
    });
    const wireMesh = new THREE.LineSegments(wireGeo, goldWireMat);
    group.add(wireMesh);

    // Concentric Orbiting Golden Ring
    const ringGeo = new THREE.RingGeometry(2.35, 2.37, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    group.add(ringMesh);

    // Subtle Floating Ambient Dust / Golden Nodes
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 14;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 2.8, 18);
    goldPointLight.position.set(3, 2, 4);
    scene.add(goldPointLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.2, 14);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // 5. Mouse Parallax Motion
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;

      targetRotationY = mouseX * 0.45;
      targetRotationX = mouseY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newIsMobile = newWidth < 640;
      camera.position.set(0, 0, newIsMobile ? 10.8 : 8.2);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous autonomous rotation
      mainMesh.rotation.y = elapsedTime * 0.12;
      mainMesh.rotation.x = elapsedTime * 0.08;
      wireMesh.rotation.y = elapsedTime * 0.12;
      wireMesh.rotation.x = elapsedTime * 0.08;

      ringMesh.rotation.z = -elapsedTime * 0.06;

      // Gentle floating oscillation
      group.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Smooth mouse parallax damping
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

      // Particle subtle drift
      particles.rotation.y = elapsedTime * 0.02;

      // Orbiting light pulse
      goldPointLight.position.x = Math.sin(elapsedTime * 0.6) * 4;
      goldPointLight.position.y = Math.cos(elapsedTime * 0.5) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      torusGeo.dispose();
      obsidianMat.dispose();
      wireGeo.dispose();
      goldWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
