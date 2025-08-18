// TextWithBorder.jsx
import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import { borderVertex, borderFragment } from "../shaders/border.jsx"

export default function TextWithBorder({
  children,
  position = [0, 0, 0],
  fontSize = 0.1,
  color = "#000000",
  maxWidth = 1.0,
  anchorX = "center",
  anchorY = "middle",
  font = "/fonts/ibm-plex-mono-latin-400-normal.woff",
  letterSpacing = 0.02,
  lineHeight = 1.2,
  roundness = 0.1,
  padding = 0.1,
  paddingXMult = 1.0,
  paddingYMult = 1.0,
  border = 0.01,
  borderColor = "#000000",
  scale = 1.0,
  onClick,
}) {
  const { viewport } = useThree()
  const textRef = useRef()
  const borderRef = useRef()

  useEffect(() => {
    if (textRef.current && borderRef.current) {
      const textBounds = new THREE.Box3().setFromObject(textRef.current)
      const textSize = new THREE.Vector3()
      textBounds.getSize(textSize)

      const borderWidth = textSize.x * paddingXMult + padding * 2
      const borderHeight = textSize.y * paddingYMult + padding * 2

      // Update border geometry
      borderRef.current.geometry.dispose()
      borderRef.current.geometry = new THREE.PlaneGeometry(
        borderWidth,
        borderHeight
      )

      // Position border behind text
      borderRef.current.position.z = -0.001
    }
  }, [children, padding, paddingXMult, paddingYMult])

  const handleClick = (event) => {
    if (onClick) {
      event.stopPropagation()
      onClick()
    }
  }

  return (
    <group scale={scale} onClick={handleClick}>
      {/* Border */}
      <mesh ref={borderRef} position={position}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>

      {/* Text */}
      <Text
        ref={textRef}
        position={position}
        fontSize={fontSize}
        color={color}
        maxWidth={maxWidth}
        anchorX={anchorX}
        anchorY={anchorY}
        font={font}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
      >
        {children}
      </Text>
    </group>
  )
}
