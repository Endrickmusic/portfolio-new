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
      position={position} // Title moved down
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
      <group position={[-viewport.width * 0.35, -viewport.height * 0.15, 0]}>
        <TextWithBorder
          position={[0, 0, 0.01]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          border={globalBorder}
          roundness={mbRoundness}
          borderColor={mbBorderColor}
          padding={mbPadding}
          paddingXMult={mbPaddingXMult}
          paddingYMult={mbPaddingYMult}
          minWidth={1.2}
        >
          MORE
        </TextWithBorder>
      </group>
    </group>
  )
}

function Footer({ position = [0, 0, 0], footerControls }) {
  const { viewport } = useThree()
  const maxWidth = Math.min(viewport.width * 0.8, 4) // Max width of 4 units or 80% viewport width, whichever is smaller
  const contentWidth = maxWidth + 0.7
  const startX = -contentWidth / 2 // Center the content

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
          viewport.width * getFooterResponsiveValue("LogoX"),
          getFooterResponsiveValue("LogoY"),
          0,
        ]}
        visible={true}
      >
        <Svg
          src="/svgs/C.svg"
          scale={0.0078}
          position={[-1.8, 0, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
        <Svg
          src="/svgs/H.svg"
          scale={0.0078}
          position={[1.2, 0, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
      </group>

      {/* Contact Info */}
      <group
        position={[
          startX,
          viewport.height * getFooterResponsiveValue("ContactY"),
          0,
        ]}
      >
        <Text
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Christian Hohenbild
        </Text>
        <Text
          position={[0, -viewport.height * 0.03, 0]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Gleditschstr. 71
        </Text>
        <Text
          position={[0, -viewport.height * 0.06, 0]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          10781 Berlin
        </Text>
        <Text
          position={[
            viewport.width * getFooterResponsiveValue("ContactEmailX"),
            -viewport.height * 0.03,
            0,
          ]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          mail@christianhohenbild.com
        </Text>
        <Text
          position={[
            viewport.width * getFooterResponsiveValue("ContactEmailX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          +49 176 123 456 78
        </Text>
      </group>

      {/* Social Links */}
      <group
        position={[
          startX + contentWidth * getFooterResponsiveValue("SocialX"),
          viewport.height * getFooterResponsiveValue("ContactY"),
          0,
        ]}
      >
        <Text
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Instagram
        </Text>
        <Text
          position={[0, -viewport.height * 0.03, 0]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          LinkedIn
        </Text>
      </group>

      {/* Legal Links */}
      <group
        position={[
          startX + contentWidth * getFooterResponsiveValue("LegalX"),
          viewport.height * getFooterResponsiveValue("ContactY"),
          0,
        ]}
      >
        <Text
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Imprint
        </Text>
        <Text
          position={[0, -viewport.height * 0.03, 0]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Data Privacy
        </Text>
      </group>
    </group>
  )
}

// Content component that uses scroll data
export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const { viewport } = useThree()
  const { breakpoint } = useBreakpoint()

  // Responsive control structure with dedicated values for each breakpoint
  const controls = useControls(
    "Content",
    {
      // Global settings
      Global: folder({
        globalBorder: { value: 0.01, min: 0.0, max: 0.1, step: 0.0025 },
      }),

      // Introduction section
      Introduction: folder({
        Desktop: folder({
          deskIntroX: { value: -3.02, min: -5, max: 0, step: 0.01 },
          deskIntroY: { value: -0.65, min: -2, max: 0, step: 0.01 },
          deskIntroWidth: { value: 0.52, min: 0.1, max: 1.0, step: 0.01 },
        }),
        Tablet: folder({
          tabIntroX: { value: -3.02, min: -5, max: 0, step: 0.01 },
          tabIntroY: { value: -0.65, min: -2, max: 0, step: 0.01 },
          tabIntroWidth: { value: 0.52, min: 0.1, max: 1.0, step: 0.01 },
        }),
        Mobile: folder({
          mobIntroX: { value: -3.02, min: -5, max: 0, step: 0.01 },
          mobIntroY: { value: -0.65, min: -2, max: 0, step: 0.01 },
          mobIntroWidth: { value: 0.52, min: 0.1, max: 1.0, step: 0.01 },
        }),
      }),

      // Work sections
      "Work 1": folder({
        Desktop: folder({
          deskW1X: { value: -0.13, min: -3, max: 3, step: 0.01 },
          deskW1Y: { value: -1.19, min: -3, max: 0, step: 0.01 },
          deskW1TitleX: { value: 1.55, min: -3, max: 3, step: 0.01 },
          deskW1TitleY: { value: -0.9, min: -3, max: 0, step: 0.01 },
          deskW1TitleWidth: {
            value: 0.2,
            min: 0.1,
            max: 2,
            step: 0.01,
          },
          deskW1DescX: { value: 0.77, min: -3, max: 3, step: 0.01 },
          deskW1DescY: { value: -0.53, min: -3, max: 0, step: 0.01 },
        }),
        Tablet: folder({
          tabW1X: { value: -0.13, min: -3, max: 3, step: 0.01 },
          tabW1Y: { value: -1.19, min: -3, max: 0, step: 0.01 },
          tabW1TitleX: { value: 1.55, min: -3, max: 3, step: 0.01 },
          tabW1TitleY: { value: -0.9, min: -3, max: 0, step: 0.01 },
          tabW1TitleWidth: { value: 0.2, min: 0.1, max: 2, step: 0.01 },
          tabW1DescX: { value: 0.77, min: -3, max: 3, step: 0.01 },
          tabW1DescY: { value: -0.53, min: -3, max: 0, step: 0.01 },
        }),
        Mobile: folder({
          mobW1X: { value: -0.13, min: -3, max: 3, step: 0.01 },
          mobW1Y: { value: -1.19, min: -3, max: 0, step: 0.01 },
          mobW1TitleX: { value: 1.55, min: -3, max: 3, step: 0.01 },
          mobW1TitleY: { value: -0.9, min: -3, max: 0, step: 0.01 },
          mobW1TitleWidth: { value: 0.2, min: 0.1, max: 2, step: 0.01 },
          mobW1DescX: { value: 0.77, min: -3, max: 3, step: 0.01 },
          mobW1DescY: { value: -0.53, min: -3, max: 0, step: 0.01 },
        }),
      }),

      "Work 2": folder({
        Desktop: folder({
          deskW2X: { value: 1, min: -3, max: 3, step: 0.01 },
          deskW2Y: { value: -1.45, min: -3, max: 0, step: 0.01 },
          deskW2TitleX: { value: -2.2, min: -3, max: 3, step: 0.01 },
          deskW2TitleY: { value: -1.32, min: -3, max: 0, step: 0.01 },
          deskW2TitleWidth: {
            value: 1.0,
            min: 0.1,
            max: 2,
            step: 0.01,
          },
          deskW2DescX: { value: -1.2, min: -3, max: 3, step: 0.01 },
          deskW2DescY: { value: -0.75, min: -3, max: 0, step: 0.01 },
        }),
        Tablet: folder({
          tabW2X: { value: 1, min: -3, max: 3, step: 0.01 },
          tabW2Y: { value: -1.45, min: -3, max: 0, step: 0.01 },
          tabW2TitleX: { value: -2.2, min: -3, max: 3, step: 0.01 },
          tabW2TitleY: { value: -1.32, min: -3, max: 0, step: 0.01 },
          tabW2TitleWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
          tabW2DescX: { value: -1.2, min: -3, max: 3, step: 0.01 },
          tabW2DescY: { value: -0.75, min: -3, max: 0, step: 0.01 },
        }),
        Mobile: folder({
          mobW2X: { value: 1, min: -3, max: 3, step: 0.01 },
          mobW2Y: { value: -1.45, min: -3, max: 0, step: 0.01 },
          mobW2TitleX: { value: -2.2, min: -3, max: 3, step: 0.01 },
          mobW2TitleY: { value: -1.32, min: -3, max: 0, step: 0.01 },
          mobW2TitleWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
          mobW2DescX: { value: -1.2, min: -3, max: 3, step: 0.01 },
          mobW2DescY: { value: -0.75, min: -3, max: 0, step: 0.01 },
        }),
      }),

      "Work 3": folder({
        Desktop: folder({
          deskW3X: { value: -1.2, min: -3, max: 3, step: 0.01 },
          deskW3Y: { value: -1.85, min: -3, max: 0, step: 0.01 },
          deskW3TitleX: { value: 0.2, min: -3, max: 3, step: 0.01 },
          deskW3TitleY: { value: -1.75, min: -3, max: 0, step: 0.01 },
          deskW3TitleWidth: {
            value: 1.0,
            min: 0.1,
            max: 2,
            step: 0.01,
          },
          deskW3DescX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          deskW3DescY: { value: -0.97, min: -3, max: 0, step: 0.01 },
        }),
        Tablet: folder({
          tabW3X: { value: -1.2, min: -3, max: 3, step: 0.01 },
          tabW3Y: { value: -1.85, min: -3, max: 0, step: 0.01 },
          tabW3TitleX: { value: 0.2, min: -3, max: 3, step: 0.01 },
          tabW3TitleY: { value: -1.75, min: -3, max: 0, step: 0.01 },
          tabW3TitleWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
          tabW3DescX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          tabW3DescY: { value: -0.97, min: -3, max: 0, step: 0.01 },
        }),
        Mobile: folder({
          mobW3X: { value: -1.2, min: -3, max: 3, step: 0.01 },
          mobW3Y: { value: -1.85, min: -3, max: 0, step: 0.01 },
          mobW3TitleX: { value: 0.2, min: -3, max: 3, step: 0.01 },
          mobW3TitleY: { value: -1.75, min: -3, max: 0, step: 0.01 },
          mobW3TitleWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
          mobW3DescX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          mobW3DescY: { value: -0.97, min: -3, max: 0, step: 0.01 },
        }),
      }),

      // Playground section
      Playground: folder({
        Desktop: folder({
          deskPlayX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          deskPlayY: { value: -2.5, min: -5, max: 0, step: 0.01 },
        }),
        Tablet: folder({
          tabPlayX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          tabPlayY: { value: -2.5, min: -5, max: 0, step: 0.01 },
        }),
        Mobile: folder({
          mobPlayX: { value: 0.1, min: -3, max: 3, step: 0.01 },
          mobPlayY: { value: -2.5, min: -5, max: 0, step: 0.01 },
        }),
        Styling: folder({
          panelWidth: { value: 1.2, min: 0.6, max: 5.4, step: 0.1 },
          panelHeight: { value: 0.8, min: 0.4, max: 4.0, step: 0.1 },
          roundness: { value: 0.12, min: 0.0, max: 0.5, step: 0.005 },
          borderColor: { value: "#38358f" },
          paddingX: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
          paddingY: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
          mbRoundness: { value: 0.1, min: 0.0, max: 0.5, step: 0.005 },
          mbBorderColor: { value: "#38358f" },
          mbPadding: { value: 0.2, min: 0.0, max: 1.0, step: 0.005 },
          mbPaddingXMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
          mbPaddingYMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
        }),
      }),

      // Get in Contact section
      "Get in Contact": folder({
        Desktop: folder({
          deskConX: { value: 0, min: -3, max: 3, step: 0.01 },
          deskConY: { value: -3.2, min: -5, max: 0, step: 0.01 },
          deskConButtonX: { value: 0, min: -3, max: 3, step: 0.01 },
          deskConButtonY: { value: 0.2, min: -1, max: 1, step: 0.01 },
          deskConDescX: { value: 0, min: -3, max: 3, step: 0.01 },
          deskConDescY: { value: -0.3, min: -1, max: 1, step: 0.01 },
          deskConWidth: { value: 2.5, min: 1, max: 5, step: 0.1 },
        }),
        Tablet: folder({
          tabConX: { value: 0, min: -3, max: 3, step: 0.01 },
          tabConY: { value: -3.2, min: -5, max: 0, step: 0.01 },
          tabConButtonX: { value: 0, min: -3, max: 3, step: 0.01 },
          tabConButtonY: { value: 0.2, min: -1, max: 1, step: 0.01 },
          tabConDescX: { value: 0, min: -3, max: 3, step: 0.01 },
          tabConDescY: { value: -0.3, min: -1, max: 1, step: 0.01 },
          tabConWidth: { value: 2.5, min: 1, max: 5, step: 0.1 },
        }),
        Mobile: folder({
          mobConX: { value: 0, min: -3, max: 3, step: 0.01 },
          mobConY: { value: -3.2, min: -5, max: 0, step: 0.01 },
          mobConButtonX: { value: 0, min: -3, max: 3, step: 0.01 },
          mobConButtonY: { value: 0.2, min: -1, max: 1, step: 0.01 },
          mobConDescX: { value: 0, min: -3, max: 3, step: 0.01 },
          mobConDescY: { value: -0.3, min: -1, max: 1, step: 0.01 },
          mobConWidth: { value: 2.5, min: 1, max: 5, step: 0.1 },
        }),
      }),
    },
    {
      collapsed: true,
    }
  )

  // Footer controls
  const footerControls = useControls(
    "Footer",
    {
      Desktop: folder({
        deskFooterY: { value: -4.2, min: -6, max: 0, step: 0.1 },
        deskFooterNavY: { value: 0.4, min: 0.0, max: 1.0, step: 0.01 },
        deskFooterLogoX: { value: -0.2, min: -1.0, max: 1.0, step: 0.01 },
        deskFooterLogoY: { value: 0.95, min: 0.0, max: 2.0, step: 0.01 },
        deskFooterContactY: { value: -0.35, min: -1.0, max: 0.0, step: 0.01 },
        deskFooterContactEmailX: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
        deskFooterSocialX: { value: 0.6, min: 0.0, max: 1.0, step: 0.01 },
        deskFooterLegalX: { value: 0.85, min: 0.0, max: 1.0, step: 0.01 },
      }),
      Tablet: folder({
        tabFooterY: { value: -4.2, min: -6, max: 0, step: 0.1 },
        tabFooterNavY: { value: 0.4, min: 0.0, max: 1.0, step: 0.01 },
        tabFooterLogoX: { value: -0.2, min: -1.0, max: 1.0, step: 0.01 },
        tabFooterLogoY: { value: 0.95, min: 0.0, max: 2.0, step: 0.01 },
        tabFooterContactY: { value: -0.35, min: -1.0, max: 0.0, step: 0.01 },
        tabFooterContactEmailX: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
        tabFooterSocialX: { value: 0.6, min: 0.0, max: 1.0, step: 0.01 },
        tabFooterLegalX: { value: 0.85, min: 0.0, max: 1.0, step: 0.01 },
      }),
      Mobile: folder({
        mobFooterY: { value: -4.2, min: -6, max: 0, step: 0.1 },
        mobFooterNavY: { value: 0.4, min: 0.0, max: 1.0, step: 0.01 },
        mobFooterLogoX: { value: -0.2, min: -1.0, max: 1.0, step: 0.01 },
        mobFooterLogoY: { value: 0.95, min: 0.0, max: 2.0, step: 0.01 },
        mobFooterContactY: { value: -0.35, min: -1.0, max: 0.0, step: 0.01 },
        mobFooterContactEmailX: { value: 0.15, min: 0.0, max: 1.0, step: 0.01 },
        mobFooterSocialX: { value: 0.45, min: 0.0, max: 1.0, step: 0.01 },
        mobFooterLegalX: { value: 0.7, min: 0.0, max: 1.0, step: 0.01 },
      }),
    },
    {
      collapsed: true,
    }
  )

  // Responsive values - all hooks must be called at component level
  // Introduction
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

  // Work 1
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

  // Work 2
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

  // Work 3
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

  // Playground
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

  // Contact
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
      <group position={[0, viewport.height * 0.1, 0]}>
        <Svg
          src="/svgs/C.svg"
          scale={0.008}
          position={[-3.02, 0.96, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
        <Svg
          src="/svgs/H.svg"
          scale={0.008}
          position={[0.08, 0.96, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
      </group>

      {/* Introduction */}
      <Headline
        title={textContent.page0.paragraphs}
        position={[introX, viewport.height * introY, 0]}
        maxWidth={viewport.width * introWidth}
      ></Headline>

      {/* Work 1 */}
      <Image
        url="/images/vellum_dance_main.png"
        scale={[viewport.width * 0.515, viewport.height * 0.73, 1]}
        position={[w1X, viewport.height * w1Y, 0]}
      />
      <Headline
        title={textContent.page1.title}
        position={[w1TitleX, viewport.height * w1TitleY, 0]}
        maxWidth={viewport.width * w1TitleWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[w1DescX, viewport.height * w1DescY, 0]}
      ></Description>

      {/* Work 2 */}
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[w2X, viewport.height * w2Y, 0]}
      />
      <Headline
        title={textContent.page2.title}
        position={[w2TitleX, viewport.height * w2TitleY, 0]}
        maxWidth={viewport.width * w2TitleWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[w2DescX, viewport.height * w2DescY, 0]}
      ></Description>

      {/* Work 3 */}
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[w3X, viewport.height * w3Y, 0]}
      />
      <Headline
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[w3TitleX, viewport.height * w3TitleY, 0]}
        maxWidth={viewport.width * w3TitleWidth}
      ></Headline>
      <Description
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[w3DescX, viewport.height * w3DescY, 0]}
      ></Description>

      <PlaygroundSection
        position={[viewport.width * playX, viewport.height * playY, 0]}
        panelWidth={viewport.width * controls.panelWidth}
        panelHeight={viewport.height * controls.panelHeight}
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

      {/* Get in Contact section */}
      <group position={[conX, viewport.height * conY, 0]}>
        <TextWithBorder
          position={[conButtonX, conButtonY, 0]}
          fontSize={viewport.height * 0.025}
          color="#38358f"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          border={controls.globalBorder}
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
          position={[conDescX, conDescY, 0]}
          maxWidth={conWidth}
        />
      </group>

      <Footer
        position={[
          0,
          viewport.height *
            useResponsiveValue({
              mobile: footerControls.mobFooterY,
              tablet: footerControls.tabFooterY,
              desktop: footerControls.deskFooterY,
              large: footerControls.deskFooterY,
              ultrawide: footerControls.deskFooterY,
            }),
          0,
        ]}
        footerControls={footerControls}
      />
    </group>
  )
}
