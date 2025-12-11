import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0D1858] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-white font-roboto-condensed text-sm mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/Press/buttons/Instagram.svg" alt="Instagram" className="w-8 h-8 object-contain" />
              <img src="/Press/buttons/Linkedin.svg" alt="LinkedIn" className="w-7 h-7 object-contain" />
              <div className="font-roboto-condensed font-black text-lg">MedTube</div>
            </div>
            <h4 className="font-orbitron font-black text-sm mb-1">iSMIT 2026</h4>
            <p className="font-light lowercase">
              37th World Congress of the International Society for Medical Innovation and Technology
            </p>
          </div>

          <div>
            <h4 className="font-orbitron font-black text-sm mb-3">LEGAL</h4>
            <div className="space-y-2">
              <Link href="/impressum" className="block font-light hover:text-[#FE6448] transition-colors">
                Impressum
              </Link>
              <Link href="/privacy-policy" className="block font-light hover:text-[#FE6448] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-orbitron font-black text-sm mb-3">CONTACT</h4>
            <p className="font-light mb-2">
              <strong>Kongress- und Projektmanagement:</strong><br />
              projektart – Studio Karlsruhe
            </p>
            <p className="font-light mb-2">
              E-Mail: <a href="mailto:ismit2026@projektart.eu" className="hover:text-[#FE6448]">ismit2026@projektart.eu</a>
            </p>
            <p className="font-light mb-2">
              Web: <a href="https://www.projektart.eu" target="_blank" rel="noopener noreferrer" className="hover:text-[#FE6448]">www.projektart.eu</a>
            </p>
            <div className="flex gap-2 mt-2">
              <a href="https://www.instagram.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="hover:text-[#FE6448]">
                Instagram
              </a>
              <span>|</span>
              <a href="https://www.facebook.com/projektart.eu" target="_blank" rel="noopener noreferrer" className="hover:text-[#FE6448]">
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-orbitron font-black text-sm mb-3">QUICK LINKS</h4>
            <div className="space-y-2">
              <Link href="/registration" className="block font-light hover:text-[#FE6448] transition-colors">
                Registration
              </Link>
              <Link href="/program" className="block font-light hover:text-[#FE6448] transition-colors">
                Program
              </Link>
              <Link href="/speakers" className="block font-light hover:text-[#FE6448] transition-colors">
                Speakers
              </Link>
              <Link href="/submissions" className="block font-light hover:text-[#FE6448] transition-colors">
                Submissions
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-white text-xs font-roboto-condensed border-t border-white/20 pt-6">
          <p className="mb-2">
            © 2026 iSMIT - International Society for Medical Innovation and Technology | 
            Inhaltlich Verantwortliche gemäß §6 MDStV: Konrad Karcz | 
            Design: Gabriela Wiackowska, Wilson Ortiz
          </p>
        </div>
      </div>
    </footer>
  );
}
