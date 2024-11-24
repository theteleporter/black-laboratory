"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Leva, useControls } from "leva";
import Link from 'next/link'

const Teleball: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Leva control panel
  const {
    headColor,
    metalness,
    roughness,
    clearcoat,
    lensIntensity,
    textColor,
    cameraZoom,
  } = useControls({
    headColor: "#ffffff",
    metalness: { value: 0.88, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1.0, min: 0, max: 1, step: 0.01 },
    lensIntensity: { value: 0.8, min: 0, max: 5, step: 0.1 },
    textColor: "#FF8C00",
    cameraZoom: { value: 20, min: 10, max: 50, step: 1 },
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Head
    const headGeometry = new THREE.SphereGeometry(3, 84, 84);
    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(headColor),
      metalness,
      roughness,
      clearcoat,
      clearcoatRoughness: 0.1,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    scene.add(head);

    // Glasses and other elements...
    const glassesGroup = new THREE.Group();
    const lensLight = new THREE.PointLight(0xff6600, lensIntensity, 5);
    lensLight.position.set(0, 0, 3.5);
    glassesGroup.add(lensLight);

    scene.add(glassesGroup);

    // Marquee text
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/Orbitron_Regular.json", (font) => {
      const textGeometry = new TextGeometry("The Teleporter", {
        font,
        size: 0.3,
        height: 0.05,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(textColor),
        emissive: 0xff4500,
        emissiveIntensity: 0.5,
        shininess: 100,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-5, -1, 1.5);
      glassesGroup.add(textMesh);
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = cameraZoom;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;

    const animate = () => {
      lensLight.intensity = lensIntensity;
      camera.position.z = cameraZoom;
      headMaterial.color.set(headColor);

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, [headColor, metalness, roughness, clearcoat, lensIntensity, textColor, cameraZoom]);

  return (
    <div className="relative">
      <Leva collapsed />
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-10" />
      {/* Back to Black Labs */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back to Lab
      </Link>
      {/* Source Code */}
      <a
        href="https://github.com/theteleporter/lab"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h7.5m-7.5 6h7.5m-7.5 6h7.5m-10.5-6H5.25m3.75-6H5.25m3.75 12H5.25"
          />
        </svg>
        Source
      </a>
    </div>
  );
};

export default Teleball;