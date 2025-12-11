"use client";

import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";
import { Roboto_Condensed, Orbitron } from "next/font/google"
import { useState } from "react";

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

interface Speaker {
  name: string;
  title?: string;
  affiliation?: string;
  imageSrc: string;
  bio: string;
}

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const speakersData: Speaker[] = [
    {
      name: "Professor Michele Diana",
      title: "Head of Research, IRCAD Strasbourg",
      affiliation: "Surgical Data Science & Image-Guided Interventions",
      imageSrc: "/speakers/Professor Michele Diana .png",
      bio: "Professor Michele Diana is an internationally recognized surgeon-scientist and one of the leading innovators in surgical data science, robotic surgery, and image-guided interventions. Head of Research at IRCAD Strasbourg, he has played a key role in advancing computer-assisted surgery, integrating artificial intelligence, augmented reality, and intraoperative imaging into clinical workflows. His work continues to shape the future of precision surgery worldwide, bridging engineering, data science, and advanced minimally invasive techniques."
    },
    {
      name: "Professor Andrew Gumbs",
      title: "Leading Expert in Minimally Invasive Surgery",
      affiliation: "Advanced Laparoscopy & GI Oncology",
      imageSrc: "/speakers/Professor Andrew Gumbs.png",
      bio: "Professor Andrew Gumbs is one of the world's leading experts in minimally invasive surgery, specializing in advanced laparoscopy and gastrointestinal oncology. He combines exceptional surgical precision with deep translational insight, bringing innovative technologies and minimally invasive techniques into clinical practice. His scientific and educational contributions have shaped modern surgical standards across both Europe and the United States."
    },
    {
      name: "Professor Tobias Keck",
      title: "Chair of Surgery, University of Lübeck",
      affiliation: "President, German Society for General and Visceral Surgery (DGAV)",
      imageSrc: "/speakers/Professor Tobias Keck.png",
      bio: "Professor Tobias Keck is a leading German surgeon and Chair of the Department of Surgery at the University of Lübeck and the University Hospital Schleswig-Holstein (UKSH), renowned for his expertise in hepatopancreatobiliary (HPB) and upper gastrointestinal surgery. He also serves as President of DGAV, demonstrating his prominent role in national surgical and medical structures. His work integrates advanced minimally invasive and robotic techniques with translational research—particularly in pancreatic cancer, surgical outcomes, and digital innovations in surgery."
    },
    {
      name: "Professor Krzysztof Zieniewicz",
      title: "President, Polish Surgical Society",
      affiliation: "Hepatobiliary & Transplant Surgery, Medical University of Warsaw",
      imageSrc: "/speakers/Professor Krzysztof Zieniewicz.png",
      bio: "Professor Krzysztof Zieniewicz is one of Poland's leading hepatobiliary and transplant surgeons, serving as a senior surgeon and academic leader at the Medical University of Warsaw. He is also the President of the Polish Surgical Society, reflecting his national leadership and long-standing contributions to the development of academic surgery in Poland. His expertise spans complex liver transplantation, oncologic liver surgery, and advanced minimally invasive approaches, establishing him as a prominent figure in European hepatobiliary and transplant surgery."
    },
    {
      name: "Professor Zbigniew Nawrat",
      title: "Pioneer of Polish Medical Robotics",
      affiliation: "Creator of Robin Heart Surgical Robot, Foundation of Cardiac Surgery Development",
      imageSrc: "/speakers/Professor Zbigniew Nawrat.png",
      bio: "Professor Zbigniew Nawrat is a pioneer of Polish medical robotics and the creator of the celebrated Robin Heart surgical robot, the first European robot entirely designed for cardiac surgery. As a long-standing researcher and innovator at the Foundation of Cardiac Surgery Development in Zabrze, he has been instrumental in advancing telemanipulation systems, surgical simulation, and new robotic platforms for minimally invasive procedures. His work has shaped the development of medical technology in Central Europe, inspiring a new generation of engineers, clinicians, and innovators."
    },
    {
      name: "Professor Axel Krieger",
      title: "Leading Researcher in Surgical Robotics",
      affiliation: "Johns Hopkins University",
      imageSrc: "/speakers/Professor Axel Krieger.png",
      bio: "Professor Axel Krieger is a leading researcher in surgical robotics at Johns Hopkins University, known internationally for developing advanced autonomous and semi-autonomous robotic systems for soft-tissue surgery. His team created the groundbreaking STAR robot, the first system to demonstrate supervised autonomous surgical suturing with human-level precision. Through his work at the intersection of engineering, AI, and clinical practice, he is shaping the future of intelligent robotic surgery and transforming how complex procedures can be performed."
    },
    {
      name: "Professor Dirk Wilhelm",
      title: "Leading German Surgeon & Researcher",
      affiliation: "Technical University of Munich (TUM)",
      imageSrc: "/speakers/Professor Dirk Wilhelm.jpeg",
      bio: "Professor Dirk Wilhelm is a leading German surgeon and researcher at the Technical University of Munich (TUM), renowned for his contributions to surgical robotics, digital surgery, and intelligent intraoperative assistance systems. His work focuses on integrating advanced sensors, AI-driven guidance, and robotic technologies to enhance precision and safety in minimally invasive procedures. As one of Europe's key innovators in computer-assisted surgery, he bridges engineering and clinical practice, shaping the future of next-generation surgical platforms."
    },
    {
      name: "Professor Fady T. Charbel",
      title: "Renowned Neurosurgeon",
      affiliation: "University of Illinois at Chicago (UIC)",
      imageSrc: "/speakers/Professor Fady T. Charbel.jpeg",
      bio: "Professor Fady T. Charbel is an internationally renowned neurosurgeon at the University of Illinois at Chicago (UIC), recognized for his pioneering work in cerebrovascular surgery and intraoperative blood-flow technologies. As a leader in neurovascular innovation, he developed groundbreaking methods for quantitative flow measurement that transformed the management of complex aneurysms and arterial occlusive diseases. His scientific contributions, extensive clinical expertise, and global educational impact have positioned him as one of the most influential figures in modern neurosurgery."
    },
    {
      name: "Professor Francesco Saverio Papadia",
      title: "Leading Italian Surgeon",
      affiliation: "Minimally Invasive & Robotic Surgery",
      imageSrc: "/speakers/Professor Francesco Saverio Papadia .png",
      bio: "Professor Francesco Saverio Papadia is a leading Italian surgeon specializing in minimally invasive and robotic surgery, with particular expertise in upper gastrointestinal and bariatric procedures. His research focuses on surgical innovation, clinical outcomes, and the development of advanced techniques that improve safety and precision in complex gastrointestinal operations. Through his academic work, international collaborations, and dedication to surgical education, he has become a recognized figure in modern European minimally invasive surgery."
    },
    {
      name: "Professor Grzegorz Wallner",
      title: "Former President, Polish Surgical Society",
      affiliation: "Medical University of Lublin",
      imageSrc: "/speakers/Professor Grzegorz Wallner.png",
      bio: "Professor Grzegorz Wallner is a leading Polish gastrointestinal surgeon and long-standing academic authority at the Medical University of Lublin, recognized for his expertise in colorectal surgery and surgical oncology. As a former President of the Polish Surgical Society, he has played a central role in shaping national surgical standards, education, and professional development in Poland. His extensive scientific work, leadership in academic surgery, and contribution to modern GI surgery have established him as one of the most influential figures in Central European surgical medicine."
    },
    {
      name: "Professor Amiki Szold",
      title: "Pioneer in Minimally Invasive & Robotic Surgery",
      affiliation: "Leading Israeli Surgeon",
      imageSrc: "/speakers/Professor Amiki Szold.png",
      bio: "Professor Amiki Szold is one of Israel's leading surgeons and a pioneer in minimally invasive and robotic surgery, widely recognized for introducing advanced laparoscopic techniques across the region. Her clinical and academic work focuses on surgical innovation, patient safety, and the development of modern training systems for young surgeons. As a respected international educator and mentor, she has played a significant role in shaping global standards in minimally invasive surgery and advancing women's leadership in academic surgery."
    },
    {
      name: "Professor Marius George Linguraru",
      title: "President, MICCAI",
      affiliation: "Children's National Hospital & George Washington University",
      imageSrc: "/speakers/Professor Marius George Linguraru .png",
      bio: "Professor Marius George Linguraru is an internationally recognized leader in artificial intelligence and medical imaging, serving as Principal Investigator at Children's National Hospital and faculty member at the George Washington University in Washington, D.C. He is also the President of MICCAI, the world's leading society for medical image computing and computer-assisted interventions, reflecting his global influence in shaping the field. His pioneering research in AI-driven diagnostics for pediatric and rare diseases continues to transform precision medicine and the future of child-centered healthcare."
    },
    {
      name: "Professor Paul Barach",
      title: "Expert in Patient Safety & Healthcare Systems",
      affiliation: "International Healthcare Quality & Human Factors",
      imageSrc: "/speakers/Professor Paul Barach .png",
      bio: "Professor Paul Barach is an internationally recognized expert in patient safety, healthcare systems engineering, and human factors, with a long career spanning leading academic and clinical institutions worldwide. He has played a pivotal role in developing modern approaches to quality improvement, perioperative safety, and team-based medical education, influencing policy and practice across multiple countries. Through his research, advisory work, and global collaborations, he remains one of the most influential voices shaping safer, more resilient, and learning-oriented healthcare systems."
    },
    {
      name: "Professor Hans Herbert Steiner",
      title: "Leader in German Health Innovation",
      affiliation: "Hospital Management & Digital Transformation",
      imageSrc: "/speakers/Professor Hans Herbert Steiner .png",
      bio: "Professor Hans Herbert Steiner is a distinguished leader in German health innovation and hospital management, widely recognized for his contributions to modernizing clinical infrastructures and fostering strategic collaborations between medicine, academia, and industry. With a long-standing career in healthcare administration, he has been instrumental in developing forward-looking concepts for integrated care, digital transformation, and sustainable hospital development. His expertise and strategic vision make him a key voice in shaping the future of healthcare delivery in Germany and Europe."
    },
    {
      name: "Professor Jarosław Śmieja",
      title: "Specialist in Automation & Robotics",
      affiliation: "Silesian University of Technology",
      imageSrc: "/speakers/Professor Jarosław Śmieja.png",
      bio: "Professor Jarosław Śmieja is a specialist in automation, robotics, and intelligent control systems at the Silesian University of Technology, where he contributes to the development of advanced engineering solutions for medical and industrial applications. His research focuses on smart sensor integration, autonomous system design, and computational methods that enhance precision and reliability in complex technical environments. Through his interdisciplinary collaborations with clinical and engineering teams, he plays an important role in advancing next-generation robotic and AI-driven technologies in Poland and Europe."
    },
    {
      name: "Professor Konrad Karcz",
      title: "President, iSMIT 2026 World Congress",
      affiliation: "Reconstructive, Plastic & Robotic Surgery",
      imageSrc: "/speakers/Professor Konrad Karcz.png",
      bio: "Professor Konrad Karcz is an experienced European surgeon specializing in reconstructive, plastic, robotic and minimally invasive surgery, with a strong academic background and extensive involvement in clinical innovation. His work integrates advanced imaging, robotics, AI-assisted decision support, and translational research, positioning him at the forefront of modern surgical technology development. As President of the iSMIT 2026 World Congress, he plays a key role in connecting clinicians, engineers, and industry leaders to shape the future of medical innovation and intelligent surgery."
    },
    {
      name: "Professor Uwe Kreimeier",
      title: "Distinguished Anesthesiologist",
      affiliation: "Ludwig Maximilian University (LMU) Munich",
      imageSrc: "/speakers/Professor Uwe Kreimeier.png",
      bio: "Professor Uwe Kreimeier is a distinguished German anesthesiologist and expert in perioperative medicine, critical care, and shock physiology, with a long academic career at the Ludwig Maximilian University (LMU) in Munich. His scientific work has significantly advanced the understanding of inflammation, fluid therapy, and metabolic responses to trauma, making him one of Europe's key authorities in anesthesiology and intensive care. Through his leadership in clinical practice, research, and international education, he has contributed profoundly to improving patient safety and modern perioperative standards."
    },
    {
      name: "Dr. Przemysław Czuma",
      title: "President, Polish Society for Artificial Intelligence",
      affiliation: "AI & Clinical Innovation",
      imageSrc: "/speakers/Dr. Przemysław Czuma.png",
      bio: "Dr. Przemysław Czuma is a leading Polish expert in artificial intelligence and clinical innovation, integrating advanced AI methodologies with modern surgical and medical applications. As the President of the Polish Society for Artificial Intelligence, he plays a key national role in shaping the development, ethical governance, and interdisciplinary adoption of AI technologies in medicine, engineering, and industry. Through his research, educational activities, and international collaborations, he contributes significantly to the advancement of next-generation intelligent healthcare systems in Europe."
    },
    {
      name: "Dr. Denis Ehrl",
      title: "Distinguished German Surgeon",
      affiliation: "Gastrointestinal & Hepatobiliary Surgery",
      imageSrc: "/speakers/Dr. Denis Ehrl.png",
      bio: "Denis Ehrl is a distinguished German surgeon specializing in gastrointestinal and hepatobiliary surgery, known for his expertise in complex minimally invasive and oncological procedures. His scientific work focuses on surgical outcomes research, innovation in perioperative care, and the development of modern digital decision-support tools in surgery. As an academic leader and educator, he plays a key role in shaping the next generation of clinicians through his work at leading German university hospitals."
    },
    {
      name: "Professor Dr. Niels Oberbeck",
      title: "President, Nuremberg Tech",
      affiliation: "Technische Hochschule Nürnberg Georg Simon Ohm",
      imageSrc: "/speakers/Professor Dr. Niels Oberbeck.png",
      bio: "Professor Dr. Niels Oberbeck is the President of the Nuremberg Tech – Technische Hochschule Nürnberg Georg Simon Ohm, where he has been unanimously re-elected by the University Council for a second six-year term beginning in March 2026. A professor of structural engineering since 2000, he previously served as Dean of the Faculty of Civil Engineering and later as Vice President for Teaching before becoming President in 2020. During his leadership, the university has achieved major milestones including the founding of the Nuremberg School of Health, the implementation of the Hightech Agenda Bavaria, the development of the Ohm Innovation Center, expansion of internationalization, and the attainment of independent doctoral awarding rights."
    },
    {
      name: "Michael Friebe",
      title: "Expert in Medical Imaging & Health-Tech Innovation",
      affiliation: "Medical Imaging, Interventional Technology",
      imageSrc: "/speakers/Michael Friebe.png",
      bio: "Professor Michael Friebe is an internationally recognized expert in medical imaging, interventional technology, and health-tech innovation, with a long academic and entrepreneurial career in Germany and abroad. He has contributed significantly to the development of advanced imaging systems, minimally invasive device technologies, and translational solutions that bridge engineering, clinical needs, and industry. As a researcher, inventor, and educator, he is a key figure shaping the future of medical technology and guiding the next generation of innovators in image-guided and AI-assisted healthcare."
    },
    {
      name: "Felipe Yáñez",
      title: "Specialist in Digital Communication & Immersive Technologies",
      affiliation: "VR & AI in Medicine",
      imageSrc: "/speakers/Felipe Yáñez.png",
      bio: "Felipe Yáñez MD is an emerging specialist in digital communication and immersive technologies, focusing on how VR and AI enhance the way medicine communicates, trains, and collaborates. He develops modern visual ecosystems and VR environments that make complex clinical concepts intuitive and accessible for both professionals and patients. In his work with VR goggles in Medicine and AI, he demonstrates how immersive 3D visualization and machine-learning–driven simulation are transforming surgical education, decision-making, and the future of intelligent healthcare."
    },
    {
      name: "Marcin Szeliga",
      title: "Microsoft MVP in Data Platform & AI",
      affiliation: "Artificial Intelligence & Data Science",
      imageSrc: "/speakers/Marcin Szeliga.png",
      bio: "Marcin Szeliga is one of Poland's most respected specialists in artificial intelligence, data science, and applied machine learning, known for his long-standing work as a Microsoft MVP in the field of Data Platform and AI. He is an influential educator, author, and speaker, whose books and lectures have shaped the development of data analytics and AI literacy across Central Europe. Through his expertise, consultancy, and commitment to promoting responsible AI, he plays a key role in advancing digital transformation and intelligent technologies in both industry and academia."
    },
    {
      name: "Karolina Tradel",
      title: "Forbes-Recognized Professional",
      affiliation: "Healthcare, Technology & Organizational Innovation",
      imageSrc: "/speakers/Karolina Tradel.png",
      bio: "Karolina Tradel is an emerging professional working at the intersection of healthcare, technology, and organizational innovation. She has been recognized by Forbes for her contributions to modern digital transformation and her ability to lead multidisciplinary teams in high-impact projects. With her analytical strengths and collaborative mindset, she supports next-generation medical innovation initiatives across both academic and clinical environments."
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
          <div className="absolute inset-0 bg-[#FE6448] bg-opacity-70"></div>
        </div>

        {/* Navigation */}
        {/* Navigation */}
        <ResponsiveNavigation
          links={[
            { href: "/", label: "Home" },
            { href: "/registration", label: "Registration" },
            { href: "/about", label: "About" },
            { href: "/program", label: "Program" },
            { href: "/speakers", label: "Speakers", isActive: true },
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
            Keynote Speakers
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Visionary Voices in Medical Technology
          </p>
        </div>
      </section>

      {/* Speakers Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              World-Renowned Pioneers
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858] mb-4">
              We are honored to host a lineup of world-renowned pioneers and thought leaders.
            </p>
            <p className="text-sm font-roboto-condensed text-[#FE6448] uppercase">
              Final confirmations pending - Updated monthly
            </p>
          </div>

          {/* Featured Speakers Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
            {speakersData.map((speaker, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <img
                  src={speaker.imageSrc}
                  alt={speaker.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-orbitron font-bold text-[#0D1858] mb-2">{speaker.name}</h3>
                  {speaker.title && (
                    <p className="text-[#FE6448] font-roboto-condensed font-semibold text-sm mb-1">{speaker.title}</p>
                  )}
                  {speaker.affiliation && (
                    <p className="text-[#85AFFB] font-roboto-condensed text-sm">{speaker.affiliation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Speaker Details */}
      {selectedSpeaker && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/3 bg-gradient-to-br from-[#0D1858] to-[#85AFFB]">
                <img
                  src={selectedSpeaker.imageSrc}
                  alt={selectedSpeaker.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-orbitron font-bold text-[#0D1858] mb-3">
                  {selectedSpeaker.name}
                </h2>
                
                {selectedSpeaker.title && (
                  <p className="text-xl font-roboto-condensed font-semibold text-[#FE6448] mb-2">
                    {selectedSpeaker.title}
                  </p>
                )}
                
                {selectedSpeaker.affiliation && (
                  <p className="text-lg font-roboto-condensed font-semibold text-[#85AFFB] mb-6">
                    {selectedSpeaker.affiliation}
                  </p>
                )}

                <div className="border-t-2 border-[#FE6448] pt-6">
                  <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-4">Biography</h3>
                  <p className="text-gray-700 font-roboto-condensed leading-relaxed text-justify">
                    {selectedSpeaker.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
