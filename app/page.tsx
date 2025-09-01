"use client"
import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"
import { useState } from 'react'

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

export default function Home() {
  const partnerLogos = [
    { src: "/Parthners/Aions-Logo.svg", alt: "Aions Logo" },
    { src: "/Parthners/CRSA-Logo.svg", alt: "CRSA Logo" },
    { src: "/Parthners/dam_logo.svg", alt: "DAM Logo" },
    { src: "/Parthners/dgav-logo.svg", alt: "DGAV Logo" },
    { src: "/Parthners/dgch_logo.svg", alt: "DGCH Logo" },
    { src: "/Parthners/gatech-color_logo.svg", alt: "Gatech Logo" },
    { src: "/Parthners/medical-valley-logo.svg", alt: "Medical Valley Logo" },
    { src: "/Parthners/polish chirug.svg", alt: "Polish Chirurg Logo" },
  ];
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero-background.svg"
            alt="Medical professionals in geometric low-poly style"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 via-white/20 to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="flex justify-between items-center w-full">
            {/* Mobile Menu Button and Logo */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md bg-[#FE6448] mr-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              </button>
              <img src="/ISMIT REAL LOGO 1.svg" alt="iSMIT Logo" className="w-16 h-16 object-contain" />
            </div>
            {/* Desktop Logo - Centered */}
            <div className="hidden md:flex flex-1 justify-center">
                <img src="/ISMIT REAL LOGO 1.svg" alt="iSMIT Logo" className="w-24 h-24 object-contain" />
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex bg-[#FE6448] rounded-lg px-8 py-3 w-full flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 mt-4">
            <Link href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Registration</Link>
            <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">About</Link>
            <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Program</Link>
            <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Speakers</Link>
            <Link href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Submissions</Link>
            <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Pavilions</Link>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-[#FE6448] rounded-lg px-8 py-3 w-full mt-2">
              <div className="flex flex-col items-center gap-4 p-4">
                <Link href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Registration</Link>
                <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">About</Link>
                <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Program</Link>
                <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Speakers</Link>
                <Link href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Submissions</Link>
                <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Pavilions</Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center md:text-left md:items-start md:justify-center md:pl-8 lg:pl-36">
          <div className="mb-8 relative z-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-shadow-lg">
              <span className="text-[#FE6448]">iSMIT</span>
              <span className="text-white"> 2026</span>
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white text-shadow-lg uppercase mt-2">
              37th World Congress
            </h2>
          </div>
          <p className="text-md sm:text-xl md:text-2xl lg:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8 relative z-10">
            19-21 November 2026 Nürnberg, Germany
          </p>
          <Link
            href="/registration"
            className="border-4 border-[#87CEEB] bg-[#87CEEB] rounded-lg px-8 py-4 text-white text-lg md:text-xl font-orbitron font-black uppercase hover:bg-white hover:text-[#87CEEB] transition-colors relative z-10"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 w-full h-full">
          <img src="/section2-background.svg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-[#FE6448] mb-2">1988</div>
              <div className="text-lg md:text-2xl font-roboto-condensed font-light text-[#FE6448] uppercase">
                iSMIT Founded
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-[#FE6448] mb-2">35+</div>
              <div className="text-lg md:text-2xl font-roboto-condensed font-light text-[#FE6448] uppercase">
                Years of Excellence
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-[#FE6448] mb-2">100+</div>
              <div className="text-lg md:text-2xl font-roboto-condensed font-light text-[#FE6448] uppercase">
                Countries
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-[#FE6448] mb-2">350</div>
              <div className="text-lg md:text-2xl font-roboto-condensed font-light text-[#FE6448] uppercase">
                Participants
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#85AFFB] py-16 px-4 relative overflow-visible">
        <div className="absolute top-0 bottom-0 left-0 z-0 md:block hidden" style={{ left: "-50px" }}>
          <img
            src="/brain-orange.svg"
            alt="Geometric brain illustration"
            className="h-full w-auto object-contain transform scale-130"
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center relative z-10 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              Welcome to iSMIT 2026
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8 text-balance">
              From Human Skill to Autonomous Systems
            </h2>
            <div className="space-y-6 text-white text-base md:text-lg font-roboto-condensed">
              <p className="text-justify">
                The International Society for Medical Innovation and Technology (iSMIT) is dedicated to advancing
                surgical innovation, technology integration, and interdisciplinary collaboration in medicine.
                Established in 1988, iSMIT has grown into a globally recognized platform for surgeons, biomedical
                engineers, researchers, and industry leaders to share knowledge, foster collaboration, and shape the
                future of healthcare.
              </p>
              <p className="text-justify">
                The mission of iSMIT 2026 is to serve as the premier forum for the exchange of cutting-edge scientific
                knowledge and clinical expertise at the intersection of surgery, biomedical engineering, artificial
                intelligence, robotics, and digital health. The congress aims to bridge the gap between emerging
                technologies and their practical application in clinical settings, fostering transformative solutions
                that enhance patient outcomes and advance surgical care worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-lg md:text-2xl font-roboto-condensed space-y-4">
            <p>
              The motto <span className="lowercase">of</span> the iSMIT 2026 Congress
            </p>
            <p className="text-xl md:text-2xl font-orbitron font-bold">"Disruptive AGE in Medical Technology"</p>
            <p>
              encapsulates the transformative impact <span className="lowercase">of</span> Artificial Intelligence,
              Generation of new materials, and Emerging robotic technologies that are revolutionizing surgical practice
              and healthcare delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Pavilions Section */}
      <section className="bg-white py-16 px-4 relative">
        <div className="absolute left-0 right-0 bg-[#0D1858] h-32 z-0" style={{ top: "280px" }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              What to Expect
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase">Pavilions</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex justify-center">
              <Link href="/pavilions/suite-sigma" className="block transition-transform duration-300 hover:scale-110">
                <img src="/psi-pavillion.svg" alt="PSI Pavillion" className="w-[25rem] h-[25rem] object-contain" />
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/pavilions/suite-lambda" className="block transition-transform duration-300 hover:scale-110">
                <img
                  src="/lambda-pavillion.svg"
                  alt="Lambda Pavillion"
                  className="w-[25rem] h-[25rem] object-contain"
                />
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/pavilions/suite-eta" className="block transition-transform duration-300 hover:scale-110">
                <img src="/eta-pavillion.svg" alt="ETA Pavillion" className="w-[25rem] h-[25rem] object-contain" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Program Section */}
      <section className="bg-white py-16 px-4 relative overflow-visible">
        <div className="absolute right-0 z-0" style={{ top: "-200px" }}>
          <img
            src="/hand-robotic.svg"
            alt="Robotic hand illustration"
            className="w-[31rem] md:w-[42rem] lg:w-[52rem] h-auto object-contain rounded-lg"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              Scientific Programme
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase">
              A Glimpse Into The Future
            </h2>
          </div>

          {/* Day 1 Program */}
          <div className="bg-[#FE6448] rounded-lg p-6 text-white mb-8">
            <h3 className="text-xl font-orbitron font-bold uppercase text-center mb-6">
              Day 1 : Thursday, 19th November 2026
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-[1fr_4fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">15:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Registration Opens</h4>
                  <p className="font-roboto-condensed font-light">
                    Online registration via digital congress platform. On-site digital help desks available.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_4fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">16:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Welcome Reception</h4>
                  <p className="font-roboto-condensed font-light">
                    Drinks and light snacks served in the networking lounge.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_4fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">17:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Opening Ceremony</h4>
                  <p className="font-roboto-condensed font-light">
                    Welcome addresses from congress leadership.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_4fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">17:30 - 19:30</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Artistic & Scientific Welcome</h4>
                  <p className="font-roboto-condensed font-light">
                    A unique blend of musical performances and institutional welcomes from our esteemed partners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/program"
              className="border-4 border-[#0D1858] rounded-lg px-8 py-4 text-[#0D1858] text-lg md:text-2xl font-orbitron font-black uppercase hover:bg-[#0D1858] hover:text-white transition-colors relative z-10"
            >
              Full program
            </Link>
          </div>
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl font-semibold font-roboto-condensed uppercase text-red-500">
              VISIONARY VOICES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron uppercase text-blue-300 mt-2">
              INVITED KEYNOTE SPEAKERS
            </h2>
            <div className="mt-4 text-center">
              <span className="text-white text-lg font-light font-roboto-condensed capitalize">
                We are honored to host a lineup of world-renowned pioneers and thought leaders.
                <br />
              </span>
              <span className="text-white text-base font-light font-roboto-condensed uppercase">
                Final confirmations pending
              </span>
            </div>
            <p className="mt-2 text-center text-white text-base font-light font-roboto-condensed capitalize">
              This list will be updated on a monthly basis to reflect new confirmations and additions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img className="w-44 h-64 mx-auto rounded-[10px]" src="/speaker-1.svg" />
              <div className="mt-4">
                <div className="text-white text-base font-semibold font-roboto-condensed capitalize">
                  Name Lastname
                </div>
                <div className="text-blue-300 text-base font-normal font-roboto-condensed capitalize">
                  University of blah blah
                </div>
              </div>
            </div>
            <div className="text-center">
              <img className="w-44 h-64 mx-auto rounded-[10px]" src="/speaker-2.svg" />
              <div className="mt-4">
                <div className="text-white text-base font-semibold font-roboto-condensed capitalize">
                  Name Lastname
                </div>
                <div className="text-blue-300 text-base font-normal font-roboto-condensed capitalize">
                  University of blah blah
                </div>
              </div>
            </div>
            <div className="text-center">
              <img className="w-44 h-64 mx-auto rounded-[10px]" src="/speaker-3.svg" />
              <div className="mt-4">
                <div className="text-white text-base font-semibold font-roboto-condensed capitalize">
                  Name Lastname
                </div>
                <div className="text-blue-300 text-base font-normal font-roboto-condensed capitalize">
                  University of blah blah
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/speakers"
              className="text-red-500 text-xl font-extrabold font-roboto-condensed underline uppercase hover:text-red-400 transition-colors"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      </section>

      {/* Submissions Section */}
      <section className="bg-[#85AFFB] py-16 px-4 relative overflow-visible">
        <div className="absolute -left-8 md:-left-16 lg:-left-24 z-0" style={{ top: "-200px" }}>
          <img
            src="/robot-person.svg"
            alt="Robot person illustration"
            className="w-[31rem] md:w-[42rem] lg:w-[52rem] h-auto object-contain rounded-lg"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              Share Your Innovation
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase">Submissions</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Oral Spotlights */}
            <div className="bg-white rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <h3 className="text-lg font-roboto-condensed font-bold text-[#FE6448] uppercase mb-2">Oral Spotlights</h3>
              <p className="text-base font-orbitron font-semibold text-[#FE6448] uppercase mb-4">10 Minutes</p>
              <p className="text-sm font-roboto-condensed font-light text-[#0D1858] mb-6">
                Present your research findings in a focused oral presentation BEST PRESENTATION AWARD WILL BE GRANTED
                DURING THE CONGRESS
              </p>
              <Link
                href="/submissions"
                className="text-[#0D1858] font-roboto-condensed font-semibold uppercase text-sm underline"
              >
                Read More
              </Link>
            </div>

            {/* Video Posters */}
            <div className="bg-white rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <h3 className="text-lg font-roboto-condensed font-bold text-[#FE6448] uppercase mb-2">Video Posters</h3>
              <p className="text-base font-orbitron font-semibold text-[#FE6448] uppercase mb-4">120 Seconds</p>
              <p className="text-sm font-roboto-condensed font-light text-[#0D1858] mb-6">
                Create an engaging video poster to showcase your work BEST VIDEO-POSTER AWARD WILL BE GRANTED DURING THE
                CONGRESS
              </p>
              <Link
                href="/submissions"
                className="text-[#0D1858] font-roboto-condensed font-semibold uppercase text-sm underline"
              >
                Read More
              </Link>
            </div>

            {/* Startup Contest */}
            <div className="bg-white rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <h3 className="text-lg font-roboto-condensed font-bold text-[#FE6448] uppercase mb-1">
                Start-up Grand Prize
              </h3>
              <p className="text-sm font-roboto-condensed font-light italic text-[#FE6448] uppercase mb-2">
                Future Disruptors
              </p>
              <p className="text-base font-orbitron font-semibold text-[#FE6448] uppercase mb-4">Contest</p>
              <p className="text-sm font-roboto-condensed font-light text-[#0D1858] mb-6">
                WILL BE GRANTED DURING THE CONGRESS One-minute video presented during a three-minute elevator pitch
              </p>
              <Link
                href="/submissions"
                className="text-[#0D1858] font-roboto-condensed font-semibold uppercase text-sm underline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase text-center mb-12 relative z-10">
            Important Dates
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-xl md:text-2xl font-orbitron font-black uppercase mb-2">30 June 2026</div>
              <div className="text-sm font-roboto-condensed font-semibold uppercase">All Submissions Deadline</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-orbitron font-black uppercase mb-2">1 August 2026</div>
              <div className="text-sm font-roboto-condensed font-semibold uppercase">Notification of Acceptance</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-orbitron font-black uppercase mb-2">19 November 2026</div>
              <div className="text-sm font-roboto-condensed font-semibold uppercase">Conference Starting</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Future is Now Section */}
      <section className="bg-[#85AFFB] py-16 px-4 relative overflow-visible">
        <div className="absolute right-0 z-0" style={{ top: "-200px" }}>
          <img
            src="/future-illustration.svg"
            alt="Futuristic illustration"
            className="w-[31rem] md:w-[42rem] lg:w-[52rem] h-auto object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase text-balance">
            <span className="text-[#FE6448] font-roboto-condensed">The Future is</span>
            <span className="text-white font-orbitron"> Now</span>
          </h2>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="bg-[#85AFFB] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-white uppercase mb-4">
            Partners in Innovation
          </p>
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8 relative z-10">
            Sponsorship Opportunities
          </h2>
          <Link
            href="/sponsorship"
            className="border-4 border-white rounded-lg px-8 py-4 text-white text-xl md:text-2xl font-orbitron font-black uppercase hover:bg-white hover:text-[#85AFFB] hover:border-white transition-colors mb-12 inline-block"
          >
            Become a Sponsor
          </Link>

          <h3 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">Our Sponsors</h3>

          {/* Sponsors placeholder */}
          <div className="bg-white rounded-lg p-8 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sponsor) => (
                <img
                  key={sponsor}
                  src={`/generic-sponsor-logo.png?height=80&width=120&query=sponsor logo ${sponsor}`}
                  alt={`Sponsor ${sponsor}`}
                  className="h-12 md:h-16 object-contain"
                />
              ))}
            </div>
          </div>

          <p className="text-white font-orbitron font-black uppercase text-lg">
            This list will be updated on a weekly basis to reflect new additions.
          </p>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6 text-balance">
            Seats Are Limited. The Future Waits for No One.
          </h2>
          <div className="text-lg md:text-2xl font-roboto-condensed text-[#0D1858] mb-8">
            <p>Join the world's leading surgeons, engineers, and innovators.</p>
            <p>
              <span className="italic font-bold">Register now</span> to secure your place at the forefront of medical
              technology.
            </p>
          </div>
          <Link
            href="/registration"
            className="border-4 border-[#85AFFB] bg-[#85AFFB] rounded-lg px-8 py-4 text-white text-xl md:text-2xl font-orbitron font-black uppercase hover:bg-white hover:text-[#85AFFB] hover:border-[#85AFFB] transition-colors mb-16"
          >
            Register Now
          </Link>
          <p className="text-[#0D1858] font-orbitron font-black uppercase text-lg mt-8">
            Early-bird registration ends 31 May 2026
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">Our Partners</h2>
          <p className="text-white font-roboto-condensed text-lg md:text-xl mb-8">
            We gratefully acknowledge the generous support and collaboration of our institutional partners who
            collaborate and make the iSMIT 2026 Congress possible. Their commitment to advancing medical innovation,
            surgical technology, and interdisciplinary research plays a crucial role in shaping the future of
            healthcare.
          </p>

          {/* Partners logos */}
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {partnerLogos.map((logo) => (
                <img
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 md:h-20 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venue Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              Historic Setting
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#85AFFB] uppercase">
              Altes Rathaus, Nuremberg
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/nuremberg-old-town-hall-historic-building.png"
                alt="Altes Rathaus Nuremberg"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <div className="text-white font-roboto-condensed">
              <p className="text-lg md:text-xl mb-6">
                The congress will take place in the historic Old Town Hall -{" "}
                <span className="font-bold">Altes Rathaus of Nuremberg</span>, with plenary sessions held inside the
                majestic Imperial Castle (Kaiserburg) overlooking the city.
              </p>

              <h3 className="text-lg md:text-xl font-orbitron font-bold uppercase mb-4">Getting There</h3>
              <div className="space-y-2 text-sm md:text-base">
                <p>By Plane: Nuremberg Airport (NUE) is a 20-min subway ride to the city center.</p>
                <p>By Train: Nuremberg Main Station is a major hub with excellent connections.</p>
                <p>By Car: Easily reachable via the A3, A6, and A9 motorways.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#FE6448] uppercase mb-8">Press</h2>
            <h3 className="text-lg md:text-xl font-orbitron font-extrabold text-white bg-[#0D1858] inline-block px-4 py-2 rounded">
              Media Accreditation
            </h3>
            <p className="text-[#0D1858] font-roboto-condensed text-lg md:text-xl mt-6">
              To receive press accreditation, please send your name, affiliation, and press credentials to:
              <span className="font-extrabold underline uppercase"> press@ismit2026.com</span> — info — email
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] bg-white inline-block px-4 py-2 rounded uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] bg-white inline-block px-8 py-4 rounded uppercase mb-8">
            Contact Information
          </h2>

          {/* Contact Cards */}
          <div className="bg-[#FE6448] rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="text-center">
                <h3 className="font-orbitron font-black uppercase text-sm mb-4">General Inquiries</h3>
                <a href="mailto:info@ismit2026.com" className="font-roboto-condensed underline lowercase text-sm">
                  info@ismit2026.com
                </a>
              </div>

              <div className="text-center">
                <h3 className="font-orbitron font-black uppercase text-sm mb-4">Submissions</h3>
                <div className="space-y-1 text-sm font-roboto-condensed underline lowercase">
                  <div>presentations@ismit2026.com</div>
                  <div>videoposter@ismit2026.com</div>
                  <div>elevatorpeach@ismit2026.com</div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-orbitron font-black uppercase text-sm mb-4">Sponsorship</h3>
                <a href="mailto:sponsors@ismit2026.com" className="font-roboto-condensed underline lowercase text-sm">
                  sponsors@ismit2026.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1858] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-white text-xs font-roboto-condensed mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-white rounded"></div>
                <div className="w-7 h-7 border-2 border-white rounded"></div>
                <div className="w-6 h-6 bg-[#0D1858] border-2 border-white rounded"></div>
              </div>
              <h4 className="font-orbitron font-black text-sm mb-1">iSMIT 2026</h4>
              <p className="font-light lowercase">
                37th World Congress of the International Society for Medical Innovation and Technology
              </p>
              <div className="font-roboto-condensed font-black text-lg mt-2">MedTube</div>
            </div>

            <div>
              <h4 className="font-orbitron font-black text-sm mb-1">IMPRESSUM</h4>
              <p className="font-light mb-2">
                iSMIT 2026 – 37th Annual Congress of the International Society for Medical Innovation and Technology
              </p>
              <p className="font-light">
                Organized by: AKD Congress & Events GmbH Official Representative: Kristin Dönitz
              </p>
            </div>

            <div>
              <p className="font-light mb-2">Address: Waldstraße 57 04105 Leipzig, Germany</p>
              <p className="font-light">Website: www.ismit2026.com</p>
            </div>

            <div>
              <p className="font-light mb-2">For all privacy-related inquiries, please contact: info@ismit2026.com</p>
              <p className="font-light">Email: info@ismit2026.com</p>
            </div>
          </div>

          <div className="text-center text-white text-xs font-roboto-condensed mb-4">
            <p className="mb-2">
              Inhaltlich Verantwortliche gemäß §6 MDStV: Konrad Karcz | Design: Gabriela Wiackowska, Wilson Ortiz
            </p>
            <p className="font-light italic uppercase text-xs leading-relaxed">
              The information provided on this website is for general informational purposes only and does not
              constitute legal or professional advice. All information is regularly updated and supplemented with the
              utmost care. However, no guarantee can be given for the accuracy or completeness of the information
              provided, as changes may occur in the meantime. The reproduction or distribution of the content on this
              website, as well as the use of any images, requires the prior written consent of the persons named in the
              legal notice (Impressum). Personal data provided during your visit to our website will be stored
              exclusively for the purpose of processing your request, in compliance with applicable data protection
              laws.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
