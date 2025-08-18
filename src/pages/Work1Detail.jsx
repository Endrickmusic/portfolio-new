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

// 3D Scene content for Work 1
function Work1Scene() {
  const { viewport } = useThree()

  return (
    <ScrollControls pages={4} damping={0.1}>
      <group>
        {/* Hero Image */}
        <Image
          url="/images/vellum_dance_main.png"
          position={[0, viewport.height * 0.4, 0]}
          scale={[viewport.width * 1.2, viewport.height * 0.8, 1]}
        />

        {/* Header */}
        <WorkHeader
          title="Vellum Dance"
          subtitle="Movement woven into matter. Composing a fabric simulation in real-time, capturing the ephemeral tension between body, force, and material."
        />

        {/* Additional Images */}
        <Image
          url="/images/vellum_dance_main.png"
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
          Vellum Dance represents a breakthrough in real-time fabric simulation,
          where every thread and fiber responds to the forces of motion and
          gravity. This project explores the intersection of computational
          physics and artistic expression, creating a digital choreography that
          feels organic and alive.
          {"\n\n"}
          The simulation engine processes thousands of individual particles,
          each representing a point in the fabric's mesh. Through advanced
          constraint solving and force integration, these particles create the
          illusion of continuous, flowing material that responds naturally to
          external influences.
        </Text>

        {/* More Images */}
        <group position={[0, viewport.height * -0.8, 0]}>
          <Image
            url="/images/vellum_dance_main.png"
            position={[-viewport.width * 0.3, 0, 0]}
            scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
          />
          <Image
            url="/images/vellum_dance_main.png"
            position={[0, 0, 0]}
            scale={[viewport.width * 0.25, viewport.height * 0.2, 1]}
          />
          <Image
            url="/images/vellum_dance_main.png"
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
            Real-time fabric simulation for interactive installations and
            digital art performances.
            {"\n\n"}
            Advanced physics engine for game development and virtual reality
            experiences.
          </Text>
        </group>
      </group>
    </ScrollControls>
  )
}

export default function Work1Detail() {
  return (
    <div className="w-screen h-screen bg-black">
      <BackButton />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
      >
        <Work1Scene />
      </Canvas>
    </div>
  )
}
