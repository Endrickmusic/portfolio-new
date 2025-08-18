import { Canvas } from "@react-three/fiber"
import { ScrollControls, Text, Image } from "@react-three/drei"
import { useNavigate } from "react-router-dom"
import { useThree } from "@react-three/fiber"

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

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-6 left-6 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded hover:bg-white/20 transition-colors"
    >
      ← Back to Portfolio
    </button>
  )
}

// 3D Scene content for Work 3
function Work3Scene() {
  const { viewport } = useThree()

  return (
    <ScrollControls pages={4} damping={0.1}>
      <group>
        {/* Hero Image */}
        <Image
          url="/images/particles_main.png"
          position={[0, viewport.height * 0.4, 0]}
          scale={[viewport.width * 1.2, viewport.height * 0.8, 1]}
        />

        {/* Header */}
        <WorkHeader
          title="Swarm Dynamics"
          subtitle="An exploration of emergent behavior through particle systems and swarm intelligence. Real-time simulation of complex collective behaviors with interactive user control and dynamic visualization."
        />

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
          Swarm Dynamics explores the fascinating world of emergent behavior,
          where simple individual rules give rise to complex collective
          patterns. This project simulates thousands of autonomous agents, each
          following basic behavioral principles that together create intricate,
          lifelike movements.
          {"\n\n"}
          The system implements advanced flocking algorithms, obstacle
          avoidance, and environmental response mechanisms. Users can interact
          with the swarm in real-time, observing how individual perturbations
          propagate through the collective, creating ripple effects of
          behavioral change.
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
            Interactive educational tools for understanding complex systems and
            emergence.
            {"\n\n"}
            AI behavior simulation for games and virtual environments.
          </Text>
        </group>
      </group>
    </ScrollControls>
  )
}

export default function Work3Detail() {
  return (
    <div className="w-screen h-screen bg-black">
      <BackButton />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
      >
        <Work3Scene />
      </Canvas>
    </div>
  )
}
