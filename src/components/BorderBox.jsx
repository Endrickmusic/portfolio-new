// BorderBox.jsx
import { useMemo } from "react"
import fragmentShader from "./fragment.glsl?raw"
import vertexShader from "./vertex.glsl?raw"

export default function BorderBox({
  width,
  height,
  border = 0.02,
  roundness = 0.1,
  color = "black",
  position = [0, 0, 0],
  zOffset = 0,
}) {
  const uniforms = useMemo(
    () => ({
      width: { value: width },
      height: { value: height },
      border: { value: border },
      roundness: { value: roundness },
      borderColor: { value: Array.isArray(color) ? color : null },
    }),
    [width, height, border, roundness, color]
  )

  return (
    <mesh position={[position[0], position[1], position[2] + zOffset]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        toneMapped={false}
        uniforms={{
          ...uniforms,
          borderColor: { value: Array.isArray(color) ? color : [0, 0, 0] },
        }}
      />
    </mesh>
  )
}
