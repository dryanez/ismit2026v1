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
              Day 1, Thursday, 19th November 2026 - Preliminary Programme
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Registration Opens</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">16:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Welcome Reception</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Opening Ceremony</h4>
                  <p className="font-roboto-condensed text-sm">
                    Welcome address – Prof. Konrad Karcz, iSMIT President<br />
                    Greetings – Dr. Kevin Cleary, Past President<br />
                    Official opening – Prof. Denis Ehrl, Congress President<br />
                    Co-Presidents – Prof. Andrew Gumbs (FR) & Prof. Zbigniew Nawrat (PL)
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Artistic Programme – Part 1</h4>
                  <p className="font-roboto-condensed text-sm">Performance: Music meets Medical Technology</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">18:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Scientific Welcome</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">18:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Artistic Programme – Part 2</h4>
                  <p className="font-roboto-condensed text-sm">Continued performances: Performance: Music meets Medical Technology</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">19:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Institutional Welcome – Part 2 (Preliminary)</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">19:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Artistic Programme – Part 3</h4>
                  <p className="font-roboto-condensed text-sm">Final: Music meets Medical Technology</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">20:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Closing Remarks</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-[#85AFFB] rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase text-center mb-6">
              Day 2, Friday, 20th November 2026 (Main Hall)
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">08:30 – 09:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Official Welcome Ceremony</h4>
                  <p className="font-roboto-condensed text-sm">Opening John Abele Lecture</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">09:30 – 10:15</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Deep Space of Data“</h4>
                  <p className="font-roboto-condensed text-sm">New Dimensions: Added Reality</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:15 – 10:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">☕ Coffee Break & Networking</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:30 – 11:15</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session:“Beyond the Cutting Edge”</h4>
                  <p className="font-roboto-condensed text-sm">Monitoring, Planning, Decisions</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">11:15 – 11:20</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Five Minute Mental Break – Stretch & Refresh</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">11:20 – 12:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Next-Generation“</h4>
                  <p className="font-roboto-condensed text-sm">Sensoring & AI</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">12:30 – 13:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Lunch Break</h4>
                  <p className="font-roboto-condensed text-sm">🕐 13:00 – 13:30 Annual General Assembly – International Society for Medical Innovation and Technology (iSMIT)</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">13:30 – 14:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Keynote:</h4>
                  <p className="font-roboto-condensed text-sm">Gerhard Buess Lecture</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">14:00 – 14:55</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Bold Frontiers“</h4>
                  <p className="font-roboto-condensed text-sm">Predictive Analytics</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">14:55 – 15:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Five Minutes of Mental Break – Stretch & Refresh</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:00 – 15:45</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Common Panel Discussion:</h4>
                  <p className="font-roboto-condensed text-sm">“Future Destination”</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:45 – 16:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">☕ Coffee Break & Networking</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">16:00 – 16:45</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Grass-Roots Ideas That Rise“</h4>
                  <p className="font-roboto-condensed text-sm">Natural Language Processing (NLP)</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">16:45 – 17:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Enterprising Solutions“</h4>
                  <p className="font-roboto-condensed text-sm">Biomaterials & Reducing Waste</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:45</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Closing of Day 2</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">19:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Evening Event</h4>
                  <p className="font-roboto-condensed text-sm">"Feast of the Middle Ages" –<br />Ritter Chamber,<br />Imperial Fortress of Nuremberg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="bg-[#0D1858] rounded-lg p-8">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase text-center mb-6">
              Day 3, Saturday, 21st November 2026
            </h3>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">08:30 – 09:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Keynote:</h4>
                  <p className="font-roboto-condensed text-sm">Earl Owen Lecture</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">09:00 – 09:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Redefining Care“</h4>
                  <p className="font-roboto-condensed text-sm">New Robots</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">09:30 – 10:15</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Rocket Breakthroughs</h4>
                  <p className="font-roboto-condensed text-sm">Next Level of Computer Vision & 3D Printing</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:15 – 10:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">☕ Coffee Break & Networking</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">10:30 – 11:15</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Next Generation“</h4>
                  <p className="font-roboto-condensed text-sm">Advanced Assistance Systems & Automation</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">11:15 – 11:20</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">five Minutes of Mental Break – Stretch & Refresh</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">11:20 – 12:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Strange New Worlds“</h4>
                  <p className="font-roboto-condensed text-sm">Humanoid Robots</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">12:30 – 13:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Lunch Break</h4>
                  <p className="font-roboto-condensed text-sm">🕐 13:00 Steering Committee Meeting (by invitation)</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">13:30 – 14:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Keynote</h4>
                  <p className="font-roboto-condensed text-sm">John Wickham Lecture</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">14:00 – 14:45</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Session: „Voyager“</h4>
                  <p className="font-roboto-condensed text-sm">New AGE in in Rehabilitation</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">14:45 – 15:00</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">☕ Coffee Break & Networking</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:00 – 15:45</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Common Panel Discussion</h4>
                  <p className="font-roboto-condensed text-sm">Natural and Generative Intelligence: Potential Conflict or Glorious Collaboration?</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:45 –15:50</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">five Minutes of Mental Break – Stretch & Refresh</h4>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">15:50 – 16:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">🏆 Award Ceremony & Closing Session</h4>
                  <p className="font-roboto-condensed text-sm">
                    Best Presentation of the Congress<br />
                    Best Video-Poster of the Congress<br />
                    Start-up Grand Prize<br />
                    Best Inovative Product of the Year 2025<br />
                    iSMIT AWARD 2025<br />
                    Honorary Award of iSMIT 2026<br />
                    Welcome the New President of iSMIT 2027<br />
                    Final Closing Remarks
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="font-orbitron font-bold">17:30</div>
                <div className="md:col-span-3">
                  <h4 className="font-roboto-condensed font-bold uppercase mb-1">Official Closing of the Conference</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}