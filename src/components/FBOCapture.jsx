import { useRef, useMemo } from "react"
import { useFrame, createPortal } from "@react-three/fiber"
import * as THREE from "three"
import { useFBO, OrthographicCamera } from "@react-three/drei"
import PostProcessPlane from "./PostProcessPlane"

export default function FBOCapture({ children }) {
  const fbo = useFBO(1024, 1024) // Fixed size to avoid window reference issues

  useFrame((state) => {
    // For now, let's just render normally and capture later
    // This is a simplified approach to test the pipeline
  })

  return (
    <>
      {/* Render children normally for now */}
      {/* {children} */}

      {/* Display the FBO texture on fullscreen plane */}
      <PostProcessPlane texture={fbo.texture} />
    </>
  )
}
