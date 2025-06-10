import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function PostProcessPlane({ texture }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  // Basic passthrough material for now
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
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

          varying vec2 vUv;
          
          void main() {

            vec4 color = texture2D(uTexture, vUv);
          
            // gl_FragColor = vec4(color.r, 0.0, 1.0, 1.0);
            // gl_FragColor = vec4(vUv, 0.0, 1.0);
            gl_FragColor = color;
          }
        `,
    })
  }, [texture])

  useFrame((state) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uTexture.value = texture
    }
  })

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      ref={meshRef}
      material={material}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
