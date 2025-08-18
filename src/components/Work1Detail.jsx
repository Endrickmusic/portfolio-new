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

  // Debug logging
  console.log("Explanation component render:", {
    paragraphs,
    position,
    maxWidth,
    fontColor,
  })

  // Safety check for paragraphs
  if (!paragraphs || !Array.isArray(paragraphs) || paragraphs.length === 0) {
    console.warn(
      "Explanation component: paragraphs prop is missing, not an array, or empty",
      paragraphs
    )
    return null
  }

  // Ensure all paragraphs are strings
  const validParagraphs = paragraphs.filter(
    (p) => typeof p === "string" && p.trim().length > 0
  )

  if (validParagraphs.length === 0) {
    console.warn("Explanation component: no valid string paragraphs found")
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
      {validParagraphs.join("\n\n")}
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

function Work1DetailContent() {
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
        url="/images/vellum_dance_main.png"
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
        Vellum Dance
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
        Movement woven into matter. Composing a fabric simulation in real-time,
        capturing the ephemeral tension between body, force, and material.
      </Text>

      {/* Second image (same image, smaller) */}
      <Image
        url="/images/vellum_dance_main.png"
        position={[0, viewport.height * -0.1, 0]}
        scale={[viewport.width * 0.6, viewport.height * 0.4, 1]}
      />

      {/* Longer explanation text */}
      <Explanation
        paragraphs={[
          "Vellum Dance represents a breakthrough in real-time fabric simulation, where every thread and fiber responds to the forces of motion and gravity. This project explores the intersection of computational physics and artistic expression, creating a digital choreography that feels organic and alive.",
          "The simulation engine processes thousands of individual particles, each representing a point in the fabric's mesh. Through advanced constraint solving and force integration, these particles create the illusion of continuous, flowing material that responds naturally to external influences.",
          "What makes this project unique is its real-time performance - the simulation runs at 60fps while maintaining the visual fidelity needed for artistic presentation. This required careful optimization of the physics calculations and rendering pipeline.",
        ]}
        position={[0, viewport.height * -0.4, 0]}
        maxWidth={viewport.width * 0.7}
        fontColor="#ffffff"
      />

      {/* Three more photos (using same image as placeholder) */}
      <Image
        url="/images/vellum_dance_main.png"
        position={[-viewport.width * 0.3, viewport.height * -0.8, 0]}
        scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
      />
      <Image
        url="/images/vellum_dance_main.png"
        position={[0, viewport.height * -0.8, 0]}
        scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
      />
      <Image
        url="/images/vellum_dance_main.png"
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
        Real-time fabric simulation for interactive installations and digital
        art performances.
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
        Advanced physics engine for game development and virtual reality
        experiences.
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
        Educational tool for understanding complex physical systems and
        mathematical concepts.
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
        Research platform for exploring new algorithms in computational physics
        and graphics.
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
        WebGL and Three.js for hardware-accelerated 3D rendering and real-time
        graphics.
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
        Custom physics engine built with JavaScript for cross-platform
        compatibility.
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
        Advanced constraint solving algorithms for realistic fabric behavior
        simulation.
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
        Optimized rendering pipeline for maintaining 60fps performance on
        various devices.
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

export default function Work1Detail() {
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
        <Work1DetailContent />
      </Canvas>
    </div>
  )
}
