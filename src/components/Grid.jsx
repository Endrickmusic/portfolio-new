import { useThree } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"

export default function Grid() {
  const { viewport } = useThree()
  const columns = 24
  const columnWidth = viewport.width / columns
  const lines = []

  // Create edge vertical lines
  lines.push(
    <Line
      key="v-left"
      points={[
        [-viewport.width / 2, viewport.height * 0.5, 0],
        [-viewport.width / 2, -viewport.height * 5, 0],
      ]}
      color="#38354F"
      opacity={0.1}
      transparent
      lineWidth={20.0}
    />,
    <Line
      key="v-right"
      points={[
        [viewport.width / 2, viewport.height * 0.5, 0],
        [viewport.width / 2, -viewport.height * 5, 0],
      ]}
      color="#38354F"
      opacity={0.1}
      transparent
      lineWidth={20.0}
    />
  )

  // Create vertical grid lines
  for (let i = 0; i <= columns; i++) {
    const x = i * columnWidth - viewport.width / 2
    lines.push(
      <Line
        key={`v-${i}`}
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
  }

  return <group>{lines}</group>
}
