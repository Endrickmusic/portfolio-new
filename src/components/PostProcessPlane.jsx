import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"

export default function PostProcessPlane({ texture }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const scroll = useScroll()

  // Basic passthrough material for now
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScroll: { value: 0 },
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

          varying vec2 vUv;
          
          void main() {
            vec4 color = texture2D(uTexture, vUv);
            
            // Example: Add a scroll-based effect
            float scrollEffect = sin(uScroll * 10.0) * 0.7;
            color.r += scrollEffect;
            
            gl_FragColor = color;
          }
        `,
    })
  }, [texture])

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uTexture.value = texture
      if (scroll.offset !== undefined) {
        material.uniforms.uScroll.value = scroll.offset
        // console.log(scroll.offset)
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
