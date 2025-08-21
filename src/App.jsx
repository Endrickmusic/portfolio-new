import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"

// Import page content components (not full pages)
import HomePageContent from "./components/HomePageContent"
import Work1Content from "./components/Work1Content"
import Work1Detail from "./pages/Work1Detail"
import Work2Content from "./components/Work2Content"
import Work3Content from "./components/Work3Content"
import AboutPageContent from "./components/AboutPageContent"
import PlaygroundPageContent from "./components/PlaygroundPageContent"
import ExpertisePageContent from "./components/ExpertisePageContent"
import ImprintPageContent from "./components/ImprintPageContent"

// Import transition components
import { TransitionProvider } from "./contexts/TransitionContext"

import "./index.css"

// Canvas wrapper with controls
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
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/work1" element={<Work1Detail />} />
        <Route path="/work2" element={<Work2Content />} />
        <Route path="/work3" element={<Work3Content />} />
        <Route path="/about" element={<AboutPageContent />} />
        <Route path="/playground" element={<PlaygroundPageContent />} />
        <Route path="/expertise" element={<ExpertisePageContent />} />
        <Route path="/imprint" element={<ImprintPageContent />} />
      </Routes>
    </Canvas>
  )
}

export default function App() {
  return (
    <TransitionProvider>
      <Router>
        <div className="w-screen h-screen overflow-hidden">
          <Leva collapsed oneLineLabels hideTitleBar />
          <CanvasWrapper />
        </div>
      </Router>
    </TransitionProvider>
  )
}
