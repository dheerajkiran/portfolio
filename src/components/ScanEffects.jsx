import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GLOW = '#5eead4'
const UP = new THREE.Vector3(0, 1, 0)

export default function ScanEffects({
  eyeRef,
  floorY = -1.35,
  originXZ = [0.9, 0],
  minRadius = 0.6,
  maxRadius = 2.3,
}) {
  const beamRef = useRef()
  const coreRef = useRef()
  const reticleRef = useRef()
  const ringOuterRef = useRef()
  const ringInnerRef = useRef()

  const vEye = useMemo(() => new THREE.Vector3(), [])
  const vTarget = useMemo(() => new THREE.Vector3(), [])
  const vDir = useMemo(() => new THREE.Vector3(), [])
  const vDirNorm = useMemo(() => new THREE.Vector3(), [])
  const vMid = useMemo(() => new THREE.Vector3(), [])
  const quat = useMemo(() => new THREE.Quaternion(), [])
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), -floorY), [floorY])

  useFrame((state) => {
    if (!eyeRef.current) return
    eyeRef.current.getWorldPosition(vEye)

    const t = state.clock.getElapsedTime()
    const ndcX = THREE.MathUtils.clamp(state.pointer.x + Math.sin(t * 0.25) * 0.12, -1, 1)
    const ndcY = THREE.MathUtils.clamp(state.pointer.y + Math.cos(t * 0.2) * 0.06, -1, 1)

    raycaster.setFromCamera({ x: ndcX, y: ndcY }, state.camera)
    const hit = raycaster.ray.intersectPlane(plane, vTarget)
    if (!hit) return

    const dx = vTarget.x - originXZ[0]
    const dz = vTarget.z - originXZ[1]
    let dist = Math.sqrt(dx * dx + dz * dz)
    if (dist < 1e-4) dist = 1e-4
    const clamped = THREE.MathUtils.clamp(dist, minRadius, maxRadius)
    const s = clamped / dist
    vTarget.x = originXZ[0] + dx * s
    vTarget.z = originXZ[1] + dz * s
    vTarget.y = floorY

    vDir.subVectors(vTarget, vEye)
    const length = vDir.length()
    vDirNorm.copy(vDir).normalize()
    vMid.addVectors(vEye, vTarget).multiplyScalar(0.5)
    quat.setFromUnitVectors(UP, vDirNorm)

    if (beamRef.current) {
      beamRef.current.position.copy(vMid)
      beamRef.current.quaternion.copy(quat)
      beamRef.current.scale.set(1, length, 1)
    }
    if (coreRef.current) {
      coreRef.current.position.copy(vMid)
      coreRef.current.quaternion.copy(quat)
      coreRef.current.scale.set(1, length, 1)
    }
    if (reticleRef.current) {
      reticleRef.current.position.set(vTarget.x, floorY + 0.015, vTarget.z)
      const pulse = (Math.sin(t * 1.6) + 1) / 2
      reticleRef.current.scale.setScalar(0.85 + pulse * 0.25)
    }
    if (ringOuterRef.current) ringOuterRef.current.rotation.z = t * 0.4
    if (ringInnerRef.current) ringInnerRef.current.rotation.z = -t * 0.6
  })

  return (
    <>
      <mesh ref={beamRef} renderOrder={1}>
        <cylinderGeometry args={[0.16, 0.012, 1, 24, 1, true]} />
        <meshBasicMaterial
          color={GLOW}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={coreRef} renderOrder={1}>
        <cylinderGeometry args={[0.006, 0.006, 1, 8]} />
        <meshBasicMaterial
          color={GLOW}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <group ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <mesh ref={ringOuterRef}>
          <ringGeometry args={[0.2, 0.22, 48]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.55} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh ref={ringInnerRef}>
          <ringGeometry args={[0.09, 0.105, 32]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.9} toneMapped={false} />
        </mesh>
      </group>
    </>
  )
}
