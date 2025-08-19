import { Canvas } from "@react-three/fiber"
import { ScrollControls, Text, Image } from "@react-three/drei"
import { useNavigate } from "react-router-dom"
import { useThree } from "@react-three/fiber"
import { useTransitionContext } from "../contexts/TransitionContext"

// Header component for work detail pages
function WorkHeader({ title, subtitle }) {
  const { viewport } = useThree()

  return (
    <group>
      <Text
        position={[0, viewport.height * 0.4, 0]}
        fontSize={viewport.height * 0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
        lineHeight={1.2}
      >
        {title}
      </Text>

      <Text
        position={[0, viewport.height * 0.25, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.8}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        {subtitle}
      </Text>
    </group>
  )
}

// Back button component
function BackButton() {
  const navigate = useNavigate()
  const { navigateWithTransition } = useTransitionContext()

  return (
    <button
      onClick={() => navigateWithTransition(navigate, "/")}
      className="fixed top-6 left-6 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded hover:bg-white/20 transition-colors"
    >
      ← Back to Portfolio
    </button>
  )
}

// 3D Scene content for Work 2
function Work2Scene() {
  const { viewport } = useThree()

  return (
    <ScrollControls pages={4} damping={0.1}>
      <group>
        {/* Hero Image */}
        <Image
          url="/images/liquid_prism_main.png"
          position={[0, viewport.height * 0.4, 0]}
          scale={[viewport.width * 1.2, viewport.height * 0.8, 1]}
        />

        {/* Header */}
        <WorkHeader
          title="Liquid Prism"
          subtitle="A fluid dynamics simulation that explores the intersection of light, liquid, and computational art. Real-time rendering of complex fluid behaviors with photorealistic optical effects."
        />

        {/* Additional Images */}
        <Image
          url="/images/liquid_prism_main.png"
          position={[0, viewport.height * -0.1, 0]}
          scale={[viewport.width * 0.6, viewport.height * 0.4, 1]}
        />

        {/* Description Text */}
        <Text
          position={[0, viewport.height * -0.4, 0]}
          fontSize={viewport.height * 0.02}
          color="#ffffff"
          maxWidth={viewport.width * 0.7}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Liquid Prism investigates the complex interplay between fluid dynamics
          and light refraction in real-time. This project pushes the boundaries
          of computational fluid dynamics, creating mesmerizing visual
          experiences that blur the line between digital simulation and physical
          reality.
          {"\n\n"}
          The system combines advanced particle-based fluid simulation with
          ray-traced optical effects, generating dynamic light caustics and
          refractions that respond to the fluid's motion in real-time. Each
          droplet acts as a tiny lens, creating complex patterns of light and
          shadow.
        </Text>

        {/* More Images */}
        <group position={[0, viewport.height * -0.8, 0]}>
          <Image
            url="/images/liquid_prism_main.png"
            position={[-viewport.width * 0.3, 0, 0]}
            scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
          />
          <Image
            url="/images/liquid_prism_main.png"
            position={[0, 0, 0]}
            scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
          />
          <Image
            url="/images/liquid_prism_main.png"
            position={[viewport.width * 0.3, 0, 0]}
            scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
          />
        </group>

        {/* Technical Details */}
        <group position={[0, viewport.height * -1.2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={viewport.height * 0.04}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/SeasonSerifTRIAL-Light.woff"
            letterSpacing={0.02}
          >
            APPLICATION
          </Text>

          <Text
            position={[0, viewport.height * -0.1, 0]}
            fontSize={viewport.height * 0.025}
            color="#ffffff"
            maxWidth={viewport.width * 0.7}
            anchorX="center"
            anchorY="middle"
            font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            letterSpacing={0.02}
            lineHeight={1.5}
          >
            Interactive art installations exploring the beauty of fluid
            dynamics.
            {"\n\n"}
            Advanced rendering techniques for film and advertising visual
            effects.
          </Text>
        </group>
      </group>
    </ScrollControls>
  )
}

export default function Work2Detail() {
  return (
    <div className="w-screen h-screen bg-black">
      <BackButton />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
      >
        <Work2Scene />
      </Canvas>
    </div>
  )
}
