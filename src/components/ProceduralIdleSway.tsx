import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Euler, type Bone } from 'three'

type ProceduralIdleSwayProps = {
  head?: Bone
  pelvis?: Bone
}

// Sample procedural animation: mutates bone rotations directly each frame (no baked
// AnimationClip involved), the way the old SpinningBox mutated mesh.rotation in useFrame.
export function ProceduralIdleSway({ head, pelvis }: ProceduralIdleSwayProps) {
  const headRest = useRef<Euler | null>(null)
  const pelvisRest = useRef<Euler | null>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    if (head) {
      headRest.current ??= head.rotation.clone()
      head.rotation.y = headRest.current.y + Math.sin(t * 0.6) * 0.15
      head.rotation.x = headRest.current.x + Math.sin(t * 0.9) * 0.05
    }

    if (pelvis) {
      pelvisRest.current ??= pelvis.rotation.clone()
      pelvis.rotation.z = pelvisRest.current.z + Math.sin(t * 1.2) * 0.03
    }
  })

  return null
}
