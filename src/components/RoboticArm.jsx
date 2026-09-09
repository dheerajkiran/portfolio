import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Damped-spring integrator: gives each joint real mass/inertia instead of a
// fixed per-frame lerp, so motion accelerates, overshoots slightly, and
// settles the way a physical linkage would rather than snapping to target.
function stepSpring(spring, target, stiffness, damping, dt) {
  const accel = (target - spring.value) * stiffness - spring.vel * damping
  spring.vel += accel * dt
  spring.value += spring.vel * dt
}

const METAL = {
  color: '#2a3444',
  metalness: 0.75,
  roughness: 0.3,
  emissive: '#0a3d3a',
  emissiveIntensity: 0.25,
}

const METAL_LIGHT = {
  color: '#3a4658',
  metalness: 0.7,
  roughness: 0.32,
  emissive: '#0a3d3a',
  emissiveIntensity: 0.25,
}

const GLOW = '#5eead4'

function JointRing({ radius = 0.24 }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 12, 32]} />
      <meshStandardMaterial
        color={GLOW}
        emissive={GLOW}
        emissiveIntensity={1.6}
        toneMapped={false}
      />
    </mesh>
  )
}

function Link({ length = 1.4, radius = 0.14 }) {
  return (
    <mesh position={[0, length / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius * 0.85, length, 20]} />
      <meshStandardMaterial {...METAL_LIGHT} />
    </mesh>
  )
}

const RoboticArm = forwardRef(function RoboticArm(props, forwardedEyeRef) {
  const base = useRef()
  const shoulder = useRef()
  const elbow = useRef()
  const wrist = useRef()
  const eyeCore = useRef()

  useImperativeHandle(forwardedEyeRef, () => eyeCore.current, [])

  // Rest pose + spring state per joint. Stiffness/damping rise down the
  // chain (heavy base -> lively wrist), and each joint borrows a slice of
  // its parent's velocity so a quick mouse move whips down the arm instead
  // of every joint reacting in perfect lockstep.
  const springs = useRef({
    base: { value: 0, vel: 0 },
    shoulder: { value: -0.55, vel: 0 },
    elbow: { value: 0.9, vel: 0 },
    wristZ: { value: -0.45, vel: 0 },
    wristY: { value: 0, vel: 0 },
  })

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30)
    const t = state.clock.getElapsedTime()
    const px = state.pointer.x
    const py = state.pointer.y
    const s = springs.current

    const baseTarget = Math.sin(t * 0.15) * 0.35 + px * 0.5
    stepSpring(s.base, baseTarget, 3.2, 3.6, dt)

    const shoulderTarget = -0.55 + Math.sin(t * 0.3) * 0.07 - py * 0.1
    stepSpring(s.shoulder, shoulderTarget, 6, 4.4, dt)

    const elbowTarget = 0.9 + Math.sin(t * 0.4 + 1.3) * 0.1 + s.shoulder.vel * 0.12
    stepSpring(s.elbow, elbowTarget, 10, 4.6, dt)

    const wristZTarget = -0.45 + Math.sin(t * 0.5 + 0.4) * 0.14 + py * 0.18 + s.elbow.vel * 0.1
    stepSpring(s.wristZ, wristZTarget, 16, 5, dt)

    const wristYTarget = px * 0.45 + s.shoulder.vel * 0.05
    stepSpring(s.wristY, wristYTarget, 14, 4.6, dt)

    if (base.current) base.current.rotation.y = s.base.value
    if (shoulder.current) shoulder.current.rotation.z = s.shoulder.value
    if (elbow.current) elbow.current.rotation.z = s.elbow.value
    if (wrist.current) {
      wrist.current.rotation.z = s.wristZ.value
      wrist.current.rotation.y = s.wristY.value
    }
    if (eyeCore.current) {
      const pulse = 1.4 + Math.sin(t * 2) * 0.5
      eyeCore.current.material.emissiveIntensity = pulse
    }
  })

  return (
    <group {...props}>
      {/* pedestal */}
      <mesh position={[0, -1.55, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.62, 0.72, 0.3, 32]} />
        <meshStandardMaterial {...METAL} />
      </mesh>
      <mesh position={[0, -1.36, 0]}>
        <torusGeometry args={[0.63, 0.015, 8, 48]} />
        <meshStandardMaterial color={GLOW} emissive={GLOW} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>

      {/* base rotates on Y */}
      <group ref={base} position={[0, -1.4, 0]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.5, 0.42, 24]} />
          <meshStandardMaterial {...METAL_LIGHT} />
        </mesh>

        {/* shoulder */}
        <group ref={shoulder} position={[0, 0.44, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial {...METAL} />
          </mesh>
          <JointRing radius={0.25} />
          <Link length={1.2} radius={0.15} />

          {/* elbow */}
          <group ref={elbow} position={[0, 1.2, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.18, 24, 24]} />
              <meshStandardMaterial {...METAL} />
            </mesh>
            <JointRing radius={0.2} />
            <Link length={0.95} radius={0.115} />

            {/* wrist */}
            <group ref={wrist} position={[0, 0.95, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.14, 20, 20]} />
                <meshStandardMaterial {...METAL} />
              </mesh>
              <JointRing radius={0.16} />

              {/* sensor head / end effector */}
              <group position={[0, 0.32, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.12, 0.16, 0.26, 20]} />
                  <meshStandardMaterial {...METAL_LIGHT} />
                </mesh>
                <mesh position={[0, 0.22, 0]}>
                  <sphereGeometry args={[0.16, 24, 24]} />
                  <meshStandardMaterial {...METAL} />
                </mesh>
                <mesh position={[0, 0.22, 0.13]} ref={eyeCore}>
                  <sphereGeometry args={[0.075, 20, 20]} />
                  <meshStandardMaterial
                    color={GLOW}
                    emissive={GLOW}
                    emissiveIntensity={1.4}
                    toneMapped={false}
                  />
                </mesh>
                <mesh position={[0, 0.22, 0.13]}>
                  <torusGeometry args={[0.11, 0.012, 8, 32]} />
                  <meshStandardMaterial color={GLOW} emissive={GLOW} emissiveIntensity={1} toneMapped={false} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
})

export default RoboticArm
