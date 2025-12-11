import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";
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

export default function Submissions() {
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
          <div className="absolute inset-0 bg-[#85AFFB] bg-opacity-70"></div>
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
            { href: "/submissions", label: "Submissions", isActive: true },
            { href: "/pavilions", label: "Pavilions" },
          ]}
          logoSrc="/ISMIT REAL LOGO 1.svg"
          logoAlt="iSMIT Logo"
          desktopBgClass="bg-[#0D1858]"
          mobileBgClass="bg-[#0D1858]"
          textColorClass="text-white"
          activeLinkClass="text-[#85AFFB]"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            Submissions
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Share Your Innovation
          </p>
        </div>
      </section>

      {/* Submissions Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Call for Submissions
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858]">
              Present your groundbreaking research and innovations to the global medical technology community
            </p>
          </div>

          {/* Submission Types */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Oral Spotlights */}
            <div className="bg-[#FE6448] rounded-lg p-8 text-white transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl font-orbitron font-bold uppercase mb-4 text-center">Oral Spotlights</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-orbitron font-black mb-2">10</div>
                <div className="text-lg font-roboto-condensed uppercase">Minutes</div>
              </div>
              <div className="space-y-4 text-sm font-roboto-condensed">
                <p>
                  <strong>Format:</strong> 7-minute presentation + 3-minute Q&A
                </p>
                <p>
                  <strong>Topics:</strong> AI in Surgery, Robotics, Digital Health, Medical Devices
                </p>
                <p>
                  <strong>Requirements:</strong> Abstract (300 words), Presentation slides
                </p>
                <p>
                  <strong>Award:</strong> Best Presentation Award
                </p>
              </div>
              <Link
                href="/oral-presentation-application"
                className="block w-full mt-6 bg-white text-[#FE6448] py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors text-center"
              >
                Submit Abstract
              </Link>
            </div>

            {/* Video Posters */}
            <div className="bg-[#85AFFB] rounded-lg p-8 text-white transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-2xl font-orbitron font-bold uppercase mb-4 text-center">Video Posters</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-orbitron font-black mb-2">120</div>
                <div className="text-lg font-roboto-condensed uppercase">Seconds</div>
              </div>
              <div className="space-y-4 text-sm font-roboto-condensed">
                <p>
                  <strong>Format:</strong> 2-minute video presentation
                </p>
                <p>
                  <strong>Topics:</strong> Clinical Cases, Technology Demos, Research Findings
                </p>
                <p>
                  <strong>Requirements:</strong> Video file (MP4), Abstract (200 words)
                </p>
                <p>
                  <strong>Award:</strong> Best Video Poster Award
                </p>
              </div>
              <Link
                href="/video-poster-application"
                className="block w-full mt-6 bg-white text-[#85AFFB] py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors text-center"
              >
                Submit Video
              </Link>
            </div>

            {/* Startup Contest */}
            <div className="bg-[#0D1858] rounded-lg p-8 text-white transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-xl font-orbitron font-bold uppercase mb-2 text-center">Start-up Grand Prize</h3>
              <p className="text-center text-sm font-roboto-condensed italic mb-4">Future Disruptors Contest</p>
              <div className="text-center mb-6">
                <div className="text-4xl font-orbitron font-black mb-2">3</div>
                <div className="text-lg font-roboto-condensed uppercase">Minutes</div>
              </div>
              <div className="space-y-4 text-sm font-roboto-condensed">
                <p>
                  <strong>Format:</strong> 1-minute video + 3-minute elevator pitch
                </p>
                <p>
                  <strong>Topics:</strong> AI, Robotics, Surgery, Med-tech, Digital Health
                </p>
                <p>
                  <strong>Requirements:</strong> Registration, MP4 video, 1000-word pitch
                </p>
                <p>
                  <strong>Deadline:</strong> 30 June 2026
                </p>
              </div>
              <Link
                href="/startup-application"
                className="block w-full mt-6 bg-white text-[#0D1858] py-3 rounded font-orbitron font-bold uppercase hover:bg-gray-100 transition-colors text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-[#FE6448] rounded-lg p-8 text-white">
            <h3 className="text-2xl font-orbitron font-bold uppercase text-center mb-8">Important Dates</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-orbitron font-black mb-2">30 June 2026</div>
                <div className="font-roboto-condensed font-semibold uppercase">All Submissions Deadline</div>
              </div>
              <div>
                <div className="text-3xl font-orbitron font-black mb-2">1 August 2026</div>
                <div className="font-roboto-condensed font-semibold uppercase">Notification of Acceptance</div>
              </div>
              <div>
                <div className="text-3xl font-orbitron font-black mb-2">19 November 2026</div>
                <div className="font-roboto-condensed font-semibold uppercase">Presentation Day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}