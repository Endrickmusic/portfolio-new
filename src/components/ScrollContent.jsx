import { useRef, useMemo } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Svg, Image, useScroll } from "@react-three/drei"
import TextWithBorder from "./TextWithBorder"
import { useControls, folder } from "leva"
import BorderBox from "./BorderBox.jsx"

import Grid from "./Grid"
import Header from "./Header"

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
  mbPaddingYMult 
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

  // Comprehensive control structure
  const controls = useControls(
    "Content",
    {
      // Global settings
      Global: folder({
        globalBorder: { value: 0.01, min: 0.0, max: 0.1, step: 0.0025 },
      }),

      // Work sections
      "Work 1": folder({
        work1ImageX: { value: -0.13, min: -3, max: 3, step: 0.01 },
        work1ImageY: { value: -1.19, min: -3, max: 0, step: 0.01 },
        work1TitleX: { value: 1.55, min: -3, max: 3, step: 0.01 },
        work1TitleY: { value: -0.9, min: -3, max: 0, step: 0.01 },
        work1TitleMaxWidth: { value: 0.2, min: 0.1, max: 2, step: 0.01 },
        work1DescX: { value: 0.77, min: -3, max: 3, step: 0.01 },
        work1DescY: { value: -0.53, min: -3, max: 0, step: 0.01 },
      }),

      "Work 2": folder({
        work2ImageX: { value: 1, min: -3, max: 3, step: 0.01 },
        work2ImageY: { value: -1.45, min: -3, max: 0, step: 0.01 },
        work2TitleX: { value: -2.2, min: -3, max: 3, step: 0.01 },
        work2TitleY: { value: -1.32, min: -3, max: 0, step: 0.01 },
        work2TitleMaxWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
        work2DescX: { value: -1.2, min: -3, max: 3, step: 0.01 },
        work2DescY: { value: -0.75, min: -3, max: 0, step: 0.01 },
      }),

      "Work 3": folder({
        work3ImageX: { value: -1.2, min: -3, max: 3, step: 0.01 },
        work3ImageY: { value: -1.85, min: -3, max: 0, step: 0.01 },
        work3TitleX: { value: 0.2, min: -3, max: 3, step: 0.01 },
        work3TitleY: { value: -1.75, min: -3, max: 0, step: 0.01 },
        work3TitleMaxWidth: { value: 1.0, min: 0.1, max: 2, step: 0.01 },
        work3DescX: { value: 0.1, min: -3, max: 3, step: 0.01 },
        work3DescY: { value: -0.97, min: -3, max: 0, step: 0.01 },
      }),

      // Playground section
      Playground: folder({
        playgroundX: { value: 0.1, min: -3, max: 3, step: 0.01 },
        playgroundY: { value: -2.5, min: -5, max: 0, step: 0.01 },
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
        mbRoundness: { value: 0.1, min: 0.0, max: 0.5, step: 0.005 },
        mbBorderColor: { value: "#38358f" },
        mbPadding: { value: 0.2, min: 0.0, max: 1.0, step: 0.005 },
        mbPaddingXMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
        mbPaddingYMult: { value: 1.0, min: 0.0, max: 2.0, step: 0.025 },
      }),

      // Get in Contact section
      "Get in Contact": folder({
        contactX: { value: 0, min: -3, max: 3, step: 0.01 },
        contactY: { value: -3.2, min: -5, max: 0, step: 0.01 },
        contactButtonX: { value: 0, min: -3, max: 3, step: 0.01 },
        contactButtonY: { value: 0.2, min: -1, max: 1, step: 0.01 },
        contactDescX: { value: 0, min: -3, max: 3, step: 0.01 },
        contactDescY: { value: -0.3, min: -1, max: 1, step: 0.01 },
        contactDescMaxWidth: { value: 2.5, min: 1, max: 5, step: 0.1 },
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
      footerY: { value: -4.2, min: -6, max: 0, step: 0.1 },
    },
    {
      collapsed: true,
    }
  )

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
        position={[controls.work1ImageX, viewport.height * controls.work1ImageY, 0]}
      />
      <Headline
        title={textContent.page1.title}
        position={[controls.work1TitleX, viewport.height * controls.work1TitleY, 0]}
        maxWidth={viewport.width * controls.work1TitleMaxWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page1.paragraphs}
        position={[controls.work1DescX, viewport.height * controls.work1DescY, 0]}
      ></Description>
      
      {/* Work 2 */}
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[controls.work2ImageX, viewport.height * controls.work2ImageY, 0]}
      />
      <Headline
        title={textContent.page2.title}
        position={[controls.work2TitleX, viewport.height * controls.work2TitleY, 0]}
        maxWidth={viewport.width * controls.work2TitleMaxWidth}
      ></Headline>
      <Description
        paragraphs={textContent.page2.paragraphs}
        position={[controls.work2DescX, viewport.height * controls.work2DescY, 0]}
      ></Description>
      
      {/* Work 3 */}
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[controls.work3ImageX, viewport.height * controls.work3ImageY, 0]}
      />
      <Headline
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[controls.work3TitleX, viewport.height * controls.work3TitleY, 0]}
        maxWidth={viewport.width * controls.work3TitleMaxWidth}
      ></Headline>
      <Description
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[controls.work3DescX, viewport.height * controls.work3DescY, 0]}
      ></Description>

      <PlaygroundSection
        position={[viewport.width * controls.playgroundX, viewport.height * controls.playgroundY, 0]}
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

      {/* Get in Contact section */}
      <group position={[controls.contactX, viewport.height * controls.contactY, 0]}>
        <TextWithBorder
          position={[controls.contactButtonX, controls.contactButtonY, 0]}
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
          position={[controls.contactDescX, controls.contactDescY, 0]}
          maxWidth={controls.contactDescMaxWidth}
        />
      </group>

      <Footer position={[0, viewport.height * footerControls.footerY, 0]} />
    </group>
  )
}
