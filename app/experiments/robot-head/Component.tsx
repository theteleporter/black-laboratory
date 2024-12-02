"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import gsap from "gsap";

const Component: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161616);

    // Head geometry
    const headGeometry = new THREE.SphereGeometry(3, 84, 84);
    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF3,
      metalness: 0.88,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);

    // Glasses setup
    const glassesGroup = new THREE.Group();

    // Frame geometry and material
    const headRadius = 3; // Radius of the head
    const glassesWidth = headRadius * 1.5; // Width of the glasses should match the head radius
    const glassesHeight = headRadius * 0.4; // Adjust height for a more natural look
    const bevelRadius = 0.5; // Radius for rounded corners

    const frameShape = new THREE.Shape();
    frameShape.moveTo(-glassesWidth / 2, -glassesHeight / 2);
    frameShape.lineTo(glassesWidth / 2, -glassesHeight / 2);
    frameShape.quadraticCurveTo(glassesWidth / 2 + bevelRadius, -glassesHeight / 2, glassesWidth / 2 + bevelRadius, -glassesHeight / 2 + bevelRadius);
    frameShape.lineTo(glassesWidth / 2 + bevelRadius, glassesHeight / 2 - bevelRadius);
    frameShape.quadraticCurveTo(glassesWidth / 2 + bevelRadius, glassesHeight / 2, glassesWidth / 2, glassesHeight / 2);
    frameShape.lineTo(-glassesWidth / 2, glassesHeight / 2);
    frameShape.quadraticCurveTo(-glassesWidth / 2 - bevelRadius, glassesHeight / 2, -glassesWidth / 2 - bevelRadius, glassesHeight / 2 - bevelRadius);
    frameShape.lineTo(-glassesWidth / 2 - bevelRadius, -glassesHeight / 2 + bevelRadius);
    frameShape.quadraticCurveTo(-glassesWidth / 2 - bevelRadius, -glassesHeight / 2, -glassesWidth / 2, -glassesHeight / 2);

    const frameGeometry = new THREE.ExtrudeGeometry(frameShape, {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 5,
    });
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0x2a2a2a, // Change to white
      opacity: 0.7, // Add some transparency
      transparent: true,
      shininess: 100,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, 2); // Adjust position slightly forward
    glassesGroup.add(frame);

    // Lens gradient with texture
    const lensGeometry = new THREE.PlaneGeometry(glassesWidth, glassesHeight);
    const lensCanvas = document.createElement("canvas");
    lensCanvas.width = 256;
    lensCanvas.height = 256;
    const lensContext = lensCanvas.getContext("2d");

    if (lensContext) {
      const gradient = lensContext.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, "#FF6600"); // Deeper orange
      gradient.addColorStop(1, "#FFA500"); // Amber
      lensContext.fillStyle = gradient;
      lensContext.fillRect(0, 0, 256, 256);
    }

    const lensTexture = new THREE.CanvasTexture(lensCanvas);
    lensTexture.needsUpdate = true;

    const lensMaterial = new THREE.MeshPhysicalMaterial({
      map: lensTexture,
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 2.5,
      reflectivity: 0.8,
      transmission: 0.6,
      emissive: 0xFF6600,
      emissiveIntensity: 0.4,
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(0, 0, 3); // Move slightly more forward
    glassesGroup.add(lens);

    // Side arms
    const armGeometry = new THREE.BoxGeometry(0.1, 0.2, 3);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x3a3a3a });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-glassesWidth / 2, 0, 0.5); // Position adjusted to match glasses
    glassesGroup.add(leftArm);

    const rightArm = leftArm.clone();
    rightArm.position.set(glassesWidth / 2, 0, 0.5); // Position adjusted to match glasses
    glassesGroup.add(rightArm);

    scene.add(glassesGroup);

    // Lens light
    const lensLight = new THREE.PointLight(0xFF6600, 0.8, 5);
    lensLight.position.set(0, 0, 3.5);
    glassesGroup.add(lensLight);


    // Marquee text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/Orbitron_Regular.json', (font) => {
      const textGeometry = new TextGeometry('The Teleporter', {
        font: font,
        size: 0.3,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5
      });

      const textMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF8C00,
        emissive: 0xFF4500,
        emissiveIntensity: 0.5,
        shininess: 100
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-glassesWidth / 2, -glassesHeight / 2 - 0.5, 1.5);

      // Animate the marquee
      const animateMarquee = () => {
        textMesh.position.x += 0.01; // Slow down the animation
        if (textMesh.position.x > glassesWidth / 2) {
          textMesh.position.x = -glassesWidth / 2;
        }
        requestAnimationFrame(animateMarquee);
      };
      animateMarquee();
      glassesGroup.add(textMesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
    pointLight2.position.set(-10, -10, -10);
    pointLight2.intensity = 0.5;
    scene.add(pointLight2);

    // Camera
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.render(scene, camera);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    // Resize handler
    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    const animate = () => {
      controls.update();

      // Add pulsing effect to lens light
      const time = Date.now() * 0.001; // Convert to seconds
      lensLight.intensity = 0.6 + Math.sin(time * 2) * 0.2; // Vary intensity between 0.4 and 0.8

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // GSAP Animation
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(head.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tl.fromTo(glassesGroup.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-10" />;
};

export default Component;
