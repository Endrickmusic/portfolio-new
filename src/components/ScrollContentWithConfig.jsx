import { useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Svg, Image, useScroll } from "@react-three/drei"
import TextWithBorder from "./TextWithBorder"
import { useControls, folder } from "leva"
import BorderBox from "./BorderBox.jsx"

import Grid from "./Grid"
import Header from "./Header"
import { useBreakpoint, useResponsiveValue } from "../hooks/useBreakpoint"

// Import our configuration and utilities
import { controlsConfig } from "../config/controlsConfig"
import {
  generateControlsFromConfig,
  generateResponsiveHooks,
} from "../utils/controlsUtils"

// ... (other components like Headline, Description, PlaygroundSection, Footer would be here)

export default function ScrollContentWithConfig() {
  const scroll = useScroll()
  const group = useRef()
  const { viewport } = useThree()
  const { breakpoint } = useBreakpoint()

  // Generate Header controls from config
  const headerControls = useControls(
    "Header",
    generateControlsFromConfig(controlsConfig.header, folder),
    { collapsed: true }
  )

  // Generate Content controls from config
  const controls = useControls(
    "Content",
    generateControlsFromConfig(controlsConfig.content, folder),
    { collapsed: true }
  )

  // Generate Footer controls from config
  const footerControls = useControls(
    "Footer",
    generateControlsFromConfig({ footer: controlsConfig.footer }, folder),
    { collapsed: true }
  )

  // Generate all responsive hooks automatically from config
  const headerHooks = generateResponsiveHooks(
    headerControls,
    controlsConfig.header,
    useResponsiveValue
  )
  const contentHooks = generateResponsiveHooks(
    controls,
    controlsConfig.content,
    useResponsiveValue
  )
  const footerHooks = generateResponsiveHooks(
    footerControls,
    { footer: controlsConfig.footer },
    useResponsiveValue
  )

  // Now you can access all values with clean names:
  // headerHooks.chGroupY, headerHooks.cScale, headerHooks.cX, etc.
  // contentHooks.introX, contentHooks.w1X, contentHooks.w1TitleX, etc.
  // footerHooks.footerY, footerHooks.footerNavY, etc.

  useFrame((state, delta) => {
    if (scroll.offset !== undefined) {
      group.current.position.y = scroll.offset * 4.2 * viewport.height
    }
  })

  return (
    <group ref={group}>
      <Grid />
      <Header textStyles={textStyles} />

      {/* Large C and H letters */}
      <group position={[0, viewport.height * headerHooks.chGroupY, 0]}>
        <Svg
          src="/svgs/C.svg"
          scale={headerHooks.cScale}
          position={[headerHooks.cX, headerHooks.cY, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
        <Svg
          src="/svgs/H.svg"
          scale={headerHooks.hScale}
          position={[headerHooks.hX, headerHooks.hY, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
      </group>

      {/* Introduction */}
      <Headline
        title={textContent.page0.paragraphs}
        position={[
          contentHooks.introX,
          viewport.height * contentHooks.introY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.introWidth}
      ></Headline>

      {/* Work 1 */}
      <Image
        url="/images/vellum_dance_main.png"
        scale={[viewport.width * 0.515, viewport.height * 0.73, 1]}
        position={[contentHooks.w1X, viewport.height * contentHooks.w1Y, 0]}
      />
      <Headline
        title={textContent.page1.title}
        position={[
          contentHooks.w1TitleX,
          viewport.height * contentHooks.w1TitleY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w1TitleWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[
          contentHooks.w1DescX,
          viewport.height * contentHooks.w1DescY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w1DescWidth}
      ></Description>

      {/* Work 2 */}
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[contentHooks.w2X, viewport.height * contentHooks.w2Y, 0]}
      />
      <Headline
        title={textContent.page2.title}
        position={[
          contentHooks.w2TitleX,
          viewport.height * contentHooks.w2TitleY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w2TitleWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[
          contentHooks.w2DescX,
          viewport.height * contentHooks.w2DescY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w2DescWidth}
      ></Description>

      {/* Work 3 */}
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[contentHooks.w3X, viewport.height * contentHooks.w3Y, 0]}
      />
      <Headline
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[
          contentHooks.w3TitleX,
          viewport.height * contentHooks.w3TitleY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w3TitleWidth}
      ></Headline>
      <Description
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[
          contentHooks.w3DescX,
          viewport.height * contentHooks.w3DescY,
          0,
        ]}
        maxWidth={viewport.width * contentHooks.w3DescWidth}
      ></Description>

      {/* Playground */}
      <PlaygroundSection
        position={[
          viewport.width * contentHooks.playX,
          viewport.height * contentHooks.playY,
          0,
        ]}
        // Styling props would come from controls.panelWidth, etc.
        panelWidth={viewport.width * controls.panelWidth}
        panelHeight={viewport.height * controls.panelHeight}
        // ... other styling props
      />

      {/* Get in Contact */}
      <group
        position={[contentHooks.conX, viewport.height * contentHooks.conY, 0]}
      >
        <TextWithBorder
          position={[contentHooks.conButtonX, contentHooks.conButtonY, 0]}
          fontSize={viewport.height * 0.025}
          color="#38358f"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          border={contentHooks.globalBorder}
          roundness={0.1}
          borderColor="#38358f"
          padding={0.15}
          paddingXMult={1.5}
          paddingYMult={1.0}
        >
          GET IN CONTACT
        </TextWithBorder>
        <Description
          paragraphs={[
            "Ready to create something amazing together? Let's talk.",
          ]}
          position={[contentHooks.conDescX, contentHooks.conDescY, 0]}
          maxWidth={contentHooks.conWidth}
        />
      </group>

      <Footer
        position={[0, viewport.height * footerHooks.footerY, 0]}
        footerControls={footerControls}
      />
    </group>
  )
}
