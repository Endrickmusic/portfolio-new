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
        font="/fonts/open-sans-condensed-v14-latin-300.woff"
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
          font="/fonts/open-sans-condensed-v14-latin-300.woff"
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

      if (cubeRef.current) {
        cubeRef.current.rotation.x += delta * 0.3
        cubeRef.current.rotation.y += delta * 0.3
      }
      if (torusRef.current) {
        torusRef.current.rotation.x += delta * 0.2
        torusRef.current.rotation.z += delta * 0.4
      }
      if (capsuleRef.current) {
        capsuleRef.current.rotation.y += delta * 0.5
        capsuleRef.current.rotation.z += delta * 0.2
      }
      if (knotRef.current) {
        knotRef.current.rotation.x += delta * 0.3
        knotRef.current.rotation.y += delta * 0.3
        knotRef.current.rotation.z += delta * 0.2
      }
    }
  })

  return (
    <group ref={group}>
      <Page
        title={textContent.page1.title}
        paragraphs={textContent.page1.paragraphs}
        position={[0, 0, 0]}
      >
        <mesh
          ref={torusRef}
          position={[-0.3, viewport.height * -0.4, -1]}
          scale={[1 / scaleCompensation, 1, 1]}
        >
          <torusGeometry args={[0.15, 0.05, 16, 32]} />
          <meshNormalMaterial />
        </mesh>
      </Page>
      <Page
        title={textContent.page2.title}
        paragraphs={textContent.page2.paragraphs}
        position={[0, -viewport.height, 0]}
      >
        <mesh
          ref={capsuleRef}
          position={[-0.3, viewport.height * -0.4, -1]}
          scale={[1 / scaleCompensation, 1, 1]}
        >
          <capsuleGeometry args={[0.05, 0.2, 16, 32]} />
          <meshNormalMaterial />
        </mesh>
      </Page>
      <Page
        title={textContent.page3.title}
        paragraphs={textContent.page3.paragraphs}
        position={[0, -viewport.height * 2, 0]}
      >
        <mesh
          ref={knotRef}
          position={[-0.3, viewport.height * -0.4, -1]}
          scale={[1 / scaleCompensation, 1, 1]}
        >
          <torusKnotGeometry args={[0.1, 0.04, 128, 32, 2, 3]} />
          <meshNormalMaterial />
        </mesh>
      </Page>
      <Page
        title={textContent.page4.title}
        paragraphs={textContent.page4.paragraphs}
        position={[0, -viewport.height * 3, 0]}
      >
        <mesh
          ref={cubeRef}
          position={[-0.3, viewport.height * -0.4, -1]}
          scale={[1 / scaleCompensation, 1, 1]}
        >
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshNormalMaterial />
        </mesh>
      </Page>
    </group>
  )
}
