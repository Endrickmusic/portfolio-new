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

// 3D Scene content for Imprint page
function ImprintScene() {
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
        Legal / Imprint
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
        Legal information and imprint details for this portfolio website.
      </Text>

      {/* Contact Information */}
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
          CONTACT INFORMATION
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
          Christian Hohenbild
          {"\n"}
          Gleditschstr. 71
          {"\n"}
          10781 Berlin, Germany
          {"\n\n"}
          Email: christian@hohenbild.com
          {"\n"}
          Phone: +49 170 751 85 25
        </Text>
      </group>

      {/* Legal Details */}
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
          LEGAL NOTICES
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
          This website is for portfolio and professional purposes only.
          {"\n\n"}
          All content, including images, text, and code examples, is created by
          Christian Hohenbild unless otherwise noted.
          {"\n\n"}
          For business inquiries or collaboration opportunities, please use the
          contact information provided above.
        </Text>
      </group>
    </group>
  )
}

export default function ImprintPageContent() {
  return (
    <>
      <BackButton />
      <ImprintScene />
    </>
  )
}
