import { Canvas } from "@react-three/fiber"
import { Leva } from "leva"

import Scene from "./components/Scene"

import "./index.css"

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Leva collapsed hidden />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
      >
        <Scene />
      </Canvas>
    </div>
  )
}
