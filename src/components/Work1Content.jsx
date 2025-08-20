import { Text, useFBO, ScrollControls } from "@react-three/drei"
import { useThree, useFrame, createPortal } from "@react-three/fiber"
import { useTransitionContext } from "../contexts/TransitionContext"
import { useMemo, useEffect, useRef } from "react"
import * as THREE from "three"
import PostProcessPlane from "./PostProcessPlane"

export default function Work1Content() {
  const { viewport, size } = useThree()
  const { triggerPageTransition } = useTransitionContext()

  console.log("Work1Content: Rendering with viewport:", viewport)

  // FBO setup for post-processing effects
  const fbo = useFBO(
    size.width * 2, // 2x scale for quality
    size.height * 2,
    {
      samples: 2,
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      generateMipmaps: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    }
  )

  // Virtual scene for FBO rendering
  const virtualScene = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#f2f2f2")
    return scene
  }, [])

  // Virtual camera for FBO rendering
  const virtualCamera = useMemo(() => {
    return new THREE.OrthographicCamera(
      -viewport.width / 2,
      viewport.width / 2,
      viewport.height / 2,
      -viewport.height / 2,
      0.1,
      1000
    )
  }, [viewport])

  useEffect(() => {
    virtualCamera.position.z = 5
  }, [virtualCamera])

  // Render content to FBO
  useFrame((state) => {
    state.gl.setRenderTarget(fbo)
    state.gl.render(virtualScene, virtualCamera)
    state.gl.setRenderTarget(null)
  })

  const testTransition = () => {
    console.log("Work1Content: Test transition clicked")
    triggerPageTransition(
      600,
      1500
    )(() => {
      console.log("Test transition completed")
    })
  }

  return (
    <>
      {/* Background color */}
      <color attach="background" args={["#f2f2f2"]} />

      <ScrollControls pages={2} damping={0.1}>
        {/* 1) Interactive content in main scene */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Test mesh */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="red" />
        </mesh>

        {/* Test text */}
        <Text
          position={[0, 0, 1]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Work1 Test
        </Text>

        {/* Test transition button */}
        <Text
          position={[0, -1, 1]}
          fontSize={0.15}
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={testTransition}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
          }}
        >
          Click to Test Transition
        </Text>

        {/* Back to main page button */}
        <Text
          position={[0, -1.5, 1]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
          onClick={() => {
            triggerPageTransition()(() => {
              window.history.back()
            })
          }}
          onPointerOver={() => {
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto"
          }}
        >
          ← Back to Main
        </Text>

        {/* Additional content for scrolling */}
        <Text
          position={[0, -2, 1]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Scroll down to see distortion effects
        </Text>

        <Text
          position={[0, -3, 1]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          More content here...
        </Text>

        <Text
          position={[0, -4, 1]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/ibm-plex-mono-latin-400-normal.woff"
        >
          Even more content...
        </Text>

        {/* 2) Non-interactive copy rendered into virtual scene → FBO */}
        {createPortal(
          <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Test mesh */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="red" />
            </mesh>

            {/* Test text */}
            <Text
              position={[0, 0, 1]}
              fontSize={0.2}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              Work1 Test
            </Text>

            {/* Test transition button */}
            <Text
              position={[0, -1, 1]}
              fontSize={0.15}
              color="#ff0000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              Click to Test Transition
            </Text>

            {/* Back to main page button */}
            <Text
              position={[0, -1.5, 1]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              ← Back to Main
            </Text>

            {/* Additional content for scrolling */}
            <Text
              position={[0, -2, 1]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              Scroll down to see distortion effects
            </Text>

            <Text
              position={[0, -3, 1]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              More content here...
            </Text>

            <Text
              position={[0, -4, 1]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              font="/fonts/ibm-plex-mono-latin-400-normal.woff"
            >
              Even more content...
            </Text>
          </>,
          virtualScene
        )}
        {/* 3) Post process plane renders FBO texture as background */}
        <PostProcessPlane texture={fbo.texture} />
      </ScrollControls>
    </>
  )
}
