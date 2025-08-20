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

// 3D Scene content for Expertise page
function ExpertiseScene() {
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
        Expertise
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
        Technical skills and creative capabilities developed through years of
        experience in 3D graphics, interactive media, and computational art.
      </Text>

      {/* Technical Skills */}
      <group position={[0, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={viewport.height * 0.04}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          TECHNICAL SKILLS
        </Text>

        {/* 3D Graphics */}
        <Text
          position={[-viewport.width * 0.3, viewport.height * -0.15, 0]}
          fontSize={viewport.height * 0.03}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          3D Graphics
        </Text>

        <Text
          position={[-viewport.width * 0.3, viewport.height * -0.25, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          • Three.js & React Three Fiber
          {"\n"}• WebGL & OpenGL
          {"\n"}• 3D Mathematics & Transformations
          {"\n"}• Lighting & Shading Models
          {"\n"}• Performance Optimization
        </Text>

        {/* Shader Programming */}
        <Text
          position={[0, viewport.height * -0.15, 0]}
          fontSize={viewport.height * 0.03}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Shader Programming
        </Text>

        <Text
          position={[0, viewport.height * -0.25, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          • GLSL (OpenGL Shading Language)
          {"\n"}• Vertex & Fragment Shaders
          {"\n"}• Post-processing Effects
          {"\n"}• Procedural Generation
          {"\n"}• Ray Marching & SDF
        </Text>

        {/* Physics Simulation */}
        <Text
          position={[viewport.width * 0.3, viewport.height * -0.15, 0]}
          fontSize={viewport.height * 0.03}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Physics Simulation
        </Text>

        <Text
          position={[viewport.width * 0.3, viewport.height * -0.25, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          • Particle Systems
          {"\n"}• Fluid Dynamics
          {"\n"}• Cloth & Soft Body Simulation
          {"\n"}• Collision Detection
          {"\n"}• Force-based Systems
        </Text>
      </group>

      {/* Creative Focus */}
      <group position={[0, viewport.height * -0.6, 0]}>
        <Text
          position={[0, 0, 0]}
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
          position={[0, viewport.height * -0.15, 0]}
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
    </group>
  )
}

export default function ExpertisePageContent() {
  return (
    <>
      <BackButton />
      <ExpertiseScene />
    </>
  )
}
