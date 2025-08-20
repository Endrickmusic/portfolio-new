import { useNavigate } from "react-router-dom"
import { useTransitionContext } from "../contexts/TransitionContext"
import { Text, Image } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

// Back button component
function BackButton() {
  const { viewport } = useThree()
  const navigate = useNavigate()
  const { navigateWithTransition } = useTransitionContext()

  return (
    <Text
      position={[-viewport.width * 0.4, viewport.height * 0.45, 0]}
      fontSize={viewport.height * 0.02}
      color="#ffffff"
      anchorX="left"
      anchorY="middle"
      font="/fonts/ibm-plex-mono-latin-400-normal.woff"
      onClick={() => navigateWithTransition(navigate, "/")}
      onPointerOver={() => {
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto"
      }}
    >
      ← Back to Portfolio
    </Text>
  )
}

// 3D Scene content for Work 2
function Work2Scene() {
  const { viewport } = useThree()

  return (
    <group>
      {/* Hero Image */}
      <Image
        url="/images/liquid_prism_main.png"
        position={[0, viewport.height * 0.4, 0]}
        scale={[viewport.width * 1.2, viewport.height * 0.8, 1]}
      />

      {/* Header */}
      <Text
        position={[0, viewport.height * 0.25, 0]}
        fontSize={viewport.height * 0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
        lineHeight={1.2}
      >
        Liquid Prism
      </Text>

      <Text
        position={[0, viewport.height * 0.15, 0]}
        fontSize={viewport.height * 0.025}
        color="#ffffff"
        maxWidth={viewport.width * 0.8}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        A fluid dynamics simulation that explores the intersection of light,
        liquid, and computational art. Real-time rendering of complex fluid
        behaviors with photorealistic optical effects.
      </Text>

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
        and light refraction in real-time. This project pushes the boundaries of
        computational fluid dynamics, creating mesmerizing visual experiences
        that blur the line between digital simulation and physical reality.
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
          Advanced fluid simulation for scientific visualization and research
          applications.
          {"\n\n"}
          Real-time optical effects for film production and visual effects
          studios.
        </Text>
      </group>
    </group>
  )
}

export default function Work2Content() {
  return (
    <>
      <BackButton />
      <Work2Scene />
    </>
  )
}
