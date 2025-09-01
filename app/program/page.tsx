import { Roboto_Condensed, Orbitron } from "next/font/google"
import styles from './day1.module.css'

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
          <div className="mb-8 flex justify-center">
            <div className="w-[615px] h-[499px] relative">
              <div className="w-[615px] h-11 left-0 top-0 absolute bg-red-500 rounded-[10px]" />
              <div className="w-[553.36px] h-5 left-[31.54px] top-[11px] absolute text-center justify-center text-white text-base font-black font-['Orbitron'] uppercase">Day 1: Thursday, 19th November 2026</div>
              <div className="w-[615px] h-96 left-0 top-[86px] absolute bg-red-500 rounded-[10px]" />
              <div className="w-[523px] h-14 left-[46px] top-[129px] absolute text-justify justify-start"><span className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Registration Opens<br/></span><span className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Online registration via digital congress platform. On-site digital help desks available.</span></div>
              <div className="w-20 h-4 left-[46px] top-[110px] absolute text-justify justify-start text-white text-base font-normal font-['Orbitron'] capitalize">15:00</div>
              <div className="w-[523px] h-8 left-[46px] top-[211px] absolute text-justify justify-start"><span className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Welcome Reception<br/></span><span className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Drinks and light snacks served in the networking lounge.</span></div>
              <div className="w-20 h-4 left-[46px] top-[192px] absolute text-justify justify-start text-white text-base font-normal font-['Orbitron'] capitalize">16:00</div>
              <div className="w-[523px] h-8 left-[46px] top-[281px] absolute text-justify justify-start"><span className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Opening Ceremony<br/></span><span className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Welcome addresses from congress leadership.<br/></span></div>
              <div className="w-20 h-4 left-[46px] top-[262px] absolute text-justify justify-start text-white text-base font-normal font-['Orbitron'] capitalize">17:00</div>
              <div className="w-[523px] h-12 left-[46px] top-[351px] absolute text-justify justify-start"><span className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Artistic &amp; Scientific Welcome<br/></span><span className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">A unique blend of musical performances and institutional welcomes from our esteemed partners.</span></div>
              <div className="w-32 h-4 left-[46px] top-[332px] absolute text-justify justify-start text-white text-base font-normal font-['Orbitron'] capitalize">17:30 - 19:30</div>
              <div className="w-[523px] h-12 left-[46px] top-[432px] absolute text-justify justify-start text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Closing Remarks</div>
              <div className="w-32 h-4 left-[46px] top-[413px] absolute text-justify justify-start text-white text-base font-normal font-['Orbitron'] capitalize">20:00</div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="mb-8 flex justify-center">
            <div className="w-[615px] h-[574px] relative">
              <div className="w-[615px] h-[43px] left-0 top-0 absolute bg-[#85AFFB] rounded-[10px]" />
              <div className="w-[553.36px] h-[21px] left-[31.54px] top-[11px] absolute flex items-center justify-center text-white text-[15px] font-black font-['Orbitron'] uppercase">Day 2: Friday, 20th November 2026</div>
              <div className="w-[615px] h-[488px] left-0 top-[86px] absolute bg-[#85AFFB] rounded-[10px]" />
              <div className="w-[523px] h-[23px] left-[46px] top-[129px] absolute text-justify text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Official Welcome Ceremony &amp; John Abele Lecture<br/></div>
              <div className="w-[144px] h-[18px] left-[46px] top-[110px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">08:30 – 09:30</div>
              <div className="w-[523px] h-[32px] left-[46px] top-[178px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Deep Space of Data"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">New Dimensions: Added Reality</span></div>
              <div className="w-[116px] h-[18px] left-[46px] top-[159px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">09:30 – 10:15</div>
              <div className="w-[523px] h-[32px] left-[46px] top-[248px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Beyond the Cutting Edge"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Monitoring, Planning, Decisions<br/></span></div>
              <div className="w-[121px] h-[18px] left-[46px] top-[229px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">10:30 – 11:15</div>
              <div className="w-[523px] h-[48px] left-[46px] top-[318px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Next-Generation"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Sensoring &amp; AI</span></div>
              <div className="w-[523px] h-[48px] left-[46px] top-[430px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Bold Frontiers"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Predictive Analytics</span></div>
              <div className="w-[523px] h-[48px] left-[46px] top-[498px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Evening Event: "Feast of the Middle Ages"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Ritter Chamber, Imperial Fortress of Nuremberg</span></div>
              <div className="w-[523px] h-[31px] left-[46px] top-[385px] absolute text-justify text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Keynote: Gerhard Buess Lecture<br/></div>
              <div className="w-[130px] h-[18px] left-[46px] top-[299px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">11:20 – 12:30</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[411px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">14:00 – 14:55</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[479px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">19:00</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[366px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">13:30 – 14:00</div>
            </div>
          </div>

          {/* Day 3 */}
          <div className="mb-8 flex justify-center">
            <div className="w-[615px] h-[574px] relative">
              <div className="w-[615px] h-[466px] left-0 top-[86px] absolute bg-[#0D1858] rounded-[10px]" />
              <div className="w-[523px] h-[23px] left-[46px] top-[129px] absolute text-justify text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Keynote: Earl Owen Lecture<br/></div>
              <div className="w-[144px] h-[18px] left-[46px] top-[110px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">08:30 – 09:00</div>
              <div className="w-[523px] h-[32px] left-[46px] top-[178px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Redefining Care"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">New Robots</span></div>
              <div className="w-[183px] h-[18px] left-[46px] top-[159px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">09:00 – 09:30</div>
              <div className="w-[523px] h-[32px] left-[46px] top-[248px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Rocket Breakthroughs"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Next Level of Computer Vision &amp; 3D Printing<br/></span></div>
              <div className="w-[121px] h-[18px] left-[46px] top-[229px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">09:30 – 10:15</div>
              <div className="w-[523px] h-[48px] left-[46px] top-[318px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Session: "Strange New Worlds"<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Humanoid Robots</span></div>
              <div className="w-[523px] h-[48px] left-[46px] top-[430px] absolute text-justify"><span className="text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Award Ceremony &amp; Closing Session<br/></span><span className="text-white text-[14px] font-light font-['Roboto_Condensed'] uppercase">Predictive Analytics</span></div>
              <div className="w-[523px] h-[19px] left-[46px] top-[498px] absolute text-justify text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Official Closing of the Conference</div>
              <div className="w-[523px] h-[31px] left-[46px] top-[385px] absolute text-justify text-white text-[14px] font-black font-['Roboto_Condensed'] uppercase">Keynote: John Wickham Lecture<br/></div>
              <div className="w-[130px] h-[18px] left-[46px] top-[299px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">11:20 – 12:30</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[411px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">15:50 – 16:30</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[479px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">17:30</div>
              <div className="w-[130px] h-[18px] left-[46px] top-[366px] absolute text-white text-[15px] font-normal font-['Orbitron'] capitalize">13:30 – 14:00</div>
              <div className="w-[615px] h-[43px] left-0 top-0 absolute bg-[#0D1858] rounded-[10px]" />
              <div className="w-[553.36px] h-[21px] left-[31.54px] top-[11px] absolute flex items-center justify-center text-white text-[15px] font-black font-['Orbitron'] uppercase">Day 3: Saturday, 21st November 2026</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}