import React from "react"
import { useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { useRef } from "react"

// Text styling system (inspired by Tailwind)
const textStyles = {
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
}

// Separated text content
const textContent = {
  page1: {
    title: "Page One",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    ],
  },
  page2: {
    title: "Page Two",
    paragraphs: [
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    ],
  },
  page3: {
    title: "Page Three",
    paragraphs: [
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    ],
  },
  page4: {
    title: "Page Four",
    paragraphs: [
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
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
        fontSize={viewport.height * 0.25}
        color="#ffffff"
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
          fontSize={viewport.height * 0.03}
          color="#ffffff"
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
      <Page
        title={textContent.page1.title}
        paragraphs={textContent.page1.paragraphs}
        position={[0, 0, 0]}
      ></Page>
      <Page
        title={textContent.page2.title}
        paragraphs={textContent.page2.paragraphs}
        position={[0, -viewport.height, 0]}
      ></Page>
      <Page
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0, -viewport.height * 2, 0]}
      ></Page>
      <Page
        title={textContent.page4.title}
        paragraphs={textContent.page4.paragraphs}
        position={[0, -viewport.height * 3, 0]}
      ></Page>
    </group>
  )
}
