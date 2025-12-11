"use client";

import Link from "next/link";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[50vh]"
        style={{
          backgroundImage: "url('/medical-conference-hero-background.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <ResponsiveNavigation
          links={[
            { href: "/", label: "Home" },
            { href: "/registration", label: "Registration" },
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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white text-shadow-lg uppercase">
            Impressum
          </h1>
          <p className="text-xl md:text-2xl font-roboto-condensed font-medium text-white uppercase mt-4">
            Legal Notice
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Angaben gemäß § 5 TMG
            </h2>
            
            <div className="space-y-6 text-[#0D1858] font-roboto-condensed">
              <div>
                <h3 className="font-bold text-lg mb-2">Veranstalter:</h3>
                <p>iSMIT 2026 – 37th Annual Congress</p>
                <p>International Society for Medical Innovation and Technology</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Kongress- und Projektmanagement / Organizer:</h3>
                <p><strong>projektart – Studio Karlsruhe</strong></p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Kontakt:</h3>
                <p>E-Mail: <a href="mailto:ismit2026@projektart.eu" className="text-[#FE6448] underline hover:text-[#0D1858]">ismit2026@projektart.eu</a></p>
                <p>Website: <a href="https://www.projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline hover:text-[#0D1858]">www.projektart.eu</a></p>
                <p>Instagram: <a href="https://www.instagram.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline hover:text-[#0D1858]">@projektart.eu</a></p>
                <p>Facebook: <a href="https://www.facebook.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline hover:text-[#0D1858]">@projektart.eu</a></p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Inhaltlich Verantwortlich
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>Gemäß § 6 MDStV (Mediendienste-Staatsvertrag):</p>
              <p className="font-bold">Prof. Dr. Konrad Karcz</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Design & Development
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>Design: Gabriela Wiackowska, Wilson Ortiz</p>
              <p>Technical Implementation: iSMIT 2026 Development Team</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Haftungsausschluss (Disclaimer)
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <div>
                <h3 className="font-bold mb-2">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                  Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als 
                  Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                  des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0D1858] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-orbitron font-bold uppercase mb-6">
              English Version
            </h2>
            
            <div className="space-y-4 font-roboto-condensed">
              <p>
                <strong>Information according to § 5 TMG:</strong>
              </p>
              <p>
                The information provided on this website is for general informational purposes only and does not 
                constitute legal or professional advice. All information is regularly updated and supplemented with 
                the utmost care. However, no guarantee can be given for the accuracy or completeness of the information 
                provided, as changes may occur in the meantime.
              </p>
              <p>
                The reproduction or distribution of the content on this website, as well as the use of any images, 
                requires the prior written consent of the persons named in this legal notice (Impressum).
              </p>
              <p>
                Personal data provided during your visit to our website will be stored exclusively for the purpose 
                of processing your request, in compliance with applicable data protection laws.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block bg-[#FE6448] text-white px-8 py-4 text-xl font-orbitron font-black uppercase rounded-lg hover:bg-[#0D1858] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
