"use client"

import type React from "react"

import { useState } from "react"
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

export default function VideoPosterApplication() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    position: "",
    country: "",
    projectTitle: "",
    hypothesis: "",
    methods: "",
    results: "",
    videoFile: null as File | null,
    agreeTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, videoFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value as string | Blob)
        }
      })

      const response = await fetch("/api/video-poster-application", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white flex items-center justify-center`}
      >
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <h2 className="text-2xl font-orbitron font-bold uppercase mb-4">Application Submitted Successfully!</h2>
            <p className="font-roboto-condensed text-lg">
              Thank you for your video poster submission. A confirmation email has been sent to your registered email
              address.
            </p>
          </div>
          <Link
            href="/"
            className="bg-[#FE6448] text-white px-8 py-3 rounded-lg font-orbitron font-bold uppercase hover:bg-[#e55a42] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white`}>
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2eniT8eW-yIJxNvDrn9TosGzHhFJMfYWVtWYOTq.jpeg"
            alt="Medical professionals in geometric low-poly style"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0D1858] bg-opacity-80"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#FE6448] rounded-lg px-8 py-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
              <Link href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Home
              </Link>
              <Link
                href="/registration"
                className="text-white text-sm font-orbitron font-black uppercase hover:underline"
              >
                Registration
              </Link>
              <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                About
              </Link>
              <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Program
              </Link>
              <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">
                Speakers
              </Link>
              <Link
                href="/submissions"
                className="text-white text-sm font-orbitron font-black uppercase hover:underline"
              >
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-black text-white text-shadow-lg uppercase mb-4">
            Video Posters
          </h1>
          <p className="text-xl md:text-2xl font-roboto-condensed font-medium text-[#85AFFB] uppercase mb-6">
            Best Video-Poster Award
          </p>
          <p className="text-lg font-roboto-condensed font-medium text-white">Will be granted during the congress</p>
        </div>
      </section>

      {/* Evaluation Criteria Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Evaluation Criteria
            </h2>
            <p className="text-lg text-[#0D1858] font-roboto-condensed max-w-3xl mx-auto">
              Your video poster will be evaluated by our expert panel across four key areas, each weighted equally at
              25%.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-[#FE6448] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-orbitron font-bold text-white">25%</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-3">Scientific Quality</h3>
              <p className="text-[#0D1858] font-roboto-condensed">
                Innovation, methodology, and significance of results
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-[#0D1858] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-orbitron font-bold text-white">25%</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-3">Presentation</h3>
              <p className="text-[#0D1858] font-roboto-condensed">Clarity, structure, and visual communication</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-[#FE6448] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-orbitron font-bold text-white">25%</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-3">Technical Quality</h3>
              <p className="text-[#0D1858] font-roboto-condensed">Video production, audio, and visual elements</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-[#0D1858] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-orbitron font-bold text-white">25%</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-3">Impact & Vision</h3>
              <p className="text-[#0D1858] font-roboto-condensed">Clinical relevance and future potential</p>
            </div>
          </div>

          <div className="mt-12 bg-[#FE6448] rounded-xl p-8 text-center">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-4">🏆 Prize Details</h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <div className="text-3xl font-orbitron font-bold mb-2">Award</div>
                <p className="font-roboto-condensed">Official Best Video-Poster Award</p>
              </div>
              <div>
                <div className="text-3xl font-orbitron font-bold mb-2">Recognition</div>
                <p className="font-roboto-condensed">Ceremony presentation during congress</p>
              </div>
              <div>
                <div className="text-3xl font-orbitron font-bold mb-2">Exposure</div>
                <p className="font-roboto-condensed">Featured in congress proceedings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Assessment Criteria Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Assessment Criteria
            </h2>
            <p className="text-lg font-roboto-condensed text-[#85AFFB] max-w-3xl mx-auto">
              All submissions will be evaluated by our Scientific Committee based on the following criteria
            </p>
          </div>

          <div className="bg-white rounded-lg p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-orbitron font-bold text-[#0D1858] uppercase mb-4">
                    Content & Innovation
                  </h3>
                  <ul className="space-y-3 font-roboto-condensed text-[#0D1858]">
                    <li>• Relevance to congress themes (AI, robotics, surgery, med-tech)</li>
                    <li>• Clarity of hypothesis, objectives, and research question</li>
                    <li>• Methodological soundness and scientific rigor</li>
                    <li>• Significance and novelty of results presented</li>
                    <li>• Innovation and originality of approach</li>
                    <li>• Future potential and clinical application</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-orbitron font-bold text-[#0D1858] uppercase mb-4">
                    Presentation & Quality
                  </h3>
                  <ul className="space-y-3 font-roboto-condensed text-[#0D1858]">
                    <li>• Interdisciplinary value and broader impact</li>
                    <li>• Presentation clarity, structure, and logical flow</li>
                    <li>• Video quality and technical execution</li>
                    <li>• Effective use of visual elements and graphics</li>
                    <li>• Professional delivery and communication skills</li>
                    <li>• Time management within 120-second limit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Submit Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">How to Submit</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-[#85AFFB] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">1</div>
              <h3 className="font-orbitron font-bold text-white mb-2">Register</h3>
              <p className="text-[#0D1858] text-sm">Complete the online registration form below</p>
            </div>
            <div className="bg-[#FE6448] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">2</div>
              <h3 className="font-orbitron font-bold text-white mb-2">Create Video</h3>
              <p className="text-[#0D1858] text-sm">Prepare a 120-second MP4 video with your project details</p>
            </div>
            <div className="bg-[#85AFFB] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">3</div>
              <h3 className="font-orbitron font-bold text-white mb-2">Upload</h3>
              <p className="text-[#0D1858] text-sm">Upload your video file through the form</p>
            </div>
            <div className="bg-[#FE6448] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">4</div>
              <h3 className="font-orbitron font-bold text-white mb-2">Submit</h3>
              <p className="text-[#0D1858] text-sm">Submit before the deadline: 30 June 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase text-center mb-12">
            Video Poster Application Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Institution *</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-6">Project Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">
                    Hypothesis/Objectives *
                  </label>
                  <textarea
                    name="hypothesis"
                    value={formData.hypothesis}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                    placeholder="Clearly state your research question or project goal..."
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Methods *</label>
                  <textarea
                    name="methods"
                    value={formData.methods}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                    placeholder="Describe your methodology and approach..."
                  />
                </div>
                <div>
                  <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">Results *</label>
                  <textarea
                    name="results"
                    value={formData.results}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                    placeholder="Summarize your key findings and results..."
                  />
                </div>
              </div>
            </div>

            {/* Video Upload */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] mb-6">Video Upload</h3>
              <div>
                <label className="block text-[#0D1858] font-roboto-condensed font-semibold mb-2">
                  Video File (MP4, max 120 seconds) *
                </label>
                <input
                  type="file"
                  name="videoFile"
                  onChange={handleFileChange}
                  accept="video/mp4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Please ensure your video is exactly 120 seconds or less and in MP4 format.
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
                <label className="text-[#0D1858] font-roboto-condensed">
                  I agree to the terms and conditions and confirm that I have paid the participation fee. I understand
                  that my video will be evaluated by the Scientific Committee and may be displayed during the congress.
                  *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FE6448] text-white px-12 py-4 rounded-lg font-orbitron font-bold uppercase text-lg hover:bg-[#e55a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Video Poster Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
