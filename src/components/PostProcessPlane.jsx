import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

export default function PostProcessPlane({ texture }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const scroll = useScroll()
  const prevScrollRef = useRef(0)
  const distortionTimeRef = useRef(0)

  // Basic passthrough material for now
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uDistortionTime: { value: 0 },
      },
      vertexShader: `
          varying vec2 vUv;

          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vUv = uv;
          }
        `,
      fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uScroll;
          uniform float uDistortionTime;

          varying vec2 vUv;
          
          void main() {
            // Calculate distortion amount based on time since scroll
            float distortion = uDistortionTime > 0.0 ? sin(uDistortionTime * 10.0) * 0.02 * (1.0 - uDistortionTime) : 0.0;
            
            // Apply distortion to UV coordinates
            vec2 distortedUv = vUv;
            distortedUv.x += distortion * sin(vUv.y * 10.0);
            distortedUv.y += distortion * cos(vUv.x * 10.0);
            
            vec4 color = texture2D(uTexture, distortedUv);
            gl_FragColor = color;
          }
        `,
    })
  }, [texture])

  useFrame((state, delta) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uTexture.value = texture

      if (scroll.offset !== undefined) {
        material.uniforms.uScroll.value = scroll.offset

        // Check if scroll has changed
        if (Math.abs(scroll.offset - prevScrollRef.current) > 0.001) {
          distortionTimeRef.current = 1.0 // Reset distortion timer
          material.uniforms.uDistortionTime.value = 1.0 // Apply immediately
        }

        // Update distortion time
        if (distortionTimeRef.current > 0) {
          distortionTimeRef.current -= delta * 1.5 // Adjust speed of fade out
          material.uniforms.uDistortionTime.value = distortionTimeRef.current
        }

        prevScrollRef.current = scroll.offset
      }
    }
  })

  return (
    // <mesh scale={[3, 2, 1]} ref={meshRef} material={material}>
    <mesh
      scale={[viewport.width * 0.7, viewport.height, 1]}
      ref={meshRef}
      material={material}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
