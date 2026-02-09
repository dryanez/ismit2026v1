import Image from "next/image"

interface Speaker {
  id: string
  name: string
  title: string
  organization: string
  bio: string
  image: string
  expertise: string[]
  country: string
}

interface SpeakerGridProps {
  speakers?: Speaker[]
  className?: string
}

// Moderators sorted alphabetically by last name
const defaultSpeakers: Speaker[] = [
  {
    id: "1",
    name: "Prof. Michele Diana",
    title: "Professor of Surgery",
    organization: "Hôpitaux Universitaires de Genève",
    bio: "Leading expert in minimally invasive surgery and surgical innovation with extensive experience in advanced surgical techniques.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Michele%20Diana%20%28-gADYWn1apEZMG5SChKhUNvZlJcVlHw.png",
    expertise: ["Minimally Invasive Surgery", "Surgical Innovation", "Medical Technology"],
    country: "Switzerland",
  },
  {
    id: "6",
    name: "Prof. Andrew A. Gumbs",
    title: "Professor of Surgery",
    organization: "Hôpital Antoine Béclère",
    bio: "Expert in advanced surgical techniques and medical innovation with focus on precision surgery and patient outcomes.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Andrew%20A.%20Gumbs-EegVpOfe7Lw9HNCgzkuzlmi30zJJ9L.jpeg",
    expertise: ["Precision Surgery", "Medical Innovation", "Patient Care"],
    country: "France",
  },
  {
    id: "2",
    name: "Prof. Dr. Michael Huth",
    title: "Professor",
    organization: "University of Technology Nuremberg",
    bio: "Renowned expert in medical technology and engineering with focus on innovative healthcare solutions.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof_Dr_Huth_.jpg-oGjDhaAj1EG5CRsUdBm1IY6sDOuLiz.jpeg",
    expertise: ["Medical Technology", "Healthcare Engineering", "Innovation"],
    country: "Germany",
  },
  {
    id: "3",
    name: "Prof. Dr. Jens Jordan",
    title: "Professor",
    organization: "German Aerospace Center (DLR)",
    bio: "Pioneer in aerospace medicine and medical technology applications with extensive research in space medicine.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Dr.%20Jens%20Jordan%20-o8lUhoIn7Wk5LmtX0dLviyqreZSIJ6.jpeg",
    expertise: ["Aerospace Medicine", "Medical Technology", "Space Medicine"],
    country: "Germany",
  },
  {
    id: "5",
    name: "Prof. Axel Krieger",
    title: "Professor",
    organization: "Johns Hopkins University",
    bio: "Leading researcher in robotic surgery and autonomous surgical systems with groundbreaking contributions to the field.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Axel%20Krieger%20%28-KnhGjOD3hjoTuUSeC3rRc2AYHJXofu.jpeg",
    expertise: ["Robotic Surgery", "Autonomous Systems", "Surgical Robotics"],
    country: "United States",
  },
  {
    id: "4",
    name: "Prof. Dr. Nassir Navab",
    title: "Professor",
    organization: "Technical University Munich (TUM)",
    bio: "Internationally recognized expert in computer-assisted surgery and medical imaging technologies.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Dr.%20Nassir%20Navab%20-kR1BYcKdiwGJMZogcP1ETY5jV7gmpt.jpeg",
    expertise: ["Computer-Assisted Surgery", "Medical Imaging", "AI in Medicine"],
    country: "Germany",
  },
  {
    id: "7",
    name: "Prof. Krzysztof Zieniewicz",
    title: "Professor of Surgery",
    organization: "Medical University of Warsaw",
    bio: "Distinguished surgeon and researcher specializing in advanced surgical procedures and medical education.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prof.%20Krzysztof%20Zieniewicz-ey2XqvYZhwU7L89UPp9vqq3vCedQpB.jpeg",
    expertise: ["Advanced Surgery", "Medical Education", "Clinical Research"],
    country: "Poland",
  },
]

export function SpeakerGrid({ speakers = defaultSpeakers, className }: SpeakerGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${className}`}>
      {speakers.map((speaker) => (
        <div key={speaker.id} className="group">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={speaker.image || "/placeholder.svg"}
                alt={speaker.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{speaker.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-1">{speaker.title}</p>
                <p className="text-slate-600 text-sm mb-2">{speaker.organization}</p>
                <p className="text-blue-500 text-xs font-medium">{speaker.country}</p>
              </div>
              <p className="text-slate-700 text-sm mb-4 line-clamp-3">{speaker.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {speaker.expertise.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
