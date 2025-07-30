import { useThree } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"

export default function Grid() {
  const { viewport } = useThree()
  const columns = 24
  const columnWidth = viewport.width / columns
  const verticalLines = []

  // Create vertical grid lines
  for (let i = 0; i <= columns; i++) {
    const x = i * columnWidth - viewport.width / 2
    verticalLines.push(
      <Line
        key={`v-${i}`}
        points={[
          [x, viewport.height / 2, 0],
          [x, -viewport.height * 5, 0],
        ]}
        color="#38354F"
        opacity={0.1}
        transparent
        lineWidth={1}
      />
    )
  }

  return <group>{verticalLines}</group>
}
