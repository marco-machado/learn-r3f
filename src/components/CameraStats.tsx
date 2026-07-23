import type { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'

type CameraStatsRefs = {
  x: RefObject<HTMLSpanElement | null>
  y: RefObject<HTMLSpanElement | null>
  z: RefObject<HTMLSpanElement | null>
  distance: RefObject<HTMLSpanElement | null>
  fov: RefObject<HTMLSpanElement | null>
}

// Renders nothing — runs inside <Canvas> to read the camera each frame and drive the HUD readout.
export function CameraStatsTracker({ x, y, z, distance, fov }: CameraStatsRefs) {
  useFrame(({ camera }) => {
    if (x.current) x.current.textContent = camera.position.x.toFixed(1)
    if (y.current) y.current.textContent = camera.position.y.toFixed(1)
    if (z.current) z.current.textContent = camera.position.z.toFixed(1)
    if (distance.current) distance.current.textContent = camera.position.length().toFixed(1)
    if (fov.current) fov.current.textContent = (camera as PerspectiveCamera).fov.toFixed(0)
  })

  return null
}

export function CameraStatsPanel({ x, y, z, distance, fov }: CameraStatsRefs) {
  return (
    <div className="camera-stats">
      <div>
        x <span ref={x} />m
      </div>
      <div>
        y <span ref={y} />m
      </div>
      <div>
        z <span ref={z} />m
      </div>
      <div>
        dist <span ref={distance} />m
      </div>
      <div>
        fov <span ref={fov} />°
      </div>
    </div>
  )
}
