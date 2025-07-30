import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import { useControls, Leva } from "leva"

export default function PostProcessPlane({ texture }) {
  const meshRef = useRef()
  const { viewport } = useThree()
  const scroll = useScroll()
  const prevScrollRef = useRef(0)
  const distortionTimeRef = useRef(0)

  // Leva controls
  const {
    noiseScale,
    noiseSpeed,
    noiseThreshold,
    noiseTransition,
    baseDistortion,
    strongDistortion,
    aberrationStrength,
    aberrationLayers,
    aberrationSlide,
    effectDuration,
  } = useControls(
    "Distortion Effect",
    {
      noiseScale: { value: 1.5, min: 0.5, max: 3.0, step: 0.1 },
      noiseSpeed: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
      noiseThreshold: { value: 0.5, min: 0.3, max: 0.7, step: 0.05 },
      noiseTransition: { value: 0.15, min: 0.05, max: 0.3, step: 0.05 },
      baseDistortion: { value: 0.09, min: 0.01, max: 0.2, step: 0.01 },
      strongDistortion: { value: 0.45, min: 0.1, max: 0.5, step: 0.05 },
      aberrationStrength: { value: 0.01, min: 0.001, max: 0.01, step: 0.001 },
      aberrationLayers: { value: 4, min: 1, max: 5, step: 1 },
      aberrationSlide: { value: 0.12, min: 0.01, max: 2.0, step: 0.01 },
      effectDuration: { value: 1.4, min: 0.2, max: 2.0, step: 0.1 },
    },
    {
      collapsed: true, // Hide Leva panel completely
    }
  )

  // Basic passthrough material for now
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uDistortionTime: { value: 0 },
        uNoiseScale: { value: noiseScale },
        uNoiseSpeed: { value: noiseSpeed },
        uNoiseThreshold: { value: noiseThreshold },
        uNoiseTransition: { value: noiseTransition },
        uBaseDistortion: { value: baseDistortion },
        uStrongDistortion: { value: strongDistortion },
        uAberrationStrength: { value: aberrationStrength },
        uAberrationLayers: { value: aberrationLayers },
        uAberrationSlide: { value: aberrationSlide },
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
          uniform float uNoiseScale;
          uniform float uNoiseSpeed;
          uniform float uNoiseThreshold;
          uniform float uNoiseTransition;
          uniform float uBaseDistortion;
          uniform float uStrongDistortion;
          uniform float uAberrationStrength;
          uniform float uAberrationLayers;
          uniform float uAberrationSlide;

          varying vec2 vUv;

          //	Classic Perlin 3D Noise 
          //	by Stefan Gustavson
          vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
          vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
          vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

          float cnoise(vec3 P){
            vec3 Pi0 = floor(P); // Integer part for indexing
            vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
            return 2.2 * n_xyz;
          }

          // FBM function
          float fbm(vec3 p) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 0.0;
            for (int i = 0; i < 8; i++) {
              value += amplitude * abs(cnoise(p));
              p *= 1.5;
              amplitude *= 0.6;
            }
            return value;
          }
          
          void main() {
            // Calculate base noise with larger scale and slower time
            float noise = fbm(vec3(vUv * uNoiseScale, uTime * uNoiseSpeed));
            
            // Create areas of stronger distortion using threshold
            float strongDistortion = smoothstep(uNoiseThreshold, uNoiseThreshold + uNoiseTransition, noise);
            
            // Calculate distortion amount based on time since scroll
            float baseDistortion = uDistortionTime > 0.0 ? noise * uBaseDistortion * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            float strongDistortionAmount = uDistortionTime > 0.0 ? noise * uStrongDistortion * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            
            // Mix between normal and strong distortion
            float distortion = mix(baseDistortion, strongDistortionAmount, strongDistortion);
            
            // Apply distortion to UV coordinates
            vec2 distortedUv = vUv;
            distortedUv += distortion;
            
            // Chromatic aberration with slide effect
            float aberrationStrength = uDistortionTime > 0.0 ? uAberrationStrength * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            aberrationStrength *= (1.0 + strongDistortion * 2.0);
            
            vec3 color = vec3(0.0);
            
            for(int i = 0; i < int(uAberrationLayers); i++) {
                float slide = float(i) / float(uAberrationLayers);
                vec2 refractVecR = vec2(aberrationStrength, 0.0);
                vec2 refractVecG = vec2(0.0, 0.0);
                vec2 refractVecB = vec2(-aberrationStrength, 0.0);
                
                color.r += texture2D(uTexture, distortedUv + refractVecR.xy * (slide * uAberrationSlide * 1.0)).r;
                color.g += texture2D(uTexture, distortedUv + refractVecG.xy * (slide * uAberrationSlide * 1.0)).g;
                color.b += texture2D(uTexture, distortedUv + refractVecB.xy * (slide * uAberrationSlide * 1.0)).b;
            }
            
            // Normalize colors
            color /= float(uAberrationLayers);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `,
    })
  }, [
    texture,
    noiseScale,
    noiseSpeed,
    noiseThreshold,
    noiseTransition,
    baseDistortion,
    strongDistortion,
    aberrationStrength,
    aberrationLayers,
    aberrationSlide,
  ])

  useFrame((state, delta) => {
    if (material) {
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uTexture.value = texture
      material.uniforms.uNoiseScale.value = noiseScale
      material.uniforms.uNoiseSpeed.value = noiseSpeed
      material.uniforms.uNoiseThreshold.value = noiseThreshold
      material.uniforms.uNoiseTransition.value = noiseTransition
      material.uniforms.uBaseDistortion.value = baseDistortion
      material.uniforms.uStrongDistortion.value = strongDistortion
      material.uniforms.uAberrationStrength.value = aberrationStrength
      material.uniforms.uAberrationLayers.value = aberrationLayers
      material.uniforms.uAberrationSlide.value = aberrationSlide

      if (scroll.offset !== undefined) {
        material.uniforms.uScroll.value = scroll.offset

        // Calculate scroll velocity
        const scrollVelocity =
          Math.abs(scroll.offset - prevScrollRef.current) / delta

        // Trigger distortion when scroll velocity is high enough
        if (scrollVelocity > 0.1) {
          distortionTimeRef.current = effectDuration
          material.uniforms.uDistortionTime.value = effectDuration
        }

        // Update distortion time
        if (distortionTimeRef.current > 0) {
          distortionTimeRef.current -= delta
          material.uniforms.uDistortionTime.value = distortionTimeRef.current
        }

        prevScrollRef.current = scroll.offset
      }
    }
  })

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 0]}
      ref={meshRef}
      material={material}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}
