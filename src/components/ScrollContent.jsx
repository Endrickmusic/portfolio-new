import React from "react"
import { useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { useRef } from "react"

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
}

// Page component for reusability
function Page({ title, paragraphs, position = [0, 0, 0] }) {
  const paragraphSpacing = 0.6 // Adjust this value to change spacing between paragraphs
  const firstParagraphOffset = 1.4 // Adjust this to change distance from title

  return (
    <group position={position}>
      <Text
        position={[-1.04, 2, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/open-sans-condensed-v14-latin-300.woff"
        letterSpacing={0.05}
        lineHeight={1.2}
      >
        {title}
      </Text>
      {paragraphs.map((paragraph, index) => (
        <Text
          key={index}
          position={[0, firstParagraphOffset - index * paragraphSpacing, 0]}
          fontSize={0.09}
          color="#ffffff"
          maxWidth={2}
          textAlign="left"
          anchorX="center"
          anchorY="middle"
          font="/fonts/open-sans-condensed-v14-latin-300.woff"
          letterSpacing={0.02}
          lineHeight={1.5}
        >
          {paragraph}
        </Text>
      ))}
    </group>
  )
}

// Content component that uses scroll data
export default function ScrollContent() {
  const scroll = useScroll()
  const group = useRef()
  const cubeRef = useRef()
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (scroll.offset !== undefined) {
      // Move the group down as we scroll up
      group.current.position.y = scroll.offset * 3 * viewport.height

      // Rotate the cube
      if (cubeRef.current) {
        cubeRef.current.rotation.x += delta * 0.3
        cubeRef.current.rotation.y += delta * 0.3
      }
    }
  })

  return (
    <group ref={group}>
      {/* Rotating cube */}
      <mesh ref={cubeRef} position={[-0.5, 0, -1]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshNormalMaterial />
      </mesh>

      <Page
        title={textContent.page1.title}
        paragraphs={textContent.page1.paragraphs}
        position={[0, -1.5, 0]}
      />
      <Page
        title={textContent.page2.title}
        paragraphs={textContent.page2.paragraphs}
        position={[0, -4, 0]}
      />
      <Page
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0, -6, 0]}
      />
    </group>
  )
}
