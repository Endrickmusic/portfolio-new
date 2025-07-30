import { Text, Svg } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useState, useEffect, useMemo } from "react"
import { useControls } from "leva"

export default function Header({ textStyles }) {
  const { viewport } = useThree()
  const columnWidth = viewport.width / 24

  const controls = useControls("Navigation Buttons", {
    buttonSize: { value: 3.5, min: 1, max: 10, step: 0.1 },
    radius: { value: 0.1, min: 0.1, max: 1.0, step: 0.1 },
    borderWidth: { value: 0.02, min: 0.01, max: 0.04, step: 0.01 },
  })

  const { buttonSize, radius, borderWidth } = controls
  const materialRefs = useRef([])

  useFrame(() => {
    materialRefs.current.forEach((material) => {
      if (material) {
        material.uniforms.uRadius.value = radius
        material.uniforms.uBorderWidth.value = borderWidth
      }
    })
  })

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
          viewport.width / 2 - columnWidth * 7.2,
          viewport.height * 0.02,
          0,
        ]}
      >
        {["Work", "Expertise", "About", "Playground"].map((text, i) => {
          const ref = useRef()
          const [width, setWidth] = useState(1) // default to avoid zero-size on first render
          const fontSize = textStyles.nav.fontSize(viewport)
          const padding = 0.6

          useEffect(() => {
            if (!ref.current?.geometry?.boundingBox) return
            const size = new THREE.Vector3()
            ref.current.geometry.boundingBox.getSize(size)
            setWidth(size.x)
          }, [viewport, text, fontSize])

          const size = [
            width + padding,
            viewport.height * 0.04 * (buttonSize / 3.5),
          ]

          return (
            <group key={text} position={[columnWidth * i * 2, 0, 0]}>
              <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={size} />
                <shaderMaterial
                  ref={(material) => {
                    if (material) {
                      materialRefs.current[i] = material
                    }
                  }}
                  key={size.toString()} // forces remount when size updates
                  transparent
                  uniforms={{
                    uColor: { value: new THREE.Color("#38358f") },
                    uFillColor: { value: new THREE.Color("#f0f0f0") },
                    uOpacity: { value: 1.0 },
                    uRadius: { value: radius },
                    uSize: { value: new THREE.Vector2(...size) },
                    uBorderWidth: { value: borderWidth },
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
                ref={ref}
                {...textStyles.nav}
                fontSize={fontSize}
                anchorX="center"
                anchorY="middle"
                color="#38358f"
              >
                {text}
              </Text>
            </group>
          )
        })}
      </group>
    </group>
  )
}
