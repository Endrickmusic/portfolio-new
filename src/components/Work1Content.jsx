import { useNavigate } from "react-router-dom"
import { useTransitionContext } from "../contexts/TransitionContext"
import { ScrollControls, Text, Image, Svg } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useState } from "react"
import Header from "./Header"

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

// Footer component for work detail pages
function Footer({
  position = [0, 0, 0],
  footerControls,
  globalFontColor,
  globalSvgColor,
  navigation,
}) {
  const { viewport } = useThree()
  const maxWidth = Math.min(viewport.width * 0.8, 4)
  const contentWidth = maxWidth + 0.7
  const startX = -contentWidth / 2

  const [hovered, setHovered] = useState(null)
  const hoverColor = "#f2f2f2"

  // Helper function to get responsive footer values
  const getFooterResponsiveValue = (controlName) => {
    return footerControls[`deskFooter${controlName}`] // Simplified for now
  }

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
          startX + contentWidth * getFooterResponsiveValue("NavX"),
          viewport.height * getFooterResponsiveValue("NavY"),
          0,
        ]}
      >
        <Text
          position={[contentWidth * getFooterResponsiveValue("NavWorkX"), 0, 0]}
          fontSize={viewport.height * 0.03}
          color={hovered === "work" ? hoverColor : globalFontColor}
          outlineColor="#403454"
          outlineWidth={hovered === "work" ? 0.003 : 0}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={navigation?.goHome || (() => {})}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
            setHovered("work")
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
            setHovered(null)
          }}
        >
          Work
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavExpertiseX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={hovered === "expertise" ? hoverColor : globalFontColor}
          outlineColor="#403454"
          outlineWidth={hovered === "expertise" ? 0.003 : 0}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={navigation?.goToExpertise || (() => {})}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
            setHovered("expertise")
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
            setHovered(null)
          }}
        >
          Expertise
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavAboutX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={hovered === "about" ? hoverColor : globalFontColor}
          outlineColor="#403454"
          outlineWidth={hovered === "about" ? 0.003 : 0}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={navigation?.goToAbout || (() => {})}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
            setHovered("about")
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
            setHovered(null)
          }}
        >
          About
        </Text>
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("NavPlaygroundX"),
            0,
            0,
          ]}
          fontSize={viewport.height * 0.03}
          color={hovered === "playground" ? hoverColor : globalFontColor}
          outlineColor="#403454"
          outlineWidth={hovered === "playground" ? 0.003 : 0}
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={navigation?.goToPlayground || (() => {})}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
            setHovered("playground")
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
            setHovered(null)
          }}
        >
          Playground
        </Text>
      </group>

      {/* Logo SVGs */}
      <group
        position={[
          startX + contentWidth * getFooterResponsiveValue("CHX"),
          viewport.height * getFooterResponsiveValue("CHY"),
          0,
        ]}
      >
        <Svg
          src="/svgs/C.svg"
          scale={viewport.height * getFooterResponsiveValue("CHScale")}
          position={[contentWidth * getFooterResponsiveValue("CX"), 0, 0]}
        />
        <Svg
          src="/svgs/H.svg"
          scale={viewport.height * getFooterResponsiveValue("CHScale")}
          position={[contentWidth * getFooterResponsiveValue("HX"), 0, 0]}
        />
      </group>

      {/* Contact Information */}
      <group
        position={[
          startX,
          viewport.height * getFooterResponsiveValue("ContactY"),
          0,
        ]}
      >
        {/* Address (3 lines) */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("AddressX"),
            viewport.height * getFooterResponsiveValue("AddressY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          lineHeight={1.3}
          textAlign="left"
        >
          {"Christian Hohenbild\nGleditschstr. 71\n10781 Berlin"}
        </Text>
        {/* Email + Phone (2 lines) */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("ContactEmailX"),
            viewport.height * getFooterResponsiveValue("EmailY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          lineHeight={1.3}
          textAlign="left"
        >
          {"christian@hohenbild.com\n+49 170 751 85 25"}
        </Text>

        {/* Social Links */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("SocialX"),
            viewport.height * getFooterResponsiveValue("SocialY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={globalFontColor}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Instagram / LinkedIn
        </Text>

        {/* Legal */}
        <Text
          position={[
            contentWidth * getFooterResponsiveValue("LegalX"),
            viewport.height * getFooterResponsiveValue("LegalY"),
            0,
          ]}
          fontSize={viewport.height * getFooterResponsiveValue("TextFont")}
          color={hovered === "legal" ? hoverColor : globalFontColor}
          outlineColor="#403454"
          outlineWidth={hovered === "legal" ? 0.003 : 0}
          anchorX="left"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={navigation?.goToImprint || (() => {})}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
            setHovered("legal")
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
            setHovered(null)
          }}
        >
          Legal / Imprint
        </Text>
      </group>
    </group>
  )
}

// 3D Scene content for Work 1
function Work1Scene() {
  const { viewport } = useThree()

  // Navigation handlers
  const navigation = {
    goToWork1: () => {},
    goToWork2: () => {},
    goToWork3: () => {},
    goToAbout: () => {},
    goToPlayground: () => {},
    goToExpertise: () => {},
    goToImprint: () => {},
    goHome: () => {},
  }

  // Footer controls (simplified for now)
  const footerControls = {
    mobFooterNavX: 0.5,
    tabFooterNavX: 0.5,
    deskFooterNavX: 0.5,
    mobFooterNavY: -0.4,
    tabFooterNavY: -0.4,
    deskFooterNavY: -0.4,
    mobFooterNavWorkX: 0.1,
    tabFooterNavWorkX: 0.1,
    deskFooterNavWorkX: 0.1,
    mobFooterNavExpertiseX: 0.3,
    tabFooterNavExpertiseX: 0.3,
    deskFooterNavExpertiseX: 0.3,
    mobFooterNavAboutX: 0.5,
    tabFooterNavAboutX: 0.5,
    deskFooterNavAboutX: 0.5,
    mobFooterNavPlaygroundX: 0.7,
    tabFooterNavPlaygroundX: 0.7,
    deskFooterNavPlaygroundX: 0.7,
    mobFooterCHX: 0.8,
    tabFooterCHX: 0.8,
    deskFooterCHX: 0.8,
    mobFooterCHY: -0.4,
    tabFooterCHY: -0.4,
    deskFooterCHY: -0.4,
    mobFooterCHScale: 0.03,
    tabFooterCHScale: 0.03,
    deskFooterCHScale: 0.03,
    mobFooterCX: 0.1,
    tabFooterCX: 0.1,
    deskFooterCX: 0.1,
    mobFooterHX: 0.2,
    tabFooterHX: 0.2,
    deskFooterHX: 0.2,
    mobFooterContactY: -0.4,
    tabFooterContactY: -0.4,
    deskFooterContactY: -0.4,
    mobFooterContactEmailX: 0.1,
    tabFooterContactEmailX: 0.1,
    deskFooterContactEmailX: 0.1,
    mobFooterAddressX: 0.1,
    tabFooterAddressX: 0.1,
    deskFooterAddressX: 0.1,
    mobFooterAddressY: 0.1,
    tabFooterAddressY: 0.1,
    deskFooterAddressY: 0.1,
    mobFooterEmailY: 0.05,
    tabFooterEmailY: 0.05,
    deskFooterEmailY: 0.05,
    mobFooterSocialX: 0.1,
    tabFooterSocialX: 0.1,
    deskFooterSocialX: 0.1,
    mobFooterSocialY: -0.05,
    tabFooterSocialY: -0.05,
    deskFooterSocialY: -0.05,
    mobFooterLegalX: 0.1,
    tabFooterLegalX: 0.1,
    deskFooterLegalX: 0.1,
    mobFooterLegalY: -0.15,
    tabFooterLegalY: -0.15,
    deskFooterLegalY: -0.15,
    mobFooterTextY: 0.03,
    tabFooterTextY: 0.03,
    deskFooterTextY: 0.03,
    mobFooterTextFont: 0.02,
    tabFooterTextFont: 0.02,
    deskFooterTextFont: 0.02,
  }

  return (
    <ScrollControls pages={4} damping={0.1}>
      <group>
        {/* Header */}
        <Header
          textStyles={{
            logo: {
              fontSize: (viewport) => viewport.height * 0.017,
              color: "#ffffff",
              font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
              letterSpacing: 0.005,
              lineHeight: 1.2,
            },
            nav: {
              fontSize: (viewport) => viewport.height * 0.025,
              color: "#ffffff",
              font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
              letterSpacing: 0.02,
              lineHeight: 1.2,
            },
            heading: {
              fontSize: (viewport) => viewport.height * 0.25,
              color: "#ffffff",
              font: "/fonts/SeasonSerifTRIAL-Light.woff",
              letterSpacing: 0.02,
              lineHeight: 1.2,
            },
            body: {
              fontSize: (viewport) => viewport.height * 0.03,
              color: "#ffffff",
              font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
              letterSpacing: 0.02,
              lineHeight: 1.5,
              maxWidth: 2.2,
            },
          }}
          globalFontColor="#ffffff"
          globalSvgColor="#ffffff"
          navigation={navigation}
        />

        {/* Hero Image */}
        <Image
          url="/images/vellum_dance_main.png"
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
          Vellum Dance
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
          Movement woven into matter. Composing a fabric simulation in
          real-time, capturing the ephemeral tension between body, force, and
          material.
        </Text>

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

        {/* Footer */}
        <Footer
          position={[0, viewport.height * -4.2, 0]}
          footerControls={footerControls}
          globalFontColor="#ffffff"
          globalSvgColor="#ffffff"
          navigation={navigation}
        />
      </group>
    </ScrollControls>
  )
}

export default function Work1Content() {
  return (
    <>
      <BackButton />
      <Work1Scene />
    </>
  )
}
