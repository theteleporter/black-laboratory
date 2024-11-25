import { Canvas, extend, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial, Torus, Sphere, TorusKnot, Html } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const HolographicShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec3 color1 = vec3(0.0, 1.0, 1.0);
      vec3 color2 = vec3(1.0, 0.0, 1.0);
      vec3 color3 = vec3(1.0, 1.0, 0.0);
      
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      
      vec3 color = mix(color1, color2, vUv.x);
      color = mix(color, color3, vUv.y);
      
      float alpha = 0.7 + 0.3 * sin(time + noise * 10.0);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
)

const PulsatingShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0, 2, 4));
      float alpha = 0.5 + 0.5 * sin(time * 2.0);
      gl_FragColor = vec4(color, alpha);
    }
  `
)

const ToonShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    varying vec3 vNormal;
    
    void main() {
      vec3 light = vec3(sin(time) * 0.5 + 0.5, cos(time) * 0.5 + 0.5, 1.0);
      light = normalize(light);
      
      float dProd = max(0.0, dot(vNormal, light));
      
      vec3 color = vec3(0.3, 0.6, 0.8);
      
      if (dProd > 0.95) {
        color *= 1.0;
      } else if (dProd > 0.5) {
        color *= 0.7;
      } else if (dProd > 0.25) {
        color *= 0.4;
      } else {
        color *= 0.2;
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

const StandardShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vec3 light = vec3(sin(time) * 0.5 + 0.5, cos(time) * 0.5 + 0.5, 1.0);
      light = normalize(light);
      
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-light, vNormal);
      
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
      float diff = max(dot(vNormal, light), 0.0);
      
      vec3 color = vec3(0.8, 0.3, 0.3);
      vec3 ambient = 0.1 * color;
      vec3 diffuse = diff * color;
      vec3 specular = spec * vec3(0.5);
      
      gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
    }
  `
)

extend({ HolographicShaderMaterial, PulsatingShaderMaterial, ToonShaderMaterial, StandardShaderMaterial })

const HolographicMaterial = () => {
  const materialRef = useRef()
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime()
    }
  })
  return <holographicShaderMaterial ref={materialRef} transparent />
}

const PulsatingMaterial = () => {
  const materialRef = useRef()
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime()
    }
  })
  return <pulsatingShaderMaterial ref={materialRef} transparent />
}

const ToonMaterial = () => {
  const materialRef = useRef()
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime()
    }
  })
  return <toonShaderMaterial ref={materialRef} />
}

const StandardMaterial = () => {
  const materialRef = useRef()
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime()
    }
  })
  return <standardShaderMaterial ref={materialRef} />
}

const Shape1 = ({ material: Material }) => (
  <Torus args={[0.5, 0.2, 16, 100]}>
    <Material />
  </Torus>
)

const Shape2 = ({ material: Material }) => (
  <mesh>
    <sphereGeometry args={[0.7, 32, 16]} />
    <Material />
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.7, 0.02, 16, 100]} />
      <Material />
    </mesh>
  </mesh>
)

const Shape3 = ({ material: Material }) => {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(0.5, 0, 0),
  ])
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.1, 8, false]} />
      <Material />
    </mesh>
  )
}

const Shape4 = ({ material: Material }) => (
  <Sphere args={[0.7, 32, 32]}>
    <Material />
  </Sphere>
)

const Shape5 = ({ material: Material }) => (
  <TorusKnot args={[0.5, 0.15, 100, 16]}>
    <Material />
  </TorusKnot>
)

const Shape6 = ({ material: Material }) => (
  <mesh>
    <torusGeometry args={[0.6, 0.2, 16, 100]} />
    <Material />
  </mesh>
)

const Shape7 = ({ material: Material }) => {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.5, -0.5, 0),
    new THREE.Vector3(0, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
  ])
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.1, 8, false]} />
      <Material />
    </mesh>
  )
}

const Shape8 = ({ material: Material }) => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[0.6, 0.2, 16, 100]} />
    <Material />
  </mesh>
)

const Shape9 = ({ material: Material }) => (
  <mesh>
    <torusGeometry args={[0.6, 0.05, 16, 100]} />
    <Material />
  </mesh>
)

