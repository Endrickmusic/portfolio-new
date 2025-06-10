import { ScrollControls, useFBO } from "@react-three/drei"
import { createPortal, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useEffect } from "react"

import ScrollContent from "./ScrollContent"
import PostProcessPlane from "./PostProcessPlane"

// Main scene component
export default function Scene() {
  const { viewport, size } = useThree()
  //   const fbo = useFBO(viewport.width, viewport.height)
  const fbo = useFBO(size.width * 2, size.height)
  const virtualScene = useMemo(() => new THREE.Scene(), [])
  const virtualCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000),
    []
  )
  useEffect(() => {
    virtualCamera.position.z = 5
  }, [virtualCamera])

  useFrame((state) => {
    // Render the children to our FBO
    state.gl.setRenderTarget(fbo)
    state.gl.render(virtualScene, virtualCamera)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      {createPortal(
        <>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshNormalMaterial />
          </mesh>
          <ScrollControls pages={3} damping={0.1}>
            <ScrollContent />
          </ScrollControls>
        </>,
        virtualScene
      )}
      <mesh position={[0.5, 0, 0.5]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshNormalMaterial />
      </mesh>
      <PostProcessPlane texture={fbo.texture} />
    </>
  )
}
