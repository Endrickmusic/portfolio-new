import { useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Svg, Image, useScroll } from "@react-three/drei"
import TextWithBorder from "./TextWithBorder"
import { useControls } from "leva"
import BorderBox from "./BorderBox.jsx"

import Grid from "./Grid"
import Header from "./Header"

// Text styling system (inspired by Tailwind)
const textStyles = {
  logo: {
    fontSize: (viewport) => viewport.height * 0.03,
    color: "#38354f",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
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
function Headline({ title, position = [0, 0, 0] }) {
  const { viewport } = useThree()
  const paragraphSpacing = viewport.height * 0.12
  const firstParagraphOffset = viewport.height * -0.2 // Much lower start for paragraphs

  return (
    <Text
      position={position} // Title moved down
      fontSize={viewport.height * 0.04}
      color="#38358F"
      maxWidth={viewport.width * 0.35}
      anchorX="left"
      anchorY="middle"
      font="/fonts/SeasonSerifTRIAL-Light.woff"
      letterSpacing={0.02}
      lineHeight={1.2}
    >
      {title}
    </Text>
  )
}

// Description component for reusability
function Description({ paragraphs, position = [0, 0, 0], children }) {
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
          maxWidth={viewport.width * 0.25}
          textAlign="left"
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          {paragraph}
        </Text>
      ))}
      {children}
    </group>
  )
}

function PlaygroundSection({ position = [0, 0, 0] }) {
  const { viewport } = useThree()

  // Global border thickness
  const { globalBorder } = useControls("Global", {
    globalBorder: { value: 0.01, min: 0.0, max: 0.1, step: 0.0025 },
  })

  const {
    panelWidth,
    panelHeight,
    roundness,
    borderColor,
    paddingX,
    paddingY,
  } = useControls("Playground Section Border", {
    panelWidth: {
      value: viewport.width * 1.2,
      min: viewport.width * 0.6,
      max: viewport.width * 5.4,
      step: 0.1,
    },
    panelHeight: {
      value: viewport.height * 0.8,
      min: viewport.height * 0.4,
      max: viewport.height * 4.0,
      step: 0.1,
    },
    roundness: { value: 0.12, min: 0.0, max: 0.5, step: 0.005 },
    borderColor: { value: "#38358f" },
    paddingX: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
    paddingY: { value: 0.2, min: 0.0, max: 0.5, step: 0.005 },
  })

  const {
    roundness: mbRoundness,
    borderColor: mbBorderColor,
    padding: mbPadding,
    paddingXMult: mbPaddingXMult,
    paddingYMult: mbPaddingYMult,
  } = useControls("More Button Border", {
    roundness: { value: 0.1, min: 0.0, max: 0.5, step: 0.005 },
    borderColor: { value: "#38358f" },
    padding: { value: 0.2, min: 0.0, max: 1.0, step: 0.005 },
    paddingXMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
    paddingYMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
  })

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

  useFrame((state, delta) => {
    if (scroll.offset !== undefined) {
      group.current.position.y = scroll.offset * 3.5 * viewport.height
    }
  })

  return (
    <group ref={group}>
      {/* <Grid /> */}
      <Header textStyles={textStyles} />

      {/* Large C and H letters */}
      <group position={[0, viewport.height * 0.1, 0]}>
        <Svg
          src="/svgs/C.svg"
          scale={0.0078}
          position={[-3, 0.2, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
        <Svg
          src="/svgs/H.svg"
          scale={0.0078}
          position={[0.2, 0.2, 0]}
          fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
        />
      </group>

      <Headline
        title={textContent.page0.paragraphs}
        position={[-2.4, -viewport.height * 0.65, 0]}
      ></Headline>
      <Image
        url="/images/vellum_dance_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[-1, -viewport.height * 1.05, 0]}
      />
      <Headline
        title={textContent.page1.title}
        position={[0.4, -viewport.height * 0.89, 0]}
      ></Headline>
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[0.4, -viewport.height * 0.53, 0]}
      ></Description>
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[1, -viewport.height * 1.45, 0]}
      />
      <Headline
        title={textContent.page2.title}
        position={[-2.2, -viewport.height * 1.32, 0]}
      ></Headline>
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[-1.2, -viewport.height * 0.75, 0]}
      ></Description>
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[-1.2, -viewport.height * 1.85, 0]}
      />
      <Headline
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0.2, -viewport.height * 1.75, 0]}
      ></Headline>
      <Description
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0.1, -viewport.height * 0.97, 0]}
      ></Description>

      <PlaygroundSection
        position={[viewport.width * 0.1, -viewport.height * 2.5, 0]}
      />

      <Footer position={[0, -viewport.height * 3.5, 0]} />
    </group>
  )
}
