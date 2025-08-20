import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useControls } from "leva"
import { useTransitionContext } from "../contexts/TransitionContext"

export default function TransitionPlane() {
  const meshRef = useRef()
  const { viewport } = useThree()
  const distortionTimeRef = useRef(0)

  // Get transition context
  const { isTransitioning, transitionProgress, transitionDirection } =
    useTransitionContext()

  // Transition controls
  const { transitionDistortion, transitionAberration } = useControls(
    "Transition Effects",
    {
      transitionDistortion: { value: 0.8, min: 0.1, max: 2.0, step: 0.1 },
      transitionAberration: { value: 0.05, min: 0.001, max: 0.1, step: 0.001 },
    },
    {
      collapsed: true,
    }
  )

  // Simple transition material without scroll dependencies
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTransitionProgress: { value: 0 },
        uTransitionDirection: { value: 0 },
        uTransitionDistortion: { value: transitionDistortion },
        uTransitionAberration: { value: transitionAberration },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uTransitionProgress;
        uniform float uTransitionDirection;
        uniform float uTransitionDistortion;
        uniform float uTransitionAberration;
        varying vec2 vUv;

        // Simple noise function for transitions
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          
          // Only apply effects during transitions
          if (uTransitionProgress > 0.0) {
            // Create distortion based on noise
            float n = noise(uv * 10.0 + uTime);
            vec2 distortion = vec2(n) * uTransitionProgress * uTransitionDistortion * 0.1;
            
            // Apply chromatic aberration
            float aberration = uTransitionProgress * uTransitionAberration;
            
            // Simple color effect to indicate transition
            vec3 color = vec3(0.0);
            color.r = 0.1 * uTransitionProgress;
            color.g = 0.05 * uTransitionProgress;
            color.b = 0.15 * uTransitionProgress;
            
            gl_FragColor = vec4(color, uTransitionProgress * 0.5);
          } else {
            discard; // Don't render when not transitioning
          }
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
  }, [transitionDistortion, transitionAberration])

  useFrame((state, delta) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uTransitionProgress.value = transitionProgress
      material.uniforms.uTransitionDirection.value =
        transitionDirection === "in" ? 1.0 : 0.0
      material.uniforms.uTransitionDistortion.value = transitionDistortion
      material.uniforms.uTransitionAberration.value = transitionAberration
    }
  })

  // Only render during transitions
  if (!isTransitioning && transitionProgress === 0) {
    return null
  }

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 10]} // Render on top
      ref={meshRef}
      material={material}
      raycast={null} // Don't intercept clicks
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
