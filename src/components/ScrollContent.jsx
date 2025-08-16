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

function Footer({ position = [0, 0, 0] }) {
  const { viewport } = useThree()
  const maxWidth = Math.min(viewport.width * 0.8, 4) // Max width of 4 units or 80% viewport width, whichever is smaller
  const contentWidth = maxWidth + 0.7
  const startX = -contentWidth / 2 // Center the content

  return (
    <group position={position}>
      {/* Background */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 1.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Navigation Links */}
      <group position={[startX, viewport.height * 0.4, 0]}>
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
      <group position={[-viewport.width * 0.2, 0.95, 0]} visible={true}>
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
      <group position={[startX, -viewport.height * 0.35, 0]}>
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
          position={[viewport.width * 0.2, -viewport.height * 0.03, 0]}
          fontSize={viewport.height * 0.02}
          color="#38358f"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          mail@christianhohenbild.com
        </Text>
        <Text
          position={[viewport.width * 0.2, 0, 0]}
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
        position={[startX + contentWidth * 0.6, -viewport.height * 0.35, 0]}
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
        position={[startX + contentWidth * 0.85, -viewport.height * 0.35, 0]}
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
      }),
      Tablet: folder({
        tabFooterY: { value: -4.2, min: -6, max: 0, step: 0.1 },
      }),
      Mobile: folder({
        mobFooterY: { value: -4.2, min: -6, max: 0, step: 0.1 },
      }),
    },
    {
      collapsed: true,
    }
  )

  // Helper function to get responsive values
  const getResponsiveValue = (controlName) => {
    return useResponsiveValue({
      mobile: controls[`mob${controlName}`],
      tablet: controls[`tab${controlName}`],
      desktop: controls[`desk${controlName}`],
      large: controls[`desk${controlName}`], // fallback to desktop
      ultrawide: controls[`desk${controlName}`], // fallback to desktop
    })
  }

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

      <Headline
        title={textContent.page0.paragraphs}
        position={[-3.02, -viewport.height * 0.65, 0]}
        maxWidth={viewport.width * 0.52}
      ></Headline>

      {/* Work 1 */}
      <Image
        url="/images/vellum_dance_main.png"
        scale={[viewport.width * 0.515, viewport.height * 0.73, 1]}
        position={[
          getResponsiveValue("W1X"),
          viewport.height * getResponsiveValue("W1Y"),
          0,
        ]}
      />
      <Headline
        title={textContent.page1.title}
        position={[
          getResponsiveValue("W1TitleX"),
          viewport.height * getResponsiveValue("W1TitleY"),
          0,
        ]}
        maxWidth={viewport.width * getResponsiveValue("W1TitleWidth")}
      ></Headline>
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[
          getResponsiveValue("W1DescX"),
          viewport.height * getResponsiveValue("W1DescY"),
          0,
        ]}
      ></Description>

      {/* Work 2 */}
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[
          getResponsiveValue("W2X"),
          viewport.height * getResponsiveValue("W2Y"),
          0,
        ]}
      />
      <Headline
        title={textContent.page2.title}
        position={[
          getResponsiveValue("W2TitleX"),
          viewport.height * getResponsiveValue("W2TitleY"),
          0,
        ]}
        maxWidth={viewport.width * getResponsiveValue("W2TitleWidth")}
      ></Headline>
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[
          getResponsiveValue("W2DescX"),
          viewport.height * getResponsiveValue("W2DescY"),
          0,
        ]}
      ></Description>

      {/* Work 3 */}
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[
          getResponsiveValue("W3X"),
          viewport.height * getResponsiveValue("W3Y"),
          0,
        ]}
      />
      <Headline
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[
          getResponsiveValue("W3TitleX"),
          viewport.height * getResponsiveValue("W3TitleY"),
          0,
        ]}
        maxWidth={viewport.width * getResponsiveValue("W3TitleWidth")}
      ></Headline>
      <Description
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[
          getResponsiveValue("W3DescX"),
          viewport.height * getResponsiveValue("W3DescY"),
          0,
        ]}
      ></Description>

      <PlaygroundSection
        position={[
          viewport.width * getResponsiveValue("PlayX"),
          viewport.height * getResponsiveValue("PlayY"),
          0,
        ]}
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
      <group
        position={[
          getResponsiveValue("ConX"),
          viewport.height * getResponsiveValue("ConY"),
          0,
        ]}
      >
        <TextWithBorder
          position={[
            getResponsiveValue("ConButtonX"),
            getResponsiveValue("ConButtonY"),
            0,
          ]}
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
          position={[
            getResponsiveValue("ConDescX"),
            getResponsiveValue("ConDescY"),
            0,
          ]}
          maxWidth={getResponsiveValue("ConWidth")}
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
      />
    </group>
  )
}
