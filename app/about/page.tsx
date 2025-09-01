import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"

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

export default function About() {
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
          <div className="absolute inset-0 bg-[#85AFFB] bg-opacity-70"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#0D1858] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <Link href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </Link>
              <Link href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Registration
              </Link>
              <Link href="/about" className="text-[#85AFFB] text-sm font-orbitron font-black uppercase">
                About
              </Link>
              <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Program
              </Link>
              <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </Link>
              <Link href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Submissions
              </Link>
              <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Pavilions
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-8">
            About the Congress
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-8">
            Shaping the Future of Healthcare Since 1988
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-[#0D1858] font-roboto-condensed text-lg space-y-6">
              <p>
                The International Society for Medical Innovation and Technology (iSMIT) is dedicated to advancing
                surgical innovation, technology integration, and interdisciplinary collaboration in medicine.
                Established in 1988, iSMIT has grown into a globally recognized platform for surgeons, biomedical
                engineers, researchers, and industry leaders to share knowledge, foster collaboration, and shape the
                future of healthcare. Its annual congress represents the culmination of decades of commitment to
                excellence in surgical innovation.
              </p>
              <p>
                The mission of iSMIT 2026 is to serve as the premier forum for the exchange of cutting-edge scientific
                knowledge and clinical expertise at the intersection of surgery, biomedical engineering, artificial
                intelligence, robotics, and digital health. The congress aims to bridge the gap between emerging
                technologies and their practical application in clinical settings, fostering transformative solutions
                that enhance patient outcomes and advance surgical care worldwide.
              </p>
            </div>
            <div className="bg-[#FE6448] rounded-lg p-8 text-white font-roboto-condensed text-lg space-y-6">
              <p>
                One of the primary goals of the iSMIT 2026 Congress is to promote interdisciplinary dialogue among
                experts from diverse fields, including surgeons, computer scientists, engineers, and entrepreneurs. By
                facilitating collaboration between academia, industry, and clinical practice, iSMIT seeks to
                accelerate the translation of innovation into tangible benefits for patients and healthcare systems.
              </p>
              <p>
                The congress also aims to highlight the latest developments in medical technology, provide training
                opportunities for young professionals, and foster networking among stakeholders from different sectors.
              </p>
            </div>
          </div>

          <div className="bg-[#0D1858] rounded-lg p-8 text-white mb-16">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold uppercase text-center mb-8">Our History</h2>
            <p className="text-lg font-roboto-condensed">
              The history of iSMIT reflects a legacy of pioneering innovation in minimally invasive and robotic
              surgery. Since its inception, iSMIT has hosted annual conferences that have become the cornerstone of the
              society's activities, attracting renowned speakers and participants from around the world. Each congress
              builds upon the successes of its predecessors, offering a dynamic scientific programme tailored to the
              evolving needs of the medical community. From the first conferences that focused on the early days of
              endoscopic surgery to the present emphasis on artificial intelligence and digital health, iSMIT has
              remained at the forefront of medical technology.
            </p>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">Our Motto</h2>
            <div className="bg-[#85AFFB] rounded-lg p-8 text-white">
              <p className="text-xl font-roboto-condensed mb-6">"Disruptive AGE in Medical Technology"</p>
              <p className="text-lg font-roboto-condensed">
                The motto of the iSMIT 2026 Congress, "Disruptive AGE in Medical Technology," encapsulates the
                transformative impact of Artificial Intelligence, Generation of new materials, and Emerging robotic
                technologies that are revolutionizing surgical practice and healthcare delivery. The congress will
                explore the integration of artificial intelligence in diagnostics and decision-making, the rise of
                surgical robotics and humanoid robots, and the application of immersive technologies such as augmented
                and virtual reality in medical education and preoperative planning. It will also address the
                development of new materials that enhance surgical performance and patient safety.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase text-center mb-8">
              Congress Leadership
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#FE6448] rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-orbitron font-bold uppercase mb-2">Prof. Dr. Konrad Karcz</h3>
                <p className="font-roboto-condensed">President of iSMIT</p>
              </div>
              <div className="bg-[#85AFFB] rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-orbitron font-bold uppercase mb-2">Prof. Dr. Denis Ehrl</h3>
                <p className="font-roboto-condensed">Congress President</p>
              </div>
              <div className="bg-[#0D1858] rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-orbitron font-bold uppercase mb-2">Prof. Dr. Andrew Gumbs</h3>
                <p className="font-roboto-condensed">Congress Co-President</p>
              </div>
              <div className="bg-[#FE6448] rounded-lg p-6 text-white text-center">
                <h3 className="text-xl font-orbitron font-bold uppercase mb-2">Prof. Dr. Zbigniew Nawrat</h3>
                <p className="font-roboto-condensed">Congress Co-President</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}