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
function Headline({
  title,
  position = [0, 0, 0],
  maxWidth,
  fontMultiplier = 0.045,
  fontColor,
}) {
  const { viewport } = useThree()

  return (
    <Text
      position={position}
      fontSize={viewport.height * fontMultiplier}
      color={fontColor}
      maxWidth={maxWidth}
      anchorX="left"
      anchorY="middle"
      font="/fonts/SeasonSerifTRIAL-Light.woff"
      letterSpacing={0.015}
      lineHeight={1.2}
    >
      {title}
    </Text>
  )
}

// Description component for reusability
function Description({
  paragraphs,
  position = [0, 0, 0],
  maxWidth,
  fontMultiplier = 0.023,
  fontColor,
}) {
  const { viewport } = useThree()

  return (
    <Text
      position={position}
      fontSize={viewport.height * fontMultiplier}
      color={fontColor}
      maxWidth={maxWidth}
      anchorX="left"
      anchorY="middle"
      font="/fonts/ibm-plex-mono-latin-400-normal.woff"
      letterSpacing={0.02}
      lineHeight={1.5}
    >
      {paragraphs.join("\n\n")}
    </Text>
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
  buttonBorder,
  mbRoundness,
  mbBorderColor,
  mbPadding,
  mbPaddingXMult,
  mbPaddingYMult,
  playHeaderFont,
  descFont,
  moreX,
  moreY,
  moreScale,
  moreButtonPaddingX,
  moreButtonPaddingY,
  globalBorder,
  borderX,
  borderY,
  globalFontColor,
  globalBorderColor,
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
        color={globalBorderColor}
        paddingX={paddingX}
        paddingY={paddingY}
        position={[borderX, borderY, 0]}
        zOffset={-0.1}
      />

      {/* Title */}
      <Text
        position={[-viewport.width * 0.35, viewport.height * 0.2, 0]}
        fontSize={viewport.height * playHeaderFont}
        color={globalFontColor}
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
        fontSize={viewport.height * descFont}
        color={globalFontColor}
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
      <TextWithBorder
        position={[moreX, viewport.height * moreY, 0]}
        roundness={0.1}
        color={globalFontColor}
        padding={moreButtonPaddingY}
        paddingXMult={moreButtonPaddingX / moreButtonPaddingY}
        paddingYMult={1.0}
        border={globalBorder}
        fontSize={viewport.height * 0.02}
        borderColor={globalBorderColor}
      >
        more
      </TextWithBorder>
    </group>
  )
}

