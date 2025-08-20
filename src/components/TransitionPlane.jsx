import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useControls } from "leva"
import { useTransitionContext } from "../contexts/TransitionContext"

export default function TransitionPlane() {
  const meshRef = useRef()
  const { viewport } = useThree()
  const distortionTimeRef = useRef(0)

  console.log("TransitionPlane: Component rendering")

  // Get transition context
  const { isTransitioning, transitionProgress, transitionDirection } =
    useTransitionContext()

  console.log("TransitionPlane: Context values:", {
    isTransitioning,
    transitionProgress,
    transitionDirection,
  })

  // Transition controls
  const { transitionDistortion, transitionAberration, debugTransition } =
    useControls(
      "Transition Effects",
      {
        transitionDistortion: { value: 1.2, min: 0.1, max: 3.0, step: 0.1 },
        transitionAberration: {
          value: 0.08,
          min: 0.001,
          max: 0.2,
          step: 0.001,
        },
        debugTransition: { value: false },
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
        uDebugTransition: { value: debugTransition },
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
        uniform bool uDebugTransition;
        varying vec2 vUv;

        // Improved noise function for transitions
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

        // Fractal noise for more organic distortion
        float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          for (int i = 0; i < 4; i++) {
            value += amplitude * noise(st * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;
          
          // Show debug effect or transition effects
          if (uDebugTransition || uTransitionProgress > 0.0) {
            // Create organic distortion based on fractal noise
            float n = fbm(uv * 8.0 + uTime * 0.5);
            vec2 distortion = vec2(n) * uTransitionProgress * uTransitionDistortion * 0.15;
            
            // Apply chromatic aberration with slide effect
            float aberration = uTransitionProgress * uTransitionAberration;
            vec3 color = vec3(0.0);
            
            if (uDebugTransition) {
              // Debug mode: show constant effect with distortion
              float n = fbm(uv * 8.0 + uTime * 0.5);
              vec2 distortion = vec2(n) * 0.1;
              vec2 distortedUv = uv + distortion;
              
              color.r = 0.8 * sin(uTime + distortedUv.x * 5.0);
              color.g = 0.6 * sin(uTime * 0.7 + distortedUv.y * 4.0);
              color.b = 1.0 * sin(uTime * 1.3 + distortedUv.x * 3.0);
              gl_FragColor = vec4(color, 0.8);
            } else {
              // Transition mode: show progress-based effect
              float intensity = uTransitionProgress * 1.2;
              
              // Add some color variation based on position and time
              color.r = 0.4 * intensity * (0.5 + 0.5 * sin(uTime + uv.x * 10.0));
              color.g = 0.2 * intensity * (0.5 + 0.5 * sin(uTime * 0.7 + uv.y * 8.0));
              color.b = 0.6 * intensity * (0.5 + 0.5 * sin(uTime * 1.3 + uv.x * 6.0));
              
              // Add some glow effect
              float glow = smoothstep(0.0, 0.3, uTransitionProgress) * smoothstep(1.0, 0.7, uTransitionProgress);
              color += vec3(0.2, 0.1, 0.3) * glow;
              
              gl_FragColor = vec4(color, uTransitionProgress * 0.9);
            }
          } else {
            discard; // Don't render when not transitioning
          }
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending, // Use normal blending for better visibility
      depthTest: false, // Render on top of everything
      depthWrite: false,
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
      material.uniforms.uDebugTransition.value = debugTransition
    }
  })

  // Only render during transitions or debug mode
  if (!isTransitioning && transitionProgress === 0 && !debugTransition) {
    return null
  }

  // Debug: always show when debug is enabled
  if (debugTransition) {
    console.log("TransitionPlane: Debug mode enabled, rendering")
  }

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 1]} // Render closer to camera
      ref={meshRef}
      material={material}
      raycast={null} // Don't intercept clicks
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
