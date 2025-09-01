import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"
import ResponsiveNavigation from "@/components/ResponsiveNavigation";

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

export default function SuiteLambdaPage() {
  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1858] via-[#85AFFB] to-[#FE6448]">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

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
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white mb-4">Suite Λ</h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-[#85AFFB] uppercase mb-6">
              Lambda
            </h2>
            <h3 className="text-xl md:text-3xl font-roboto-condensed font-bold text-white uppercase">
              Artificial Intelligence - Software Academy
            </h3>
          </div>
          <p className="text-lg md:text-xl font-roboto-condensed text-white max-w-4xl mb-8">
            A 180-minute intensive that spotlights medical-AI platforms
          </p>
        </div>

        {/* Lambda SVG positioned in background */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0 opacity-20">
          <img
            src="/lambda-illustration.svg"
            alt="Lambda AI illustration"
            className="w-[20rem] md:w-[30rem] lg:w-[40rem] h-auto object-contain"
          />
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-[#85AFFB] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              AI-Powered Medical Innovation
            </h2>
            <p className="text-lg md:text-xl font-roboto-condensed text-white max-w-4xl mx-auto">
              Artificial intelligence (AI) toolkits are reshaping clinical diagnostics, workflow automation and surgical
              decision support by coupling large-scale data analytics with intuitive interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              <div>
                <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">
                  Event Details
                </h2>

                <div className="space-y-6">
                  <div className="bg-[#FE6448] rounded-lg p-6 text-white">
                    <h3 className="font-orbitron font-bold uppercase text-lg mb-2">Where?</h3>
                    <p className="font-roboto-condensed text-lg">Suite Λ (Lambda)</p>
                  </div>

                  <div className="bg-[#85AFFB] rounded-lg p-6 text-white">
                    <h3 className="font-orbitron font-bold uppercase text-lg mb-2">When?</h3>
                    <p className="font-roboto-condensed text-lg">Launch windows at 10:30 | 14:30</p>
                  </div>

                  <div className="bg-[#0D1858] rounded-lg p-6 text-white">
                    <h3 className="font-orbitron font-bold uppercase text-lg mb-2">Duration</h3>
                    <p className="font-roboto-condensed text-lg">180-minute intensive session</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1858] rounded-lg p-8 text-white">
              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Who?</h3>
              <p className="font-roboto-condensed text-lg mb-6">
                Leading clinician-scientists, data engineers, regulatory mentors and bold early adopters like you.
              </p>

              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Why?</h3>
              <p className="font-roboto-condensed text-lg">
                Benchmark the best tools side-by-side, master deployment essentials and leave with a ready-to-use
                evaluation workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Program Highlights
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Medical-AI Platforms</h3>
              <p className="font-roboto-condensed text-[#0D1858] text-sm">
                Twenty most impactful medical-AI platforms currently in deployment
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Hands-on Coding</h3>
              <p className="font-roboto-condensed text-[#0D1858] text-sm">
                Interactive workstations configured for hands-on coding experience
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Expert Supervision</h3>
              <p className="font-roboto-condensed text-[#0D1858] text-sm">
                Build a mini workflow under expert supervision with benchmark sheets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">Requirements</h2>

          <div className="bg-[#FE6448] rounded-lg p-8 text-white">
            <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Please Bring:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-3 font-roboto-condensed text-lg">
                <li>• WLAN-enabled laptop</li>
                <li>• Headphones for focused work</li>
                <li>• Power adapter & fully charged battery</li>
              </ul>
              <ul className="space-y-3 font-roboto-condensed text-lg">
                <li>• Up-to-date Chrome, Edge or Firefox browser</li>
                <li>• Advance registration is mandatory</li>
                <li>• Limited to 24 seats per slot</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-[#85AFFB] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">
            Registration Required
          </h2>
          <p className="text-lg md:text-xl font-roboto-condensed text-white mb-8">
            To take part in the Artificial Intelligence - Software Academy, please send your data and registration
            number by email to:
          </p>

          <div className="bg-white rounded-lg p-8 mb-8">
            <Link
              href="/registration"
              className="text-2xl md:text-3xl font-orbitron font-bold text-[#0D1858] hover:text-[#FE6448] transition-colors"
            >
              Register now for the congress
            </Link>
          </div>

          <div className="bg-primary rounded-lg p-6 text-white">
            <p className="font-roboto-condensed font-bold text-lg">
              ⚠️ Limited to 24 participants per slot - Register early to secure your spot!
            </p>
          </div>
        </div>
      </section>

      {/* Back to Pavilions */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/pavilions"
            className="border-4 border-[#0D1858] rounded-lg px-4 py-4 text-[#0D1858] text-lg md:px-8 md:text-2xl font-orbitron font-black uppercase hover:bg-[#0D1858] hover:text-white transition-colors"
          >
            Explore All Pavilions
          </Link>
        </div>
      </section>
    </div>
  )
}
