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

export default function SuiteSigmaPage() {
  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1858] via-[#FE6448] to-[#85AFFB]">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#FE6448] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <Link href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </Link>
              <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                About
              </Link>
              <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Program
              </Link>
              <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </Link>
              <Link
                href="/submissions"
                className="text-white text-sm font-orbitron font-black uppercase hover:underline"
              >
                Submissions
              </Link>
              <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Pavilions
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white mb-4">Suite Σ</h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-orbitron font-bold text-[#FE6448] uppercase mb-6">
              Sigma
            </h2>
            <h3 className="text-xl md:text-3xl font-roboto-condensed font-bold text-white uppercase">
              Startup Innovation Hub
            </h3>
          </div>
          <p className="text-lg md:text-xl font-roboto-condensed text-white max-w-4xl mb-8">
            An entrepreneurial crucible where medicine, robotics and data converge.
          </p>
        </div>

        {/* Sigma SVG positioned in background */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0 opacity-20">
          <img
            src="/sigma-pavilion.svg"
            alt="Sigma illustration"
            className="w-[20rem] md:w-[30rem] lg:w-[40rem] h-auto object-contain"
          />
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Future Disruptors Contest
            </h2>
            <p className="text-lg md:text-xl font-roboto-condensed text-white max-w-4xl mx-auto">
              Startup Innovation Hub — Suite Σ (Sigma) ignites an entrepreneurial crucible where medicine, robotics and data converge. Powered by our leading Bavarian cluster innovation partner, best, fearless, handpicked startups storm a mortalcombat pitch arena, each allotted three electrifying minutes to prove clinical impact, scalability and regulatory savvy. Elite investors, surgeons, AI pioneers and venture journalists sit ringside, scoring live and virtually. Fearless founders pitch live; one champion wins the Grand Prize, a plenary spotlight at next year’s iSMIT, and a guaranteed article slot in the AIS Journal. Expect adrenaline, ruthless questions, immersive demos and lastsecond pivots. Sharpen your deck, tighten your story — victory demands precision, courage and relentless execution.
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">
                Event Details
              </h2>

              <div className="space-y-6">
                <div className="bg-[#FE6448] rounded-lg p-6 text-white">
                  <h3 className="font-orbitron font-bold uppercase text-lg mb-2">Where?</h3>
                  <p className="font-roboto-condensed text-lg">Suite Σ (Sigma)</p>
                </div>

                <div className="bg-[#85AFFB] rounded-lg p-6 text-white">
                  <h3 className="font-orbitron font-bold uppercase text-lg mb-2">When?</h3>
                  <p className="font-roboto-condensed text-lg">Events at 10:30 | 14:30</p>
                </div>

                <div className="bg-[#0D1858] rounded-lg p-6 text-white">
                  <h3 className="font-orbitron font-bold uppercase text-lg mb-2">What?</h3>
                  <p className="font-roboto-condensed text-lg">Everything about Start‑ups</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1858] rounded-lg p-8 text-white">
              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Who?</h3>
              <p className="font-roboto-condensed text-lg mb-6">
                Fearless founders on stage; a ringside jury of investors, surgeons, AI visionaries and tech journalists; plus a buzzing audience hungry for the next breakthrough.
              </p>

              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Why?</h3>
              <p className="font-roboto-condensed text-lg">
                Visibility, funding and instant credibility: seize the spotlight, secure resources and set the pace for medical innovation in 2027 and beyond.
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
              The programme for Start-ups includes, among other highlights:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Startup Coaching</h3>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Pitch Like a Pro</h3>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Startup Showcase</h3>
            </div>
			<div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Intellectual Property</h3>
            </div>
			<div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Patents</h3>
            </div>
			<div className="bg-white rounded-lg p-6 text-center">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">From Idea to MVP (Minimum Viable Product)</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="bg-[#85AFFB] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">
            Submit Your Startup
          </h2>
          <p className="text-lg md:text-xl font-roboto-condensed text-white mb-8">
            Ready to showcase your innovation? Submit your startup for the Future Disruptors Contest.
          </p>

          <div className="bg-white rounded-lg p-8 mb-8">
            <Link
              href="/startup-application"
              className="text-2xl md:text-3xl font-orbitron font-bold text-[#0D1858] hover:text-[#FE6448] transition-colors"
            >
              Submit your application now!
            </Link>
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