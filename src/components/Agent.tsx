import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import type { Group } from 'three'

// agent.glb (Tripo-generated):
// - 1 scene, 54 nodes — a full skeletal rig (pelvis/spine/head, twin arms/legs with twist bones, hands, feet)
// - 11 meshes / 11 materials / 33 textures — a textured, multi-part mesh
// - 1 skin — skeletal (skinned) mesh, so it deforms with the bones
// - 5 animations — named generically NlaTrack, NlaTrack.001...004 (Blender's default NLA-track
//   export names, so they weren't renamed to something descriptive like "Walk"/"Idle").
//   By clip index: 0 look_around, 1 frustrated_01 (broken — visually incorrect), 2 idle, 3 walk, 4 greet_03.
const IDLE_ANIMATION_INDEX = 2

// World units represent meters. The model's native height is ~1m; this scales it to a 1.8m adult.
const NATIVE_HEIGHT_METERS = 0.9997561909258366
const TARGET_HEIGHT_METERS = 1.8
const DEFAULT_SCALE = TARGET_HEIGHT_METERS / NATIVE_HEIGHT_METERS

type AgentProps = {
  position?: [number, number, number]
  scale?: number | [number, number, number]
  animationIndex?: number
}

export function Agent({
  position = [0, 0, 0],
  scale = DEFAULT_SCALE,
  animationIndex = IDLE_ANIMATION_INDEX,
}: AgentProps) {
  const group = useRef<Group>(null!)
  const { scene, animations } = useGLTF('/models/agent.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const name = animations[animationIndex]?.name
    const action = name ? actions[name] : undefined
    action?.reset().fadeIn(0.2).play()
    return () => {
      action?.fadeOut(0.2)
    }
  }, [actions, animations, animationIndex])

  return <primitive ref={group} object={scene} position={position} scale={scale} />
}

useGLTF.preload('/models/agent.glb')
