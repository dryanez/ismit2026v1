"use client"
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"
import { useState, useRef, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

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

  // Carousel setup for speakers section
  const [emblaRefSpeakers, emblaApiSpeakers] = useEmblaCarousel({ align: 'start' })
  const [prevBtnDisabledSpeakers, setPrevBtnDisabledSpeakers] = useState(true)
  const [nextBtnDisabledSpeakers, setNextBtnDisabledSpeakers] = useState(true)

  const scrollPrevSpeakers = useCallback(() => {
    if (emblaApiSpeakers) emblaApiSpeakers.scrollPrev()
  }, [emblaApiSpeakers])

  const scrollNextSpeakers = useCallback(() => {
    if (emblaApiSpeakers) emblaApiSpeakers.scrollNext()
  }, [emblaApiSpeakers])

  const onSelectSpeakers = useCallback((emblaApi: any) => {
    setPrevBtnDisabledSpeakers(!emblaApi.canScrollPrev())
    setNextBtnDisabledSpeakers(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApiSpeakers) return

    onSelectSpeakers(emblaApiSpeakers)
    emblaApiSpeakers.on('reInit', onSelectSpeakers).on('select', onSelectSpeakers)
  }, [emblaApiSpeakers, onSelectSpeakers])

  // Carousel setup for submissions section
  const [emblaRefSubmissions, emblaApiSubmissions] = useEmblaCarousel({ align: 'start' })
  const [prevBtnDisabledSubmissions, setPrevBtnDisabledSubmissions] = useState(true)
  const [nextBtnDisabledSubmissions, setNextBtnDisabledSubmissions] = useState(true)

  const scrollPrevSubmissions = useCallback(() => {
    if (emblaApiSubmissions) emblaApiSubmissions.scrollPrev()
  }, [emblaApiSubmissions])

  const scrollNextSubmissions = useCallback(() => {
    if (emblaApiSubmissions) emblaApiSubmissions.scrollNext()
  }, [emblaApiSubmissions])

  const onSelectSubmissions = useCallback((emblaApi: any) => {
    setPrevBtnDisabledSubmissions(!emblaApi.canScrollPrev())
    setNextBtnDisabledSubmissions(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApiSubmissions) return

    onSelectSubmissions(emblaApiSubmissions)
    emblaApiSubmissions.on('reInit', onSelectSubmissions).on('select', onSelectSubmissions)
  }, [emblaApiSubmissions, onSelectSubmissions])

  // Basic embla/scroll container refs and controls (safe fallback if embla lib not used)
  const emblaRef = useRef<HTMLDivElement | null>(null)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

  useEffect(() => {
    const el = emblaRef.current
    if (!el) return

    const onScroll = () => {
      setPrevBtnDisabled(el.scrollLeft <= 0)
      setNextBtnDisabled(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }

    onScroll()
    el.addEventListener('scroll', onScroll)
    let ro: ResizeObserver | null = null
    try {
      ro = new ResizeObserver(onScroll)
      ro.observe(el)
    } catch (e) {
      /* ResizeObserver not available in this environment; ignore */
    }

    return () => {
      el.removeEventListener('scroll', onScroll)
      if (ro) ro.disconnect()
    }
  }, [])

  const scrollPrev = () => {
    const el = emblaRef.current
    if (!el) return
    el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' })
  }

  const scrollNext = () => {
    const el = emblaRef.current
    if (!el) return
    el.scrollBy({ left: el.clientWidth, behavior: 'smooth' })
  }

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
        <ResponsiveNavigation
          links={[
            { href: "/registration", label: "Registration" },
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/program", label: "Program" },
            { href: "/speakers", label: "Speakers" },
            { href: "/submissions", label: "Submissions" },
            { href: "/pavilions", label: "Pavilions" },
          ]}
          logoSrc="/ISMIT REAL LOGO 1.svg"
          logoAlt="iSMIT Logo"
          desktopBgClass="bg-[#FE6448]"
          mobileBgClass="bg-[#FE6448]"
          textColorClass="text-white"
          activeLinkClass="" // No active link class for home page
        />

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
      <section className="bg-white pt-14 pb-28 px-4 relative">
        <div className="absolute left-0 right-0 bg-[#0D1858] h-[461px] z-0 top-[calc(50%+20px)] -translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              What to Expect
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-5">Pavilions</h2>
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative flex flex-col justify-center h-full">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4"> {/* -ml-4 to counteract gap-8 on items */}
                <div className="flex-none w-full pl-4"> {/* w-full for single item view, pl-4 for spacing */}
                  <div className="flex justify-center">
                    <Link href="/pavilions/suite-sigma" className="block transition-transform duration-300 hover:scale-110">
                      <img src="/psi-pavillion.svg" alt="PSI Pavillion" className="w-[30rem] h-[30rem] object-contain" />
                    </Link>
                  </div>
                </div>
                <div className="flex-none w-full pl-4">
                  <div className="flex justify-center">
                    <Link href="/pavilions/suite-lambda" className="block transition-transform duration-300 hover:scale-110">
                      <img
                        src="/lambda-pavillion.svg"
                        alt="Lambda Pavillion"
                        className="w-[30rem] h-[30rem] object-contain"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex-none w-full pl-4">
                  <div className="flex justify-center">
                    <Link href="/pavilions/suite-eta" className="block transition-transform duration-300 hover:scale-110">
                      <img src="/eta-pavillion.svg" alt="ETA Pavillion" className="w-[30rem] h-[30rem] object-contain" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation Arrows */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            <div className="flex justify-center">
              <Link href="/pavilions/suite-sigma" className="block transition-transform duration-300 hover:scale-110">
                <img src="/psi-pavillion.svg" alt="PSI Pavillion" className="w-[30rem] h-[30rem] object-contain" />
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/pavilions/suite-lambda" className="block transition-transform duration-300 hover:scale-110">
                <img
                  src="/lambda-pavillion.svg"
                  alt="Lambda Pavillion"
                  className="w-[30rem] h-[30rem] object-contain"
                />
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href="/pavilions/suite-eta" className="block transition-transform duration-300 hover:scale-110">
                <img src="/eta-pavillion.svg" alt="ETA Pavillion" className="w-[30rem] h-[30rem] object-contain" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Program Section */}
      <section className="bg-white py-[52px] px-4 relative overflow-visible mt-16 md:mt-32">
        <div className="absolute right-0 z-10 top-[-400px] md:right-0 md:top-[-400px]">
          <img
            src="/hand-robotic.svg"
            alt="Robotic hand illustration"
            className="w-[20rem] md:w-[42rem] lg:w-[52rem] h-auto object-contain rounded-lg"
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
          <div className="bg-[#FE6448] rounded-lg px-8 py-6 text-white mb-8">
            <h3 className="text-xl font-orbitron font-bold uppercase text-center mb-6">
              Day 1 : Thursday, 19th November 2026
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-[1fr_7fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">15:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Registration Opens</h4>
                  <p className="font-roboto-condensed font-light">
                    Online registration via digital congress platform. On-site digital help desks available.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_7fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">16:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Welcome Reception</h4>
                  <p className="font-roboto-condensed font-light">
                    Drinks and light snacks served in the networking lounge.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_7fr] gap-4 items-start">
                <div className="font-orbitron font-bold text-lg">17:00</div>
                <div>
                  <h4 className="font-roboto-condensed font-bold uppercase text-lg">Opening Ceremony</h4>
                  <p className="font-roboto-condensed font-light">
                    Welcome addresses from congress leadership.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_7fr] gap-4 items-start">
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
              className="border-4 border-[#0D1858] rounded-lg px-4 py-2 text-[#0D1858] text-lg md:px-8 md:py-4 md:text-2xl font-orbitron font-black uppercase hover:bg-[#0D1858] hover:text-white transition-colors relative z-10"
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

          {/* Mobile Carousel View for Speakers */}
          <div className="md:hidden relative flex flex-col justify-center h-full">
            <div className="overflow-hidden" ref={emblaRefSpeakers}>
              <div className="flex -ml-4">
                <div className="flex-none w-full pl-4">
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
                </div>
                <div className="flex-none w-full pl-4">
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
                </div>
                <div className="flex-none w-full pl-4">
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
              </div>
            </div>
            {/* Navigation Arrows for Speakers */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollPrevSpeakers}
              disabled={prevBtnDisabledSpeakers}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollNextSpeakers}
              disabled={nextBtnDisabledSpeakers}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Grid View for Speakers */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
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

          {/* Mobile Carousel View for Submissions */}
          <div className="md:hidden relative">
            <div className="overflow-hidden" ref={emblaRefSubmissions}>
              <div className="flex -ml-4">
                <div className="flex-none w-full pl-4">
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
                </div>
                <div className="flex-none w-full pl-4">
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
                </div>
                <div className="flex-none w-full pl-4">
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
            </div>
            {/* Navigation Arrows for Submissions */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollPrevSubmissions}
              disabled={prevBtnDisabledSubmissions}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full opacity-75 disabled:opacity-25"
              onClick={scrollNextSubmissions}
              disabled={nextBtnDisabledSubmissions}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Desktop Grid View for Submissions */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
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
            className="border-4 border-[#85AFFB] bg-[#85AFFB] rounded-lg px-4 py-2 text-white text-xl md:px-8 md:py-4 md:text-2xl font-orbitron font-black uppercase hover:bg-white hover:text-[#85AFFB] hover:border-[#85AFFB] transition-colors mb-16"
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
        <div className="max-w-full px-4 text-center">
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
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center justify-items-center my-8">
              <img
                src="/Press/ais.svg"
                alt="AIS"
                className="w-full max-w-[250px] md:max-w-[300px] h-auto object-contain"
              />
              <img
                src="/Press/internation ajouna of medil robotis and computer assited surgery.svg"
                alt="International Journal of Medical Robotics and Computer Assisted Surgery"
                className="w-full max-w-[250px] md:max-w-[300px] h-auto object-contain"
              />
              <img
                src="/Press/medtube 1.svg"
                alt="Medtube"
                className="w-full max-w-[250px] md:max-w-[300px] h-auto object-contain"
              />
            </div>
            <p className="text-[#0D1858] font-roboto-condensed text-lg md:text-xl mt-6">
              To receive press accreditation, please send your name, affiliation, and press credentials to:
              <span className="font-extrabold underline uppercase"> press@ismit2026.com</span>
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
                <img src="/Press/buttons/Instagram.svg" alt="Instagram" className="w-8 h-8 object-contain" />
                <img src="/Press/buttons/Linkedin.svg" alt="LinkedIn" className="w-7 h-7 object-contain" />
                <div className="font-roboto-condensed font-black text-lg">MedTube</div>
              </div>
              <h4 className="font-orbitron font-black text-sm mb-1">iSMIT 2026</h4>
              <p className="font-light lowercase">
                37th World Congress of the International Society for Medical Innovation and Technology
              </p>
             
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
