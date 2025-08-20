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

// 3D Scene content for Playground page
function PlaygroundScene() {
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
        Playground
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
        A collection of experimental studies—testing shaders, simulations, and
        interaction techniques. Focused on rapid prototyping and trying
        technical concepts outside of polished projects.
      </Text>

      {/* Experiments Grid */}
      <group position={[0, 0, 0]}>
        {/* Experiment 1 */}
        <Text
          position={[-viewport.width * 0.3, 0, 0]}
          fontSize={viewport.height * 0.04}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Particle Flow
        </Text>

        <Text
          position={[-viewport.width * 0.3, viewport.height * -0.1, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Exploring fluid-like particle behaviors using velocity fields and
          noise functions.
        </Text>

        {/* Experiment 2 */}
        <Text
          position={[0, 0, 0]}
          fontSize={viewport.height * 0.04}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Shader Distortions
        </Text>

        <Text
          position={[0, viewport.height * -0.1, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Real-time image distortion effects using custom fragment shaders.
        </Text>

        {/* Experiment 3 */}
        <Text
          position={[viewport.width * 0.3, 0, 0]}
          fontSize={viewport.height * 0.04}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Interactive Mesh
        </Text>

        <Text
          position={[viewport.width * 0.3, viewport.height * -0.1, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.25}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Mouse-responsive 3D mesh deformation with spring physics.
        </Text>
      </group>

      {/* More Experiments */}
      <group position={[0, viewport.height * -0.4, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={viewport.height * 0.04}
          color="#403454"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SeasonSerifTRIAL-Light.woff"
          letterSpacing={0.02}
        >
          Noise Studies
        </Text>

        <Text
          position={[0, viewport.height * -0.1, 0]}
          fontSize={viewport.height * 0.02}
          color="#403454"
          maxWidth={viewport.width * 0.7}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          Exploring different noise algorithms for procedural generation and
          organic textures.
        </Text>
      </group>
    </group>
  )
}

export default function PlaygroundPageContent() {
  return (
    <>
      <BackButton />
      <PlaygroundScene />
    </>
  )
}
