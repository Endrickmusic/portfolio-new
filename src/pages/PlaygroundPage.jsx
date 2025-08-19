import { useNavigate } from "react-router-dom"
import { useTransitionContext } from "../contexts/TransitionContext"

// Back button component
function BackButton() {
  const navigate = useNavigate()
  const { navigateWithTransition } = useTransitionContext()

  return (
    <button
      onClick={() => navigateWithTransition(navigate, "/")}
      className="fixed top-6 left-6 z-10 px-4 py-2 bg-black/10 backdrop-blur-sm text-black border border-black/20 rounded hover:bg-black/20 transition-colors"
    >
      ← Back to Portfolio
    </button>
  )
}

export default function PlaygroundPage() {
  return (
    <div className="w-screen h-screen bg-gray-50 overflow-auto">
      <BackButton />

      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-light text-gray-900 mb-6">
              Playground
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A collection of experimental studies—testing shaders, simulations,
              and interaction techniques. Focused on rapid prototyping and
              trying technical concepts outside of polished projects.
            </p>
          </div>

          {/* Experiments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Experiment 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Particle Flow
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exploring fluid-like particle behaviors using velocity fields
                  and noise functions.
                </p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  WebGL
                </span>
              </div>
            </div>

            {/* Experiment 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Shader Distortions
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Real-time image distortion effects using custom fragment
                  shaders.
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  GLSL
                </span>
              </div>
            </div>

            {/* Experiment 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Interactive Mesh
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Mouse-responsive 3D mesh deformation with spring physics.
                </p>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Three.js
                </span>
              </div>
            </div>

            {/* Experiment 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Noise Studies
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exploring different noise algorithms for procedural
                  generation.
                </p>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  Algorithms
                </span>
              </div>
            </div>

            {/* Experiment 5 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-teal-400 to-cyan-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ray Marching
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Signed distance field rendering experiments with complex
                  shapes.
                </p>
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                  SDF
                </span>
              </div>
            </div>

            {/* Experiment 6 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Audio Visualization
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Real-time audio analysis driving visual particle systems.
                </p>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                  Audio API
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="text-center pt-12 border-t border-gray-200">
            <p className="text-gray-500 italic">
              These experiments represent ongoing research and development. Some
              may evolve into full projects, others serve as learning exercises.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
