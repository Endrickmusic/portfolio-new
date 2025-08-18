import { useNavigate } from "react-router-dom"

// Back button component
function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-6 left-6 z-10 px-4 py-2 bg-black/10 backdrop-blur-sm text-black border border-black/20 rounded hover:bg-black/20 transition-colors"
    >
      ← Back to Portfolio
    </button>
  )
}

export default function AboutPage() {
  return (
    <div className="w-screen h-screen bg-gray-50 overflow-auto">
      <BackButton />

      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-light text-gray-900 mb-6">About</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Christian Hohenbild is a Berlin-based 3D artist and creative
              developer specializing in crafting immersive web experiences.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-gray-900">Background</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Combining art and code, I focus on real-time 3D graphics,
                  shader programming, and interactive visuals. My work explores
                  the intersection of computational physics and artistic
                  expression, creating digital experiences that feel organic and
                  alive.
                </p>
                <p>
                  With a background in both computer science and visual arts, I
                  bring a unique perspective to digital creation, always pushing
                  the boundaries of what's possible in real-time graphics and
                  interactive media.
                </p>
                <p>
                  Based in Berlin, I work with clients worldwide to create
                  innovative digital experiences that blur the line between
                  technology and art.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-light text-gray-900">Expertise</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Technical Skills
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>
                      • Real-time 3D Graphics (Three.js, React Three Fiber)
                    </li>
                    <li>• Shader Programming (GLSL)</li>
                    <li>• Physics Simulation</li>
                    <li>• Interactive Web Development</li>
                    <li>• Creative Coding</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Creative Focus
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Computational Art</li>
                    <li>• Interactive Installations</li>
                    <li>• Digital Storytelling</li>
                    <li>• Immersive Experiences</li>
                    <li>• Visual Effects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Let's Work Together
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Interested in collaborating on a project or have questions about
              my work? I'd love to hear from you.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>christian@hohenbild.com</p>
              <p>+49 170 751 85 25</p>
              <p>Berlin, Germany</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
