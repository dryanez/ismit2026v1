"use client";

import { useState } from "react";
import Link from "next/link";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
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
            { href: "/", label: "Home" },
            { href: "/registration", label: "Registration" },
            { href: "/about", label: "About", isActive: true },
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
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            About iSMIT
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase">
            International Society for Medical Innovation and Technology
          </p>
        </div>
      </section>

      {/* Key Facts Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
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
                Countries Represented
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-orbitron font-bold text-[#FE6448] mb-2">37th</div>
              <div className="text-lg md:text-2xl font-roboto-condensed font-light text-[#FE6448] uppercase">
                World Congress
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About iSMIT Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center relative z-10 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl font-roboto-condensed font-semibold text-[#FE6448] uppercase mb-4">
              Welcome to iSMIT 2026
            </p>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8 text-balance">
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

      {/* Congress Motto Section */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-lg md:text-2xl font-roboto-condensed space-y-4">
            <p className="font-bold uppercase mb-6">
              The motto <span className="lowercase">of</span> the iSMIT 2026 Congress
            </p>
            <p className="text-xl md:text-3xl font-orbitron font-bold mb-6">"Disruptive AGE in Medical Technology"</p>
            <p className="text-base md:text-lg">
              encapsulates the transformative impact <span className="lowercase">of</span> Artificial Intelligence,
              Generation of new materials, and Emerging robotic technologies that are revolutionizing surgical practice
              and healthcare delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Congress Details Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Congress Details
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#0D1858] rounded-lg p-8 text-white">
              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">When</h3>
              <p className="font-roboto-condensed text-lg mb-4">19 - 21 November 2026</p>
              <p className="font-roboto-condensed text-base">Three days of innovation, collaboration, and advancement</p>
            </div>

            <div className="bg-[#FE6448] rounded-lg p-8 text-white">
              <h3 className="font-orbitron font-bold uppercase text-xl mb-6">Where</h3>
              <p className="font-roboto-condensed text-lg mb-4">NCC Ost, Nuremberg, Germany</p>
              <p className="font-roboto-condensed text-base">Messezentrum 1, 90471 Nuremberg</p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="bg-[#85AFFB] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Key Topics
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Artificial Intelligence</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                AI-driven diagnostics, surgical planning, and autonomous systems
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#FE6448] uppercase text-lg mb-4">Robotics</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                Advanced surgical robots and minimally invasive technologies
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#85AFFB] uppercase text-lg mb-4">Digital Health</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                Telemedicine, wearables, and connected healthcare solutions
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#0D1858] uppercase text-lg mb-4">Biomedical Engineering</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                Next-generation materials and medical devices
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#FE6448] uppercase text-lg mb-4">Mixed Reality</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                VR/AR applications in surgical training and patient care
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-orbitron font-bold text-[#85AFFB] uppercase text-lg mb-4">Innovation</h3>
              <p className="font-roboto-condensed text-[#0D1858]">
                Startup showcases and cutting-edge medical technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Organized By
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
            <div className="space-y-6 text-[#0D1858] font-roboto-condensed text-center">
              <div>
                <h3 className="font-orbitron font-bold uppercase text-2xl mb-4">Kongress- und Projektmanagement</h3>
                <p className="text-xl font-bold mb-4">projektart – Studio Karlsruhe</p>
              </div>

              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:ismit2026@projektart.eu" className="text-[#FE6448] hover:underline">ismit2026@projektart.eu</a></p>
                <p><strong>Website:</strong> <a href="https://www.projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] hover:underline">www.projektart.eu</a></p>
                <div className="flex gap-4 justify-center mt-4">
                  <a href="https://www.instagram.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] hover:underline font-semibold">
                    Instagram: @projektart.eu
                  </a>
                  <a href="https://www.facebook.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] hover:underline font-semibold">
                    Facebook: @projektart.eu
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FE6448] rounded-lg p-6 text-white text-center mt-8 max-w-2xl mx-auto">
            <p className="text-sm">
              <strong>Inhaltlich Verantwortliche gemäß §6 MDStV:</strong> Konrad Karcz
            </p>
            <p className="text-sm mt-2">
              <strong>Design:</strong> Gabriela Wiackowska, Wilson Ortiz
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#FE6448] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">
            Join Us in Nuremberg
          </h2>
          <p className="text-lg md:text-xl font-roboto-condensed text-white mb-8">
            Be part of the future of medical innovation and technology
          </p>
          <Link
            href="/registration"
            className="inline-block bg-white text-[#FE6448] px-8 py-4 text-xl font-orbitron font-black uppercase rounded-lg hover:bg-gray-100 transition-colors"
          >
            Register Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}