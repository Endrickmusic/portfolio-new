import { Text, Svg } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useMemo } from "react"

export default function Header({ textStyles }) {
  const { viewport } = useThree()
  const columnWidth = viewport.width / 24

  return (
    <group position={[0, viewport.height * 0.4, 0]}>
      {/* Logo */}
      <Svg
        src="/svgs/CH_logo.svg"
        scale={0.0045}
        position={[-viewport.width / 2 + columnWidth, 0, 0]}
        fillMaterial={new THREE.MeshBasicMaterial({ color: "#38358f" })}
      />

      {/* Name and Title */}
      <group
        position={[
          -viewport.width / 2 + columnWidth * 3,
          viewport.height * 0.02,
          0,
        ]}
      >
        <Text
          {...textStyles.logo}
          fontSize={textStyles.logo.fontSize(viewport)}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
        >
          Christian Hohenbild
        </Text>
        <Text
          {...textStyles.logo}
          fontSize={textStyles.logo.fontSize(viewport)}
          position={[0, -viewport.height * 0.03, 0]}
          anchorX="left"
          anchorY="middle"
          color="#38358f"
        >
          3D Artist and Creative Developer
        </Text>
      </group>

      {/* Navigation Links */}
      <group
        position={[
          viewport.width / 2 - columnWidth * 6,
          viewport.height * 0.02,
          0,
        ]}
      >
        {["Work", "Expertise", "About", "Playground"].map((text, i) => (
          <group key={text} position={[columnWidth * i * 1.5, 0, 0]}>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry
                args={[columnWidth * 1.2, viewport.height * 0.04]}
              />
              <shaderMaterial
                transparent
                uniforms={{
                  uColor: { value: new THREE.Color("#38354F") },
                  uOpacity: { value: 0.1 },
                  uRadius: { value: 0.2 },
                  uSize: { value: [columnWidth * 1.2, viewport.height * 0.04] },
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                      vUv = uv;
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                  `}
                fragmentShader={`
                    uniform vec3 uColor;
                    uniform float uOpacity;
                    uniform float uRadius;
                    uniform vec2 uSize;
                    varying vec2 vUv;

                    float roundedBoxSDF(vec2 centerPosition, vec2 size, float radius) {
                      return length(max(abs(centerPosition) - size + radius, 0.0)) - radius;
                    }

                    void main() {
                      vec2 pixelPos = (vUv - 0.5) * uSize;
                      float distance = roundedBoxSDF(pixelPos, uSize * 0.5, uRadius);
                      float smoothedAlpha = 1.0 - smoothstep(-1.0, 1.0, distance);
                      gl_FragColor = vec4(uColor, smoothedAlpha * uOpacity);
                    }
                  `}
              />
            </mesh>
            <Text
              {...textStyles.nav}
              fontSize={textStyles.nav.fontSize(viewport)}
              anchorX="center"
              anchorY="middle"
              color="#38358f"
            >
              {text}
            </Text>
          </group>
        ))}
      </group>
    </group>
  )
}
