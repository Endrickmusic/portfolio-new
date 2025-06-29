import { ScrollControls, useFBO } from "@react-three/drei"
import { createPortal, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useEffect, useRef } from "react"

import ScrollContent from "./ScrollContent"
import PostProcessPlane from "./PostProcessPlane"

// Main scene component
export default function Scene() {
  const boxRef = useRef()
  const boxRef2 = useRef()
  const { viewport, size } = useThree()
  const fbo = useFBO(size.width * 2, size.height)
  const virtualScene = useMemo(() => new THREE.Scene(), [])
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

  useFrame((state) => {
    // Render the children to our FBO
    boxRef.current.rotation.x += 0.01
    boxRef.current.rotation.y += 0.01
    boxRef2.current.rotation.x += 0.01
    state.gl.setRenderTarget(fbo)
    state.gl.render(virtualScene, virtualCamera)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <ScrollControls pages={4} damping={0.1}>
        {createPortal(
          <>
            <mesh ref={boxRef} position={[0.7, 0.4, 3]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshNormalMaterial />
            </mesh>

            <ScrollContent />
          </>,
          virtualScene
        )}

        <mesh
          ref={boxRef2}
          position={[-2.1, 0.8, 0.2]}
          rotation={[Math.PI / 4, Math.PI / 6, 0]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshNormalMaterial />
        </mesh>
        <PostProcessPlane texture={fbo.texture} />
      </ScrollControls>
    </>
  )
}
