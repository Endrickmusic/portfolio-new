import { useThree } from "@react-three/fiber"
import { Text, Svg } from "@react-three/drei"

export default function Footer({
  position = [0, 0, 0],
  footerControls,
  globalFontColor,
  globalSvgColor,
}) {
  const { viewport } = useThree()
  const maxWidth = Math.min(viewport.width * 0.8, 4)
  const contentWidth = maxWidth + 0.7
  const startX = -contentWidth / 2

  return (
    <group position={position}>
      {/* Background */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 1.2]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Navigation Links */}
      <group
        position={[
          startX + contentWidth * footerControls.footerNavX,
          viewport.height * footerControls.footerNavY,
          0,
        ]}
      >
        <Text
          position={[contentWidth * footerControls.footerNavWorkX, 0, 0]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Work
        </Text>
        <Text
          position={[contentWidth * footerControls.footerNavExpertiseX, 0, 0]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Expertise
        </Text>
        <Text
          position={[contentWidth * footerControls.footerNavAboutX, 0, 0]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          About
        </Text>
        <Text
          position={[contentWidth * footerControls.footerNavPlaygroundX, 0, 0]}
          fontSize={viewport.height * 0.03}
          color={globalFontColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Playground
        </Text>
      </group>

      {/* Logo SVGs */}
      <group
        position={[
          startX + contentWidth * footerControls.footerCHX,
          viewport.height * footerControls.footerCHY,
          0,
        ]}
        scale={footerControls.footerCHScale}
      >
        <Svg
          src="/svgs/C.svg"
          position={[contentWidth * footerControls.footerCX, 0, 0]}
          color={globalSvgColor}
        />
        <Svg
          src="/svgs/H.svg"
          position={[contentWidth * footerControls.footerHX, 0, 0]}
          color={globalSvgColor}
        />
      </group>

      {/* Contact Information */}
      <Text
        position={[
          startX + contentWidth * footerControls.footerContactEmailX,
          viewport.height * footerControls.footerContactY,
          0,
        ]}
        fontSize={viewport.height * 0.025}
        color={globalFontColor}
        anchorX="left"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        lineHeight={1.5}
      >
        {`hello@christianhohenbild.com\n+49 176 1234 5678`}
      </Text>

      {/* Address */}
      <Text
        position={[
          startX + contentWidth * footerControls.footerAddressX,
          viewport.height * footerControls.footerAddressY,
          0,
        ]}
        fontSize={viewport.height * 0.025}
        color={globalFontColor}
        anchorX="left"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        lineHeight={1.5}
      >
        {`Kreuzbergstraße 123\n10965 Berlin\nGermany`}
      </Text>

      {/* Social Links */}
      <Text
        position={[
          startX + contentWidth * footerControls.footerSocialX,
          viewport.height * footerControls.footerSocialY,
          0,
        ]}
        fontSize={viewport.height * 0.025}
        color={globalFontColor}
        anchorX="left"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
      >
        Socials
      </Text>

      {/* Legal */}
      <Text
        position={[
          startX + contentWidth * footerControls.footerLegalX,
          viewport.height * footerControls.footerLegalY,
          0,
        ]}
        fontSize={viewport.height * 0.025}
        color={globalFontColor}
        anchorX="left"
        anchorY="middle"
        font="/fonts/ibm-plex-mono-latin-400-normal.woff"
      >
        Legal / Imprint
      </Text>
    </group>
  )
}
