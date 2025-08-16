import { useThree } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"
import { useControls } from "leva"

export default function Grid() {
  const { viewport } = useThree()
  const columns = 24

  // Leva controls for side padding and gaps (world units)
  const { sidePadding, columnGap } = useControls(
    "Grid",
    {
      sidePadding: {
        value: 0.1,
        min: 0.0,
        max: 1.0, // Removed viewport multiplication - now applied in component
        step: 0.01,
      },
      columnGap: {
        value: 19.0,
        min: 1.0,
        max: 25.0,
        step: 0.1,
      },
    },
    {
      collapsed: true,
    }
  )

  const fullWidth = viewport.width
  const actualSidePadding = sidePadding * viewport.width // Apply viewport multiplication here
  const innerWidth = Math.max(0, fullWidth - actualSidePadding * 2)

  // For N columns there are N-1 gaps between them
  const gaps = Math.max(0, columns - 1)
  // const segmentWidth = Math.max(0, (innerWidth - columnGap * gaps) / columns)
  const segmentWidth = Math.max(0, innerWidth / columns)

  const lines = []

  // Solid gray padding areas (no gradient) on left/right
  const startX = -fullWidth / 2 + actualSidePadding
  const endX = fullWidth / 2 - actualSidePadding
  const padHeight = viewport.height * 6
  const padZ = 0

  lines.push(
    <mesh
      key="pad-left"
      position={[-fullWidth / 2 + actualSidePadding * 0.5, 0, padZ]}
    >
      <planeGeometry args={[actualSidePadding, padHeight]} />
      <meshBasicMaterial color="#f0f0f0" />
    </mesh>,
    <mesh
      key="pad-right"
      position={[fullWidth / 2 - actualSidePadding * 0.5, 0, padZ]}
    >
      <planeGeometry args={[actualSidePadding, padHeight]} />
      <meshBasicMaterial color="#f0f0f0" />
    </mesh>
  )

  // Vertical grid lines within padded area (N+1 lines for N columns)
  let x = startX
  lines.push(
    <Line
      key={`v-0`}
      points={[
        [x, viewport.height / 2, 0],
        [x, -viewport.height * 5, 0],
      ]}
      color="#38354F"
      opacity={0.1}
      transparent
      lineWidth={10.0}
    />
  )

  for (let col = 0; col < columns; col++) {
    // advance by column width
    x += segmentWidth
    lines.push(
      <Line
        key={`v-${col + 1}`}
        points={[
          [x, viewport.height / 2, 0],
          [x, -viewport.height * 5, 0],
        ]}
        color="#38354F"
        opacity={0.1}
        transparent
        lineWidth={columnGap}
      />
    )
  }

  return <group>{lines}</group>
}
