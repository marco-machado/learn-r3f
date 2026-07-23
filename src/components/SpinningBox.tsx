import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

type SpinningBoxProps = {
  position?: [number, number, number]
  color?: string
}

export function SpinningBox({
  position = [0, 0, 0],
  color = '#f97316',
}: SpinningBoxProps) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  // Runs once per rendered frame; delta keeps the speed frame-rate independent.
  useFrame((_state, delta) => {
    mesh.current.rotation.x += delta * 0.4
    mesh.current.rotation.y += delta * 0.6
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={active ? 1.4 : 1}
      castShadow
      receiveShadow
      onClick={() => setActive((value) => !value)}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? '#ffffff' : color}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  )
}
