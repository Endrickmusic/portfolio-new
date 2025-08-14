// TextWithBorder.jsx
import { Text } from "@react-three/drei"
import { useCallback, useMemo, useRef, useEffect } from "react"
import { borderVertex, borderFragment } from "../shaders/border.jsx"

export default function TextWithBorder({
  children,
  font,
  fontSize = 0.25,
  color = "black",
  borderColor = [0, 0, 0],
  padding = 0.06,
  border = 0.02,
  roundness = 0.1,
  position = [0, 0, 0],
  planeZ = 0.0,
  textZ = 0.01,
  anchorX = "center",
  anchorY = "middle",
}) {
  const textSize = useRef({ width: 0, height: 0 })

  const uniforms = useMemo(
    () => ({
      width: { value: 1 },
      height: { value: 1 },
      border: { value: border },
      roundness: { value: roundness },
      borderColor: { value: borderColor },
    }),
    [border, roundness, borderColor]
  )

  const updateFromSize = useCallback(() => {
    const w = textSize.current.width * 2 + padding * 2
    const h = textSize.current.height * 1.5 + padding * 2
    uniforms.width.value = w
    uniforms.height.value = h
    uniforms.border.value = border
    uniforms.roundness.value = roundness
  }, [padding, border, roundness, uniforms])

  const onSync = useCallback(
    (mesh) => {
      if (!mesh?.geometry) return
      mesh.geometry.computeBoundingBox()
      const b = mesh.geometry.boundingBox
      textSize.current = { width: b.max.x - b.min.x, height: b.max.y - b.min.y }
      updateFromSize()
    },
    [updateFromSize]
  )

  useEffect(() => {
    updateFromSize()
  }, [updateFromSize])

  return (
    <group position={position}>
      <mesh position={[0, 0, planeZ]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={borderVertex}
          fragmentShader={borderFragment}
          transparent
          depthWrite={false}
          toneMapped={false}
          uniforms={uniforms}
          alphaTest={0.001}
        />
      </mesh>

      <Text
        position={[0, 0, textZ]}
        color={color}
        font={font}
        fontSize={fontSize}
        anchorX={anchorX}
        anchorY={anchorY}
        onSync={onSync}
      >
        {children}
      </Text>
    </group>
  )
}
