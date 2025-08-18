import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import { Leva, useControls } from "leva"
import ScrollContent from "./ScrollContent"
import Grid from "./Grid"
import PostProcessPlane from "./PostProcessPlane"

function CanvasWrapper({ onWork1More, onWork2More, onWork3More }) {
  const { fboScale, adaptiveRes, dprMax, fboSamples } = useControls(
    "Canvas and Render Quality",
    {
      fboScale: { value: 1.0, min: 0.5, max: 2.0, step: 0.1 },
      adaptiveRes: { value: true },
      dprMax: { value: 2.0, min: 1.0, max: 4.0, step: 0.5 },
      fboSamples: { value: 4, min: 0, max: 16, step: 1 },
    },
    {
      collapsed: true,
    }
  )

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 75 }}
      className="w-full h-full"
      dpr={[1, dprMax]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
      }}
    >
      <ScrollControls pages={4} damping={0.1}>
        <ScrollContent
          onWork1More={onWork1More}
          onWork2More={onWork2More}
          onWork3More={onWork3More}
        />
        <Grid />
        <PostProcessPlane
          fboScale={fboScale}
          adaptiveRes={adaptiveRes}
          fboSamples={fboSamples}
        />
      </ScrollControls>
    </Canvas>
  )
}

export default function Scene({ onWork1More, onWork2More, onWork3More }) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Leva collapsed oneLineLabels hideTitleBar />
      <CanvasWrapper
        onWork1More={onWork1More}
        onWork2More={onWork2More}
        onWork3More={onWork3More}
      />
    </div>
  )
}
