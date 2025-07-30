import { ScrollControls, useFBO } from "@react-three/drei"
import { createPortal, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useEffect, useRef } from "react"
import { Perf } from "r3f-perf"

import ScrollContent from "./ScrollContent"
import PostProcessPlane from "./PostProcessPlane"

// Main scene component
export default function Scene() {
  const boxRef = useRef()
  const boxRef2 = useRef()
  const { viewport, size } = useThree()
  const fbo = useFBO(size.width * 2, size.height)
  const virtualScene = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#f2f2f2")
    return scene
  }, [])
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

    state.gl.setRenderTarget(fbo)
    state.gl.render(virtualScene, virtualCamera)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <ScrollControls pages={2} damping={0.1}>
        {createPortal(
          <>
            <ScrollContent />
          </>,
          virtualScene
        )}

        <PostProcessPlane texture={fbo.texture} />
      </ScrollControls>
    </>
  )
}
