import * as THREE from 'three/webgpu'
import { Canvas, extend } from '@react-three/fiber'
import type { ThreeToJSXElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

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

        <OrbitControls makeDefault />
      </Canvas>

      <div className="hud">drag to orbit, scroll to zoom</div>
    </>
  )
}
