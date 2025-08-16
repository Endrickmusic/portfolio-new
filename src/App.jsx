import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

import Scene from "./components/Scene"

import "./index.css"

function CanvasWrapper() {
  const { canvasDpr, canvasAntialias } = useControls(
    "Canvas and Render Quality",
    {
      canvasDpr: {
        value: [1, 2],
        options: { "1x": [1, 1], "1-2x": [1, 2], "2x": [2, 2], "1-3x": [1, 3] },
      },
      canvasAntialias: { value: true },
    },
    {
      collapsed: true,
    }
  )

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 75 }}
      className="w-full h-full"
      dpr={canvasDpr}
      gl={{
        antialias: canvasAntialias,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
      }}
    >
      <Scene />
    </Canvas>
  )
}

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Leva collapsed oneLineLabels />
      <CanvasWrapper />
    </div>
  )
}
