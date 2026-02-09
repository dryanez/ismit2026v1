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
  const [expandedSessions, setExpandedSessions] = useState<{ [key: string]: boolean }>({}); // State to manage expanded sessions

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionId]: !prev[sessionId]
    }));
  };

  const programDays = [
    {
      day: 1,
      date: "Friday, 11th December 2026",
      bgColor: "bg-red-500",
      content: (
        <>
          <div className="relative z-10 px-4 py-2">
            <div className="mb-6">
              <p className="text-white text-lg font-black font-['Roboto_Condensed'] uppercase mb-2">Presidential Gala Dinner</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] mb-1">Dresscode: Festive – we look forward to elegant evening attire</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed']">Germanisches Nationalmuseum, Nuremberg</p>
              <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 italic">
                The iSMIT World Congress 2026 opens on the first congress day with a ceremonial Opening Ceremony and an exclusive Gala Dinner in the historic ambience of the Germanic National Museum. The event combines scientific excellence with high-level institutional and political guests as well as a specially curated artistic program under the motto "Music & Art meets Medical Technology".
              </p>
            </div>

            {/* 17:30 Beginning & Snacks */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day1-beginning')}>
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">17:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Beginning & Snacks {expandedSessions['day1-beginning'] ? '▼' : '▶'}
              </p>
              {expandedSessions['day1-beginning'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Guided Museum Visit (30 min) - Exclusive, guided tour of selected collections of the Germanic National Museum in small groups.
                </p>
              )}
            </div>

            {/* 18:00 Opening Ceremony */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day1-opening')}>
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">18:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Opening Ceremony {expandedSessions['day1-opening'] ? '▼' : '▶'}
              </p>
              {expandedSessions['day1-opening'] && (
                <div className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  <p className="font-semibold">Welcome Address:</p>
                  <p>Prof. Dr. Konrad Karcz, President iSMIT</p>
                  <p className="font-semibold mt-2">Greetings:</p>
                  <p>Dr. Kevin Cleary, Past President iSMIT</p>
                  <p className="font-semibold mt-2">Official Opening:</p>
                  <p>Prof. Dr. Denis Ehrl, Congress President</p>
                  <p className="font-semibold mt-2">Co-Presidents:</p>
                  <p>Prof. Andrew Gumbs (FR), Prof. Zbigniew Nawrat (PL), Prof. Dirk Wilhelm (DE)</p>
                </div>
              )}
            </div>

            {/* 18:10 Scientific & Institutional Welcome */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day1-institutional')}>
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">18:10</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Scientific & Institutional Welcome {expandedSessions['day1-institutional'] ? '▼' : '▶'}
              </p>
              {expandedSessions['day1-institutional'] && (
                <div className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  <p className="mb-2">Brief contributions and greetings from academic, clinical and institutional partners (selection):</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Bavarian State Ministry for Economic Affairs, Regional Development and Energy (invited)</li>
                    <li>Andreas Glück, MEP, Member of the European Parliament, Spokesperson for Medical Devices & MDR (invited)</li>
                    <li>Prof. Dr. Niels Oberbeck, President of Nuremberg Tech (OHM)</li>
                    <li>Prof. Dr. Joachim Hornegger, President of Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU)</li>
                    <li>Prof. Dr. Michael Huth, President of Technical University of Nuremberg (UTN)</li>
                    <li>Prof. Dr. med. Wolfgang Sperl, Rector of Paracelsus Medical Private University (PMU)</li>
                    <li>Prof. Dr. Jockwig, General Director of Klinikum Nürnberg</li>
                    <li>Dr. Kurt Hoeller, Siemens Healthineers</li>
                  </ul>
                  <p className="mt-2">As well as representatives from:</p>
                  <ul className="list-disc ml-4">
                    <li>Bayern Innovativ GmbH</li>
                    <li>Medical Valley EMN e. V.</li>
                    <li>Foundation for Cardiac Surgery Development (Prof. Zbigniew Religa)</li>
                  </ul>
                </div>
              )}
            </div>

            {/* 19:30 Gala Dinner & Awards */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day1-gala')}>
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">19:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Gala Dinner & Awards {expandedSessions['day1-gala'] ? '▼' : '▶'}
              </p>
              {expandedSessions['day1-gala'] && (
                <div className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed space-y-3">
                  <p>Festive Gala Dinner in the representative rooms of the Germanic National Museum. Selected artistic interventions and brief honorary greetings accompany the evening and are harmoniously integrated into the dinner. The focus is on personal exchange, international networking and interdisciplinary dialogue in a relaxed atmosphere.</p>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 1. HOST TOAST – OPENING TOAST (19:35)</p>
                    <p>Prof. Dr. Konrad Karcz, President iSMIT</p>
                    <p className="italic">"To the people who connect medicine, technology and responsibility."</p>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 2. CONGRESS TOAST – SCIENCE & CLINICAL EXCELLENCE (ca. 19:50)</p>
                    <p>Prof. Dr. Denis Ehrl, Congress President</p>
                    <p className="italic">"To surgery that is not afraid of the future."</p>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 3. MINISTERIAL TOAST – STATE & RESPONSIBILITY (ca. 20:05)</p>
                    <p>Representative of the Bavarian State Ministry</p>
                    <p className="italic">"To a strong innovation location Bavaria – and to technologies that serve humanity."</p>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 4. EUROPEAN TOAST – REGULATION & FUTURE (ca. 20:20)</p>
                    <p>Andreas Glück, MEP (invited)</p>
                    <p className="italic">"To innovations that emerge in Europe and can remain in Europe."</p>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 5. INTERNATIONAL TOAST – iSMIT COMMUNITY (ca. 20:35)</p>
                    <p>Dr. Kurt Hoeller, Siemens Healthineers</p>
                    <p className="italic">"To friendships and cooperation across borders."</p>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <p className="font-semibold">🥂 6. REGIONAL TOAST – INNOVATION ECOSYSTEM (ca. 20:50)</p>
                    <p>Marco Wendel, Medical Valley EMN e. V.</p>
                    <p className="italic">"To good ideas that find their way to patients."</p>
                  </div>
                </div>
              )}
            </div>

            {/* 20:30 Artistic Programme Part One */}
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">20:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Artistic Programme Part One</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Performance: Music meets Medical Technology - Composer: Atac Sezer and Quartet</p>
            </div>

            {/* 20:55 iSMIT 2026 Awards */}
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">20:55</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">iSMIT 2026 Awards</p>
            </div>

            {/* 21:00 Artistic Programme Part Two */}
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">21:00</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Artistic Programme Part Two</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Performance: Music meets Medical Technology - Composer: Atac Sezer and Quartet</p>
            </div>

            {/* 21:30 Closing Remarks & Networking */}
            <div className="mb-4">
              <p className="text-white text-base font-normal font-['Orbitron'] capitalize">21:30</p>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Closing Remarks President iSMIT 2026</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Informal networking - Continuation of conversations in the special museum ambience</p>
            </div>
          </div>
        </>
      ),
    },
    {
      day: 2,
      date: "Saturday, 12th December 2026",
      bgColor: "bg-[#85AFFB]",
      content: (
        <>
          <div className="relative z-10 px-4 py-2">
            {/* Session 1 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session1')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 1: Autonomous Robotics {expandedSessions['day2-session1'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">From Assistance to Self-Learning Systems</p>
              {expandedSessions['day2-session1'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Autonomous robotics is rapidly evolving from purely assistive systems toward increasingly adaptive, self-learning technologies. This session explores the transition from human-controlled robotic assistance to semi-autonomous and learning robotic systems, with a particular focus on medical and surgical applications. The session will examine the current state of autonomous robotics, highlighting how robotic systems are moving beyond predefined actions toward context-aware behavior driven by artificial intelligence, sensor fusion, and real-time data processing. Speakers will discuss how learning-based systems can adapt to variability in anatomy, workflow, and clinical environments while maintaining safety and reliability.
                </p>
              )}
            </div>

            {/* Discussion Panel One */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-panel1')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Discussion Panel One: Human Augmentation {expandedSessions['day2-panel1'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Neural Interfaces, Exoskeletons & Bionics</p>
              {expandedSessions['day2-panel1'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Human augmentation represents one of the most transformative frontiers in modern medicine, aiming to restore, enhance, or extend human capabilities through advanced technological integration. This session focuses on neural interfaces, exoskeletons, and bionic systems and explores how these technologies are reshaping rehabilitation, surgery, and long-term patient care. The session will examine the current state and future potential of neural interfaces, including brain–computer and peripheral nerve interfaces, enabling bidirectional communication between the nervous system and digital or mechanical systems.
                </p>
              )}
            </div>

            {/* Discussion Panel Two */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-panel2')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Discussion Panel Two: Will AI Replace Doctors? {expandedSessions['day2-panel2'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Ethics, Responsibility, and the Future of Medicine</p>
              {expandedSessions['day2-panel2'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Even if AI outperforms humans in accuracy and efficiency, will patients and society accept medical decisions made without human judgment and empathy? When AI becomes technically superior in certain domains, will clinical responsibility, regulation, and liability still require a human physician in the loop? Will AI replace doctors entirely, or will it primarily transform their roles by automating specific tasks rather than the profession itself?
                </p>
              )}
            </div>

            {/* Session 2 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session2')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 2: Future Materials {expandedSessions['day2-session2'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Smart and Regenerative Bio-Hybrid Systems</p>
              {expandedSessions['day2-session2'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Advances in material science are rapidly transforming medicine, enabling fundamentally new approaches to regeneration, repair, and human–technology integration. This session focuses on the next generation of smart, regenerative, and bio-hybrid materials and their role in shaping future medical therapies and surgical applications. The session will explore smart materials capable of sensing, responding to, and dynamically adapting to their biological environment.
                </p>
              )}
            </div>

            {/* Session 3 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session3')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 3: Ethics & Digital Twins in Medicine {expandedSessions['day2-session3'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Responsible Development and Clinical Integration</p>
              {expandedSessions['day2-session3'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  The rapid advancement of digital technologies is enabling the creation of digital twins in medicine—virtual representations of patients that integrate clinical data, imaging, physiological signals, and predictive models. While these systems hold significant promise for personalized care, simulation, and decision support, they also raise profound ethical, legal, and societal questions regarding data ownership, consent, transparency, and accountability.
                </p>
              )}
            </div>

            {/* Session 4 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session4')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 4: From Text and Sensors to Decisions {expandedSessions['day2-session4'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">NLP and Sensor Data in Medicine</p>
              {expandedSessions['day2-session4'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Clinical decision making is increasingly shaped by the ability to integrate heterogeneous data sources, particularly unstructured clinical text and continuously generated sensor data. This session focuses on how Natural Language Processing (NLP) and sensor-based data together enable more informed, timely, and context-aware clinical decision making.
                </p>
              )}
            </div>

            {/* Session 5 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session5')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 5: Computer Vision & 3D Printing {expandedSessions['day2-session5'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">The Next Level</p>
              {expandedSessions['day2-session5'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Advances in computer vision and 3D printing are reshaping the foundations of digital medicine by enabling a seamless transition from imaging data to physical, patient-specific solutions. This session focuses on next-level computer vision technologies and their integration with artificial intelligence and additive manufacturing to support personalized, data-driven medical care.
                </p>
              )}
            </div>

            {/* Discussion Panel Three */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-panel3')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Discussion Panel Three: From Algorithms to Responsibility {expandedSessions['day2-panel3'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Defining the Needs of Future Robots</p>
              {expandedSessions['day2-panel3'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Which technical, cognitive, and ethical capabilities future robots must possess to operate safely, reliably, and meaningfully alongside humans. How responsibility, transparency, and human oversight can be embedded into robotic systems as autonomy and intelligence increase. How alignment with human values, clinical needs, and societal expectations should guide the design and deployment of next-generation robotic systems.
                </p>
              )}
            </div>

            {/* Session 6 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session6')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 6: From Microscale to Metaverse {expandedSessions['day2-session6'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">The Future of Robotic Microsurgery and Precision Surgery</p>
              {expandedSessions['day2-session6'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Robotic surgery is rapidly evolving across surgical disciplines, from supermicrosurgical procedures requiring extreme precision to large-scale robotic systems in orthopedics and urology. This session explores how advances in robotic assistance, imaging, and artificial intelligence are reshaping surgical practice across different anatomical and technical scales.
                </p>
              )}
            </div>

            {/* Session 7 */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-session7')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Session 7: The Importance of Structured Data {expandedSessions['day2-session7'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">Foundation of Modern Healthcare</p>
              {expandedSessions['day2-session7'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Healthcare generates vast amounts of data every day — from clinical documentation and imaging to sensor data, genomics, and patient-reported outcomes. Yet much of this information remains unstructured, fragmented, and difficult to integrate into clinical workflows or advanced analytical systems. This session explores why the transformation of raw and unstructured healthcare data into structured, interoperable formats is a critical prerequisite for modern medicine.
                </p>
              )}
            </div>

            {/* Workshop One */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-workshop1')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Workshop One: Mixed & Virtual Reality Experience {expandedSessions['day2-workshop1'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">120-minute immersive track - Advance registration mandatory</p>
              {expandedSessions['day2-workshop1'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Mixed and Virtual Reality (MR/VR) technologies are transforming medical education, surgical rehearsal and patient counselling by integrating high-fidelity visualisation with dynamic interactivity. In this 120-minute immersive track, leading research groups, clinical innovators and industry partners will demonstrate validated MR/VR workflows, including holographic anatomy mapping, augmented intraoperative guidance and remote collaborative simulation. Because only a restrictive number of headsets can be streamed simultaneously, advance registration is mandatory; places will be allocated on a first-come, confirmed basis.
                </p>
              )}
            </div>

            {/* Workshop Two */}
            <div className="mb-4 cursor-pointer" onClick={() => toggleSession('day2-workshop2')}>
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase flex items-center gap-2">
                Workshop Two: Artificial Intelligence - Software Academy {expandedSessions['day2-workshop2'] ? '▼' : '▶'}
              </p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">180-minute intensive track - Limited to 24 participants</p>
              {expandedSessions['day2-workshop2'] && (
                <p className="text-white text-xs font-light font-['Roboto_Condensed'] mt-2 leading-relaxed">
                  Artificial intelligence (AI) toolkits are reshaping clinical diagnostics, workflow automation and surgical decision-support by coupling large-scale data analytics with intuitive interfaces. In this 180-minute intensive track, leading clinician-scientists, data engineers and industry partners present the twenty most impactful medical-AI platforms currently in deployment—from image-segmentation suites and operative-video annotators to predictive dashboards and generative report writers. Please bring a WLAN-enabled laptop and headphones for interactive modules.
                </p>
              )}
            </div>

            {/* Award Ceremony */}
            <div className="mb-4">
              <p className="text-white text-sm font-black font-['Roboto_Condensed'] uppercase">Award Ceremony & Closing</p>
              <p className="text-white text-sm font-light font-['Roboto_Condensed'] uppercase">iSMIT 2026 Meeting Official Closing</p>
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
            { href: "/speakers", label: "Moderators" },
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
            Two Days of Innovation
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
              Two intensive days exploring the future of medical technology
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
