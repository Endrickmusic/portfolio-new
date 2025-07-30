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
                  uColor: { value: new THREE.Color("#38358f") },
                  uFillColor: { value: new THREE.Color("#f0f0f0") }, // light grey fill
                  uOpacity: { value: 1.0 },
                  uRadius: { value: 0.3 },
                  uSize: { value: [3.5, 3.5] },
                  //   uSize: { value: [5, 5] },
                  uBorderWidth: { value: 0.4 },
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
                    uniform vec3 uFillColor;
                    uniform float uOpacity;
                    uniform float uRadius;
                    uniform vec2 uSize;
                    uniform float uBorderWidth;
                    varying vec2 vUv;

                    float roundedBoxSDF(vec2 p, vec2 b, float r) {
                    vec2 q = abs(p) - b + vec2(r);
                    return length(max(q, 0.0)) - r;
                    }

                    void main() {
                    vec2 pos = (vUv - 0.5) * uSize;
                    vec2 halfSize = uSize * 0.5 - uBorderWidth * 0.5;

                    float dist = roundedBoxSDF(pos, halfSize, uRadius);

                    float fillAlpha = smoothstep(0.01, 0.0, dist);
                    float borderAlpha = smoothstep(0.01, 0.0, abs(dist) - uBorderWidth * 0.5);
                    float alpha = borderAlpha * (1.0 - fillAlpha) + fillAlpha;

                    // Mix fill and border color
                    vec3 color = mix(uFillColor, uColor, borderAlpha * (1.0 - fillAlpha));

                    gl_FragColor = vec4(color, alpha * uOpacity);
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
