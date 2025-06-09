import { Canvas } from "@react-three/fiber"

import Scene from "./components/Scene"

import "./index.css"

export default function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
