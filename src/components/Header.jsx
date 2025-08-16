import { Text, Svg, Image } from "@react-three/drei"
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
    radius: { value: 0.04, min: 0.0, max: 0.5, step: 0.005 },
    paddingX: { value: 0.07, min: 0.0, max: 2.0, step: 0.01 },
    paddingY: { value: 0.06, min: 0.0, max: 1.0, step: 0.01 },
    borderColor: { value: "#38358f" },
    gap: { value: -0.08, min: -0.5, max: 0.5, step: 0.01 },
  })

  const { radius, paddingX, paddingY, borderColor, gap } = controls

  const labels = ["Work", "Expertise", "About", "Playground"]
  const [boxWidths, setBoxWidths] = useState({})

  const centers = (() => {
    const result = []
    for (let i = 0; i < labels.length; i++) {
      const w = boxWidths[labels[i]] ?? 0.5
      if (i === 0) {
        result.push(0)
      } else {
        const prevW = boxWidths[labels[i - 1]] ?? 0.5
        const nextCenter = result[i - 1] + prevW / 2 + gap + w / 2
        result.push(nextCenter)
      }
    }
    return result
  })()

  return (
    <group position={[0, viewport.height * 0.48, 0]}>
      {/* Logo */}
      <Svg
        src="/svgs/CH_logo.svg"
        scale={0.0045}
        position={[-viewport.width / 2 + columnWidth * 0.45, 0, 0]}
        fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        strokeWidth={0.01}
      />
      {/* <Image
        url="/images/CH_symbol.png"
        scale={[0.33, 0.125, 1]}
        position={[-2.85, -0.07, 0]}
        transparent
      ></Image> */}

      {/* Name and Title */}
      <group position={[-viewport.width / 2 + columnWidth * 1.8, -0.028, 0]}>
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
          position={[0, -viewport.height * 0.025, 0]}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
        >
          3D Artist and Creative Developer
        </Text>
      </group>

      {/* Navigation Links */}
      <group position={[viewport.width / 2 - columnWidth * 4.77, -0.1, 0]}>
        {["Work", "Expertise", "About", "Playground"].map((text, i) => {
          const ref = useRef()
          const [width, setWidth] = useState(1)
          const fontSize = textStyles.nav.fontSize(viewport) * 0.7

          useEffect(() => {
            if (!ref.current?.geometry?.boundingBox) return
            const size = new THREE.Vector3()
            ref.current.geometry.boundingBox.getSize(size)
            setWidth(size.x)
          }, [viewport, text, fontSize])

          return (
            <group key={text} position={[centers[i], 0, 0]}>
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
                onBoxSize={({ width }) =>
                  setBoxWidths((p) =>
                    p[text] === width ? p : { ...p, [text]: width }
                  )
                }
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
