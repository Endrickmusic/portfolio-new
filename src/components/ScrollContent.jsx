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
import { useLevaExtractor } from "../utils/configExtractor"

// Import config system
import { controlsConfig } from "../config/controlsConfig"
import {
  generateControlsFromConfig,
  generateResponsiveHooks,
} from "../utils/controlsUtils"

// Text styling system (inspired by Tailwind)
const textStyles = {
  logo: {
    fontSize: (viewport) => viewport.height * 0.017,
    color: "#38354f",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.005,
    lineHeight: 1.2,
  },
  nav: {
    fontSize: (viewport) => viewport.height * 0.025,
    color: "#38354F",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
  heading: {
    fontSize: (viewport) => viewport.height * 0.25,
    color: "#38358F",
    font: "/fonts/SeasonSerifTRIAL-Light.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
  body: {
    fontSize: (viewport) => viewport.height * 0.03,
    color: "#38358F",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.5,
    maxWidth: 2.2,
  },
}

// Separated text content
const textContent = {
  page0: {
    title: "",
    paragraphs: [
      "Hi, I'm Christian Hohenbild, a Berlin-based 3D artist and creative developer specializing in crafting immersive web experiences. Combining art and code, I focus on real-time 3D graphics, shader programming, and interactive visuals.",
    ],
  },
  page1: {
    title: "Vellum Dance : The Physics of Fabric & Motion",
    paragraphs: [
      "_ Movement woven into matter. Composing a fabric simulation in real-time, capturing the ephemeral tension between body, force, and material.",
    ],
  },
  page2: {
    title: "Fluid Prism: Bending Light, Shaping Form",
    paragraphs: [
      "_ Investigating how the distortion of light generates form andsubstance, challenging the boundaries between perception and reality.",
    ],
  },
  page3: {
    title: "Swarm Dynamics: Chaos & Control in Motion",
    paragraphs: [
      "_ From fluid currents to digital flocks, this project sculpts movement from thousands of independent particles, balancing randomness with structured behavior.",
    ],
  },
}

// Page component for reusability
function Headline({ title, position = [0, 0, 0], maxWidth }) {
  const { viewport } = useThree()

  return (
    <Text
      position={position}
      fontSize={viewport.height * 0.045}
      color="#38358F"
      maxWidth={maxWidth}
      anchorX="left"
      anchorY="middle"
      font="/fonts/SeasonSerifTRIAL-Light.woff"
      letterSpacing={0.015}
      lineHeight={1.2}
      glyphGeometryDetail={64}
      renderOrder={1}
    >
      {title}
    </Text>
  )
}

// Description component for reusability
function Description({ paragraphs, position = [0, 0, 0], maxWidth, children }) {
  const { viewport } = useThree()
  const paragraphSpacing = viewport.height * 0.12

  return (
    <group position={position}>
      {paragraphs.map((paragraph, index) => (
        <Text
          key={index}
          position={position}
          fontSize={viewport.height * 0.023}
          color="#38358f"
          maxWidth={maxWidth || viewport.width * 0.25}
          textAlign="left"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
          glyphGeometryDetail={64}
          renderOrder={1}
        >
          {paragraph}
        </Text>
      ))}
      {children}
    </group>
  )
}

function PlaygroundSection({
  position = [0, 0, 0],
  panelWidth,
  panelHeight,
  roundness,
  borderColor,
  paddingX,
  paddingY,
  globalBorder,
  mbRoundness,
  mbBorderColor,
  mbPadding,
  mbPaddingXMult,
  mbPaddingYMult,
}) {
  const { viewport } = useThree()

  const borderColorVec = useMemo(
    () => new THREE.Color(borderColor).toArray(),
    [borderColor]
  )

  return (
    <group position={position}>
      {/* Background border panel via BorderBox */}
      <BorderBox
        width={panelWidth}
        height={panelHeight}
        border={globalBorder}
        roundness={roundness}
        color={borderColorVec}
        paddingX={paddingX}
        paddingY={paddingY}
        position={[0, 0, 0]}
        zOffset={-0.1}
      />

      {/* Title */}
      <Text
        position={[-viewport.width * 0.35, viewport.height * 0.2, 0]}
        fontSize={viewport.height * 0.08}
        color="#38358f"
        anchorX="left"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
      >
        PLAYGROUND
      </Text>

      {/* Description */}
      <Text
        position={[-viewport.width * 0.35, 0, 0]}
        fontSize={viewport.height * 0.025}
        color="#38358f"
        maxWidth={viewport.width * 0.6}
        anchorX="left"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        A collection of experimental studies—testing shaders, simulations, and
        interaction techniques. Focused on rapid prototyping and trying
        technical concepts outside of polished projects.
      </Text>

      {/* More button */}
      <group position={[-viewport.width * 0.35, -viewport.height * 0.2, 0]}>
        <TextWithBorder
          position={[0, 0, 0]}
          roundness={mbRoundness}
          color={mbBorderColor}
          padding={mbPadding}
          paddingXMult={mbPaddingXMult}
          paddingYMult={mbPaddingYMult}
          globalBorder={globalBorder}
        >
          MORE
        </TextWithBorder>
      </group>
    </group>
  )
}

function Footer({ position = [0, 0, 0], footerControls }) {
  const { viewport } = useThree()
  const maxWidth = Math.min(viewport.width * 0.8, 4)
  const contentWidth = maxWidth + 0.7
  const startX = -contentWidth / 2

  // Helper function to get responsive footer values
  const getFooterResponsiveValue = (controlName) => {
    return useResponsiveValue({
      mobile: footerControls[`mobFooter${controlName}`],
      tablet: footerControls[`tabFooter${controlName}`],
      desktop: footerControls[`deskFooter${controlName}`],
      large: footerControls[`deskFooter${controlName}`],
      ultrawide: footerControls[`deskFooter${controlName}`],
    })
  }

  return (
    <group position={position}>
      {/* Background */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 1.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Navigation Links */}
      <group
        position={[
          startX,
          viewport.height * getFooterResponsiveValue("NavY"),
          0,
        ]}
      >
        {["Work", "Expertise", "About", "Playground"].map((text, i) => (
          <Text
            key={text}
            position={[contentWidth * 0.33 * i, 0, 0]}
            fontSize={viewport.height * 0.03}
            color="#38358f"
            anchorX="center"
            anchorY="middle"
            font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          >
            {text}
          </Text>
        ))}
      </group>

      {/* Logo SVGs */}
      <group
        position={[
          startX + contentWidth * getFooterResponsiveValue("LogoX"),
          viewport.height * getFooterResponsiveValue("LogoY"),
          0,
        ]}
      >
        <Svg src="/svgs/C.svg" scale={viewport.height * 0.04} />
        <Svg
          src="/svgs/H.svg"
          scale={viewport.height * 0.04}
          position={[viewport.width * 0.06, 0, 0]}
        />
      </group>

      {/* Contact Information */}
      <group
        position={[
          startX,
          viewport.height * getFooterResponsiveValue("ContactY"),
          0,
        ]}
      >
        {/* Email */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("ContactEmailX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.022}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          christian@hohenbild.com
        </Text>

        {/* Social Links */}
        <Text
          position={[contentWidth * getFooterResponsiveValue("SocialX"), 0, 0]}
          fontSize={viewport.height * 0.022}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Instagram / LinkedIn
        </Text>

        {/* Legal */}
        <Text
          position={[contentWidth * getFooterResponsiveValue("LegalX"), 0, 0]}
          fontSize={viewport.height * 0.022}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Legal / Imprint
        </Text>
      </group>
    </group>
  )
}

export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const { viewport } = useThree()

  // 🎯 GENERATE ALL CONTROLS FROM CONFIG (10 lines instead of 800+)
  const headerControls = useControls(
    "Header",
    generateControlsFromConfig(controlsConfig.header, folder),
    { collapsed: true }
  )

  const controls = useControls(
    "Content",
    generateControlsFromConfig(controlsConfig.content, folder),
    { collapsed: true }
  )

  const footerControls = useControls(
    "Footer",
    generateControlsFromConfig({ footer: controlsConfig.footer }, folder),
    { collapsed: true }
  )

  // 🎯 RESPONSIVE HOOKS - Manual approach for now
  // Header hooks (C and H SVGs)
  const chGroupY = useResponsiveValue({
    mobile: headerControls.mobChGroupY,
    tablet: headerControls.tabChGroupY,
    desktop: headerControls.deskChGroupY,
    large: headerControls.deskChGroupY,
    ultrawide: headerControls.deskChGroupY,
  })
  const cScale = useResponsiveValue({
    mobile: headerControls.mobCScale,
    tablet: headerControls.tabCScale,
    desktop: headerControls.deskCScale,
    large: headerControls.deskCScale,
    ultrawide: headerControls.deskCScale,
  })
  const cX = useResponsiveValue({
    mobile: headerControls.mobCX,
    tablet: headerControls.tabCX,
    desktop: headerControls.deskCX,
    large: headerControls.deskCX,
    ultrawide: headerControls.deskCX,
  })
  const cY = useResponsiveValue({
    mobile: headerControls.mobCY,
    tablet: headerControls.tabCY,
    desktop: headerControls.deskCY,
    large: headerControls.deskCY,
    ultrawide: headerControls.deskCY,
  })
  const hScale = useResponsiveValue({
    mobile: headerControls.mobHScale,
    tablet: headerControls.tabHScale,
    desktop: headerControls.deskHScale,
    large: headerControls.deskHScale,
    ultrawide: headerControls.deskHScale,
  })
  const hX = useResponsiveValue({
    mobile: headerControls.mobHX,
    tablet: headerControls.tabHX,
    desktop: headerControls.deskHX,
    large: headerControls.deskHX,
    ultrawide: headerControls.deskHX,
  })
  const hY = useResponsiveValue({
    mobile: headerControls.mobHY,
    tablet: headerControls.tabHY,
    desktop: headerControls.deskHY,
    large: headerControls.deskHY,
    ultrawide: headerControls.deskHY,
  })

  // Content hooks
  const introX = useResponsiveValue({
    mobile: controls.mobIntroX,
    tablet: controls.tabIntroX,
    desktop: controls.deskIntroX,
    large: controls.deskIntroX,
    ultrawide: controls.deskIntroX,
  })
  const introY = useResponsiveValue({
    mobile: controls.mobIntroY,
    tablet: controls.tabIntroY,
    desktop: controls.deskIntroY,
    large: controls.deskIntroY,
    ultrawide: controls.deskIntroY,
  })
  const introWidth = useResponsiveValue({
    mobile: controls.mobIntroWidth,
    tablet: controls.tabIntroWidth,
    desktop: controls.deskIntroWidth,
    large: controls.deskIntroWidth,
    ultrawide: controls.deskIntroWidth,
  })

  // Work 1 hooks
  const w1X = useResponsiveValue({
    mobile: controls.mobW1X,
    tablet: controls.tabW1X,
    desktop: controls.deskW1X,
    large: controls.deskW1X,
    ultrawide: controls.deskW1X,
  })
  const w1Y = useResponsiveValue({
    mobile: controls.mobW1Y,
    tablet: controls.tabW1Y,
    desktop: controls.deskW1Y,
    large: controls.deskW1Y,
    ultrawide: controls.deskW1Y,
  })
  const w1TitleX = useResponsiveValue({
    mobile: controls.mobW1TitleX,
    tablet: controls.tabW1TitleX,
    desktop: controls.deskW1TitleX,
    large: controls.deskW1TitleX,
    ultrawide: controls.deskW1TitleX,
  })
  const w1TitleY = useResponsiveValue({
    mobile: controls.mobW1TitleY,
    tablet: controls.tabW1TitleY,
    desktop: controls.deskW1TitleY,
    large: controls.deskW1TitleY,
    ultrawide: controls.deskW1TitleY,
  })
  const w1TitleWidth = useResponsiveValue({
    mobile: controls.mobW1TitleWidth,
    tablet: controls.tabW1TitleWidth,
    desktop: controls.deskW1TitleWidth,
    large: controls.deskW1TitleWidth,
    ultrawide: controls.deskW1TitleWidth,
  })
  const w1DescX = useResponsiveValue({
    mobile: controls.mobW1DescX,
    tablet: controls.tabW1DescX,
    desktop: controls.deskW1DescX,
    large: controls.deskW1DescX,
    ultrawide: controls.deskW1DescX,
  })
  const w1DescY = useResponsiveValue({
    mobile: controls.mobW1DescY,
    tablet: controls.tabW1DescY,
    desktop: controls.deskW1DescY,
    large: controls.deskW1DescY,
    ultrawide: controls.deskW1DescY,
  })
  const w1DescWidth = useResponsiveValue({
    mobile: controls.mobW1DescWidth,
    tablet: controls.tabW1DescWidth,
    desktop: controls.deskW1DescWidth,
    large: controls.deskW1DescWidth,
    ultrawide: controls.deskW1DescWidth,
  })

  // Work 2 hooks
  const w2X = useResponsiveValue({
    mobile: controls.mobW2X,
    tablet: controls.tabW2X,
    desktop: controls.deskW2X,
    large: controls.deskW2X,
    ultrawide: controls.deskW2X,
  })
  const w2Y = useResponsiveValue({
    mobile: controls.mobW2Y,
    tablet: controls.tabW2Y,
    desktop: controls.deskW2Y,
    large: controls.deskW2Y,
    ultrawide: controls.deskW2Y,
  })
  const w2TitleX = useResponsiveValue({
    mobile: controls.mobW2TitleX,
    tablet: controls.tabW2TitleX,
    desktop: controls.deskW2TitleX,
    large: controls.deskW2TitleX,
    ultrawide: controls.deskW2TitleX,
  })
  const w2TitleY = useResponsiveValue({
    mobile: controls.mobW2TitleY,
    tablet: controls.tabW2TitleY,
    desktop: controls.deskW2TitleY,
    large: controls.deskW2TitleY,
    ultrawide: controls.deskW2TitleY,
  })
  const w2TitleWidth = useResponsiveValue({
    mobile: controls.mobW2TitleWidth,
    tablet: controls.tabW2TitleWidth,
    desktop: controls.deskW2TitleWidth,
    large: controls.deskW2TitleWidth,
    ultrawide: controls.deskW2TitleWidth,
  })
  const w2DescX = useResponsiveValue({
    mobile: controls.mobW2DescX,
    tablet: controls.tabW2DescX,
    desktop: controls.deskW2DescX,
    large: controls.deskW2DescX,
    ultrawide: controls.deskW2DescX,
  })
  const w2DescY = useResponsiveValue({
    mobile: controls.mobW2DescY,
    tablet: controls.tabW2DescY,
    desktop: controls.deskW2DescY,
    large: controls.deskW2DescY,
    ultrawide: controls.deskW2DescY,
  })
  const w2DescWidth = useResponsiveValue({
    mobile: controls.mobW2DescWidth,
    tablet: controls.tabW2DescWidth,
    desktop: controls.deskW2DescWidth,
    large: controls.deskW2DescWidth,
    ultrawide: controls.deskW2DescWidth,
  })

  // Work 3 hooks
  const w3X = useResponsiveValue({
    mobile: controls.mobW3X,
    tablet: controls.tabW3X,
    desktop: controls.deskW3X,
    large: controls.deskW3X,
    ultrawide: controls.deskW3X,
  })
  const w3Y = useResponsiveValue({
    mobile: controls.mobW3Y,
    tablet: controls.tabW3Y,
    desktop: controls.deskW3Y,
    large: controls.deskW3Y,
    ultrawide: controls.deskW3Y,
  })
  const w3TitleX = useResponsiveValue({
    mobile: controls.mobW3TitleX,
    tablet: controls.tabW3TitleX,
    desktop: controls.deskW3TitleX,
    large: controls.deskW3TitleX,
    ultrawide: controls.deskW3TitleX,
  })
  const w3TitleY = useResponsiveValue({
    mobile: controls.mobW3TitleY,
    tablet: controls.tabW3TitleY,
    desktop: controls.deskW3TitleY,
    large: controls.deskW3TitleY,
    ultrawide: controls.deskW3TitleY,
  })
  const w3TitleWidth = useResponsiveValue({
    mobile: controls.mobW3TitleWidth,
    tablet: controls.tabW3TitleWidth,
    desktop: controls.deskW3TitleWidth,
    large: controls.deskW3TitleWidth,
    ultrawide: controls.deskW3TitleWidth,
  })
  const w3DescX = useResponsiveValue({
    mobile: controls.mobW3DescX,
    tablet: controls.tabW3DescX,
    desktop: controls.deskW3DescX,
    large: controls.deskW3DescX,
    ultrawide: controls.deskW3DescX,
  })
  const w3DescY = useResponsiveValue({
    mobile: controls.mobW3DescY,
    tablet: controls.tabW3DescY,
    desktop: controls.deskW3DescY,
    large: controls.deskW3DescY,
    ultrawide: controls.deskW3DescY,
  })
  const w3DescWidth = useResponsiveValue({
    mobile: controls.mobW3DescWidth,
    tablet: controls.tabW3DescWidth,
    desktop: controls.deskW3DescWidth,
    large: controls.deskW3DescWidth,
    ultrawide: controls.deskW3DescWidth,
  })

  // Playground hooks
  const playX = useResponsiveValue({
    mobile: controls.mobPlayX,
    tablet: controls.tabPlayX,
    desktop: controls.deskPlayX,
    large: controls.deskPlayX,
    ultrawide: controls.deskPlayX,
  })
  const playY = useResponsiveValue({
    mobile: controls.mobPlayY,
    tablet: controls.tabPlayY,
    desktop: controls.deskPlayY,
    large: controls.deskPlayY,
    ultrawide: controls.deskPlayY,
  })

  // Contact hooks
  const conX = useResponsiveValue({
    mobile: controls.mobConX,
    tablet: controls.tabConX,
    desktop: controls.deskConX,
    large: controls.deskConX,
    ultrawide: controls.deskConX,
  })
  const conY = useResponsiveValue({
    mobile: controls.mobConY,
    tablet: controls.tabConY,
    desktop: controls.deskConY,
    large: controls.deskConY,
    ultrawide: controls.deskConY,
  })
  const conButtonX = useResponsiveValue({
    mobile: controls.mobConButtonX,
    tablet: controls.tabConButtonX,
    desktop: controls.deskConButtonX,
    large: controls.deskConButtonX,
    ultrawide: controls.deskConButtonX,
  })
  const conButtonY = useResponsiveValue({
    mobile: controls.mobConButtonY,
    tablet: controls.tabConButtonY,
    desktop: controls.deskConButtonY,
    large: controls.deskConButtonY,
    ultrawide: controls.deskConButtonY,
  })
  const conDescX = useResponsiveValue({
    mobile: controls.mobConDescX,
    tablet: controls.tabConDescX,
    desktop: controls.deskConDescX,
    large: controls.deskConDescX,
    ultrawide: controls.deskConDescX,
  })
  const conDescY = useResponsiveValue({
    mobile: controls.mobConDescY,
    tablet: controls.tabConDescY,
    desktop: controls.deskConDescY,
    large: controls.deskConDescY,
    ultrawide: controls.deskConDescY,
  })
  const conWidth = useResponsiveValue({
    mobile: controls.mobConWidth,
    tablet: controls.tabConWidth,
    desktop: controls.deskConWidth,
    large: controls.deskConWidth,
    ultrawide: controls.deskConWidth,
  })

  // Footer hooks
  const footerY = useResponsiveValue({
    mobile: footerControls.mobFooterY,
    tablet: footerControls.tabFooterY,
    desktop: footerControls.deskFooterY,
    large: footerControls.deskFooterY,
    ultrawide: footerControls.deskFooterY,
  })

  // 🎛️ Enable value extraction in development (adds levaExtractor to window)
  // Pass the actual control values from useControls (not the responsive values)
  useLevaExtractor({
    // Header controls - direct from headerControls
    deskChGroupY: headerControls.deskChGroupY,
    tabChGroupY: headerControls.tabChGroupY,
    mobChGroupY: headerControls.mobChGroupY,
    deskCScale: headerControls.deskCScale,
    tabCScale: headerControls.tabCScale,
    mobCScale: headerControls.mobCScale,
    deskCX: headerControls.deskCX,
    tabCX: headerControls.tabCX,
    mobCX: headerControls.mobCX,
    deskCY: headerControls.deskCY,
    tabCY: headerControls.tabCY,
    mobCY: headerControls.mobCY,
    deskHScale: headerControls.deskHScale,
    tabHScale: headerControls.tabHScale,
    mobHScale: headerControls.mobHScale,
    deskHX: headerControls.deskHX,
    tabHX: headerControls.tabHX,
    mobHX: headerControls.mobHX,
    deskHY: headerControls.deskHY,
    tabHY: headerControls.tabHY,
    mobHY: headerControls.mobHY,

    // Content controls - direct from controls
    deskGlobalBorder: controls.deskGlobalBorder,
    tabGlobalBorder: controls.tabGlobalBorder,
    mobGlobalBorder: controls.mobGlobalBorder,
    deskIntroX: controls.deskIntroX,
    tabIntroX: controls.tabIntroX,
    mobIntroX: controls.mobIntroX,
    deskIntroY: controls.deskIntroY,
    tabIntroY: controls.tabIntroY,
    mobIntroY: controls.mobIntroY,
    deskIntroWidth: controls.deskIntroWidth,
    tabIntroWidth: controls.tabIntroWidth,
    mobIntroWidth: controls.mobIntroWidth,

    // Work 1
    deskW1X: controls.deskW1X,
    tabW1X: controls.tabW1X,
    mobW1X: controls.mobW1X,
    deskW1Y: controls.deskW1Y,
    tabW1Y: controls.tabW1Y,
    mobW1Y: controls.mobW1Y,
    deskW1TitleX: controls.deskW1TitleX,
    tabW1TitleX: controls.tabW1TitleX,
    mobW1TitleX: controls.mobW1TitleX,
    deskW1TitleY: controls.deskW1TitleY,
    tabW1TitleY: controls.tabW1TitleY,
    mobW1TitleY: controls.mobW1TitleY,
    deskW1TitleWidth: controls.deskW1TitleWidth,
    tabW1TitleWidth: controls.tabW1TitleWidth,
    mobW1TitleWidth: controls.mobW1TitleWidth,
    deskW1DescX: controls.deskW1DescX,
    tabW1DescX: controls.tabW1DescX,
    mobW1DescX: controls.mobW1DescX,
    deskW1DescY: controls.deskW1DescY,
    tabW1DescY: controls.tabW1DescY,
    mobW1DescY: controls.mobW1DescY,
    deskW1DescWidth: controls.deskW1DescWidth,
    tabW1DescWidth: controls.tabW1DescWidth,
    mobW1DescWidth: controls.mobW1DescWidth,

    // Work 2
    deskW2X: controls.deskW2X,
    tabW2X: controls.tabW2X,
    mobW2X: controls.mobW2X,
    deskW2Y: controls.deskW2Y,
    tabW2Y: controls.tabW2Y,
    mobW2Y: controls.mobW2Y,
    deskW2TitleX: controls.deskW2TitleX,
    tabW2TitleX: controls.tabW2TitleX,
    mobW2TitleX: controls.mobW2TitleX,
    deskW2TitleY: controls.deskW2TitleY,
    tabW2TitleY: controls.tabW2TitleY,
    mobW2TitleY: controls.mobW2TitleY,
    deskW2TitleWidth: controls.deskW2TitleWidth,
    tabW2TitleWidth: controls.tabW2TitleWidth,
    mobW2TitleWidth: controls.mobW2TitleWidth,
    deskW2DescX: controls.deskW2DescX,
    tabW2DescX: controls.tabW2DescX,
    mobW2DescX: controls.mobW2DescX,
    deskW2DescY: controls.deskW2DescY,
    tabW2DescY: controls.tabW2DescY,
    mobW2DescY: controls.mobW2DescY,
    deskW2DescWidth: controls.deskW2DescWidth,
    tabW2DescWidth: controls.tabW2DescWidth,
    mobW2DescWidth: controls.mobW2DescWidth,

    // Work 3
    deskW3X: controls.deskW3X,
    tabW3X: controls.tabW3X,
    mobW3X: controls.mobW3X,
    deskW3Y: controls.deskW3Y,
    tabW3Y: controls.tabW3Y,
    mobW3Y: controls.mobW3Y,
    deskW3TitleX: controls.deskW3TitleX,
    tabW3TitleX: controls.tabW3TitleX,
    mobW3TitleX: controls.mobW3TitleX,
    deskW3TitleY: controls.deskW3TitleY,
    tabW3TitleY: controls.tabW3TitleY,
    mobW3TitleY: controls.mobW3TitleY,
    deskW3TitleWidth: controls.deskW3TitleWidth,
    tabW3TitleWidth: controls.tabW3TitleWidth,
    mobW3TitleWidth: controls.mobW3TitleWidth,
    deskW3DescX: controls.deskW3DescX,
    tabW3DescX: controls.tabW3DescX,
    mobW3DescX: controls.mobW3DescX,
    deskW3DescY: controls.deskW3DescY,
    tabW3DescY: controls.tabW3DescY,
    mobW3DescY: controls.mobW3DescY,
    deskW3DescWidth: controls.deskW3DescWidth,
    tabW3DescWidth: controls.tabW3DescWidth,
    mobW3DescWidth: controls.mobW3DescWidth,

    // Playground
    deskPlayX: controls.deskPlayX,
    tabPlayX: controls.tabPlayX,
    mobPlayX: controls.mobPlayX,
    deskPlayY: controls.deskPlayY,
    tabPlayY: controls.tabPlayY,
    mobPlayY: controls.mobPlayY,

    // Contact
    deskConX: controls.deskConX,
    tabConX: controls.tabConX,
    mobConX: controls.mobConX,
    deskConY: controls.deskConY,
    tabConY: controls.tabConY,
    mobConY: controls.mobConY,
    deskConButtonX: controls.deskConButtonX,
    tabConButtonX: controls.tabConButtonX,
    mobConButtonX: controls.mobConButtonX,
    deskConButtonY: controls.deskConButtonY,
    tabConButtonY: controls.tabConButtonY,
    mobConButtonY: controls.mobConButtonY,
    deskConDescX: controls.deskConDescX,
    tabConDescX: controls.tabConDescX,
    mobConDescX: controls.mobConDescX,
    deskConDescY: controls.deskConDescY,
    tabConDescY: controls.tabConDescY,
    mobConDescY: controls.mobConDescY,
    deskConWidth: controls.deskConWidth,
    tabConWidth: controls.tabConWidth,
    mobConWidth: controls.mobConWidth,

    // Footer
    deskFooterY: footerControls.deskFooterY,
    tabFooterY: footerControls.tabFooterY,
    mobFooterY: footerControls.mobFooterY,
    deskFooterNavY: footerControls.deskFooterNavY,
    tabFooterNavY: footerControls.tabFooterNavY,
    mobFooterNavY: footerControls.mobFooterNavY,
    deskFooterLogoX: footerControls.deskFooterLogoX,
    tabFooterLogoX: footerControls.tabFooterLogoX,
    mobFooterLogoX: footerControls.mobFooterLogoX,
    deskFooterLogoY: footerControls.deskFooterLogoY,
    tabFooterLogoY: footerControls.tabFooterLogoY,
    mobFooterLogoY: footerControls.mobFooterLogoY,
    deskFooterContactY: footerControls.deskFooterContactY,
    tabFooterContactY: footerControls.tabFooterContactY,
    mobFooterContactY: footerControls.mobFooterContactY,
    deskFooterContactEmailX: footerControls.deskFooterContactEmailX,
    tabFooterContactEmailX: footerControls.tabFooterContactEmailX,
    mobFooterContactEmailX: footerControls.mobFooterContactEmailX,
    deskFooterSocialX: footerControls.deskFooterSocialX,
    tabFooterSocialX: footerControls.tabFooterSocialX,
    mobFooterSocialX: footerControls.mobFooterSocialX,
    deskFooterLegalX: footerControls.deskFooterLegalX,
    tabFooterLegalX: footerControls.tabFooterLegalX,
    mobFooterLegalX: footerControls.mobFooterLegalX,
  })

  // Animation
  useFrame(() => {
    if (group.current && scroll.range) {
      group.current.position.y = scroll.offset * 4.2 * viewport.height
    }
  })

  return (
    <group ref={group}>
      <Grid />
      <Header textStyles={textStyles} />

      {/* C and H SVGs */}
      <group position={[0, viewport.height * chGroupY, 0]}>
        <Svg
          src="/svgs/C.svg"
          scale={viewport.width * cScale}
          position={[viewport.width * cX, viewport.height * cY, 0]}
        />
        <Svg
          src="/svgs/H.svg"
          scale={viewport.width * hScale}
          position={[viewport.width * hX, viewport.height * hY, 0]}
        />
      </group>

      {/* Introduction */}
      <Headline
        title={textContent.page0.paragraphs}
        position={[introX, viewport.height * introY, 0]}
        maxWidth={viewport.width * introWidth}
      />

      {/* Work 1 - Vellum Dance */}
      <Image
        url="/images/vellum_dance_main.png"
        position={[w1X, viewport.height * w1Y, 0]}
        scale={[1.5, 0.9, 1]}
      />
      <Headline
        title={textContent.page1.title}
        position={[w1TitleX, viewport.height * w1TitleY, 0]}
        maxWidth={viewport.width * w1TitleWidth}
      />
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[w1DescX, viewport.height * w1DescY, 0]}
        maxWidth={viewport.width * w1DescWidth}
      />

      {/* Work 2 - Liquid Prism */}
      <Image
        url="/images/liquid_prism_main.png"
        position={[w2X, viewport.height * w2Y, 0]}
        scale={[1.2, 0.9, 1]}
      />
      <Headline
        title={textContent.page2.title}
        position={[w2TitleX, viewport.height * w2TitleY, 0]}
        maxWidth={viewport.width * w2TitleWidth}
      />
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[w2DescX, viewport.height * w2DescY, 0]}
        maxWidth={viewport.width * w2DescWidth}
      />

      {/* Work 3 - Swarm Dynamics */}
      <Image
        url="/images/particles_main.png"
        position={[w3X, viewport.height * w3Y, 0]}
        scale={[1.2, 0.9, 1]}
      />
      <Headline
        title={textContent.page3.title}
        position={[w3TitleX, viewport.height * w3TitleY, 0]}
        maxWidth={viewport.width * w3TitleWidth}
      />
      <Description
        paragraphs={textContent.page3.paragraphs}
        position={[w3DescX, viewport.height * w3DescY, 0]}
        maxWidth={viewport.width * w3DescWidth}
      />

      {/* Playground Section */}
      <PlaygroundSection
        position={[playX, viewport.height * playY, 0]}
        panelWidth={controls.panelWidth}
        panelHeight={controls.panelHeight}
        roundness={controls.roundness}
        borderColor={controls.borderColor}
        paddingX={controls.paddingX}
        paddingY={controls.paddingY}
        globalBorder={controls.globalBorder}
        mbRoundness={controls.mbRoundness}
        mbBorderColor={controls.mbBorderColor}
        mbPadding={controls.mbPadding}
        mbPaddingXMult={controls.mbPaddingXMult}
        mbPaddingYMult={controls.mbPaddingYMult}
      />

      {/* Get in Contact */}
      <group position={[conX, viewport.height * conY, 0]}>
        <TextWithBorder
          position={[conButtonX, conButtonY, 0]}
          roundness={controls.mbRoundness}
          color={controls.mbBorderColor}
          padding={controls.mbPadding}
          paddingXMult={controls.mbPaddingXMult}
          paddingYMult={controls.mbPaddingYMult}
          globalBorder={controls.globalBorder}
        >
          GET IN CONTACT
        </TextWithBorder>
        <Description
          paragraphs={[
            "Ready to create something amazing together? Let's talk.",
          ]}
          position={[conDescX, conDescY, 0]}
          maxWidth={conWidth}
        />
      </group>

      <Footer
        position={[0, viewport.height * footerY, 0]}
        footerControls={footerControls}
      />
    </group>
  )
}
