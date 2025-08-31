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

export default function Speakers() {
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
          <div className="absolute inset-0 bg-[#FE6448] bg-opacity-70"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#0D1858] rounded-lg px-8 py-3">
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
              <a href="/speakers" className="text-[#FE6448] text-sm font-orbitron font-black uppercase">
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
            Keynote Speakers
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Visionary Voices in Medical Technology
          </p>
        </div>
      </section>

      {/* Speakers Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              World-Renowned Pioneers
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858] mb-4">
              We are honored to host a lineup of world-renowned pioneers and thought leaders.
            </p>
            <p className="text-sm font-roboto-condensed text-[#FE6448] uppercase">
              Final confirmations pending - Updated monthly
            </p>
          </div>

          {/* Featured Speakers Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((speaker) => (
              <div key={speaker} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={`/keynote-speaker-.png?height=300&width=300&query=keynote speaker ${speaker}`}
                  alt={`Keynote Speaker ${speaker}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-2">Dr. Name Lastname</h3>
                  <p className="text-[#85AFFB] font-roboto-condensed font-semibold mb-2">University of Excellence</p>
                  <p className="text-sm font-roboto-condensed text-[#0D1858] mb-4">
                    Leading expert in AI-driven surgical robotics and minimally invasive procedures.
                  </p>
                  <div className="text-xs font-roboto-condensed text-[#FE6448] uppercase">
                    Keynote: "The Future of Autonomous Surgery"
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Speaker Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FE6448] rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4">AI & Machine Learning</h3>
              <p className="font-roboto-condensed text-sm mb-4">
                Experts in artificial intelligence applications in surgery and medical diagnostics
              </p>
              <div className="text-2xl font-orbitron font-black">8</div>
              <div className="text-sm font-roboto-condensed uppercase">Speakers</div>
            </div>

            <div className="bg-[#85AFFB] rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4">Robotics & Automation</h3>
              <p className="font-roboto-condensed text-sm mb-4">
                Pioneers in surgical robotics and automated medical systems
              </p>
              <div className="text-2xl font-orbitron font-black">6</div>
              <div className="text-sm font-roboto-condensed uppercase">Speakers</div>
            </div>

            <div className="bg-[#0D1858] rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-orbitron font-bold uppercase mb-4">Digital Health</h3>
              <p className="font-roboto-condensed text-sm mb-4">
                Leaders in telemedicine, digital therapeutics, and health informatics
              </p>
              <div className="text-2xl font-orbitron font-black">5</div>
              <div className="text-sm font-roboto-condensed uppercase">Speakers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
