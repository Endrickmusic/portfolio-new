import { Text, Svg, Image } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useState, useEffect, useMemo } from "react"
import { useControls, folder } from "leva"
import TextWithBorder from "./TextWithBorder.jsx"
import { useBreakpoint, useResponsiveValue } from "../hooks/useBreakpoint"

export default function Header({ textStyles }) {
  const { viewport } = useThree()
  const columnWidth = viewport.width / 24
  const { breakpoint } = useBreakpoint()

  // Responsive navigation controls organized by breakpoint
  const controls = useControls(
    "Navigation",
    {
      // Global styling (non-responsive)
      Styling: folder({
        globalBorder: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
        thickness: { value: 0.05, min: 0.0, max: 0.5, step: 0.005 },
        radius: { value: 0.04, min: 0.0, max: 0.5, step: 0.005 },
        paddingX: { value: 0.07, min: 0.0, max: 2.0, step: 0.01 },
        paddingY: { value: 0.06, min: 0.0, max: 1.0, step: 0.01 },
        borderColor: { value: "#38358f" },
        spacing: { value: 0.28, min: 0.25, max: 1.0, step: 0.01 },
      }),

      // Responsive positioning
      Desktop: folder({
        deskHeaderY: { value: 0.48, min: 0.0, max: 1.0, step: 0.01 },
        deskLogoX: { value: 1, min: 1, max: 24, step: 1 }, // Column number
        deskLogoY: { value: -0.069, min: -0.2, max: 0.2, step: 0.001 },
        deskNameX: { value: 2, min: 1, max: 24, step: 1 }, // Column number
        deskNameY: { value: -0.028, min: -0.2, max: 0.2, step: 0.001 },
        deskNavStartCol: { value: 20, min: 15, max: 24, step: 1 },
        deskNavY: { value: -0.1, min: -0.3, max: 0.1, step: 0.01 },
      }),

      Tablet: folder({
        tabHeaderY: { value: 0.48, min: 0.0, max: 1.0, step: 0.01 },
        tabLogoX: { value: 1, min: 1, max: 24, step: 1 },
        tabLogoY: { value: -0.069, min: -0.2, max: 0.2, step: 0.001 },
        tabNameX: { value: 2, min: 1, max: 24, step: 1 },
        tabNameY: { value: -0.028, min: -0.2, max: 0.2, step: 0.001 },
        tabNavStartCol: { value: 18, min: 15, max: 24, step: 1 },
        tabNavY: { value: -0.1, min: -0.3, max: 0.1, step: 0.01 },
      }),

      Mobile: folder({
        mobHeaderY: { value: 0.48, min: 0.0, max: 1.0, step: 0.01 },
        mobLogoX: { value: 1, min: 1, max: 24, step: 1 },
        mobLogoY: { value: -0.069, min: -0.2, max: 0.2, step: 0.001 },
        mobNameX: { value: 2, min: 1, max: 24, step: 1 },
        mobNameY: { value: -0.028, min: -0.2, max: 0.2, step: 0.001 },
        mobNavStartCol: { value: 16, min: 10, max: 24, step: 1 },
        mobNavY: { value: -0.1, min: -0.3, max: 0.1, step: 0.01 },
      }),
    },
    {
      collapsed: true,
    }
  )

  // Responsive values - all hooks must be called at component level
  const headerY = useResponsiveValue({
    mobile: controls.mobHeaderY,
    tablet: controls.tabHeaderY,
    desktop: controls.deskHeaderY,
    large: controls.deskHeaderY,
    ultrawide: controls.deskHeaderY,
  })

  const logoX = useResponsiveValue({
    mobile: controls.mobLogoX,
    tablet: controls.tabLogoX,
    desktop: controls.deskLogoX,
    large: controls.deskLogoX,
    ultrawide: controls.deskLogoX,
  })

  const logoY = useResponsiveValue({
    mobile: controls.mobLogoY,
    tablet: controls.tabLogoY,
    desktop: controls.deskLogoY,
    large: controls.deskLogoY,
    ultrawide: controls.deskLogoY,
  })

  const nameX = useResponsiveValue({
    mobile: controls.mobNameX,
    tablet: controls.tabNameX,
    desktop: controls.deskNameX,
    large: controls.deskNameX,
    ultrawide: controls.deskNameX,
  })

  const nameY = useResponsiveValue({
    mobile: controls.mobNameY,
    tablet: controls.tabNameY,
    desktop: controls.deskNameY,
    large: controls.deskNameY,
    ultrawide: controls.deskNameY,
  })

  const navStartCol = useResponsiveValue({
    mobile: controls.mobNavStartCol,
    tablet: controls.tabNavStartCol,
    desktop: controls.deskNavStartCol,
    large: controls.deskNavStartCol,
    ultrawide: controls.deskNavStartCol,
  })

  const navY = useResponsiveValue({
    mobile: controls.mobNavY,
    tablet: controls.tabNavY,
    desktop: controls.deskNavY,
    large: controls.deskNavY,
    ultrawide: controls.deskNavY,
  })

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
    // Use responsive start column
    const startPosition = getColumnPosition(navStartCol)
    const spacing = controls.spacing

    return [
      startPosition, // Work
      startPosition + spacing, // Expertise
      startPosition + spacing * 2.05, // About
      startPosition + spacing * 3.17, // Playground
    ]
  }, [controls.spacing, viewport.width, columnWidth, navStartCol])

  return (
    // Header group
    <group position={[0, viewport.height * headerY, 0]}>
      {/* Logo */}
      <mesh
        position={[getColumnPosition(logoX), logoY, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <planeGeometry args={[0.66, 0.25]} />
        <shaderMaterial
          key={controls.thickness} // Force recreation when thickness changes
          transparent
          toneMapped={false}
          depthWrite={false}
          uniforms={{
            uSDF: { value: sdfTexture },
            uColor: { value: new THREE.Color("#38358f") },
            uThickness: { value: controls.thickness },
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
      <group position={[getColumnPosition(nameX), nameY, 0]}>
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
      <group position={[0, navY, 0]}>
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
                border={controls.globalBorder * 0.01}
                roundness={controls.radius}
                borderColor={controls.borderColor}
                paddingX={controls.paddingX}
                paddingY={controls.paddingY}
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
