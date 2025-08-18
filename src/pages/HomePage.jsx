import { Canvas } from "@react-three/fiber"
import { Leva, useControls } from "leva"
import { useNavigate } from "react-router-dom"

import Scene from "../components/Scene"

function CanvasWrapper({ navigation }) {
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
      <Scene navigation={navigation} />
    </Canvas>
  )
}

export default function HomePage() {
  const navigate = useNavigate()

  // Create navigation handlers outside of Canvas context
  const navigation = {
    goToWork1: () => navigate("/work1"),
    goToWork2: () => navigate("/work2"),
    goToWork3: () => navigate("/work3"),
    goToAbout: () => navigate("/about"),
    goToPlayground: () => navigate("/playground"),
    goToExpertise: () => navigate("/expertise"),
    goToImprint: () => navigate("/imprint"),
    goHome: () => navigate("/"),
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Leva collapsed oneLineLabels hideTitleBar />
      <CanvasWrapper navigation={navigation} />
    </div>
  )
}