function Footer({
  position = [0, 0, 0],
  footerControls,
  globalFontColor,
  globalSvgColor,
}) {
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
          startX + contentWidth * getFooterResponsiveValue("NavX"),
          viewport.height * getFooterResponsiveValue("NavY"),
          0,
        ]}
      >
        <Text
          position={[contentWidth * getFooterResponsiveValue("NavWorkX"), 0, 0]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Work
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavExpertiseX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Expertise
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavAboutX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          About
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavPlaygroundX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Playground
        </Text>
      </group>

      {/* Logo SVGs */}
      <group
        position={[
          startX + contentWidth * getFooterResponsiveValue("CHX"),
          viewport.height * getFooterResponsiveValue("CHY"),
          0,
        ]}
      >
        <Svg
          src="/svgs/C.svg"
          scale={viewport.height * getFooterResponsiveValue("CHScale")}
          position={[contentWidth * getFooterResponsiveValue("CX"), 0, 0]}
        />
        <Svg
          src="/svgs/H.svg"
          scale={viewport.height * getFooterResponsiveValue("CHScale")}
          position={[contentWidth * getFooterResponsiveValue("HX"), 0, 0]}
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
        {/* Address (3 lines) */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("AddressX"),
            viewport.height * getFooterResponsiveValue("AddressY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          lineHeight={1.3}
          textAlign="left"
        >
          {"Christian Hohenbild\nGleditschstr. 71\n10781 Berlin"}
        </Text>
        {/* Email + Phone (2 lines) */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("ContactEmailX"),
            viewport.height * getFooterResponsiveValue("EmailY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          lineHeight={1.3}
          textAlign="left"
        >
          {"christian@hohenbild.com\n+49 170 751 85 25"}
        </Text>

        {/* Social Links */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("SocialX"),
            viewport.height * getFooterResponsiveValue("SocialY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Instagram / LinkedIn
        </Text>

        {/* Legal */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("LegalX"),
            viewport.height * getFooterResponsiveValue("LegalY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
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
  // Generate controls from config
  const headerControls = useControls(
    generateControlsFromConfig(controlsConfig.header, folder),
    { collapsed: true }
  )
  const controls = useControls(
    generateControlsFromConfig(controlsConfig.content, folder),
    { collapsed: true }
  )
  const gridControls = useControls(
    generateControlsFromConfig(controlsConfig.content.grid, folder),
    { collapsed: true }
  )
  const footerControls = useControls(
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
  const w1ImgX = useResponsiveValue({
    mobile: controls.mobW1ImgX,
    tablet: controls.tabW1ImgX,
    desktop: controls.deskW1ImgX,
    large: controls.deskW1ImgX,
    ultrawide: controls.deskW1ImgX,
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
  const w2ImgX = useResponsiveValue({
    mobile: controls.mobW2ImgX,
    tablet: controls.tabW2ImgX,
    desktop: controls.deskW2ImgX,
    large: controls.deskW2ImgX,
    ultrawide: controls.deskW2ImgX,
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
  const w3ImgX = useResponsiveValue({
    mobile: controls.mobW3ImgX,
    tablet: controls.tabW3ImgX,
    desktop: controls.deskW3ImgX,
    large: controls.deskW3ImgX,
    ultrawide: controls.deskW3ImgX,
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

  // Work 1 MORE button hooks
  const w1MoreX = useResponsiveValue({
    mobile: controls.mobW1MoreX,
    tablet: controls.tabW1MoreX,
    desktop: controls.deskW1MoreX,
    large: controls.deskW1MoreX,
    ultrawide: controls.deskW1MoreX,
  })
  const w1MoreY = useResponsiveValue({
    mobile: controls.mobW1MoreY,
    tablet: controls.tabW1MoreY,
    desktop: controls.deskW1MoreY,
    large: controls.deskW1MoreY,
    ultrawide: controls.deskW1MoreY,
  })
  const w1MoreScale = useResponsiveValue({
    mobile: controls.mobW1MoreScale,
    tablet: controls.tabW1MoreScale,
    desktop: controls.deskW1MoreScale,
    large: controls.deskW1MoreScale,
    ultrawide: controls.deskW1MoreScale,
  })

  // Work 2 MORE button hooks
  const w2MoreX = useResponsiveValue({
    mobile: controls.mobW2MoreX,
    tablet: controls.tabW2MoreX,
    desktop: controls.deskW2MoreX,
    large: controls.deskW2MoreX,
    ultrawide: controls.deskW2MoreX,
  })
  const w2MoreY = useResponsiveValue({
    mobile: controls.mobW2MoreY,
    tablet: controls.tabW2MoreY,
    desktop: controls.deskW2MoreY,
    large: controls.deskW2MoreY,
    ultrawide: controls.deskW2MoreY,
  })
  const w2MoreScale = useResponsiveValue({
    mobile: controls.mobW2MoreScale,
    tablet: controls.tabW2MoreScale,
    desktop: controls.deskW2MoreScale,
    large: controls.deskW2MoreScale,
    ultrawide: controls.deskW2MoreScale,
  })

  // Work 3 MORE button hooks
  const w3MoreX = useResponsiveValue({
    mobile: controls.mobW3MoreX,
    tablet: controls.tabW3MoreX,
    desktop: controls.deskW3MoreX,
    large: controls.deskW3MoreX,
    ultrawide: controls.deskW3MoreX,
  })
  const w3MoreY = useResponsiveValue({
    mobile: controls.mobW3MoreY,
    tablet: controls.tabW3MoreY,
    desktop: controls.deskW3MoreY,
    large: controls.deskW3MoreY,
    ultrawide: controls.deskW3MoreY,
  })
  const w3MoreScale = useResponsiveValue({
    mobile: controls.mobW3MoreScale,
    tablet: controls.tabW3MoreScale,
    desktop: controls.deskW3MoreScale,
    large: controls.deskW3MoreScale,
    ultrawide: controls.deskW3MoreScale,
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

  // Playground MORE button hooks
  const playMoreX = useResponsiveValue({
    mobile: controls.mobPlayMoreX,
    tablet: controls.tabPlayMoreX,
    desktop: controls.deskPlayMoreX,
    large: controls.deskPlayMoreX,
    ultrawide: controls.deskPlayMoreX,
  })
  const playMoreY = useResponsiveValue({
    mobile: controls.mobPlayMoreY,
    tablet: controls.tabPlayMoreY,
    desktop: controls.deskPlayMoreY,
    large: controls.deskPlayMoreY,
    ultrawide: controls.deskPlayMoreY,
  })
  const playMoreScale = useResponsiveValue({
    mobile: controls.mobPlayMoreScale,
    tablet: controls.tabPlayMoreScale,
    desktop: controls.deskPlayMoreScale,
    large: controls.deskPlayMoreScale,
    ultrawide: controls.deskPlayMoreScale,
  })

  // Playground border controls
  const playBorderWidth = useResponsiveValue({
    mobile: controls.mobPlayBorderWidth,
    tablet: controls.tabPlayBorderWidth,
    desktop: controls.deskPlayBorderWidth,
    large: controls.deskPlayBorderWidth,
    ultrawide: controls.deskPlayBorderWidth,
  })
  const playBorderHeight = useResponsiveValue({
    mobile: controls.mobPlayBorderHeight,
    tablet: controls.tabPlayBorderHeight,
    desktop: controls.deskPlayBorderHeight,
    large: controls.deskPlayBorderHeight,
    ultrawide: controls.deskPlayBorderHeight,
  })
  const playBorderX = useResponsiveValue({
    mobile: controls.mobPlayBorderX,
    tablet: controls.tabPlayBorderX,
    desktop: controls.deskPlayBorderX,
    large: controls.deskPlayBorderX,
    ultrawide: controls.deskPlayBorderX,
  })
  const playBorderY = useResponsiveValue({
    mobile: controls.mobPlayBorderY,
    tablet: controls.tabPlayBorderY,
    desktop: controls.deskPlayBorderY,
    large: controls.deskPlayBorderY,
    ultrawide: controls.deskPlayBorderY,
  })

  // Global MORE button padding controls
  const moreButtonPaddingX = useResponsiveValue({
    mobile: controls.mobMoreButtonPaddingX,
    tablet: controls.tabMoreButtonPaddingX,
    desktop: controls.deskMoreButtonPaddingX,
    large: controls.deskMoreButtonPaddingX,
    ultrawide: controls.deskMoreButtonPaddingX,
  })
  const moreButtonPaddingY = useResponsiveValue({
    mobile: controls.mobMoreButtonPaddingY,
    tablet: controls.tabMoreButtonPaddingY,
    desktop: controls.deskMoreButtonPaddingY,
    large: controls.deskMoreButtonPaddingY,
    ultrawide: controls.deskMoreButtonPaddingY,
  })

  // Global color controls
  const globalFontColor = useResponsiveValue({
    mobile: controls.mobGlobalFontColor,
    tablet: controls.tabGlobalFontColor,
    desktop: controls.deskGlobalFontColor,
    large: controls.deskGlobalFontColor,
    ultrawide: controls.deskGlobalFontColor,
  })
  const globalBorderColor = useResponsiveValue({
    mobile: controls.mobGlobalBorderColor,
    tablet: controls.tabGlobalBorderColor,
    desktop: controls.deskGlobalBorderColor,
    large: controls.deskGlobalBorderColor,
    ultrawide: controls.deskGlobalBorderColor,
  })
  const globalSvgColor = useResponsiveValue({
    mobile: controls.mobGlobalSvgColor,
    tablet: controls.tabGlobalSvgColor,
    desktop: controls.deskGlobalSvgColor,
    large: controls.deskGlobalSvgColor,
    ultrawide: controls.deskGlobalSvgColor,
  })

  // Grid visibility control
  const gridVisible = useResponsiveValue({
    mobile: gridControls.mobGridVisible,
    tablet: gridControls.tabGridVisible,
    desktop: gridControls.deskGridVisible,
    large: gridControls.deskGridVisible,
    ultrawide: gridControls.deskGridVisible,
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
  const conButtonScale = useResponsiveValue({
    mobile: controls.mobConButtonScale,
    tablet: controls.tabConButtonScale,
    desktop: controls.deskConButtonScale,
    large: controls.deskConButtonScale,
    ultrawide: controls.deskConButtonScale,
  })
  const conButtonPaddingX = useResponsiveValue({
    mobile: controls.mobConButtonPaddingX,
    tablet: controls.tabConButtonPaddingX,
    desktop: controls.deskConButtonPaddingX,
    large: controls.deskConButtonPaddingX,
    ultrawide: controls.deskConButtonPaddingX,
  })
  const conButtonPaddingY = useResponsiveValue({
    mobile: controls.mobConButtonPaddingY,
    tablet: controls.tabConButtonPaddingY,
    desktop: controls.deskConButtonPaddingY,
    large: controls.deskConButtonPaddingY,
    ultrawide: controls.deskConButtonPaddingY,
  })
  const conButtonRoundness = useResponsiveValue({
    mobile: controls.mobConButtonRoundness,
    tablet: controls.tabConButtonRoundness,
    desktop: controls.deskConButtonRoundness,
    large: controls.deskConButtonRoundness,
    ultrawide: controls.deskConButtonRoundness,
  })
  const conButtonBorder = useResponsiveValue({
    mobile: controls.mobConButtonBorder,
    tablet: controls.tabConButtonBorder,
    desktop: controls.deskConButtonBorder,
    large: controls.deskConButtonBorder,
    ultrawide: controls.deskConButtonBorder,
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

  const footerNavY = useResponsiveValue({
    mobile: footerControls.mobFooterNavY,
    tablet: footerControls.tabFooterNavY,
    desktop: footerControls.deskFooterNavY,
    large: footerControls.deskFooterNavY,
    ultrawide: footerControls.deskFooterNavY,
  })

  const footerNavX = useResponsiveValue({
    mobile: footerControls.mobFooterNavX,
    tablet: footerControls.tabFooterNavX,
    desktop: footerControls.deskFooterNavX,
    large: footerControls.deskFooterNavX,
    ultrawide: footerControls.deskFooterNavX,
  })

  const footerNavWorkX = useResponsiveValue({
    mobile: footerControls.mobFooterNavWorkX,
    tablet: footerControls.tabFooterNavWorkX,
    desktop: footerControls.deskFooterNavWorkX,
    large: footerControls.deskFooterNavWorkX,
    ultrawide: footerControls.deskFooterNavWorkX,
  })

  const footerNavExpertiseX = useResponsiveValue({
    mobile: footerControls.mobFooterNavExpertiseX,
    tablet: footerControls.tabFooterNavExpertiseX,
    desktop: footerControls.deskFooterNavExpertiseX,
    large: footerControls.deskFooterNavExpertiseX,
    ultrawide: footerControls.deskFooterNavExpertiseX,
  })

  const footerNavAboutX = useResponsiveValue({
    mobile: footerControls.mobFooterNavAboutX,
    tablet: footerControls.tabFooterNavAboutX,
    desktop: footerControls.deskFooterNavAboutX,
    large: footerControls.deskFooterNavAboutX,
    ultrawide: footerControls.deskFooterNavAboutX,
  })

  const footerNavPlaygroundX = useResponsiveValue({
    mobile: footerControls.mobFooterNavPlaygroundX,
    tablet: footerControls.tabFooterNavPlaygroundX,
    desktop: footerControls.deskFooterNavPlaygroundX,
    large: footerControls.deskFooterNavPlaygroundX,
    ultrawide: footerControls.deskFooterNavPlaygroundX,
  })

  const footerLogoX = useResponsiveValue({
    mobile: footerControls.mobFooterLogoX,
    tablet: footerControls.tabFooterLogoX,
    desktop: footerControls.deskFooterLogoX,
    large: footerControls.deskFooterLogoX,
    ultrawide: footerControls.deskFooterLogoX,
  })

  const footerLogoY = useResponsiveValue({
    mobile: footerControls.mobFooterLogoY,
    tablet: footerControls.tabFooterLogoY,
    desktop: footerControls.deskFooterLogoY,
    large: footerControls.deskFooterLogoY,
    ultrawide: footerControls.deskFooterLogoY,
  })

  const footerCHX = useResponsiveValue({
    mobile: footerControls.mobFooterCHX,
    tablet: footerControls.tabFooterCHX,
    desktop: footerControls.deskFooterCHX,
    large: footerControls.deskFooterCHX,
    ultrawide: footerControls.deskFooterCHX,
  })

  const footerCHY = useResponsiveValue({
    mobile: footerControls.mobFooterCHY,
    tablet: footerControls.tabFooterCHY,
    desktop: footerControls.deskFooterCHY,
    large: footerControls.deskFooterCHY,
    ultrawide: footerControls.deskFooterCHY,
  })

  const footerCHScale = useResponsiveValue({
    mobile: footerControls.mobFooterCHScale,
    tablet: footerControls.tabFooterCHScale,
    desktop: footerControls.deskFooterCHScale,
    large: footerControls.deskFooterCHScale,
    ultrawide: footerControls.deskFooterCHScale,
  })

  const footerCX = useResponsiveValue({
    mobile: footerControls.mobFooterCX,
    tablet: footerControls.tabFooterCX,
    desktop: footerControls.deskFooterCX,
    large: footerControls.deskFooterCX,
    ultrawide: footerControls.deskFooterCX,
  })

  const footerHX = useResponsiveValue({
    mobile: footerControls.mobFooterHX,
    tablet: footerControls.tabFooterHX,
    desktop: footerControls.deskFooterHX,
    large: footerControls.deskFooterHX,
    ultrawide: footerControls.deskFooterHX,
  })

  const footerContactY = useResponsiveValue({
    mobile: footerControls.mobFooterContactY,
    tablet: footerControls.tabFooterContactY,
    desktop: footerControls.deskFooterContactY,
    large: footerControls.deskFooterContactY,
    ultrawide: footerControls.deskFooterContactY,
  })

  const footerContactEmailX = useResponsiveValue({
    mobile: footerControls.mobFooterContactEmailX,
    tablet: footerControls.tabFooterContactEmailX,
    desktop: footerControls.deskFooterContactEmailX,
    large: footerControls.deskFooterContactEmailX,
    ultrawide: footerControls.deskFooterContactEmailX,
  })

  const footerAddressX = useResponsiveValue({
    mobile: footerControls.mobFooterAddressX,
    tablet: footerControls.tabFooterAddressX,
    desktop: footerControls.deskFooterAddressX,
    large: footerControls.deskFooterAddressX,
    ultrawide: footerControls.deskFooterAddressX,
  })

  const footerAddressY = useResponsiveValue({
    mobile: footerControls.mobFooterAddressY,
    tablet: footerControls.tabFooterAddressY,
    desktop: footerControls.deskFooterAddressY,
    large: footerControls.deskFooterAddressY,
    ultrawide: footerControls.deskFooterAddressY,
  })

  const footerEmailY = useResponsiveValue({
    mobile: footerControls.mobFooterEmailY,
    tablet: footerControls.tabFooterEmailY,
    desktop: footerControls.deskFooterEmailY,
    large: footerControls.deskFooterEmailY,
    ultrawide: footerControls.deskFooterEmailY,
  })

  const footerSocialX = useResponsiveValue({
    mobile: footerControls.mobFooterSocialX,
    tablet: footerControls.tabFooterSocialX,
    desktop: footerControls.deskFooterSocialX,
    large: footerControls.deskFooterSocialX,
    ultrawide: footerControls.deskFooterSocialX,
  })

  const footerSocialY = useResponsiveValue({
    mobile: footerControls.mobFooterSocialY,
    tablet: footerControls.tabFooterSocialY,
    desktop: footerControls.deskFooterSocialY,
    large: footerControls.deskFooterSocialY,
    ultrawide: footerControls.deskFooterSocialY,
  })

  const footerLegalX = useResponsiveValue({
    mobile: footerControls.mobFooterLegalX,
    tablet: footerControls.tabFooterLegalX,
    desktop: footerControls.deskFooterLegalX,
    large: footerControls.deskFooterLegalX,
    ultrawide: footerControls.deskFooterLegalX,
  })

  const footerLegalY = useResponsiveValue({
    mobile: footerControls.mobFooterLegalY,
    tablet: footerControls.tabFooterLegalY,
    desktop: footerControls.deskFooterLegalY,
    large: footerControls.deskFooterLegalY,
    ultrawide: footerControls.deskFooterLegalY,
  })

  const footerTextY = useResponsiveValue({
    mobile: footerControls.mobFooterTextY,
    tablet: footerControls.tabFooterTextY,
    desktop: footerControls.deskFooterTextY,
    large: footerControls.deskFooterTextY,
    ultrawide: footerControls.deskFooterTextY,
  })

  const footerTextFont = useResponsiveValue({
    mobile: footerControls.mobFooterTextFont,
    tablet: footerControls.tabFooterTextFont,
    desktop: footerControls.deskFooterTextFont,
    large: footerControls.deskFooterTextFont,
    ultrawide: footerControls.deskFooterTextFont,
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
    deskGlobalButtonBorder: controls.deskGlobalButtonBorder,
    tabGlobalButtonBorder: controls.tabGlobalButtonBorder,
    mobGlobalButtonBorder: controls.mobGlobalButtonBorder,
    deskHeadlineFont: controls.deskHeadlineFont,
    tabHeadlineFont: controls.tabHeadlineFont,
    mobHeadlineFont: controls.mobHeadlineFont,
    deskDescFont: controls.deskDescFont,
    tabDescFont: controls.tabDescFont,
    mobDescFont: controls.mobDescFont,

    // Panel controls (manually defined since removed from config)
    deskPanelWidth: 1.2,
    tabPanelWidth: 1.2,
    mobPanelWidth: 1.2,
    deskPanelHeight: 0.8,
    tabPanelHeight: 0.8,
    mobPanelHeight: 0.8,
    deskRoundness: 0.1,
    tabRoundness: 0.1,
    mobRoundness: 0.1,
    deskBorderColor: "#38358f",
    tabBorderColor: "#38358f",
    mobBorderColor: "#38358f",
    deskPaddingX: 0.1,
    tabPaddingX: 0.1,
    mobPaddingX: 0.1,
    deskPaddingY: 0.1,
    tabPaddingY: 0.1,
    mobPaddingY: 0.1,
    deskMbRoundness: 0.1,
    tabMbRoundness: 0.1,
    mobMbRoundness: 0.1,
    deskMbBorderColor: "#38358f",
    tabMbBorderColor: "#38358f",
    mobMbBorderColor: "#38358f",
    deskMbPadding: 0.2,
    tabMbPadding: 0.2,
    mobMbPadding: 0.2,
    deskMbPaddingXMult: 1.0,
    tabMbPaddingXMult: 1.0,
    mobMbPaddingXMult: 1.0,
    deskMbPaddingYMult: 1.0,
    tabMbPaddingYMult: 1.0,
    mobMbPaddingYMult: 1.0,

    deskIntroX: controls.deskIntroX,
    tabIntroX: controls.tabIntroX,
    mobIntroX: controls.mobIntroX,
    deskIntroY: controls.deskIntroY,
    tabIntroY: controls.tabIntroY,
    mobIntroY: controls.mobIntroY,
    deskIntroWidth: controls.deskIntroWidth,
    tabIntroWidth: controls.tabIntroWidth,
    mobIntroWidth: controls.mobIntroWidth,

    // Playground fonts
    deskPlayHeaderFont: controls.deskPlayHeaderFont,
    tabPlayHeaderFont: controls.tabPlayHeaderFont,
    mobPlayHeaderFont: controls.mobPlayHeaderFont,

    // Work 1
    deskW1ImgX: controls.deskW1ImgX,
    tabW1ImgX: controls.tabW1ImgX,
    mobW1ImgX: controls.mobW1ImgX,
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
    deskW1ImgScaleX: controls.deskW1ImgScaleX,
    tabW1ImgScaleX: controls.tabW1ImgScaleX,
    mobW1ImgScaleX: controls.mobW1ImgScaleX,
    deskW1ImgScaleY: controls.deskW1ImgScaleY,
    tabW1ImgScaleY: controls.tabW1ImgScaleY,
    mobW1ImgScaleY: controls.mobW1ImgScaleY,
    deskW1MoreX: controls.deskW1MoreX,
    tabW1MoreX: controls.tabW1MoreX,
    mobW1MoreX: controls.mobW1MoreX,
    deskW1MoreY: controls.deskW1MoreY,
    tabW1MoreY: controls.tabW1MoreY,
    mobW1MoreY: controls.mobW1MoreY,
    deskW1MoreScale: controls.deskW1MoreScale,
    tabW1MoreScale: controls.tabW1MoreScale,
    mobW1MoreScale: controls.mobW1MoreScale,

    // Work 2
    deskW2ImgX: controls.deskW2ImgX,
    tabW2ImgX: controls.tabW2ImgX,
    mobW2ImgX: controls.mobW2ImgX,
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
    deskW2ImgScaleX: controls.deskW2ImgScaleX,
    tabW2ImgScaleX: controls.tabW2ImgScaleX,
    mobW2ImgScaleX: controls.mobW2ImgScaleX,
    deskW2ImgScaleY: controls.deskW2ImgScaleY,
    tabW2ImgScaleY: controls.tabW2ImgScaleY,
    mobW2ImgScaleY: controls.mobW2ImgScaleY,
    deskW2MoreX: controls.deskW2MoreX,
    tabW2MoreX: controls.tabW2MoreX,
    mobW2MoreX: controls.mobW2MoreX,
    deskW2MoreY: controls.deskW2MoreY,
    tabW2MoreY: controls.tabW2MoreY,
    mobW2MoreY: controls.mobW2MoreY,
    deskW2MoreScale: controls.deskW2MoreScale,
    tabW2MoreScale: controls.tabW2MoreScale,
    mobW2MoreScale: controls.mobW2MoreScale,

    // Work 3
    deskW3ImgX: controls.deskW3ImgX,
    tabW3ImgX: controls.tabW3ImgX,
    mobW3ImgX: controls.mobW3ImgX,
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
    deskW3ImgScaleX: controls.deskW3ImgScaleX,
    tabW3ImgScaleX: controls.tabW3ImgScaleX,
    mobW3ImgScaleX: controls.mobW3ImgScaleX,
    deskW3ImgScaleY: controls.deskW3ImgScaleY,
    tabW3ImgScaleY: controls.tabW3ImgScaleY,
    mobW3ImgScaleY: controls.mobW3ImgScaleY,
    deskW3MoreX: controls.deskW3MoreX,
    tabW3MoreX: controls.tabW3MoreX,
    mobW3MoreX: controls.mobW3MoreX,
    deskW3MoreY: controls.deskW3MoreY,
    tabW3MoreY: controls.tabW3MoreY,
    mobW3MoreY: controls.mobW3MoreY,
    deskW3MoreScale: controls.deskW3MoreScale,
    tabW3MoreScale: controls.tabW3MoreScale,
    mobW3MoreScale: controls.mobW3MoreScale,

    // Playground
    deskPlayX: controls.deskPlayX,
    tabPlayX: controls.tabPlayX,
    mobPlayX: controls.mobPlayX,
    deskPlayY: controls.deskPlayY,
    tabPlayY: controls.tabPlayY,
    mobPlayY: controls.mobPlayY,
    deskPlayMoreX: controls.deskPlayMoreX,
    tabPlayMoreX: controls.tabPlayMoreX,
    mobPlayMoreX: controls.mobPlayMoreX,
    deskPlayMoreY: controls.deskPlayMoreY,
    tabPlayMoreY: controls.tabPlayMoreY,
    mobPlayMoreY: controls.mobPlayMoreY,
    deskPlayMoreScale: controls.deskPlayMoreScale,
    tabPlayMoreScale: controls.tabPlayMoreScale,
    mobPlayMoreScale: controls.mobPlayMoreScale,
    deskPlayBorderWidth: controls.deskPlayBorderWidth,
    tabPlayBorderWidth: controls.tabPlayBorderWidth,
    mobPlayBorderWidth: controls.mobPlayBorderWidth,
    deskPlayBorderHeight: controls.deskPlayBorderHeight,
    tabPlayBorderHeight: controls.tabPlayBorderHeight,
    mobPlayBorderHeight: controls.mobPlayBorderHeight,
    deskPlayBorderX: controls.deskPlayBorderX,
    tabPlayBorderX: controls.tabPlayBorderX,
    mobPlayBorderX: controls.mobPlayBorderX,
    deskPlayBorderY: controls.deskPlayBorderY,
    tabPlayBorderY: controls.tabPlayBorderY,
    mobPlayBorderY: controls.mobPlayBorderY,
    deskMoreButtonPaddingX: controls.deskMoreButtonPaddingX,
    tabMoreButtonPaddingX: controls.tabMoreButtonPaddingX,
    mobMoreButtonPaddingX: controls.mobMoreButtonPaddingX,
    deskMoreButtonPaddingY: controls.deskMoreButtonPaddingY,
    tabMoreButtonPaddingY: controls.tabMoreButtonPaddingY,
    mobMoreButtonPaddingY: controls.mobMoreButtonPaddingY,
    deskGridVisible: controls.deskGridVisible,
    tabGridVisible: controls.tabGridVisible,
    mobGridVisible: controls.mobGridVisible,
    deskSidePadding: gridControls.deskSidePadding,
    tabSidePadding: gridControls.tabSidePadding,
    mobSidePadding: gridControls.mobSidePadding,

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
    deskConButtonScale: controls.deskConButtonScale,
    tabConButtonScale: controls.tabConButtonScale,
    mobConButtonScale: controls.mobConButtonScale,
    deskConButtonPaddingX: controls.deskConButtonPaddingX,
    tabConButtonPaddingX: controls.tabConButtonPaddingX,
    mobConButtonPaddingX: controls.mobConButtonPaddingX,
    deskConButtonPaddingY: controls.deskConButtonPaddingY,
    tabConButtonPaddingY: controls.tabConButtonPaddingY,
    mobConButtonPaddingY: controls.mobConButtonPaddingY,
    deskConButtonRoundness: controls.deskConButtonRoundness,
    tabConButtonRoundness: controls.tabConButtonRoundness,
    mobConButtonRoundness: controls.mobConButtonRoundness,
    deskConButtonBorder: controls.deskConButtonBorder,
    tabConButtonBorder: controls.tabConButtonBorder,
    mobConButtonBorder: controls.mobConButtonBorder,
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
    deskFooterNavX: footerControls.deskFooterNavX,
    tabFooterNavX: footerControls.tabFooterNavX,
    mobFooterNavX: footerControls.mobFooterNavX,
    deskFooterNavWorkX: footerControls.deskFooterNavWorkX,
    tabFooterNavWorkX: footerControls.tabFooterNavWorkX,
    mobFooterNavWorkX: footerControls.mobFooterNavWorkX,
    deskFooterNavExpertiseX: footerControls.deskFooterNavExpertiseX,
    tabFooterNavExpertiseX: footerControls.tabFooterNavExpertiseX,
    mobFooterNavExpertiseX: footerControls.mobFooterNavExpertiseX,
    deskFooterNavAboutX: footerControls.deskFooterNavAboutX,
    tabFooterNavAboutX: footerControls.tabFooterNavAboutX,
    mobFooterNavAboutX: footerControls.mobFooterNavAboutX,
    deskFooterNavPlaygroundX: footerControls.deskFooterNavPlaygroundX,
    tabFooterNavPlaygroundX: footerControls.tabFooterNavPlaygroundX,
    mobFooterNavPlaygroundX: footerControls.mobFooterNavPlaygroundX,
    deskFooterLogoX: footerControls.deskFooterLogoX,
    tabFooterLogoX: footerControls.tabFooterLogoX,
    mobFooterLogoX: footerControls.mobFooterLogoX,
    deskFooterLogoY: footerControls.deskFooterLogoY,
    tabFooterLogoY: footerControls.tabFooterLogoY,
    mobFooterLogoY: footerControls.mobFooterLogoY,
    // Footer CH controls
    deskFooterCHX: footerControls.deskFooterCHX,
    tabFooterCHX: footerControls.tabFooterCHX,
    mobFooterCHX: footerControls.mobFooterCHX,
    deskFooterCHY: footerControls.deskFooterCHY,
    tabFooterCHY: footerControls.tabFooterCHY,
    mobFooterCHY: footerControls.mobFooterCHY,
    deskFooterCHScale: footerControls.deskFooterCHScale,
    tabFooterCHScale: footerControls.tabFooterCHScale,
    mobFooterCHScale: footerControls.mobFooterCHScale,
    deskFooterCX: footerControls.deskFooterCX,
    tabFooterCX: footerControls.tabFooterCX,
    mobFooterCX: footerControls.mobFooterCX,
    deskFooterHX: footerControls.deskFooterHX,
    tabFooterHX: footerControls.tabFooterHX,
    mobFooterHX: footerControls.mobFooterHX,
    deskFooterContactY: footerControls.deskFooterContactY,
    tabFooterContactY: footerControls.tabFooterContactY,
    mobFooterContactY: footerControls.mobFooterContactY,
    deskFooterContactEmailX: footerControls.deskFooterContactEmailX,
    tabFooterContactEmailX: footerControls.tabFooterContactEmailX,
    mobFooterContactEmailX: footerControls.mobFooterContactEmailX,
    deskFooterAddressX: footerControls.deskFooterAddressX,
    tabFooterAddressX: footerControls.tabFooterAddressX,
    mobFooterAddressX: footerControls.mobFooterAddressX,
    deskFooterAddressY: footerControls.deskFooterAddressY,
    tabFooterAddressY: footerControls.tabFooterAddressY,
    mobFooterAddressY: footerControls.mobFooterAddressY,
    deskFooterEmailY: footerControls.deskFooterEmailY,
    tabFooterEmailY: footerControls.tabFooterEmailY,
    mobFooterEmailY: footerControls.mobFooterEmailY,
    deskFooterSocialX: footerControls.deskFooterSocialX,
    tabFooterSocialX: footerControls.tabFooterSocialX,
    mobFooterSocialX: footerControls.mobFooterSocialX,
    deskFooterSocialY: footerControls.deskFooterSocialY,
    tabFooterSocialY: footerControls.tabFooterSocialY,
    mobFooterSocialY: footerControls.mobFooterSocialY,
    deskFooterLegalX: footerControls.deskFooterLegalX,
    tabFooterLegalX: footerControls.tabFooterLegalX,
    mobFooterLegalX: footerControls.mobFooterLegalX,
    deskFooterLegalY: footerControls.deskFooterLegalY,
    tabFooterLegalY: footerControls.tabFooterLegalY,
    mobFooterLegalY: footerControls.mobFooterLegalY,
    deskFooterTextFont: footerControls.deskFooterTextFont,
    tabFooterTextFont: footerControls.tabFooterTextFont,
    mobFooterTextFont: footerControls.mobFooterTextFont,
    deskFooterTextY: footerControls.deskFooterTextY,
    tabFooterTextY: footerControls.tabFooterTextY,
    mobFooterTextY: footerControls.mobFooterTextY,
    mobGlobalFontColor: controls.mobGlobalFontColor,
    tabGlobalFontColor: controls.tabGlobalFontColor,
    deskGlobalFontColor: controls.deskGlobalFontColor,
    mobGlobalBorderColor: controls.mobGlobalBorderColor,
    tabGlobalBorderColor: controls.tabGlobalBorderColor,
    deskGlobalBorderColor: controls.deskGlobalBorderColor,
    mobGlobalSvgColor: controls.mobGlobalSvgColor,
    tabGlobalSvgColor: controls.tabGlobalSvgColor,
    deskGlobalSvgColor: controls.deskGlobalSvgColor,
  })

  // Animation
  useFrame(() => {
    if (group.current && scroll.range) {
      group.current.position.y = scroll.offset * 4.2 * viewport.height
    }
  })

  return (
    <group ref={group}>
      {gridVisible && <Grid />}
      <Header
        textStyles={textStyles}
        globalFontColor={globalFontColor}
        globalSvgColor={globalSvgColor}
      />

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
        fontColor={globalFontColor}
      />

      {/* Work 1 - Vellum Dance */}
      <Image
        url="/images/vellum_dance_main.png"
        position={[w1ImgX, viewport.height * w1Y, 0]}
        scale={[controls.deskW1ImgScaleX, controls.deskW1ImgScaleY, 1]}
      />
      <Headline
        title={textContent.page1.title}
        position={[w1TitleX, viewport.height * w1TitleY, 0]}
        maxWidth={viewport.width * w1TitleWidth}
        fontMultiplier={controls.deskHeadlineFont}
        fontColor={globalFontColor}
      />
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[w1DescX, viewport.height * w1DescY, 0]}
        maxWidth={viewport.width * w1DescWidth}
        fontMultiplier={controls.deskDescFont}
        fontColor={globalFontColor}
      />
      <TextWithBorder
        position={[w1MoreX, viewport.height * w1MoreY, 0]}
        roundness={0.1}
        color={globalFontColor}
        padding={moreButtonPaddingY}
        paddingXMult={moreButtonPaddingX / moreButtonPaddingY}
        paddingYMult={1.0}
        border={controls.deskGlobalBorder}
        fontSize={viewport.height * 0.02}
        borderColor={globalBorderColor}
      >
        more
      </TextWithBorder>

      {/* Work 2 - Liquid Prism */}
      <Image
        url="/images/liquid_prism_main.png"
        position={[w2ImgX, viewport.height * w2Y, 0]}
        scale={[controls.deskW2ImgScaleX, controls.deskW2ImgScaleY, 1]}
      />
      <Headline
        title={textContent.page2.title}
        position={[w2TitleX, viewport.height * w2TitleY, 0]}
        maxWidth={viewport.width * w2TitleWidth}
        fontMultiplier={controls.deskHeadlineFont}
        fontColor={globalFontColor}
      />
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[w2DescX, viewport.height * w2DescY, 0]}
        maxWidth={viewport.width * w2DescWidth}
        fontMultiplier={controls.deskDescFont}
        fontColor={globalFontColor}
      />
      <TextWithBorder
        position={[w2MoreX, viewport.height * w2MoreY, 0]}
        roundness={0.1}
        color={globalFontColor}
        padding={moreButtonPaddingY}
        paddingXMult={moreButtonPaddingX / moreButtonPaddingY}
        paddingYMult={1.0}
        border={controls.deskGlobalBorder}
        fontSize={viewport.height * 0.02}
        borderColor={globalBorderColor}
      >
        more
      </TextWithBorder>

      {/* Work 3 - Swarm Dynamics */}
      <Image
        url="/images/particles_main.png"
        position={[w3ImgX, viewport.height * w3Y, 0]}
        scale={[controls.deskW3ImgScaleX, controls.deskW3ImgScaleY, 1]}
      />
      <Headline
        title={textContent.page3.title}
        position={[w3TitleX, viewport.height * w3TitleY, 0]}
        maxWidth={viewport.width * w3TitleWidth}
        fontMultiplier={controls.deskHeadlineFont}
        fontColor={globalFontColor}
      />
      <Description
        paragraphs={textContent.page3.paragraphs}
        position={[w3DescX, viewport.height * w3DescY, 0]}
        maxWidth={viewport.width * w3DescWidth}
        fontMultiplier={controls.deskDescFont}
        fontColor={globalFontColor}
      />
      <TextWithBorder
        position={[w3MoreX, viewport.height * w3MoreY, 0]}
        roundness={0.1}
        color={globalFontColor}
        padding={moreButtonPaddingY}
        paddingXMult={moreButtonPaddingX / moreButtonPaddingY}
        paddingYMult={1.0}
        border={controls.deskGlobalBorder}
        fontSize={viewport.height * 0.02}
        borderColor={globalBorderColor}
      >
        more
      </TextWithBorder>

      {/* Playground Section */}
      <PlaygroundSection
        position={[playX, viewport.height * playY, 0]}
        panelWidth={playBorderWidth}
        panelHeight={playBorderHeight}
        roundness={0}
        borderColor="#38358f"
        paddingX={0.1}
        paddingY={0.1}
        buttonBorder={controls.deskGlobalButtonBorder}
        mbRoundness={0.1}
        mbBorderColor="#38358f"
        mbPadding={0.2}
        mbPaddingXMult={1.0}
        mbPaddingYMult={1.0}
        playHeaderFont={controls.deskPlayHeaderFont}
        descFont={controls.deskDescFont}
        moreX={playMoreX}
        moreY={playMoreY}
        moreScale={playMoreScale}
        moreButtonPaddingX={moreButtonPaddingX}
        moreButtonPaddingY={moreButtonPaddingY}
        globalBorder={controls.deskGlobalBorder}
        borderX={playBorderX}
        borderY={playBorderY}
        globalFontColor={globalFontColor}
        globalBorderColor={globalBorderColor}
      />

      {/* Get in Contact */}
      <group position={[conX, viewport.height * conY, 0]}>
        <TextWithBorder
          position={[conButtonX, conButtonY, 0]}
          scale={conButtonScale}
          roundness={conButtonRoundness}
          color={globalFontColor}
          padding={conButtonPaddingY}
          paddingXMult={conButtonPaddingX / conButtonPaddingY}
          paddingYMult={1.0}
          border={conButtonBorder}
          fontSize={viewport.height * 0.02}
          borderColor={globalBorderColor}
        >
          GET IN CONTACT
        </TextWithBorder>
        <Description
          paragraphs={[
            "Ready to create something amazing together? Let's talk.",
          ]}
          position={[conDescX, conDescY, 0]}
          maxWidth={conWidth}
          fontColor={globalFontColor}
        />
      </group>

      <Footer
        position={[0, viewport.height * footerY, 0]}
        footerControls={{
          mobFooterNavX: footerControls.mobFooterNavX,
          tabFooterNavX: footerControls.tabFooterNavX,
          deskFooterNavX: footerControls.deskFooterNavX,
          mobFooterNavY: footerControls.mobFooterNavY,
          tabFooterNavY: footerControls.tabFooterNavY,
          deskFooterNavY: footerControls.deskFooterNavY,
          mobFooterNavWorkX: footerControls.mobFooterNavWorkX,
          tabFooterNavWorkX: footerControls.tabFooterNavWorkX,
          deskFooterNavWorkX: footerControls.deskFooterNavWorkX,
          mobFooterNavExpertiseX: footerControls.mobFooterNavExpertiseX,
          tabFooterNavExpertiseX: footerControls.tabFooterNavExpertiseX,
          deskFooterNavExpertiseX: footerControls.deskFooterNavExpertiseX,
          mobFooterNavAboutX: footerControls.mobFooterNavAboutX,
          tabFooterNavAboutX: footerControls.tabFooterNavAboutX,
          deskFooterNavAboutX: footerControls.deskFooterNavAboutX,
          mobFooterNavPlaygroundX: footerControls.mobFooterNavPlaygroundX,
          tabFooterNavPlaygroundX: footerControls.tabFooterNavPlaygroundX,
          deskFooterNavPlaygroundX: footerControls.deskFooterNavPlaygroundX,
          mobFooterCHX: footerControls.mobFooterCHX,
          tabFooterCHX: footerControls.tabFooterCHX,
          deskFooterCHX: footerControls.deskFooterCHX,
          mobFooterCHY: footerControls.mobFooterCHY,
          tabFooterCHY: footerControls.tabFooterCHY,
          deskFooterCHY: footerControls.deskFooterCHY,
          mobFooterCHScale: footerControls.mobFooterCHScale,
          tabFooterCHScale: footerControls.tabFooterCHScale,
          deskFooterCHScale: footerControls.deskFooterCHScale,
          mobFooterCX: footerControls.mobFooterCX,
          tabFooterCX: footerControls.tabFooterCX,
          deskFooterCX: footerControls.deskFooterCX,
          mobFooterHX: footerControls.mobFooterHX,
          tabFooterHX: footerControls.tabFooterHX,
          deskFooterHX: footerControls.deskFooterHX,
          mobFooterContactY: footerControls.mobFooterContactY,
          tabFooterContactY: footerControls.tabFooterContactY,
          deskFooterContactY: footerControls.deskFooterContactY,
          mobFooterContactEmailX: footerControls.mobFooterContactEmailX,
          tabFooterContactEmailX: footerControls.tabFooterContactEmailX,
          deskFooterContactEmailX: footerControls.deskFooterContactEmailX,
          mobFooterAddressX: footerControls.mobFooterAddressX,
          tabFooterAddressX: footerControls.tabFooterAddressX,
          deskFooterAddressX: footerControls.deskFooterAddressX,
          mobFooterAddressY: footerControls.mobFooterAddressY,
          tabFooterAddressY: footerControls.tabFooterAddressY,
          deskFooterAddressY: footerControls.deskFooterAddressY,
          mobFooterEmailY: footerControls.mobFooterEmailY,
          tabFooterEmailY: footerControls.tabFooterEmailY,
          deskFooterEmailY: footerControls.deskFooterEmailY,
          mobFooterSocialX: footerControls.mobFooterSocialX,
          tabFooterSocialX: footerControls.tabFooterSocialX,
          deskFooterSocialX: footerControls.deskFooterSocialX,
          mobFooterSocialY: footerControls.mobFooterSocialY,
          tabFooterSocialY: footerControls.tabFooterSocialY,
          deskFooterSocialY: footerControls.deskFooterSocialY,
          mobFooterLegalX: footerControls.mobFooterLegalX,
          tabFooterLegalX: footerControls.tabFooterLegalX,
          deskFooterLegalX: footerControls.deskFooterLegalX,
          mobFooterLegalY: footerControls.mobFooterLegalY,
          tabFooterLegalY: footerControls.tabFooterLegalY,
          deskFooterLegalY: footerControls.deskFooterLegalY,
          mobFooterTextY: footerControls.mobFooterTextY,
          tabFooterTextY: footerControls.tabFooterTextY,
          deskFooterTextY: footerControls.deskFooterTextY,
          mobFooterTextFont: footerControls.mobFooterTextFont,
          tabFooterTextFont: footerControls.tabFooterTextFont,
          deskFooterTextFont: footerControls.deskFooterTextFont,
          mobGlobalFontColor: controls.mobGlobalFontColor,
          tabGlobalFontColor: controls.tabGlobalFontColor,
          deskGlobalFontColor: controls.deskGlobalFontColor,
          mobGlobalBorderColor: controls.mobGlobalBorderColor,
          tabGlobalBorderColor: controls.tabGlobalBorderColor,
          deskGlobalBorderColor: controls.deskGlobalBorderColor,
          mobGlobalSvgColor: controls.mobGlobalSvgColor,
          tabGlobalSvgColor: controls.tabGlobalSvgColor,
          deskGlobalSvgColor: controls.deskGlobalSvgColor,
        }}
        globalFontColor={globalFontColor}
        globalSvgColor={globalSvgColor}
      />
    </group>
  )
}
