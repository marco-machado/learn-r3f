import type { RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

// World compass convention (top-down map orientation): north is -Z, east is +X, south is +Z, west is -X.
const forward = new Vector3()

type CompassTrackerProps = {
  needleRef: RefObject<HTMLDivElement | null>
}

// Renders nothing — runs inside <Canvas> to read the camera each frame and drive the HUD dial.
export function CompassTracker({ needleRef }: CompassTrackerProps) {
  useFrame(({ camera }) => {
    camera.getWorldDirection(forward)
    // Camera heading from north, clockwise (0 = facing north, PI/2 = facing east).
    const heading = Math.atan2(forward.x, -forward.z)
    if (needleRef.current) {
      needleRef.current.style.transform = `rotate(${-heading}rad)`
    }
  })

  return null
}

type CompassDialProps = {
  needleRef: RefObject<HTMLDivElement | null>
}

export function CompassDial({ needleRef }: CompassDialProps) {
  return (
    <div className="compass">
      <div className="compass-dial" ref={needleRef}>
        <span className="compass-n">N</span>
        <span className="compass-e">E</span>
        <span className="compass-s">S</span>
        <span className="compass-w">W</span>
      </div>
      <div className="compass-marker" />
    </div>
  )
}
