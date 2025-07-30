import React from "react"
import { useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, Svg, Image } from "@react-three/drei"
import { useRef } from "react"
import Grid from "./Grid"
import Header from "./Header"

// Text styling system (inspired by Tailwind)
const textStyles = {
  logo: {
    fontSize: (viewport) => viewport.height * 0.03,
    color: "#38354F",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
  nav: {
    fontSize: (viewport) => viewport.height * 0.025,
    color: "#38354F",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
  heading: {
    fontSize: (viewport) => viewport.height * 0.25,
    color: "#38354F",
    font: "/fonts/SeasonSerifTRIAL-Light.woff",
    letterSpacing: 0.02,
    lineHeight: 1.2,
  },
  body: {
    fontSize: (viewport) => viewport.height * 0.03,
    color: "#38354F",
    font: "/fonts/ibm-plex-mono-latin-400-normal.woff",
    letterSpacing: 0.02,
    lineHeight: 1.5,
    maxWidth: 2.2,
  },
}

// Separated text content
const textContent = {
  page0: {
    title: "Page Zero",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  page1: {
    title: "Page One",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
  },
  page2: {
    title: "Page Two",
    paragraphs: [
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    ],
  },
  page3: {
    title: "Page Three",
    paragraphs: [
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    ],
  },
  page4: {
    title: "Page Four",
    paragraphs: [
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    ],
  },
}

// Page component for reusability
function Page({ title, paragraphs, position = [0, 0, 0], children }) {
  const { viewport } = useThree()
  const paragraphSpacing = viewport.height * 0.12
  const firstParagraphOffset = viewport.height * -0.2 // Much lower start for paragraphs

  return (
    <group position={position}>
      <Text
        position={[-0.8, viewport.height * 0.3, 0]} // Title moved down
        fontSize={viewport.height * 0.05}
        color="#38354F"
        anchorX="left"
        anchorY="middle"
        font="/fonts/SeasonSerifTRIAL-Light.woff"
        letterSpacing={0.02}
        lineHeight={1.2}
      >
        {title}
      </Text>
      {paragraphs.map((paragraph, index) => (
        <Text
          key={index}
          position={[0, firstParagraphOffset - index * paragraphSpacing, 0]}
          fontSize={viewport.height * 0.023}
          color="#38354F"
          maxWidth={2.2}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          {paragraph}
        </Text>
      ))}
      {children}
    </group>
  )
}

// Content component that uses scroll data
export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const cubeRef = useRef()
  const torusRef = useRef()
  const capsuleRef = useRef()
  const knotRef = useRef()
  const { viewport } = useThree()

  const scaleCompensation = viewport.width / viewport.height

  useFrame((state, delta) => {
    if (scroll.offset !== undefined) {
      group.current.position.y = scroll.offset * 4 * viewport.height
    }
  })

  return (
    <group ref={group}>
      <Grid />
      <Header textStyles={textStyles} />

      {/* Large C and H letters */}
      <group position={[0, viewport.height * 0.1, 0]}>
        <Svg
          src="/svgs/C.svg"
          // scale={viewport.height * 0.8}
          scale={0.0078}
          position={[-3, 0.2, 0]}
        />
        <Svg
          src="/svgs/H.svg"
          // scale={viewport.height * 0.8}
          scale={0.0078}
          position={[0.2, 0.2, 0]}
        />
      </group>

      <Page
        title={textContent.page0.title}
        paragraphs={textContent.page0.paragraphs}
        position={[0, -viewport.height * 1.5, 0]}
      ></Page>
      <Image
        url="/images/vellum_dance_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[1, -viewport.height * 1.5, 0]}
        transparent
      />
      <Page
        title={textContent.page1.title}
        paragraphs={textContent.page1.paragraphs}
        position={[0, -viewport.height * 3, 0]}
      ></Page>
      <Image
        url="/images/particles_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[-1, -viewport.height * 3, 0]}
        transparent
      />
      <Page
        title={textContent.page2.title}
        paragraphs={textContent.page2.paragraphs}
        position={[0, -viewport.height * 4.5, 0]}
      ></Page>
      <Image
        url="/images/liquid_prism_main.png"
        scale={[viewport.width * 0.4, viewport.height * 0.4, 1]}
        position={[-1, -viewport.height * 4.5, 0]}
        transparent
      />
      <Page
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0, -viewport.height * 6, 0]}
      ></Page>
    </group>
  )
}
