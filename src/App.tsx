import { useRef } from 'react'
import * as THREE from 'three/webgpu'
import { Canvas, extend } from '@react-three/fiber'
import type { ThreeToJSXElements } from '@react-three/fiber'
import { CameraControls, Environment, Lightformer } from '@react-three/drei'
import { Agent } from './components/Agent'
import { CompassDial, CompassTracker } from './components/Compass'
import { CameraStatsPanel, CameraStatsTracker } from './components/CameraStats'

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as never)

export default function App() {
  const compassNeedleRef = useRef<HTMLDivElement>(null)
  const compassAngleRef = useRef<HTMLSpanElement>(null)
  const cameraStatsRefs = {
    x: useRef<HTMLSpanElement>(null),
    y: useRef<HTMLSpanElement>(null),
    z: useRef<HTMLSpanElement>(null),
    distance: useRef<HTMLSpanElement>(null),
    fov: useRef<HTMLSpanElement>(null),
  }

  return (
    <>
      {/* "percentage" = PCF shadows; three 185 deprecated the PCFSoft default. */}
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [0, 3, 6], fov: 50 }}
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as never)
          await renderer.init()
          return renderer
        }}
      >
        <color attach="background" args={['#101014']} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2} color="#e8e8ef" position={[0, 5, -5]} scale={[10, 10]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1} color="#8fb4ff" position={[-5, 3, 3]} scale={[6, 6]} target={[0, 0, 0]} />
          <Lightformer form="rect" intensity={1} color="#ffb98f" position={[5, 3, 3]} scale={[6, 6]} target={[0, 0, 0]} />
        </Environment>

        <Agent position={[0, 0, 0]} proceduralIdle />

        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1b1b22" roughness={0.9} />
        </mesh>

        <CameraControls makeDefault minDistance={2} maxDistance={15} />

        <CompassTracker needleRef={compassNeedleRef} angleRef={compassAngleRef} />
        <CameraStatsTracker {...cameraStatsRefs} />
      </Canvas>

      <div className="hud">drag to orbit, scroll to zoom</div>
      <CompassDial needleRef={compassNeedleRef} angleRef={compassAngleRef} />
      <CameraStatsPanel {...cameraStatsRefs} />
    </>
  )
}