const Shape10 = ({ material: Material }) => (
  <mesh>
    <sphereGeometry args={[0.7, 32, 32]} />
    <Material />
    <mesh position={[0, 0, 0.7]} scale={0.2}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <Material />
    </mesh>
  </mesh>
)

const Shape11 = ({ material: Material }) => (
  <group>
    <Sphere args={[0.3, 32, 32]} position={[-0.4, 0, 0]}>
      <Material />
    </Sphere>
    <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
      <Material />
    </Sphere>
    <Sphere args={[0.3, 32, 32]} position={[0.4, 0, 0]}>
      <Material />
    </Sphere>
  </group>
)

const Shape12 = ({ material: Material }) => (
  <mesh>
    <coneGeometry args={[0.5, 1, 32]} />
    <Material />
  </mesh>
)

const Shape13 = ({ material: Material }) => (
  <group>
    <Torus args={[0.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <Material />
    </Torus>
    <Torus args={[0.5, 0.1, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
      <Material />
    </Torus>
    <Torus args={[0.5, 0.1, 16, 100]}>
      <Material />
    </Torus>
  </group>
)

const Shape14 = ({ material: Material }) => (
  <group>
    {[...Array(10)].map((_, i) => (
      <Sphere key={i} args={[0.2, 32, 32]} position={[
        Math.cos(i / 5 * Math.PI) * 0.5,
        Math.sin(i / 5 * Math.PI) * 0.5,
        0
      ]}>
        <Material />
      </Sphere>
    ))}
  </group>
)

const Shape15 = ({ material: Material }) => (
  <group rotation={[Math.PI / 4, 0, 0]}>
    <Torus args={[0.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <Material />
    </Torus>
    <Torus args={[0.5, 0.1, 16, 100]}>
      <Material />
    </Torus>
  </group>
)

const ShapeWrapper = ({ children }) => {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.5
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })
  return <group ref={ref}>{children}</group>
}

const MaterialButton = ({ onClick, active, children }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1 m-1 text-xs sm:text-sm
      ${active 
        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
        : 'bg-gradient-to-r from-cyan-500 to-blue-500'
      }
      text-white font-bold rounded-full
      transition-all duration-300 ease-in-out
      transform hover:scale-105 hover:shadow-lg
      focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50
      ${active ? 'ring-2 ring-white ring-opacity-60 scale-105' : ''}
      border border-cyan-300 border-opacity-50
    `}
    style={{
      textShadow: '0 0 5px rgba(0, 255, 255, 0.7)',
      boxShadow: `0 0 10px rgba(0, 255, 255, 0.3), 
                  inset 0 0 5px rgba(255, 255, 255, 0.5)`,
    }}
  >
    {children}
  </button>
)

const Scene = () => {
  const [activeMaterial, setActiveMaterial] = useState('holographic')
  const shapes = [
    Shape1, Shape2, Shape3, Shape4, Shape5,
    Shape6, Shape7, Shape8, Shape9, Shape10,
    Shape11, Shape12, Shape13, Shape14, Shape15
  ]

  const materials = {
    holographic: HolographicMaterial,
    pulsating: PulsatingMaterial,
    toon: ToonMaterial,
    standard: StandardMaterial,
  }

  return (
    <>
      {shapes.map((Shape, index) => (
        <group key={index} position={[
          ((index % 5) - 2) * 2.5,
          (Math.floor(index / 5) - 1) * 2.5,
          0
        ]}>
          <ShapeWrapper>
            <Shape material={materials[activeMaterial]} />
          </ShapeWrapper>
        </group>
      ))}
      <Html fullscreen>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center flex-wrap px-4">
          <MaterialButton
            onClick={() => setActiveMaterial('holographic')}
            active={activeMaterial === 'holographic'}
          >
            Holographic
          </MaterialButton>
          <MaterialButton
            onClick={() => setActiveMaterial('pulsating')}
            active={activeMaterial === 'pulsating'}
          >
            Pulsating
          </MaterialButton>
          <MaterialButton
            onClick={() => setActiveMaterial('toon')}
            active={activeMaterial === 'toon'}
          >
            Toon
          </MaterialButton>
          <MaterialButton
            onClick={() => setActiveMaterial('standard')}
            active={activeMaterial === 'standard'}
          >
            Standard
          </MaterialButton>
        </div>
      </Html>
    </>
  )
}

export default function Page() {
  return (
    <div className="w-screen h-screen relative">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  )
}
