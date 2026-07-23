import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { Group } from 'three'

type AgentProps = {
  position?: [number, number, number]
}

export function Agent({ position = [0, 0, 0] }: AgentProps) {
  const group = useRef<Group>(null!)
  const { scene, animations } = useGLTF('/models/agent.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    firstAction?.reset().play()
    return () => {
      firstAction?.stop()
    }
  }, [actions])

  return <primitive ref={group} object={scene} position={position} />
}

useGLTF.preload('/models/agent.glb')
