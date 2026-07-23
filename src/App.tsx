import * as THREE from 'three/webgpu'
import { Canvas, extend } from '@react-three/fiber'
import type { ThreeToJSXElements } from '@react-three/fiber'
import { CameraControls, Environment, Lightformer } from '@react-three/drei'
import { Agent } from './components/Agent'

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
}

extend(THREE as never)

export default function App() {
  return (
    <>
      {/* "percentage" = PCF shadows; three 185 deprecated the PCFSoft default. */}
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [4, 3, 6], fov: 50 }}
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

        <Agent position={[0, 0, 0]} />

        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1b1b22" roughness={0.9} />
        </mesh>

        <CameraControls makeDefault />
      </Canvas>

      <div className="hud">drag to orbit, scroll to zoom</div>
    </>
  )
}
