import { useRef, useMemo, forwardRef, useImperativeHandle } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import { useControls } from "leva"
import { useTransitionContext } from "../contexts/TransitionContext"

function PostProcessPlaneImpl({ texture }, ref) {
  const meshRef = useRef()
  useImperativeHandle(ref, () => meshRef.current)
  const { viewport } = useThree()
  const scroll = useScroll()
  const prevScrollRef = useRef(0)
  const distortionTimeRef = useRef(0)

  // Get transition context
  const { isTransitioning, transitionProgress, transitionDirection } =
    useTransitionContext()

  // Leva controls - direct and simple
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
    fbmOctaves,
    decayRate,
    // Transition controls
    transitionDistortion,
    transitionAberration,
    transitionDuration,
  } = useControls(
    "Noise",
    {
      noiseScale: { value: 5.9, min: 0.5, max: 10.0, step: 0.1 },
      noiseSpeed: { value: 0.2, min: 0.0, max: 1.0, step: 0.01 },
      noiseThreshold: { value: 0.7, min: 0.3, max: 0.7, step: 0.05 },
      noiseTransition: { value: 0.3, min: 0.05, max: 0.3, step: 0.05 },
      baseDistortion: { value: 0.16, min: 0.01, max: 0.2, step: 0.01 },
      strongDistortion: { value: 3.45, min: 0.1, max: 4.5, step: 0.05 },
      aberrationStrength: { value: 0.003, min: 0.001, max: 0.01, step: 0.001 },
      aberrationLayers: { value: 5, min: 1, max: 5, step: 1 },
      aberrationSlide: { value: 2.0, min: 0.01, max: 2.0, step: 0.01 },
      effectDuration: { value: 0.4, min: 0.2, max: 2.0, step: 0.1 },
      fbmOctaves: { value: 6, min: 1, max: 8, step: 1 },
      decayRate: { value: 0.4, min: 0.1, max: 5.0, step: 0.1 },
      // Transition controls
      transitionDistortion: { value: 0.8, min: 0.1, max: 2.0, step: 0.1 },
      transitionAberration: { value: 0.05, min: 0.001, max: 0.1, step: 0.001 },
      transitionDuration: { value: 1.0, min: 0.2, max: 3.0, step: 0.1 },
    },
    {
      collapsed: true,
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
        uFbmOctaves: { value: fbmOctaves },
        uScrollVelocity: { value: 0 },
        // Transition uniforms
        uTransitionProgress: { value: 0 },
        uTransitionDirection: { value: 0 }, // 0 = out, 1 = in
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
          uniform float uFbmOctaves;
          uniform float uScrollVelocity;
          // Transition uniforms
          uniform float uTransitionProgress;
          uniform float uTransitionDirection;
          uniform float uTransitionDistortion;
          uniform float uTransitionAberration;

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
              if(float(i) >= uFbmOctaves) break;
              value += amplitude * cnoise(p);
              p *= 1.5;
              amplitude *= 0.6;
            }
            return value;
          }
          
          void main() {
            // Calculate scroll-based vertical offset for noise
            float scrollOffset = uScrollVelocity * 2.0;
            // 2D distortion: use two different fbm noise values for x and y
            // Apply noiseScale to control the scale of the noise pattern
            // Use modulo to prevent the time from growing indefinitely and causing acceleration
            float controlledTime = mod(uTime * uNoiseSpeed, 1000.0);
            float noiseX = fbm(vec3(vUv.x * uNoiseScale, vUv.y * uNoiseScale + scrollOffset, controlledTime));
            float noiseY = fbm(vec3((vUv.x + 10.0) * uNoiseScale, (vUv.y + scrollOffset + 10.0) * uNoiseScale, controlledTime));
            float strongDistortion = smoothstep(uNoiseThreshold, uNoiseThreshold + uNoiseTransition, (noiseX + noiseY) * 0.5);
            float baseDistortion = uDistortionTime > 0.0 ? uBaseDistortion * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            float strongDistortionAmount = uDistortionTime > 0.0 ? uStrongDistortion * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            float distortionAmount = mix(baseDistortion, strongDistortionAmount, strongDistortion);
            
            // Add transition distortion
            float transitionDistortionAmount = uTransitionProgress * uTransitionDistortion;
            distortionAmount += transitionDistortionAmount;
            
            // Compose 2D distortion vector
            vec2 distortionVec = vec2(noiseX, noiseY) * distortionAmount;
            vec2 distortedUv = vUv + distortionVec;
            
            // Chromatic aberration with slide effect
            float aberrationStrength = uDistortionTime > 0.0 ? uAberrationStrength * smoothstep(0.0, 1.0, uDistortionTime) : 0.0;
            aberrationStrength *= (1.0 + strongDistortion * 2.0);
            
            // Add transition aberration
            aberrationStrength += uTransitionProgress * uTransitionAberration;
            
            vec3 color = vec3(0.0);
            
            for(int i = 0; i < int(uAberrationLayers); i++) {
                float slide = float(i) / float(uAberrationLayers);
                vec2 refractVecR = vec2(aberrationStrength, 0.0);
                vec2 refractVecG = vec2(0.0, 0.0);
                vec2 refractVecB = vec2(-aberrationStrength, 0.0);
                
                color.r += texture2D(uTexture, distortedUv + refractVecR.xy * (slide * uAberrationSlide * 1.0)).r;
                color.g += texture2D(uTexture, distortedUv + refractVecG.xy * (slide * uAberrationSlide * 2.0)).g;
                color.b += texture2D(uTexture, distortedUv + refractVecB.xy * (slide * uAberrationSlide * 4.0)).b;
            }
            
            // Normalize colors
            color /= float(uAberrationLayers);
                
            // color = texture2D(uTexture, distortedUv).rgb;
            color = pow(color, vec3(1.0 / 2.2));
            
            gl_FragColor = vec4(color, 1.0);
            // gl_FragColor = vec4(uTexture, 1.0);
            // gl_FragColor = vec4(distortion * 5.0, distortion * 5.0, distortion * 5.0, 1.0);
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
    fbmOctaves,
    decayRate,
    transitionDistortion,
    transitionAberration,
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
      material.uniforms.uFbmOctaves.value = fbmOctaves

      // Update transition uniforms
      material.uniforms.uTransitionProgress.value = transitionProgress
      material.uniforms.uTransitionDirection.value =
        transitionDirection === "in" ? 1.0 : 0.0
      material.uniforms.uTransitionDistortion.value = transitionDistortion
      material.uniforms.uTransitionAberration.value = transitionAberration

      if (scroll.offset !== undefined) {
        material.uniforms.uScroll.value = scroll.offset

        // Calculate scroll velocity
        const scrollDelta = scroll.offset - prevScrollRef.current
        material.uniforms.uScrollVelocity.value = scrollDelta
        const scrollVelocity = Math.abs(scrollDelta) / delta

        // Trigger distortion when scroll velocity is high enough
        if (scrollVelocity > 0.1) {
          distortionTimeRef.current = effectDuration
          material.uniforms.uDistortionTime.value = effectDuration
        }

        // Update distortion time
        if (distortionTimeRef.current > 0) {
          // Exponential decay instead of linear fade
          distortionTimeRef.current *= Math.exp(-decayRate * delta)

          // Ensure it doesn't go below 0
          if (distortionTimeRef.current < 0.001) {
            distortionTimeRef.current = 0
          }

          material.uniforms.uDistortionTime.value = distortionTimeRef.current
        }

        prevScrollRef.current = scroll.offset
      }
    }
  })

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      position={[0, 0, 0.01]}
      ref={meshRef}
      material={material}
      // Ignore all pointer events so it never intercepts clicks
      raycast={null}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default forwardRef(PostProcessPlaneImpl)
