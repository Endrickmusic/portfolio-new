// TextWithBorder.jsx
import { Text } from "@react-three/drei"
import { useCallback, useMemo, useRef, useEffect } from "react"
import * as THREE from "three"
import { borderVertex, borderFragment } from "../shaders/border.jsx"

export default function TextWithBorder({
  children,
  font,
  fontSize = 0.25,
  color = "black",
  borderColor = [0, 0, 0],
  padding = 0.2,
  border = 0.01,
  roundness = 0.1,
  position = [0, 0, 0],
  planeZ = 0.0,
  textZ = 0.01,
  anchorX = "center",
  anchorY = "middle",
  paddingXMult = 1.0,
  paddingYMult = 1.0,
  paddingX = undefined,
  paddingY = undefined,
  minWidth = 0.0,
  minHeight = 0.0,
}) {
  const textSize = useRef({ width: 0, height: 0 })

  // Stable uniforms object; update .value fields instead of replacing the object
  const uniforms = useRef({
    width: { value: 1 },
    height: { value: 0.7 },
    border: { value: border },
    roundness: { value: roundness },
    borderColor: {
      value: Array.isArray(borderColor)
        ? borderColor
        : new THREE.Color(borderColor).toArray(),
    },
  }).current

  // Update uniforms when controls change
  useEffect(() => {
    uniforms.border.value = border
  }, [border, uniforms])

  useEffect(() => {
    uniforms.roundness.value = roundness
  }, [roundness, uniforms])

  useEffect(() => {
    uniforms.borderColor.value = Array.isArray(borderColor)
      ? borderColor
      : new THREE.Color(borderColor).toArray()
  }, [borderColor, uniforms])

  const updateFromSize = useCallback(() => {
    // Prefer explicit paddingX/paddingY if provided; otherwise fall back to legacy padding * multipliers
    const horizPadding =
      paddingX !== undefined
        ? Math.max(0, paddingX)
        : padding * Math.max(0, paddingXMult)
    const vertPadding =
      paddingY !== undefined
        ? Math.max(0, paddingY)
        : padding * Math.max(0, paddingYMult)

    const computedW = textSize.current.width + horizPadding * 2
    const computedH = textSize.current.height + vertPadding * 2
    const w = Math.max(minWidth, computedW)
    const h = Math.max(minHeight, computedH)
    uniforms.width.value = Math.max(0.0001, w)
    uniforms.height.value = Math.max(0.0001, h)
  }, [
    padding,
    paddingXMult,
    paddingYMult,
    paddingX,
    paddingY,
    minWidth,
    minHeight,
    uniforms,
  ])

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
