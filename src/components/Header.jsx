import { Text, Svg, Image } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useState, useEffect, useMemo } from "react"
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
  })

  const logoControls = useControls("SDF Logo", {
    thickness: { value: 0.05, min: 0.0, max: 0.5, step: 0.005 },
  })

  const { radius, paddingX, paddingY, borderColor } = controls
  const { thickness } = logoControls

  // SDF texture with high-quality filtering
  const sdfTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/images/sdf_logo.png")
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    return texture
  }, [])

  const labels = ["Work", "Expertise", "About", "Playground"]

  // 24-column grid system
  const { spacing } = useControls("Navigation Spacing", {
    spacing: { value: 0.28, min: 0.25, max: 1.0, step: 0.01 },
  })

  // Grid helper function with padding
  const getColumnPosition = (column) => {
    // Account for 0.1 padding on each side
    const gridPadding = 0.1
    const availableWidth = viewport.width - gridPadding * 2
    const adjustedColumnWidth = availableWidth / 24

    // Convert column (1-24) to world position with padding
    return (
      -viewport.width / 2 + gridPadding + adjustedColumnWidth * (column - 0.5)
    )
  }

  const positions = useMemo(() => {
    // Start at column 19, then space evenly
    const startColumn = 20
    const startPosition = getColumnPosition(startColumn)

    return [
      startPosition, // Work (column 19)
      startPosition + spacing, // Expertise
      startPosition + spacing * 2.05, // About
      startPosition + spacing * 3.17, // Playground
    ]
  }, [spacing, viewport.width, columnWidth])

  return (
    // Header group
    <group position={[0, viewport.height * 0.48, 0]}>
      {/* Logo */}
      <mesh
        position={[getColumnPosition(1), -0.069, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <planeGeometry args={[0.66, 0.25]} />
        <shaderMaterial
          transparent
          toneMapped={false}
          depthWrite={false}
          uniforms={{
            uSDF: { value: sdfTexture },
            uColor: { value: new THREE.Color("#38358f") },
            uThickness: { value: thickness },
          }}
          vertexShader={`
              varying vec2 vUv;
              void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `}
          fragmentShader={`
              uniform sampler2D uSDF;
              uniform vec3 uColor;
              uniform float uThickness;
              varying vec2 vUv;

              void main() {
                  float dist = texture2D(uSDF, vUv).a;
                  float alpha = smoothstep(0.5 - uThickness, 0.5 + uThickness, dist);
                  gl_FragColor = vec4(uColor, alpha);
              }

          `}
        />
      </mesh>

      {/* Name and Profession */}
      <group position={[getColumnPosition(2), -0.028, 0]}>
        <Text
          {...textStyles.logo}
          fontSize={textStyles.logo.fontSize(viewport)}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
          glyphGeometryDetail={128}
          renderOrder={1}
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
          glyphGeometryDetail={256}
          renderOrder={1}
        >
          3D Artist and Creative Developer
        </Text>
      </group>

      {/* Navigation Links */}
      <group position={[0, -0.1, 0]}>
        {labels.map((text, i) => {
          const fontSize = textStyles.nav.fontSize(viewport) * 0.7

          return (
            <group key={text} position={[positions[i], 0, 0]}>
              <TextWithBorder
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
