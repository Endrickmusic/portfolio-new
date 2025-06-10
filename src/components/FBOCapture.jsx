import { useRef, useMemo } from "react"
import { useFrame, createPortal } from "@react-three/fiber"
import * as THREE from "three"
import { useFBO, OrthographicCamera } from "@react-three/drei"
import PostProcessPlane from "./PostProcessPlane"

export default function FBOCapture({ children }) {
  const fbo = useFBO(1024, 1024)
  const virtualScene = useMemo(() => new THREE.Scene(), [])
  const virtualCamera = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000),
    []
  )

  useFrame((state) => {
    // Render the children to our FBO
    state.gl.setRenderTarget(fbo)
    state.gl.render(virtualScene, virtualCamera)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      {/* Render content to virtual scene */}
      (children, virtualScene)}
      {/* Display the FBO texture */}
      <PostProcessPlane texture={fbo.texture} />
    </>
  )
}
