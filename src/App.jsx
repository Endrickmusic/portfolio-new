import { Canvas } from "@react-three/fiber"

import Scene from "./components/Scene"

import "./index.css"

export default function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        className="w-full h-full"
      >
        <Scene />
      </Canvas>
    </div>
  )
}
