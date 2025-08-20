import { useNavigate } from "react-router-dom"
import { useTransitionContext } from "../contexts/TransitionContext"
import { Text } from "@react-three/drei"
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
      color="#403454"
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

// 3D Scene content for About page
function AboutScene() {
  const { viewport } = useThree()

  return (
    <group>
      {/* Header */}
      <Text
        position={[0, viewport.height * 0.4, 0]}
        fontSize={viewport.height * 0.08}
        color="#403454"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
        lineHeight={1.2}
      >
        About
      </Text>

      {/* Main Content */}
      <Text
        position={[0, viewport.height * 0.2, 0]}
        fontSize={viewport.height * 0.025}
        color="#403454"
        maxWidth={viewport.width * 0.8}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Christian Hohenbild is a Berlin-based 3D artist and creative developer
        specializing in crafting immersive web experiences.
      </Text>

      {/* Background */}
      <Text
        position={[0, 0, 0]}
        fontSize={viewport.height * 0.02}
        color="#403454"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        Combining art and code, I focus on real-time 3D graphics, shader
        programming, and interactive visuals. My work explores the intersection
        of computational physics and artistic expression, creating digital
        experiences that feel organic and alive.
        {"\n\n"}
        With a background in both computer science and visual arts, I bring a
        unique perspective to digital creation, always pushing the boundaries of
        what's possible in real-time graphics and interactive media.
        {"\n\n"}
        Based in Berlin, I work with clients worldwide to create innovative
        digital experiences that blur the line between technology and art.
      </Text>

      {/* Technical Skills */}
      <Text
        position={[0, viewport.height * -0.3, 0]}
        fontSize={viewport.height * 0.04}
        color="#403454"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
      >
        TECHNICAL SKILLS
      </Text>

      <Text
        position={[0, viewport.height * -0.45, 0]}
        fontSize={viewport.height * 0.02}
        color="#403454"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        • Real-time 3D Graphics (Three.js, React Three Fiber)
        {"\n"}• Shader Programming (GLSL)
        {"\n"}• Physics Simulation
        {"\n"}• Interactive Web Development
        {"\n"}• Creative Coding
      </Text>

      {/* Creative Focus */}
      <Text
        position={[0, viewport.height * -0.7, 0]}
        fontSize={viewport.height * 0.04}
        color="#403454"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
      >
        CREATIVE FOCUS
      </Text>

      <Text
        position={[0, viewport.height * -0.85, 0]}
        fontSize={viewport.height * 0.02}
        color="#403454"
        maxWidth={viewport.width * 0.7}
        anchorX="center"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        letterSpacing={0.02}
        lineHeight={1.5}
      >
        • Computational Art
        {"\n"}• Interactive Installations
        {"\n"}• Digital Storytelling
        {"\n"}• Immersive Experiences
        {"\n"}• Visual Effects
      </Text>
    </group>
  )
}

export default function AboutPageContent() {
  return (
    <>
      <BackButton />
      <AboutScene />
    </>
  )
}
