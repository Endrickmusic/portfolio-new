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

// 3D Scene content for Work 3
function Work3Scene() {
  const { viewport } = useThree()

  return (
    <group>
      {/* Hero Image */}
      <Image
        url="/images/particles_main.png"
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
        Swarm Dynamics
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
        From fluid currents to digital flocks, this project sculpts movement
        from thousands of independent particles, balancing randomness with
        structured behavior.
      </Text>

      {/* Additional Images */}
      <Image
        url="/images/particles_main.png"
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
        Swarm Dynamics explores the emergent behavior of complex systems through
        the lens of particle simulation. By implementing advanced flocking
        algorithms and force-based interactions, this project creates
        mesmerizing patterns that emerge from simple rules applied to thousands
        of individual agents.
        {"\n\n"}
        The system demonstrates how collective intelligence can arise from
        decentralized decision-making, with each particle responding to its
        local environment while contributing to global patterns. This creates a
        living, breathing digital ecosystem that feels both organic and
        mathematically precise.
      </Text>

      {/* More Images */}
      <group position={[0, viewport.height * -0.8, 0]}>
        <Image
          url="/images/particles_main.png"
          position={[-viewport.width * 0.3, 0, 0]}
          scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
        />
        <Image
          url="/images/particles_main.png"
          position={[0, 0, 0]}
          scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
        />
        <Image
          url="/images/particles_main.png"
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
          Crowd simulation for architectural visualization and urban planning.
          {"\n\n"}
          Behavioral modeling for game AI and autonomous systems research.
        </Text>
      </group>
    </group>
  )
}

export default function Work3Content() {
  return (
    <>
      <BackButton />
      <Work3Scene />
    </>
  )
}
