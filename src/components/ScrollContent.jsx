import { useRef } from "react"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Svg, Image, useScroll } from "@react-three/drei"

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

// Content component that uses scroll data
export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (scroll.offset !== undefined) {
      group.current.position.y = scroll.offset * 2 * viewport.height
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

      <Description
        title={textContent.page0.title}
        paragraphs={textContent.page0.paragraphs}
        position={[-1.4, -viewport.height * 0.33, 0]}
      ></Description>
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
    </group>
  )
}
