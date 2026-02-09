"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProgramItem {
  time?: string
  title: string
  description: string
}

interface ProgramTabsProps {
  className?: string
}

export function ProgramTabs({ className }: ProgramTabsProps) {
  const [activeTab, setActiveTab] = useState("day1")

  const tabContent: Record<string, ProgramItem[]> = {
    day1: [
      {
        title: "Session 1: Autonomous Robotics: From Assistance to Self-Learning Systems",
        description: "Autonomous robotics is rapidly evolving from purely assistive systems toward increasingly adaptive, self-learning technologies. This session explores the transition from human-controlled robotic assistance to semi-autonomous and learning robotic systems, with a particular focus on medical and surgical applications."
      },
      {
        title: "Discussion Panel One: Human Augmentation: Neural Interfaces, Exoskeletons & Bionics",
        description: "Human augmentation represents one of the most transformative frontiers in modern medicine, aiming to restore, enhance, or extend human capabilities through advanced technological integration. This session focuses on neural interfaces, exoskeletons, and bionic systems and explores how these technologies are reshaping rehabilitation, surgery, and long-term patient care."
      },
      {
        title: "Discussion Panel Two: Will AI Replace Doctors – and When?",
        description: "Even if AI outperforms humans in accuracy and efficiency, will patients and society accept medical decisions made without human judgment and empathy? When AI becomes technically superior in certain domains, will clinical responsibility, regulation, and liability still require a human physician in the loop?"
      },
      {
        title: "Session 2: Future Materials: Smart and Regenerative Bio-Hybrid Systems",
        description: "Advances in material science are rapidly transforming medicine, enabling fundamentally new approaches to regeneration, repair, and human–technology integration. This session focuses on the next generation of smart, regenerative, and bio-hybrid materials and their role in shaping future medical therapies and surgical applications."
      },
      {
        title: "Session 3: Ethics & Digital Twins in Medicine",
        description: "The rapid advancement of digital technologies is enabling the creation of digital twins in medicine—virtual representations of patients that integrate clinical data, imaging, physiological signals, and predictive models. This session focuses on the ethical dimensions of digital twins in medicine, exploring how patient-specific virtual models can be developed and used responsibly."
      },
      {
        time: "17:30",
        title: "Presidential Gala Dinner",
        description: "Germanisches Nationalmuseum, Kartäusergasse 1, 90402 Nuremberg"
      }
    ],
    day2: [
      {
        title: "Session 4: From Text and Sensors to Decisions: NLP and Sensor Data in Medicine",
        description: "Clinical decision making is increasingly shaped by the ability to integrate heterogeneous data sources, particularly unstructured clinical text and continuously generated sensor data. This session focuses on how Natural Language Processing (NLP) and sensor-based data together enable more informed, timely, and context-aware clinical decision making."
      },
      {
        title: "Session 5: Computer Vision & 3D Printing: The Next Level",
        description: "Advances in computer vision and 3D printing are reshaping the foundations of digital medicine by enabling a seamless transition from imaging data to physical, patient-specific solutions. This session focuses on next-level computer vision technologies and their integration with artificial intelligence and additive manufacturing."
      },
      {
        title: "Discussion Panel Three: From Algorithms to Responsibility: Defining the Needs of Future Robots",
        description: "Which technical, cognitive, and ethical capabilities future robots must possess to operate safely, reliably, and meaningfully alongside humans. How responsibility, transparency, and human oversight can be embedded into robotic systems as autonomy and intelligence increase."
      },
      {
        title: "Session 6: From Microscale to Metaverse: The Future of Robotic Microsurgery and Precision Surgery",
        description: "Robotic surgery is rapidly evolving across surgical disciplines, from supermicrosurgical procedures requiring extreme precision to large-scale robotic systems in orthopedics and urology. This session explores how advances in robotic assistance, imaging, and artificial intelligence are reshaping surgical practice."
      },
      {
        title: "Session 7: The Importance of Structured Data in Modern Healthcare",
        description: "Healthcare generates vast amounts of data every day — from clinical documentation and imaging to sensor data, genomics, and patient-reported outcomes. This session explores why the transformation of raw and unstructured healthcare data into structured, interoperable formats is a critical prerequisite for modern medicine."
      },
      {
        title: "Workshop One: Mixed & Virtual Reality Experience",
        description: "Mixed and Virtual Reality (MR/VR) technologies are transforming medical education, surgical rehearsal and patient counselling. This 120-minute immersive track features validated MR/VR workflows. Advance registration mandatory; places allocated on a first-come, confirmed basis."
      },
      {
        title: "Workshop Two: Artificial Intelligence - Software Academy",
        description: "This 180-minute intensive track presents the twenty most impactful medical-AI platforms currently in deployment. Advance registration required and limited to twenty-four participants per slot. Please bring a WLAN-enabled laptop and headphones for interactive modules."
      },
      {
        title: "Award Ceremony & Closing",
        description: "iSMIT 2026 Meeting - Award Ceremony and Official Closing"
      }
    ]
  }

  return (
    <div className={className}>
      <div className="flex justify-center mb-8 flex-wrap gap-4">
        <Button
          variant={activeTab === "day1" ? "default" : "outline"}
          onClick={() => setActiveTab("day1")}
          className="px-6 py-3"
        >
          Day 1: Friday
        </Button>
        <Button
          variant={activeTab === "day2" ? "default" : "outline"}
          onClick={() => setActiveTab("day2")}
          className="px-6 py-3"
        >
          Day 2: Saturday
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <h4 className="text-2xl font-bold mb-6 text-slate-800">
            {activeTab === "day1" && "Day 1: Friday"}
            {activeTab === "day2" && "Day 2: Saturday"}
          </h4>

          <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <p className="text-green-800 font-medium">
              🌳 We are going paperless. For every congress participant, we will plant a tree — a tangible contribution to environmental protection.
            </p>
          </div>

          <div className="space-y-6">
            {tabContent[activeTab].map((item, index) => (
              <div key={index} className="border-l-4 border-slate-200 pl-6 hover:border-blue-500 transition-colors">
                {item.time && (
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    {item.time}
                  </p>
                )}
                <p className="text-lg font-bold text-slate-800 mb-2">
                  {item.title}
                </p>
                {item.description && <p className="text-slate-600 mt-1 leading-relaxed">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
