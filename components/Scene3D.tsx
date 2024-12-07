import { Canvas } from '@react-three/fiber'
import { Text3D, OrbitControls, PerspectiveCamera, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import styles from '../page.module.css'

function FloatingText() {
  const textRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Text3D
      ref={textRef}
      font="/fonts/helvetiker_bold.typeface.json"
      size={viewport.width * 0.05}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
    >
      We are so back
      <meshPhongMaterial color="#FFD700" specular="#FFF" shininess={100} />
    </Text3D>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.075
    }
  })

  const particleCount = 5000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color="#FFD700" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export default function Scene3D() {
  return (
    <>
      <Canvas className={styles.canvas}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <FloatingText />
        <ParticleField />
        <Sphere args={[1, 64, 64]}>
          <meshPhongMaterial color="#4B0082" specular="#FFF" shininess={100} opacity={0.1} transparent />
        </Sphere>
      </Canvas>
      <div className={styles.overlay}>
        <h1 className={styles.title}>We are so back</h1>
        <p className={styles.subtitle}>Experience the future</p>
      </div>
    </>
  )
}

