"use client";

import Link from "next/link";
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl font-roboto-condensed font-medium text-white uppercase mt-4">
            Datenschutzerklärung
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              1. Datenschutz auf einen Blick
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <h3 className="font-bold text-lg">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen 
                Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz 
                entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              2. Datenerfassung auf dieser Website
            </h2>
            
            <div className="space-y-6 text-[#0D1858] font-roboto-condensed">
              <div>
                <h3 className="font-bold text-lg mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                  können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                  z.B. um Daten handeln, die Sie in ein Kontaktformular oder Registrierungsformular eingeben.
                </p>
                <p className="mt-2">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
                  Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                  oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
                  haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
                </p>
              </div>
            </div>
          </div>

          {/* Registration Data */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              3. Registrierung und Anmeldung
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Bei der Registrierung für den iSMIT 2026 Kongress erheben wir folgende personenbezogene Daten:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vor- und Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Institution/Affiliation</li>
                <li>Akademischer Titel (optional)</li>
                <li>Land</li>
                <li>Telefonnummer (optional)</li>
                <li>Rechnungsadresse (bei kostenpflichtigen Tickets)</li>
              </ul>
              <p className="mt-4">
                Diese Daten werden ausschließlich zur Durchführung der Registrierung, zur Ausstellung von Tickets 
                und zur Kommunikation bezüglich des Kongresses verwendet.
              </p>
            </div>
          </div>

          {/* Payment Data */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              4. Zahlungsdaten
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Für die Zahlungsabwicklung nutzen wir externe Zahlungsdienstleister (z.B. SumUp). Bei der 
                Zahlung werden Ihre Zahlungsdaten direkt an den jeweiligen Zahlungsdienstleister übermittelt. 
                Wir selbst speichern keine vollständigen Kreditkartendaten.
              </p>
              <p>
                Die Verarbeitung der Zahlungsdaten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO 
                (Vertragserfüllung).
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              5. Cookies
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem 
                Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und 
                sicherer zu machen.
              </p>
              <p>
                Einige Cookies sind "Session-Cookies." Solche Cookies werden nach Ende Ihrer Browser-Sitzung 
                von selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese 
                selbst löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              6. Ihre Rechte (GDPR/DSGVO)
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Recht auf Auskunft:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
                <li><strong>Recht auf Berichtigung:</strong> Sie können die Berichtigung unrichtiger Daten verlangen</li>
                <li><strong>Recht auf Löschung:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
                <li><strong>Recht auf Einschränkung:</strong> Sie können die Einschränkung der Verarbeitung verlangen</li>
                <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem strukturierten Format erhalten</li>
                <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen</li>
                <li><strong>Beschwerderecht:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              7. Datensicherheit
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) 
                in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt 
                wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung.
              </p>
              <p>
                Wir bedienen uns geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten 
                gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung 
                oder gegen den unbefugten Zugriff Dritter zu schützen.
              </p>
            </div>
          </div>

          {/* Third Party Services */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              8. Drittanbieter-Dienste
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Auf unserer Website werden folgende Drittanbieter-Dienste eingesetzt:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Zahlungsdienstleister:</strong> SumUp (für Zahlungsabwicklung)</li>
                <li><strong>Hosting:</strong> Vercel (für Website-Hosting)</li>
                <li><strong>E-Mail-Versand:</strong> SendGrid (für Transaktions-E-Mails)</li>
              </ul>
              <p className="mt-4">
                Diese Dienste können Daten in Ländern außerhalb der EU/EWR verarbeiten. Wir stellen sicher, 
                dass entsprechende Datenschutzvereinbarungen getroffen wurden.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              9. Speicherdauer
            </h2>
            
            <div className="space-y-4 text-[#0D1858] font-roboto-condensed">
              <p>
                Wir speichern Ihre personenbezogenen Daten nur so lange, wie dies für die Erfüllung der 
                Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorsehen.
              </p>
              <p>
                Registrierungsdaten werden für die Dauer des Kongresses und bis zu 2 Jahre danach für 
                statistische Auswertungen und zur Kontaktpflege gespeichert, sofern Sie nicht eine 
                vorzeitige Löschung verlangen.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-[#0D1858] rounded-lg p-8 text-white mb-8">
            <h2 className="text-2xl font-orbitron font-bold uppercase mb-6">
              10. Kontakt / Contact
            </h2>
            
            <div className="space-y-4 font-roboto-condensed">
              <p>
                Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:
              </p>
              
              <div className="mb-4">
                <p className="font-bold mb-2">Kongress- und Projektmanagement / Organizer:</p>
                <p><strong>projektart – Studio Karlsruhe</strong></p>
                <p>E-Mail: <a href="mailto:ismit2026@projektart.eu" className="text-[#FE6448] underline">ismit2026@projektart.eu</a></p>
                <p>Website: <a href="https://www.projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline">www.projektart.eu</a></p>
                <p>Instagram: <a href="https://www.instagram.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline">@projektart.eu</a></p>
                <p>Facebook: <a href="https://www.facebook.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="text-[#FE6448] underline">@projektart.eu</a></p>
              </div>

              <p className="mt-6 pt-6 border-t border-white/20">
                <strong>English Version:</strong><br />
                For all privacy-related inquiries, please contact us at ismit2026@projektart.eu. 
                You have the right to access, rectify, delete, restrict processing, and port your data. 
                You can also withdraw consent and file a complaint with a supervisory authority.
              </p>
            </div>
          </div>

          <div className="bg-[#FE6448] rounded-lg p-6 text-white text-center">
            <p className="font-roboto-condensed text-sm">
              <strong>Stand / Last Updated:</strong> Dezember 2025 / December 2025
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block bg-[#0D1858] text-white px-8 py-4 text-xl font-orbitron font-black uppercase rounded-lg hover:bg-[#FE6448] transition-colors"
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
