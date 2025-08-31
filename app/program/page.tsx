import { Roboto_Condensed, Orbitron } from "next/font/google"

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

export default function Program() {
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
              <a
                href="/program"
                className="text-[#0D1858] bg-white px-2 py-1 rounded text-sm font-orbitron font-black uppercase"
              >
                Program
              </a>
              <a href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </a>
              <a href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Submissions
              </a>
              <a href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Pavilions
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            Scientific Program
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Three Days of Innovation
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Program Overview
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858]">
              Three intensive days exploring the future of medical technology
            </p>
          </div>

          {/* Day 1 */}
          <div className="bg-[#FE6448] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase text-center mb-6">
              Day 1: Thursday, November 19, 2026
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:00 - 16:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Registration Opens</h4>
                  <p className="font-roboto-condensed text-sm">
                    Online registration via digital congress platform. On-site digital help desks available.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">16:00 - 17:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Welcome Reception</h4>
                  <p className="font-roboto-condensed text-sm">
                    Drinks and light snacks served in the networking lounge.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:00 - 17:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Opening Ceremony</h4>
                  <p className="font-roboto-condensed text-sm">Welcome addresses from congress leadership.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:30 - 19:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Artistic & Scientific Welcome</h4>
                  <p className="font-roboto-condensed text-sm">
                    A unique blend of musical performances and institutional welcomes from our esteemed partners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-[#85AFFB] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase text-center mb-6">
              Day 2: Friday, November 20, 2026
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">08:00 - 09:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Keynote Session I</h4>
                  <p className="font-roboto-condensed text-sm">AI in Surgical Planning and Execution</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">09:00 - 10:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Parallel Sessions</h4>
                  <p className="font-roboto-condensed text-sm">
                    Robotics in Surgery | Advanced Materials | Digital Health
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:30 - 11:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Coffee Break & Networking</h4>
                  <p className="font-roboto-condensed text-sm">Sponsored networking session with industry partners</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">11:00 - 12:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Mixed Reality Experience</h4>
                  <p className="font-roboto-condensed text-sm">120-minute immersive VR/AR surgical training session</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="bg-[#0D1858] rounded-lg p-8">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase text-center mb-6">
              Day 3: Saturday, November 21, 2026
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">09:00 - 10:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Startup Innovation Hub</h4>
                  <p className="font-roboto-condensed text-sm">Elevator pitches and startup showcase</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:00 - 11:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">AI Software Academy</h4>
                  <p className="font-roboto-condensed text-sm">180-minute intensive workshop on medical AI platforms</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">14:00 - 15:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Awards Ceremony</h4>
                  <p className="font-roboto-condensed text-sm">Best Presentation, Video Poster, and Startup Awards</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:30 - 16:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Closing Ceremony</h4>
                  <p className="font-roboto-condensed text-sm">Final remarks and iSMIT 2027 preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
