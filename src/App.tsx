import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, OrbitControls } from '@react-three/drei'
import { SpinningBox } from './components/SpinningBox'

export default function App() {
  return (
    <>
      {/* "percentage" = PCF shadows; three 185 deprecated the PCFSoft default. */}
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ position: [4, 3, 6], fov: 50 }}
      >
        <color attach="background" args={['#101014']} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <SpinningBox position={[-1.6, 0.75, 0]} color="#f97316" />
        <SpinningBox position={[1.6, 0.75, 0]} color="#38bdf8" />

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.55}
          scale={14}
          blur={2.4}
          far={5}
        />
        <Grid
          infiniteGrid
          cellSize={0.5}
          sectionSize={2.5}
          cellColor="#2a2a33"
          sectionColor="#3f3f4d"
          fadeDistance={28}
          fadeStrength={1.5}
        />

        <OrbitControls makeDefault />
      </Canvas>

      <div className="hud">drag to orbit, scroll to zoom, click a cube</div>
    </>
  )
}
