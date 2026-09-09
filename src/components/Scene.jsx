import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Sparkles, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import RoboticArm from './RoboticArm.jsx'
import ScanEffects from './ScanEffects.jsx'

export default function Scene() {
  const armEyeRef = useRef()

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3.9, 1.4, 5.2], fov: 38 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#05070a']} />
      <fog attach="fog" args={['#05070a', 7, 15]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1.5, 4]} intensity={0.6} color="#7dd3fc" />
      <pointLight position={[-3, 2, -2]} intensity={14} color="#5eead4" distance={8} />
      <pointLight position={[2, -1, 3]} intensity={7} color="#7dd3fc" distance={8} />

      <group position={[0.9, 0.55, 0]} scale={0.8}>
        <RoboticArm ref={armEyeRef} />
      </group>

      <ScanEffects eyeRef={armEyeRef} floorY={-1.35} originXZ={[0.9, 0]} />

      <Grid
        position={[0.9, -1.35, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1b2230"
        sectionSize={2.5}
        sectionThickness={1}
        sectionColor="#5eead4"
        fadeDistance={9}
        fadeStrength={1.5}
        infiniteGrid
      />
      <ContactShadows position={[0.9, -1.34, 0]} opacity={0.55} scale={10} blur={2.2} far={3} />
      <Sparkles
        position={[0.9, -0.4, 0]}
        count={40}
        scale={[7, 2.4, 7]}
        size={2}
        speed={0.3}
        opacity={0.5}
        color="#7dd3fc"
      />

      <OrbitControls
        target={[0.9, 0.3, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 2.05}
        minAzimuthAngle={-Math.PI / 5}
        maxAzimuthAngle={Math.PI / 5}
        rotateSpeed={0.35}
        enableDamping
        dampingFactor={0.08}
      />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  )
}
