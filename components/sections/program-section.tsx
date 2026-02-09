"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProgramSection() {
  const [activeTab, setActiveTab] = useState("day1")

  const tabContent = {
    day1: [
      {
        title: "Session 1: Autonomous Robotics",
        description: "From Assistance to Self-Learning Systems",
        icon: "🤖",
      },
      {
        title: "Panel: Human Augmentation",
        description: "Neural Interfaces, Exoskeletons & Bionics",
        icon: "🦾",
      },
      {
        title: "Panel: Will AI Replace Doctors?",
        description: "Ethics, Responsibility, and the Future of Medicine",
        icon: "🤔",
      },
      {
        title: "Session 2: Future Materials",
        description: "Smart and Regenerative Bio-Hybrid Systems",
        icon: "⚗️",
      },
      {
        title: "Session 3: Ethics & Digital Twins",
        description: "Responsible Development and Clinical Integration",
        icon: "👥",
      },
      {
        time: "17:30",
        title: "Presidential Gala Dinner",
        description: "Germanisches Nationalmuseum, Nuremberg",
        icon: "🎩",
      },
    ],
    day2: [
      {
        title: "Session 4: NLP & Sensor Data",
        description: "From Text and Sensors to Clinical Decisions",
        icon: "📊",
      },
      {
        title: "Session 5: Computer Vision & 3D Printing",
        description: "The Next Level of Medical Technology",
        icon: "🖨️",
      },
      {
        title: "Panel: Future Robots",
        description: "From Algorithms to Responsibility",
        icon: "🤖",
      },
      {
        title: "Session 6: Robotic Microsurgery",
        description: "From Microscale to Metaverse",
        icon: "🔬",
      },
      {
        title: "Session 7: Structured Data",
        description: "The Foundation of Modern Healthcare",
        icon: "💾",
      },
      {
        title: "Workshops: MR/VR & AI Academy",
        description: "Interactive hands-on training sessions",
        icon: "🥽",
      },
      {
        title: "Award Ceremony & Closing",
        description: "iSMIT 2026 Official Closing",
        icon: "🏆",
      },
    ],
  }

  return (
    <section id="program" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute top-10 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-subtitle animate-fade-in">Scientific Program</h2>
          <h3 className="section-title animate-fade-in-delay">A Glimpse into the Future</h3>

          {/* Environmental Message */}
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg shadow-md">
            <p className="text-green-800 font-medium flex items-center justify-center gap-2">
              <span className="text-2xl">🌳</span>
              <span>We are going paperless. For every congress participant, we will plant a tree — a tangible contribution to environmental protection.</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-6 md:mb-8 flex-wrap gap-2 md:gap-4">
          <button
            className={`px-4 md:px-8 py-2 md:py-4 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${activeTab === "day1"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-200"
              }`}
            onClick={() => setActiveTab("day1")}
          >
            <span className="hidden sm:inline">Day 1: Friday</span>
            <span className="sm:hidden">Friday</span>
          </button>
          <button
            className={`px-4 md:px-8 py-2 md:py-4 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${activeTab === "day2"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-200"
              }`}
            onClick={() => setActiveTab("day2")}
          >
            <span className="hidden sm:inline">Day 2: Saturday</span>
            <span className="sm:hidden">Saturday</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <h4 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-slate-800 text-center">
              {activeTab === "day1" && (
                <>
                  <span className="hidden sm:inline">Day 1: Friday</span>
                  <span className="sm:hidden">Friday</span>
                </>
              )}
              {activeTab === "day2" && (
                <>
                  <span className="hidden sm:inline">Day 2: Saturday</span>
                  <span className="sm:hidden">Saturday</span>
                </>
              )}
            </h4>
            <div className="space-y-3 md:space-y-6">
              {tabContent[activeTab as keyof typeof tabContent].map((item, index) => (
                <div
                  key={index}
                  className="group p-3 md:p-6 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-2 md:gap-4">
                    <div className="text-lg md:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.time && (
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                          <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium">
                            {item.time}
                          </span>
                        </div>
                      )}
                      <h5 className="text-sm md:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {item.title}
                      </h5>
                      {item.description && (
                        <p className="text-xs md:text-base text-slate-600 mt-1 md:mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/program">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full">
              View Full Program
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
