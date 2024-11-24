"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import gsap from "gsap";

const Teleball: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Customizable parameters
    const headColor = 0xffffff;
    const headMetalness = 0.8;

    const glassesColor = 0x2a2a2a;
    const lensColor = 0xffffff;
    const lensEmissiveColor = 0xff6600;
    const lensWidth = 3.5;
    const lensHeight = 1.2;
    const lensRoundedness = 0.5;

    const textColor = 0xff8c00;
    const textEmissiveColor = 0xff4500;
    const textPosition = { x: -3, y: -1.5, z: 1.5 };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Head geometry
    const headGeometry = new THREE.SphereGeometry(3, 84, 84);
    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: headColor,
      metalness: headMetalness,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);

    // Glasses setup
    const glassesGroup = new THREE.Group();

    // Frame geometry
    const frameShape = new THREE.Shape();
    frameShape.moveTo(-lensWidth / 2, -lensHeight / 2);
    frameShape.lineTo(lensWidth / 2, -lensHeight / 2);
    frameShape.quadraticCurveTo(
      lensWidth / 2 + lensRoundedness,
      -lensHeight / 2,
      lensWidth / 2 + lensRoundedness,
      -lensHeight / 2 + lensRoundedness
    );
    frameShape.lineTo(lensWidth / 2 + lensRoundedness, lensHeight / 2 - lensRoundedness);
    frameShape.quadraticCurveTo(
      lensWidth / 2 + lensRoundedness,
      lensHeight / 2,
      lensWidth / 2,
      lensHeight / 2
    );
    frameShape.lineTo(-lensWidth / 2, lensHeight / 2);
    frameShape.quadraticCurveTo(
      -lensWidth / 2 - lensRoundedness,
      lensHeight / 2,
      -lensWidth / 2 - lensRoundedness,
      lensHeight / 2 - lensRoundedness
    );
    frameShape.lineTo(-lensWidth / 2 - lensRoundedness, -lensHeight / 2 + lensRoundedness);
    frameShape.quadraticCurveTo(
      -lensWidth / 2 - lensRoundedness,
      -lensHeight / 2,
      -lensWidth / 2,
      -lensHeight / 2
    );

    const frameGeometry = new THREE.ExtrudeGeometry(frameShape, {
      steps: 2,
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 5,
    });

    const frameMaterial = new THREE.MeshPhongMaterial({
      color: glassesColor,
      shininess: 100,
    });

    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, 2);
    glassesGroup.add(frame);

    // Lens setup
    const lensGeometry = new THREE.PlaneGeometry(lensWidth, lensHeight);
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: lensColor,
      emissive: lensEmissiveColor,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });

    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(0, 0, 2.5);
    glassesGroup.add(lens);

    scene.add(glassesGroup);

    // Marquee text
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/Orbitron_Regular.json", (font) => {
      const textGeometry = new TextGeometry("The Teleporter", {
        font,
        size: 0.3,
        height: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshPhongMaterial({
        color: textColor,
        emissive: textEmissiveColor,
        emissiveIntensity: 0.5,
        shininess: 100,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(textPosition.x, textPosition.y, textPosition.z);
      glassesGroup.add(textMesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;

    // Resize handling
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-10" />;
};

export default Teleball;