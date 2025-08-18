// BorderBox.jsx
import { useMemo, useRef, useEffect } from "react"
import {
  panelBorderVertex,
  panelBorderFragment,
} from "../shaders/panelBorder.jsx"
import * as THREE from "three"

export default function BorderBox({
  width,
  height,
  border = 0.1,
  roundness = 0.1,
  color = "black",
  paddingX = 0.0,
  paddingY = 0.0,
  position = [0, 0, 0],
  zOffset = 0,
}) {
  const colorVec = useMemo(
    () => (Array.isArray(color) ? color : new THREE.Color(color).toArray()),
    [color]
  )

  const uniforms = useRef({
    uPanelSize: { value: new THREE.Vector2(width, height) },
    uBorder: { value: border },
    uRadius: { value: roundness },
    uColor: { value: colorVec },
    uPad: { value: new THREE.Vector2(paddingX, paddingY) },
  })

  useEffect(() => {
    uniforms.current.uPanelSize.value.set(width, height)
  }, [width, height])

  useEffect(() => {
    uniforms.current.uBorder.value = border * 1.5
  }, [border])

  useEffect(() => {
    uniforms.current.uRadius.value = roundness
  }, [roundness])

  useEffect(() => {
    uniforms.current.uColor.value = colorVec
  }, [colorVec])

  useEffect(() => {
    uniforms.current.uPad.value.set(paddingX, paddingY)
  }, [paddingX, paddingY])

  return (
    <mesh position={[position[0], position[1], position[2] + zOffset]}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        vertexShader={panelBorderVertex}
        fragmentShader={panelBorderFragment}
        transparent
        depthWrite={false}
        toneMapped={false}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}
