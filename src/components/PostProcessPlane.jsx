import { useRef, useMemo } from "react"
import { useFrame, useThree, useLoader } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import * as THREE from "three"
import { useControls, Leva } from "leva"
import postprocessVertex from "../shaders/postprocessVertex"
import postprocessFragment from "../shaders/postprocessFragment"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

export default function PostProcessPlane({ texture }) {
  const meshRef = useRef()
  const { viewport, gl, scene } = useThree()
  const scroll = useScroll()
  const prevScrollRef = useRef(0)
  const distortionTimeRef = useRef(0)

  // Load HDRI environment map
  const envMapEquirect = useLoader(RGBELoader, "/textures/envmap.hdr")
  const pmrem = useMemo(() => new THREE.PMREMGenerator(gl), [gl])
  const envMapTexture = useMemo(
    () => pmrem.fromEquirectangular(envMapEquirect).texture,
    [pmrem, envMapEquirect]
  )

  // Set as scene environment and background
  useMemo(() => {
    scene.environment = envMapTexture
    scene.background = envMapTexture
  }, [scene, envMapTexture])

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
    fbmOctaves,
    displacementStrength,
    roughness,
    metallic,
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
      effectDuration: { value: 1.4, min: 0.2, max: 10.0, step: 0.1 },
      fbmOctaves: { value: 3, min: 1, max: 8, step: 1 },
      displacementStrength: { value: 0.2, min: 0.0, max: 10.0, step: 0.01 },
      roughness: { value: 0.1, min: 0.0, max: 1.0, step: 0.01 },
      metallic: { value: 0.0, min: 0.0, max: 1.0, step: 0.01 },
    },
    {
      collapsed: true,
    }
  )

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
        uDisplacementStrength: { value: displacementStrength },
        uScrollAmplitude: { value: 0 },
        uRoughness: { value: roughness },
        uCameraPosition: { value: [0, 0, 5] },
        uMetallic: { value: metallic },
        uEnvMap: { value: envMapTexture },
      },
      vertexShader: postprocessVertex,
      fragmentShader: postprocessFragment,
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
    displacementStrength,
    roughness,
    metallic,
    envMapTexture,
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
      material.uniforms.uDisplacementStrength.value = displacementStrength
      material.uniforms.uRoughness.value = roughness
      material.uniforms.uMetallic.value = metallic
      material.uniforms.uCameraPosition.value = [
        state.camera.position.x,
        state.camera.position.y,
        state.camera.position.z,
      ]
      material.uniforms.uEnvMap.value = envMapTexture

      if (scroll.offset !== undefined) {
        material.uniforms.uScroll.value = scroll.offset

        // Calculate scroll velocity
        const scrollDelta = scroll.offset - prevScrollRef.current
        material.uniforms.uScrollVelocity.value = scrollDelta
        const scrollVelocity = Math.abs(scrollDelta) / delta

        // Set scroll amplitude based on velocity (tweak factor as needed)
        const amplitude = Math.min(1.0, scrollVelocity * 0.5) // 0.5 is a sensitivity factor
        material.uniforms.uScrollAmplitude.value = amplitude
        // If velocity is very low, set amplitude to 0
        if (scrollVelocity < 0.01) {
          material.uniforms.uScrollAmplitude.value = 0.0
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
      <planeGeometry args={[1, 1, 256, 256]} />
    </mesh>
  )
}
