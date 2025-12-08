import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  className?: string;
}

export function ThreeCanvas({ className = '' }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const initScene = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      
      if (width === 0 || height === 0) {
        requestAnimationFrame(initScene);
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 150 : 500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);

      const neonColors = [
        new THREE.Color('#A855F7'),
        new THREE.Color('#3B82F6'),
        new THREE.Color('#EC4899'),
        new THREE.Color('#06B6D4'),
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = (Math.random() - 0.5) * 20;

        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        const color = neonColors[Math.floor(Math.random() * neonColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleTexture = createParticleTexture();

      const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        map: particleTexture,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const sphereGeometry = new THREE.IcosahedronGeometry(2, 2);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: '#A855F7',
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const energySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(energySphere);

      const innerSphereGeometry = new THREE.IcosahedronGeometry(1.5, 2);
      const innerSphereMaterial = new THREE.MeshBasicMaterial({
        color: '#3B82F6',
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
      scene.add(innerSphere);

      camera.position.z = 8;

      const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      const handleResize = () => {
        const newWidth = container.clientWidth || window.innerWidth;
        const newHeight = container.clientHeight || window.innerHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      setIsReady(true);
      let animationId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
        const positionsArray = positionAttribute.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          positionsArray[i3] += velocities[i3];
          positionsArray[i3 + 1] += velocities[i3 + 1];
          positionsArray[i3 + 2] += velocities[i3 + 2];

          const dx = mouseRef.current.x * 5 - positionsArray[i3];
          const dy = mouseRef.current.y * 5 - positionsArray[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 3) {
            positionsArray[i3] += dx * 0.01;
            positionsArray[i3 + 1] += dy * 0.01;
          }

          if (positionsArray[i3] > 10 || positionsArray[i3] < -10) velocities[i3] *= -1;
          if (positionsArray[i3 + 1] > 10 || positionsArray[i3 + 1] < -10) velocities[i3 + 1] *= -1;
          if (positionsArray[i3 + 2] > 10 || positionsArray[i3 + 2] < -10) velocities[i3 + 2] *= -1;
        }
        positionAttribute.needsUpdate = true;

        particles.rotation.y = elapsed * 0.05;
        particles.rotation.x = elapsed * 0.03;

        energySphere.rotation.x = elapsed * 0.3;
        energySphere.rotation.y = elapsed * 0.5;
        energySphere.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.1);

        innerSphere.rotation.x = -elapsed * 0.4;
        innerSphere.rotation.y = -elapsed * 0.6;
        innerSphere.scale.setScalar(1 + Math.cos(elapsed * 2) * 0.1);

        camera.position.x = mouseRef.current.x * 0.5;
        camera.position.y = mouseRef.current.y * 0.5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        innerSphereGeometry.dispose();
        innerSphereMaterial.dispose();
        particleTexture.dispose();
        renderer.dispose();
      };
    };

    const cleanup = initScene();
    return cleanup;
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ minHeight: '100vh', position: 'absolute', inset: 0 }}
      data-testid="three-canvas"
    />
  );
}

function createParticleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
