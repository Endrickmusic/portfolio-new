// TextWithBorder.jsx
import { Text } from "@react-three/drei"
import { useCallback, useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { borderVertex, borderFragment } from "../shaders/border.jsx"

export default function TextWithBorder({
  children,
  font,
  fontSize = 0.25,
  color = "#403454",
  borderColor = "#403454",
  backgroundColor = "#ffffff",
  padding = 0.2,
  border = 0.01,
  roundness = 0.1,
  position = [0, 0, 0],
  scale = 1.0,
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
  onClick,
  onPointerOver,
  onPointerOut,
}) {
  const textSize = useRef({ width: 0, height: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const planeRef = useRef()
  const [planeSize, setPlaneSize] = useState({ width: 0.5, height: 0.7 })

  // Stable uniforms object; update .value fields instead of replacing the object
  const uniforms = useRef({
    width: { value: 0.5 },
    height: { value: 0.7 },
    border: { value: border },
    roundness: { value: roundness },
    borderColor: {
      value: Array.isArray(borderColor)
        ? borderColor
        : new THREE.Color(borderColor).toArray(),
    },
    fillColor: {
      value: Array.isArray(color) ? color : new THREE.Color(color).toArray(),
    },
    fillOpacity: { value: 0.0 },
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

  useEffect(() => {
    uniforms.fillColor.value = Array.isArray(color)
      ? color
      : new THREE.Color(color).toArray()
  }, [color, uniforms])

  // Update border color uniform on hover inversion
  useEffect(() => {
    // Border ring becomes background color on hover for contrast
    const hoveredBorderColor = isHovered ? backgroundColor : borderColor
    uniforms.borderColor.value = Array.isArray(hoveredBorderColor)
      ? hoveredBorderColor
      : new THREE.Color(hoveredBorderColor).toArray()

    // Fill becomes original text color on hover; otherwise transparent
    const hoveredFillColor = isHovered ? color : [0, 0, 0]
    uniforms.fillColor.value = Array.isArray(hoveredFillColor)
      ? hoveredFillColor
      : new THREE.Color(hoveredFillColor).toArray()
    uniforms.fillOpacity.value = isHovered ? 1.0 : 0.0
  }, [isHovered, color, borderColor, backgroundColor, uniforms])

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

    // const computedW = textSize.current.width + horizPadding * 2
    const computedW = textSize.current.width * 1.45 + horizPadding
    const computedH = textSize.current.height + vertPadding * 2
    const w = Math.max(minWidth, computedW)
    const h = Math.max(minHeight, computedH)
    uniforms.width.value = Math.max(0.0001, w)
    uniforms.height.value = Math.max(0.0001, h)
    setPlaneSize({ width: w, height: h })
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

  // Handle hover state
  const handlePointerOver = useCallback(
    (event) => {
      setIsHovered(true)
      if (onPointerOver) onPointerOver(event)
    },
    [onPointerOver]
  )

  const handlePointerOut = useCallback(
    (event) => {
      setIsHovered(false)
      if (onPointerOut) onPointerOut(event)
    },
    [onPointerOut]
  )

  // Determine colors based on hover state
  const currentTextColor = isHovered ? backgroundColor : color

  // Normalize to a string for the Text component to avoid array inputs
  const currentTextColorString = Array.isArray(currentTextColor)
    ? (() => {
        const col = new THREE.Color().fromArray(currentTextColor)
        return `#${col.getHexString()}`
      })()
    : currentTextColor

  // Limit hover/click to visible area (ring or filled region)
  useEffect(() => {
    if (!planeRef.current) return
    const mesh = planeRef.current
    const originalRaycast = mesh.raycast.bind(mesh)
    function smoothstep(edge0, edge1, x) {
      const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
      return t * t * (3.0 - 2.0 * t)
    }
    mesh.raycast = function (raycaster, intersects) {
      const tmp = []
      originalRaycast(raycaster, tmp)
      for (const hit of tmp) {
        if (!hit.uv) continue
        const uvx = (hit.uv.x - 0.5) * 2.0
        const uvy = (hit.uv.y - 0.5) * 2.0
        const halfW = uniforms.width.value * 0.5
        const halfH = uniforms.height.value * 0.5
        const maxR = Math.max(0.0, Math.min(halfW, halfH) - 1e-5)
        const r = Math.min(roundness, maxR)
        // sdRoundedBox approximation in JS
        const ax = Math.abs(uvx)
        const ay = Math.abs(uvy)
        const dx = ax - halfW + r
        const dy = ay - halfH + r
        const mx = Math.max(dx, 0.0)
        const my = Math.max(dy, 0.0)
        const len = Math.hypot(mx, my)
        const md = Math.min(Math.max(dx, dy), 0.0)
        const d = len + md - r
        const aa = 0.005
        const edge = Math.abs(d)
        const ringMask = 1.0 - smoothstep(border, border + aa, edge)
        const fillMask = 1.0 - smoothstep(0.0, aa, d)
        const inside =
          ringMask > 0.2 || (uniforms.fillOpacity.value > 0.0 && fillMask > 0.2)
        if (inside) intersects.push(hit)
      }
    }
    return () => {
      mesh.raycast = originalRaycast
    }
  }, [roundness, border, uniforms])

  return (
    <group
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <mesh
        ref={planeRef}
        position={[0, 0, planeZ]}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[planeSize.width, planeSize.height]} />
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
        color={currentTextColorString}
        font={font}
        fontSize={fontSize}
        anchorX={anchorX}
        anchorY={anchorY}
        onSync={onSync}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        glyphGeometryDetail={64}
        renderOrder={1}
        outlineWidth={0}
        outlineColor="transparent"
        strokeWidth={0}
        strokeColor="transparent"
      >
        {children}
      </Text>
    </group>
  )
}
