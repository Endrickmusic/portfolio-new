import { Text, Svg } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useState, useEffect } from "react"
import { useControls } from "leva"
import TextWithBorder from "./TextWithBorder.jsx"

export default function Header({ textStyles }) {
  const { viewport } = useThree()
  const columnWidth = viewport.width / 24

  // Global border thickness used across app
  const { globalBorder } = useControls("Global", {
    globalBorder: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
  })

  const controls = useControls("Navigation Buttons", {
    radius: { value: 0.1, min: 0.0, max: 0.5, step: 0.005 },
    paddingX: { value: 0.25, min: 0.0, max: 2.0, step: 0.01 },
    paddingY: { value: 0.09, min: 0.0, max: 1.0, step: 0.01 },
    borderColor: { value: "#38358f" },
  })

  const { radius, paddingX, paddingY, borderColor } = controls

  return (
    <group position={[0, viewport.height * 0.4, 0]}>
      {/* Logo */}
      <Svg
        src="/svgs/CH_logo.svg"
        scale={0.0045}
        position={[-viewport.width / 2 + columnWidth, 0, 0]}
        fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
      />

      {/* Name and Title */}
      <group
        position={[
          -viewport.width / 2 + columnWidth * 3,
          viewport.height * 0.02,
          0,
        ]}
      >
        <Text
          {...textStyles.logo}
          fontSize={textStyles.logo.fontSize(viewport)}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
        >
          Christian Hohenbild
        </Text>
        <Text
          {...textStyles.logo}
          fontSize={textStyles.logo.fontSize(viewport)}
          position={[0, -viewport.height * 0.03, 0]}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
        >
          3D Artist and Creative Developer
        </Text>
      </group>

      {/* Navigation Links */}
      <group
        position={[
          viewport.width / 2 - columnWidth * 7.2,
          viewport.height * 0.02,
          0,
        ]}
      >
        {["Work", "Expertise", "About", "Playground"].map((text, i) => {
          const ref = useRef()
          const [width, setWidth] = useState(1)
          const fontSize = textStyles.nav.fontSize(viewport)

          useEffect(() => {
            if (!ref.current?.geometry?.boundingBox) return
            const size = new THREE.Vector3()
            ref.current.geometry.boundingBox.getSize(size)
            setWidth(size.x)
          }, [viewport, text, fontSize])

          return (
            <group key={text} position={[columnWidth * i * 2, 0, 0]}>
              <TextWithBorder
                ref={ref}
                {...textStyles.nav}
                fontSize={fontSize}
                anchorX="center"
                anchorY="middle"
                color="#38358f"
                border={globalBorder * 0.01}
                roundness={radius}
                borderColor={borderColor}
                paddingX={paddingX}
                paddingY={paddingY}
              >
                {text}
              </TextWithBorder>
            </group>
          )
        })}
      </group>
    </group>
  )
}
