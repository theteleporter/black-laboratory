"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import gsap from "gsap";
import { Leva, useControls } from "leva";

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
      textMesh.material.color.set(textColor);

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
    <>
      <Leva collapsed />
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-10" />
    </>
  );
};

export default Teleball;
