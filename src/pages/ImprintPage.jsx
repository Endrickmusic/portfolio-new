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

export default function ImprintPage() {
  return (
    <div className="w-screen h-screen bg-gray-50 overflow-auto">
      <BackButton />

      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-light text-gray-900 mb-6">
              Legal / Imprint
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Legal information and contact details as required by German law
              (Impressum).
            </p>
          </div>

          {/* Legal Content */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="text-gray-700 space-y-2">
                  <p>
                    <strong>Christian Hohenbild</strong>
                  </p>
                  <p>Gleditschstr. 71</p>
                  <p>10781 Berlin</p>
                  <p>Germany</p>
                  <p className="pt-2">
                    <strong>Email:</strong> christian@hohenbild.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +49 170 751 85 25
                  </p>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Professional Information
                </h2>
                <div className="text-gray-700 space-y-2">
                  <p>
                    <strong>Profession:</strong> 3D Artist & Creative Developer
                  </p>
                  <p>
                    <strong>Business Type:</strong> Freelance / Sole
                    Proprietorship
                  </p>
                  <p>
                    <strong>VAT ID:</strong> Available upon request
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Disclaimer
                </h2>
                <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>Content Responsibility:</strong> The content of this
                    website has been created with the greatest possible care.
                    However, I cannot guarantee the accuracy, completeness, or
                    timeliness of the content. As a service provider, I am
                    responsible for my own content on these pages according to
                    general law.
                  </p>
                  <p>
                    <strong>External Links:</strong> This website contains links
                    to external websites over which I have no control.
                    Therefore, I cannot accept any responsibility for their
                    content. The respective provider or operator of the pages is
                    always responsible for the content of the linked pages.
                  </p>
                  <p>
                    <strong>Copyright:</strong> The content and works created by
                    the site operator on these pages are subject to German
                    copyright law. Duplication, processing, distribution, and
                    any form of commercialization of such material beyond the
                    scope of copyright law requires the prior written consent of
                    its respective author or creator.
                  </p>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Privacy
                </h2>
                <div className="text-gray-700 space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>Data Collection:</strong> This website does not
                    collect personal data unless you explicitly provide it
                    through contact forms or email communication.
                  </p>
                  <p>
                    <strong>Cookies:</strong> This website may use technical
                    cookies necessary for functionality. No tracking cookies or
                    analytics are used without your consent.
                  </p>
                  <p>
                    <strong>Contact Data:</strong> If you contact me via email
                    or contact form, your data will be stored solely for the
                    purpose of processing your inquiry and will not be passed on
                    to third parties.
                  </p>
                </div>
              </div>

              {/* Technical Information */}
              <div>
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Technical Information
                </h2>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>
                    <strong>Hosting:</strong> This website is hosted on secure
                    servers in Germany/EU
                  </p>
                  <p>
                    <strong>SSL:</strong> All data transmission is encrypted
                    using SSL/TLS
                  </p>
                  <p>
                    <strong>Framework:</strong> Built with React and modern web
                    technologies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200">
            <p>Last updated: December 2024</p>
            <p className="mt-2">
              This imprint complies with German law requirements (§5 TMG, §55
              RStV)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
