import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export default function Pavilions() {
  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2eniT8eW-yIJxNvDrn9TosGzHhFJMfYWVtWYOTq.jpeg"
            alt="Medical professionals in geometric low-poly style"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0D1858] bg-opacity-70"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#FE6448] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <a href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </a>
              <a href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Registration
              </a>
              <a href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                About
              </a>
              <a href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Program
              </a>
              <a href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </a>
              <a href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Submissions
              </a>
              <a
                href="/pavilions"
                className="text-[#0D1858] bg-white px-2 py-1 rounded text-sm font-orbitron font-black uppercase"
              >
                Pavilions
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            Pavilions
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Immersive Technology Experiences
          </p>
        </div>
      </section>

      {/* Pavilions Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              What to Expect
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858]">
              Three unique pavilions offering hands-on experiences with cutting-edge medical technology
            </p>
          </div>

          {/* Main Pavilions */}
          <div className="space-y-16">
            {/* Mixed & Virtual Reality */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-[#0D1858] rounded-lg p-8 text-white">
                <div className="w-16 h-16 bg-white rounded mb-6"></div>
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Mixed & Virtual Reality Experience</h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  A 120-minute immersive journey into the future of surgical training and patient care
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>VR surgical simulation training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>AR-assisted procedure planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Mixed reality patient consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Haptic feedback surgical tools</span>
                  </div>
                </div>
				<Link
                  href="/pavilions/suite-psi"
                  className="inline-block mt-6 bg-white text-[#0D1858] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Pavilion Ψ (Psi)
                </Link>
              </div>
              <div className="text-[#0D1858] font-roboto-condensed">
                <h4 className="text-xl font-bold mb-4">Experience Highlights</h4>
                <p className="text-lg mb-4">
                  Step into the operating room of the future with our state-of-the-art VR/AR setup. Practice complex
                  procedures in a risk-free environment and explore how mixed reality is transforming medical education.
                </p>
                <p className="text-base">
                  <strong>Duration:</strong> 120 minutes
                  <br />
                  <strong>Capacity:</strong> 20 participants per session
                  <br />
                  <strong>Requirements:</strong> No prior VR experience needed
                </p>
              </div>
            </div>

            {/* AI Software Academy */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-[#85AFFB] font-roboto-condensed md:order-2">
                <h4 className="text-xl font-bold mb-4">Academy Features</h4>
                <p className="text-lg mb-4">
                  Artificial intelligence (AI) toolkits are reshaping clinical diagnostics, workflow automation and
                  surgical decision support. Experience the twenty most impactful medical-AI platforms currently in
                  deployment through hands-on coding sessions.
                </p>
                <p className="text-base">
                  <strong>Duration:</strong> 180 minutes
                  <br />
                  <strong>Capacity:</strong> 24 participants per session
                  <br />
                  <strong>Requirements:</strong> WLAN-enabled laptop, headphones
                </p>
              </div>
              <div className="bg-[#85AFFB] rounded-lg p-8 text-white md:order-1">
                <div className="w-16 h-16 bg-white rounded mb-6"></div>
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">
                  Suite Λ (Lambda) - Artificial Intelligence Software Academy
                </h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  A 180-minute intensive that spotlights medical-AI platforms with hands-on coding and expert
                  supervision
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Image segmentation suites and operative video annotators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Predictive dashboards and generative report writers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Structured demo pods with benchmark sheets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Build mini workflow under expert supervision</span>
                  </div>
                </div>
                <Link
                  href="/pavilions/suite-lambda"
                  className="inline-block mt-6 bg-white text-[#85AFFB] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Suite Λ (Lambda)
                </Link>
              </div>
            </div>

            {/* Startup Innovation Hub */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-[#FE6448] rounded-lg p-8 text-white">
                <div className="w-16 h-16 bg-white rounded mb-6"></div>
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Startup Innovation Hub</h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  Everything about startups - from ideation to market launch in the medical technology space
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Startup pitch competitions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Investor networking sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Regulatory guidance workshops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Technology showcase booths</span>
                  </div>
                </div>
                <Link
                  href="/pavilions/suite-sigma"
                  className="inline-block mt-6 bg-white text-[#FE6448] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Suite Σ (Sigma)
                </Link>
              </div>
              <div className="text-[#FE6448] font-roboto-condensed">
                <h4 className="text-xl font-bold mb-4">Innovation Highlights</h4>
                <p className="text-lg mb-4">
                  Connect with the next generation of medical technology innovators. Witness groundbreaking startups
                  present their solutions and network with investors, mentors, and fellow entrepreneurs.
                </p>
                <p className="text-base">
                  <strong>Format:</strong> Continuous showcase
                  <br />
                  <strong>Startups:</strong> 25+ participating companies
                  <br />
                  <strong>Prize:</strong> €50,000 grand prize
                </p>
              </div>
            </div>
          </div>

          {/* Registration CTA */}
          <div className="text-center mt-16">
            <div className="bg-[#0D1858] rounded-lg p-8 text-white">
              <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Reserve Your Pavilion Experience</h3>
              <p className="text-lg font-roboto-condensed mb-6">
                Pavilion access is included with your congress registration. Limited capacity - reserve your spots
                early!
              </p>
              <button className="bg-[#FE6448] text-white px-8 py-4 rounded font-orbitron font-bold uppercase hover:bg-[#e55439] transition-colors">
                Register for Congress
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}