'use client';
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";
import { Roboto_Condensed, Orbitron } from "next/font/google";
import DayProgramCard from "@/components/DayProgramCard";
import { useState } from "react";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export default function Program() {
  const [activeDay, setActiveDay] = useState(1); // State to manage active day

  const programDays = [
    {
      day: 1,
      date: "Thursday, 19th November 2026",
      bgColor: "bg-red-500",
      content: (
        <>
          <div className="relative z-10 px-4 py-2">
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">15:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Registration Opens</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Online registration via digital congress platform. On-site digital help desks available.</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">16:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Welcome Reception</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Drinks and light snacks served in the networking lounge.</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">17:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Opening Ceremony</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Welcome addresses from congress leadership.</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">17:30 - 19:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Artistic & Scientific Welcome</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">A unique blend of musical performances and institutional welcomes from our esteemed partners.</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">20:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Closing Remarks</p>
            </div>
          </div>
        </>
      ),
    },
    {
      day: 2,
      date: "Friday, 20th November 2026",
      bgColor: "bg-[#85AFFB]",
      content: (
        <>
          <div className="relative z-10 px-4 py-2">
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">08:30 – 09:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Official Welcome Ceremony & John Abele Lecture</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">09:30 – 10:15</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Deep Space of Data"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">New Dimensions: Added Reality</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">10:30 – 11:15</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Beyond the Cutting Edge"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Monitoring, Planning, Decisions</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">11:20 – 12:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Next-Generation"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Sensoring & AI</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">13:30 – 14:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Keynote: Gerhard Buess Lecture</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">14:00 – 14:55</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Bold Frontiers"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Predictive Analytics</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">19:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Evening Event: "Feast of the Middle Ages"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Ritter Chamber, Imperial Fortress of Nuremberg</p>
            </div>
          </div>
        </>
      ),
    },
    {
      day: 3,
      date: "Saturday, 21st November 2026",
      bgColor: "bg-[#0D1858]",
      content: (
        <>
          <div className="relative z-10 px-4 py-2">
                        <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">08:30 – 09:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Keynote: Earl Owen Lecture</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">09:00 – 09:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Redefining Care"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">New Robots</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">09:30 – 10:15</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Rocket Breakthroughs"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Next Level of Computer Vision & 3D Printing</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">11:20 – 12:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Strange New Worlds"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Humanoid Robots</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">13:30 – 14:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Keynote: John Wickham Lecture</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">15:50 – 16:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Award Ceremony & Closing Session</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Predictive Analytics</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">17:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Official Closing of the Conference</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">09:00 – 09:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Redefining Care"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">New Robots</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">09:30 – 10:15</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Rocket Breakthroughs"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Next Level of Computer Vision & 3D Printing</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">11:20 – 12:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Session: "Strange New Worlds"</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Humanoid Robots</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">13:30 – 14:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Keynote: John Wickham Lecture</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">15:50 – 16:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Award Ceremony & Closing Session</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Predictive Analytics</p>
            </div>
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">17:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Official Closing of the Conference</p>
            </div>
          </div>
        </>
      ),
    },
  ];

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
        <ResponsiveNavigation
          links={[
            { href: "/", label: "Home" },
            { href: "/registration", label: "Registration" },
            { href: "/about", label: "About" },
            { href: "/program", label: "Program", isActive: true },
            { href: "/speakers", label: "Speakers" },
            { href: "/submissions", label: "Submissions" },
            { href: "/pavilions", label: "Pavilions" },
          ]}
          logoSrc="/ISMIT REAL LOGO 1.svg"
          logoAlt="iSMIT Logo"
          desktopBgClass="bg-[#FE6448]"
          mobileBgClass="bg-[#FE6448]"
          textColorClass="text-white"
          activeLinkClass="!text-white bg-white/20 px-2 py-1 rounded underline"
        />

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
      <section className="bg-white py-48 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Program Overview
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858]">
              Three intensive days exploring the future of medical technology
            </p>
          </div>

          {/* Day Navigation Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {programDays.map((dayData) => (
              <button
                key={dayData.day}
                onClick={() => setActiveDay(dayData.day)}
                className={`
                  px-6 py-3 rounded-lg text-lg font-bold uppercase whitespace-nowrap
                  ${activeDay === dayData.day
                    ? 'bg-[#FE6448] text-white'
                    : 'bg-gray-200 text-[#0D1858] hover:bg-gray-300'
                  }
                  transition-colors duration-300
                `}
              >
                Day {dayData.day}
              </button>
            ))}
          </div>

          {/* Display Active Day Program */}
          <div className="flex justify-center">
            {programDays.map((dayData) => (
              <div
                key={dayData.day}
                className={`${activeDay === dayData.day ? 'block' : 'hidden'}`}
              >
                <DayProgramCard
                  day={dayData.day}
                  date={dayData.date}
                  bgColor={dayData.bgColor}
                  isActive={activeDay === dayData.day}
                >
                  {dayData.content}
                </DayProgramCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
