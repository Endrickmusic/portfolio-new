import { ScrollControls, useFBO } from "@react-three/drei"
import { createPortal, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo, useEffect, useRef } from "react"
import { Perf } from "r3f-perf"
import { useControls } from "leva"

import ScrollContent from "./ScrollContent"
import PostProcessPlane from "./PostProcessPlane"

// Main scene component
export default function Scene({ navigation }) {
  const { viewport, size } = useThree()

  // FBO resolution control
  const { fboScale, adaptiveRes, dprMax, fboSamples } = useControls(
    "Canvas and Render Quality",
    {
      fboScale: { value: 1, min: 1, max: 4, step: 0.5 },
      adaptiveRes: { value: true },
      dprMax: { value: 1, min: 1, max: 2, step: 0.5 },
      fboSamples: { value: 1, min: 0, max: 4, step: 1 },
    },
    {
      collapsed: true,
    }
  )

  const fbo = useFBO(
    adaptiveRes
      ? Math.min(
          size.width *
            Math.min(Math.min(window.devicePixelRatio, dprMax) * fboScale, 8),
          8192
        )
      : size.width * fboScale,
    adaptiveRes
      ? Math.min(
          size.height *
            Math.min(Math.min(window.devicePixelRatio, dprMax) * fboScale, 8),
          8192
        )
      : size.height * fboScale,
    {
      samples: fboSamples, // Controllable MSAA
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      generateMipmaps: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    }
  )
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
      {/* Match previous light background color from virtualScene */}
      <color attach="background" args={["#f2f2f2"]} />
      {/* <Perf position="top-left" /> */}
      <ScrollControls pages={3} damping={0.1}>
        {/* 1) Interactive content in main scene */}
        <ScrollContent navigation={navigation} />

        {/* 2) Non-interactive copy rendered into virtual scene → FBO */}
        {createPortal(<ScrollContent navigation={null} />, virtualScene)}

        {/* 3) Post process plane renders FBO texture as background */}
        <PostProcessPlane texture={fbo.texture} />
      </ScrollControls>
    </>
  )
}
