import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"
import Header from "./Header"
import Footer from "./Footer"
import { Text, Image } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import TextWithBorder from "./TextWithBorder"

// Text styling for white text
const whiteTextStyles = {
  logo: {
    fontSize: (viewport) => viewport.height * 0.017,
    color: "#ffffff",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.005,
    lineHeight: 1.2,
  },
  nav: {
    fontSize: (viewport) => viewport.height * 0.025,
    color: "#ffffff",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
}

// Explanation function similar to Description
function Explanation({
  paragraphs = [],
  position = [0, 0, 0],
  maxWidth,
  fontColor = "#ffffff",
}) {
  const { viewport } = useThree()

  // Safety check for paragraphs
  if (!paragraphs || !Array.isArray(paragraphs)) {
    console.warn(
      "Explanation component: paragraphs prop is missing or not an array"
    )
    return null
  }

  return (
    <Text
      position={position}
      fontSize={viewport.height * 0.02}
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

// Dividing line component
function DividingLine({
  position = [0, 0, 0],
  width = 2.0,
  height = 0.002,
  color = "#ffffff",
}) {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Work3DetailContent() {
  const { viewport } = useThree()

  return (
    <group>
      {/* Header with white text and SVG */}
      <Header
        textStyles={whiteTextStyles}
        globalFontColor="#ffffff"
        globalSvgColor="#ffffff"
      />

      {/* Top part - completely covered by preview image */}
      <Image
        url="/images/particles_main.png"
        position={[0, viewport.height * 0.4, 0]}
        scale={[viewport.width * 1.2, viewport.height * 0.8, 1]}
      />

      {/* Title and description on the image (white text) */}
      <Text
        position={[0, viewport.height * 0.4, 0.01]}
        fontSize={viewport.height * 0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
        lineHeight={1.2}
      >
        Swarm Dynamics
      </Text>

      <Text
        position={[0, viewport.height * 0.25, 0.01]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.8}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        An exploration of emergent behavior through particle systems and swarm
        intelligence. Real-time simulation of complex collective behaviors with
        interactive user control and dynamic visualization.
      </Text>

      {/* Second image (same image, smaller) */}
      <Image
        url="/images/particles_main.png"
        position={[0, viewport.height * -0.1, 0]}
        scale={[viewport.width * 0.6, viewport.height * 0.4, 1]}
      />

      {/* Longer explanation text */}
      <Explanation
        paragraphs={[
          "Swarm Dynamics represents a deep dive into the fascinating world of emergent behavior and collective intelligence. The project simulates thousands of individual particles, each following simple rules that, when combined, create complex and beautiful patterns that mimic natural phenomena like bird flocks, fish schools, and insect swarms.",
          "The simulation engine implements various swarm algorithms including Boids, Reynolds flocking, and custom attraction-repulsion systems. Each particle processes its environment in real-time, responding to neighbors, obstacles, and user input to create dynamic, evolving behaviors that are both predictable in their rules and surprising in their outcomes.",
          "What makes this project special is its interactive nature - users can manipulate the swarm in real-time, changing parameters, adding obstacles, or guiding the collective movement. The visualization system renders each particle with individual properties while maintaining smooth performance, creating an immersive experience that demonstrates the power of simple rules creating complex behavior.",
        ]}
        position={[0, viewport.height * -0.4, 0]}
        maxWidth={viewport.width * 0.7}
        fontColor="#ffffff"
      />

      {/* Three more photos (using same image as placeholder) */}
      <Image
        url="/images/particles_main.png"
        position={[-viewport.width * 0.3, viewport.height * -0.8, 0]}
        scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
      />
      <Image
        url="/images/particles_main.png"
        position={[0, viewport.height * -0.8, 0]}
        scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
      />
      <Image
        url="/images/particles_main.png"
        position={[viewport.width * 0.3, viewport.height * -0.8, 0]}
        scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
      />

      {/* APPLICATION section */}
      <Text
        position={[0, viewport.height * -1.2, 0]}
        fontSize={viewport.height * 0.04}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
      >
        APPLICATION
      </Text>

      <DividingLine
        position={[0, viewport.height * -1.25, 0]}
        width={viewport.width * 0.6}
      />

      <Text
        position={[0, viewport.height * -1.35, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Interactive art installations and generative visual experiences for
        public spaces.
      </Text>

      <Text
        position={[0, viewport.height * -1.45, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Educational platform for understanding complex systems and emergent
        behavior.
      </Text>

      <DividingLine
        position={[0, viewport.height * -1.55, 0]}
        width={viewport.width * 0.6}
      />

      <Text
        position={[0, viewport.height * -1.65, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Research tool for studying swarm robotics and autonomous system
        coordination.
      </Text>

      <Text
        position={[0, viewport.height * -1.75, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Creative tool for digital artists exploring algorithmic and generative
        art forms.
      </Text>

      {/* KEY TECHNOLOGIES section */}
      <Text
        position={[0, viewport.height * -2.0, 0]}
        fontSize={viewport.height * 0.04}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
      >
        KEY TECHNOLOGIES
      </Text>

      <DividingLine
        position={[0, viewport.height * -2.05, 0]}
        width={viewport.width * 0.6}
      />

      <Text
        position={[0, viewport.height * -2.15, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Advanced particle system engine with GPU acceleration for real-time
        performance.
      </Text>

      <Text
        position={[0, viewport.height * -2.25, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Custom swarm algorithms including Boids, flocking, and
        attraction-repulsion systems.
      </Text>

      <DividingLine
        position={[0, viewport.height * -2.35, 0]}
        width={viewport.width * 0.6}
      />

      <Text
        position={[0, viewport.height * -2.45, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        WebGL compute shaders for parallel particle processing and physics
        calculations.
      </Text>

      <Text
        position={[0, viewport.height * -2.55, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Interactive parameter controls and real-time user input for dynamic
        swarm manipulation.
      </Text>

      {/* Get in Contact section */}
      <group position={[0, viewport.height * -3.0, 0]}>
        <TextWithBorder
          position={[0, 0, 0]}
          roundness={0.1}
          color="#ffffff"
          padding={0.1}
          paddingXMult={2.0}
          paddingYMult={1.0}
          border={0.008}
          fontSize={viewport.height * 0.02}
          borderColor="#ffffff"
        >
          GET IN CONTACT
        </TextWithBorder>
        <Text
          position={[0, -viewport.height * 0.08, 0]}
          fontSize={viewport.height * 0.025}
          color="#ffffff"
          maxWidth={viewport.width * 0.6}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Ready to create something amazing together? Let's talk.
        </Text>
      </group>

      {/* Footer */}
      <Footer
        position={[0, viewport.height * -3.5, 0]}
        footerControls={{
          footerNavX: 0.5,
          footerNavY: -0.1,
          footerNavWorkX: 0.2,
          footerNavExpertiseX: 0.4,
          footerNavAboutX: 0.6,
          footerNavPlaygroundX: 0.8,
          footerCHX: 0.1,
          footerCHY: -0.1,
          footerCHScale: 0.8,
          footerCX: 0.2,
          footerHX: 0.8,
          footerContactY: -0.3,
          footerContactEmailX: 0.3,
          footerAddressX: 0.1,
          footerAddressY: -0.4,
          footerEmailY: -0.5,
          footerSocialX: 0.7,
          footerSocialY: -0.6,
          footerLegalX: 0.9,
          footerLegalY: -0.7,
          footerTextFont: 0.025,
          footerTextY: -0.8,
        }}
        globalFontColor="#ffffff"
        globalSvgColor="#ffffff"
      />
    </group>
  )
}

export default function Work3Detail() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Leva collapsed oneLineLabels hideTitleBar />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: false,
        }}
      >
        <Work3DetailContent />
      </Canvas>
    </div>
  )
}
