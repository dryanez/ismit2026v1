"use client";

import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";
import { Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export default function UnderConstructionPage() {
  return (
    <div className={`min-h-screen bg-white ${orbitron.variable}`}>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: "url('/medical-conference-hero-background.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <ResponsiveNavigation
          links={[
            { href: "/", label: "Home", isActive: true },
            { href: "/about", label: "About" },
            { href: "/program", label: "Program" },
            { href: "/speakers", label: "Speakers" },
            { href: "/submissions", label: "Submissions" },
            { href: "/pavilions", label: "Pavilions" },
          ]}
          logoSrc="/ISMIT REAL LOGO 1.svg"
          logoAlt="iSMIT Logo"
          desktopBgClass="bg-[#0D1858]"
          mobileBgClass="bg-[#0D1858]"
          textColorClass="text-white"
          activeLinkClass="text-[#FE6448]"
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="mb-8">
            <svg
              className="w-32 h-32 md:w-48 md:h-48 mx-auto text-[#FE6448] animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            Under Construction
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-12 max-w-3xl">
            We're working hard to bring you something amazing
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            Our new website is currently under development. Please check back soon or contact us for more information.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/about"
              className="px-8 py-4 bg-[#FE6448] text-white font-semibold rounded-lg hover:bg-[#ff7a5f] transition-colors duration-300"
            >
              Learn About Us
            </Link>
            <Link
              href="/speakers"
              className="px-8 py-4 bg-white text-[#0D1858] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Speakers
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white text-center mb-12">
            What's Coming
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="text-[#FE6448] text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Full Event Details</h3>
              <p className="text-white/80">
                Comprehensive information about iSMIT 2026 World Congress sessions, workshops, and activities.
              </p>
            </div>

            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="text-[#FE6448] text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-white mb-3">Speaker Profiles</h3>
              <p className="text-white/80">
                Meet our distinguished speakers and learn about their groundbreaking work in medical innovation.
              </p>
            </div>

            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="text-[#FE6448] text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-white mb-3">Interactive Schedule</h3>
              <p className="text-white/80">
                Plan your congress experience with our interactive program and scheduling tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
