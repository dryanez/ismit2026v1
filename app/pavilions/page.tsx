import ResponsiveNavigation from "@/components/ResponsiveNavigation";
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
        {/* Navigation */}
        <ResponsiveNavigation
          links={[
            { href: "/", label: "Home" },
            { href: "/registration", label: "Registration" },
            { href: "/about", label: "About" },
            { href: "/program", label: "Program" },
            { href: "/speakers", label: "Speakers" },
            { href: "/submissions", label: "Submissions" },
            { href: "/pavilions", label: "Pavilions", isActive: true },
          ]}
          logoSrc="/ISMIT REAL LOGO 1.svg"
          logoAlt="iSMIT Logo"
          desktopBgClass="bg-[#FE6448]"
          mobileBgClass="bg-[#FE6448]"
          textColorClass="text-white"
          activeLinkClass="text-[#0D1858] bg-white px-2 py-1 rounded"
        />

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
            {/* Mixed & Virtual Reality (Suite Psi) */}
            <div className="grid md:grid-cols-2 gap-8 items-center transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="bg-[#85AFFB] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Mixed & Virtual Reality Experience</h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  A 120-minute immersive journey into the future of surgical training and patient care. Explore
                  holographic anatomy mapping, augmented intraoperative guidance, and remote collaborative simulation.
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Where: Pavilion Ψ (Psi)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>When: Launch windows at 10:30 | 14:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Who: World-class physicians, elite MR engineers, bold early adopters</span>
                  </div>
                </div>
                <Link
                  href="/pavilions/suite-psi"
                  className="inline-block mt-6 bg-white text-[#0D1858] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Pavilion Ψ (Psi)
                </Link>
              </div>
              <div className="hidden justify-center md:flex">
                <img
                  src="/psi-illustration.svg"
                  alt="PSI Pavillion Illustration"
                  className="w-full h-auto max-w-sm object-contain"
                />
              </div>
            </div>

            {/* AI Software Academy (Suite Lambda) */}
            <div className="grid md:grid-cols-2 gap-8 items-center transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="hidden justify-center md:flex">
                <img
                  src="/lambda-illustration.svg"
                  alt="Lambda Pavillion Illustration"
                  className="w-full h-auto max-w-sm object-contain"
                />
              </div>
              <div className="bg-[#0D1858] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Suite Λ (Lambda) - AI Software Academy</h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  A 180-minute intensive that spotlights medical-AI platforms with hands-on coding and expert
                  supervision. Reshaping clinical diagnostics, workflow automation, and surgical decision support.
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Where: Suite Λ (Lambda)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>When: Launch windows at 10:30 | 14:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#FE6448] rounded-full"></div>
                    <span>Who: Leading clinician-scientists, data engineers, regulatory mentors</span>
                  </div>
                </div>
                <Link
                  href="/pavilions/suite-lambda"
                  className="inline-block mt-6 bg-white text-[#0D1858] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Suite Λ (Lambda)
                </Link>
              </div>
            </div>

            {/* Startup Innovation Hub (Suite Sigma) */}
            <div className="grid md:grid-cols-2 gap-8 items-center transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="bg-[#FE6448] rounded-lg p-8 text-white">
                <h3 className="text-2xl font-orbitron font-bold uppercase mb-4">Startup Innovation Hub</h3>
                <p className="text-lg font-roboto-condensed mb-6">
                  Everything about startups - from ideation to market launch in the medical technology space. Fearless
                  founders storm a pitch arena, proving clinical impact, scalability, and regulatory savvy.
                </p>
                <div className="space-y-4 text-sm font-roboto-condensed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Where: Suite Σ (Sigma)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>When: Events at 10:30 | 14:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Who: Fearless founders, ringside jury of investors, surgeons, AI visionaries</span>
                  </div>
                </div>
                <Link
                  href="/pavilions/suite-sigma"
                  className="inline-block mt-6 bg-white text-[#0D1858] px-6 py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  Enter Suite Σ (Sigma)
                </Link>
              </div>
              <div className="hidden justify-center md:flex">
                <img
                  src="/sigma-pavilion.svg"
                  alt="Sigma Pavillion Illustration"
                  className="w-full h-auto max-w-sm object-contain"
                />
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
