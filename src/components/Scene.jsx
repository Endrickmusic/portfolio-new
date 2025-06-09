import { ScrollControls } from "@react-three/drei"
import ScrollContent from "./ScrollContent"
import FBOCapture from "./FBOCapture"

// Main scene component
export default function Scene() {
  return (
    <ScrollControls pages={3} damping={0.1}>
      <FBOCapture>
        <ScrollContent />
      </FBOCapture>
    </ScrollControls>
  )
}
