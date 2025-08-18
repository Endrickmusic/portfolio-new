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

export default function ExpertisePage() {
  return (
    <div className="w-screen h-screen bg-gray-50 overflow-auto">
      <BackButton />

      <div className="max-w-6xl mx-auto px-8 py-20">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-light text-gray-900 mb-6">
              Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Technical skills and creative capabilities developed through years
              of experience in 3D graphics, interactive media, and computational
              art.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">
                Technical Skills
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 3D Graphics */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    3D Graphics
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Three.js & React Three Fiber</li>
                    <li>• WebGL & OpenGL</li>
                    <li>• 3D Mathematics & Transformations</li>
                    <li>• Lighting & Shading Models</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>

                {/* Shader Programming */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-purple-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Shader Programming
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• GLSL (OpenGL Shading Language)</li>
                    <li>• Vertex & Fragment Shaders</li>
                    <li>• Post-processing Effects</li>
                    <li>• Procedural Generation</li>
                    <li>• Ray Marching & SDF</li>
                  </ul>
                </div>

                {/* Physics Simulation */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-green-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Physics Simulation
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Particle Systems</li>
                    <li>• Fluid Dynamics</li>
                    <li>• Cloth & Soft Body Simulation</li>
                    <li>• Collision Detection</li>
                    <li>• Force-based Systems</li>
                  </ul>
                </div>

                {/* Web Development */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-orange-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Web Development
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• React & Modern JavaScript</li>
                    <li>• TypeScript</li>
                    <li>• Node.js & Build Tools</li>
                    <li>• Performance Optimization</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>

                {/* Creative Coding */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-teal-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Creative Coding
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Generative Art</li>
                    <li>• Algorithm Design</li>
                    <li>• Interactive Installations</li>
                    <li>• Audio-Visual Synchronization</li>
                    <li>• Real-time Graphics</li>
                  </ul>
                </div>

                {/* Tools & Software */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-indigo-600 rounded"></div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    Tools & Software
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Blender & 3D Modeling</li>
                    <li>• Adobe Creative Suite</li>
                    <li>• Git Version Control</li>
                    <li>• Docker & DevOps</li>
                    <li>• Testing & Debugging</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8 text-center">
                Services
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Interactive Experiences
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Custom interactive web applications that engage users
                    through immersive 3D environments, real-time simulations,
                    and responsive visual effects.
                  </p>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Portfolio & Showcase Websites</li>
                    <li>• Interactive Product Visualizations</li>
                    <li>• Educational Simulations</li>
                    <li>• Art Installations</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    Technical Consulting
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Strategic guidance and technical expertise for projects
                    involving complex 3D graphics, performance optimization, and
                    cutting-edge web technologies.
                  </p>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Architecture & Planning</li>
                    <li>• Performance Optimization</li>
                    <li>• Code Reviews & Audits</li>
                    <li>• Team Training & Workshops</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Ready to Start a Project?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how these skills can bring your vision to life.
              Every project is unique, and I love tackling new challenges.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>christian@hohenbild.com</p>
              <p>+49 170 751 85 25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
