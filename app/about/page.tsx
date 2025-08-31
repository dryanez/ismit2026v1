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

export default function About() {
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
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#0D1858] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <a href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </a>
              <a href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Registration
              </a>
              <a href="/about" className="text-[#85AFFB] text-sm font-orbitron font-black uppercase">
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
              <a href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Pavilions
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            About iSMIT
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            37 Years of Medical Innovation
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* History Section */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase text-center mb-8">
              Our History
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-[#0D1858] font-roboto-condensed">
                <p className="text-lg mb-4">
                  Founded in 1988, the International Society for Medical Innovation and Technology (iSMIT) has been at
                  the forefront of surgical innovation for over three decades.
                </p>
                <p className="text-lg mb-4">
                  What began as a small gathering of pioneering surgeons and engineers has evolved into the world's
                  premier platform for medical technology advancement.
                </p>
                <p className="text-lg">
                  Today, iSMIT brings together over 350 participants from more than 100 countries, fostering
                  collaboration between surgeons, biomedical engineers, researchers, and industry leaders.
                </p>
              </div>
              <div className="bg-[#FE6448] rounded-lg p-8 text-white text-center">
                <div className="text-4xl font-orbitron font-bold mb-2">1988</div>
                <div className="text-lg font-roboto-condensed uppercase">Founded</div>
                <div className="text-4xl font-orbitron font-bold mb-2 mt-6">37</div>
                <div className="text-lg font-roboto-condensed uppercase">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-[#85AFFB] rounded-lg p-8 mb-16">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase text-center mb-8">
              Our Mission
            </h2>
            <div className="text-white font-roboto-condensed text-lg space-y-4">
              <p className="text-center">
                To advance surgical innovation, technology integration, and interdisciplinary collaboration in medicine
                through cutting-edge research, education, and global networking.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <h3 className="font-orbitron font-bold uppercase mb-2">Innovation</h3>
                  <p className="text-sm">Pioneering breakthrough technologies that transform surgical practice</p>
                </div>
                <div className="text-center">
                  <h3 className="font-orbitron font-bold uppercase mb-2">Collaboration</h3>
                  <p className="text-sm">Fostering partnerships between medical professionals and technology experts</p>
                </div>
                <div className="text-center">
                  <h3 className="font-orbitron font-bold uppercase mb-2">Education</h3>
                  <p className="text-sm">Sharing knowledge and best practices across the global medical community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">Vision 2026</h2>
            <div className="bg-[#0D1858] rounded-lg p-8 text-white">
              <p className="text-xl font-roboto-condensed mb-6">"Disruptive AGE in Medical Technology"</p>
              <p className="text-lg font-roboto-condensed">
                Our vision for 2026 encompasses the transformative impact of Artificial Intelligence, Generation of new
                materials, and Emerging robotic technologies that are revolutionizing surgical practice and healthcare
                delivery worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
