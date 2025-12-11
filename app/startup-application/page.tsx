"use client"

import type React from "react"

import { useState } from "react"
import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"
import Footer from "@/components/Footer"

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

export default function StartupApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    startupName: "",
    industryFocus: "",
    developmentStage: "",
    elevatorPitch: "",
    termsAccepted: false,
  })
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert("Video file must be less than 100MB")
        return
      }
      // Check file type
      if (!file.type.startsWith("video/")) {
        alert("Please upload a video file")
        return
      }
      setVideoFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitFormData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value.toString())
      })
      if (videoFile) {
        submitFormData.append("video", videoFile)
      }

      const response = await fetch("/api/startup-application", {
        method: "POST",
        body: submitFormData,
      })

      if (response.ok) {
        setSubmitSuccess(true)
      } else {
        throw new Error("Submission failed")
      }
    } catch (error) {
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div
        className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white flex items-center justify-center`}
      >
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <h2 className="text-2xl font-orbitron font-bold uppercase mb-4">Application Submitted Successfully!</h2>
            <p className="font-roboto-condensed text-lg">
              Thank you for your submission to the Start-up Grand Prize – Future Disruptors Contest. A confirmation
              email has been sent to your registered email address.
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
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2eniT8eW-yIJxNvDrn9TosGzHhFJMfYWVtWYOTq.jpeg"
            alt="Medical professionals in geometric low-poly style"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FE6448] via-[#FE6448]/90 to-[#0D1858]/80"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-8">
          <div className="bg-[#0D1858] rounded-lg px-8 py-3">
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
              <Link href="/submissions" className="text-[#85AFFB] text-sm font-orbitron font-black uppercase">
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
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black text-white text-shadow-lg uppercase mb-4">
            Start-up Grand Prize
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-4">
            Future Disruptors Contest
          </p>
          <p className="text-lg md:text-xl font-roboto-condensed font-light text-white">
            Will be granted during the congress
          </p>
        </div>
      </section>

      {/* Evaluation Process Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Evaluation Criteria
            </h2>
            <p className="text-lg font-roboto-condensed text-[#85AFFB] max-w-3xl mx-auto">
              Applications will be evaluated based on the following criteria by our panel of expert judges
            </p>
          </div>

          <div className="bg-white rounded-lg p-8">
            <div className="space-y-6">
				<h3 className="text-lg font-orbitron font-bold text-[#0D1858] uppercase mb-4">
                    Applications will be assessed according to the following criteria:
                  </h3>
                  <ul className="space-y-3 font-roboto-condensed text-[#0D1858]">
                    <li>• Innovation</li>
                    <li>• Market Potential</li>
                    <li>• Team & Execution</li>
                    <li>• Impact & Vision</li>
                  </ul>
            </div>
          </div>
			<div className="mt-8 p-6 bg-[#85AFFB] rounded-lg text-center">
            <p className="text-white font-roboto-condensed">
              ✨{" "}
              <strong>
                The best startup, as selected by the Scientific Committee, will be honoured with the official Start-up Grand Prize at the congress closing ceremony.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* How to Submit Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-8">How to Submit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#85AFFB] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">1</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Complete Form</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Fill out the application form with your personal and startup information
              </p>
            </div>
            <div className="bg-[#FE6448] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">2</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Upload Video</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Upload your 1-minute elevator pitch video directly through the form
              </p>
            </div>
            <div className="bg-[#0D1858] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">3</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Get Confirmation</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Receive email confirmation and await evaluation results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Application Form
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858] mb-8">
              Submit your startup for the Future Disruptors Contest
            </p>
            <div className="bg-[#FE6448] text-white rounded-lg p-4 inline-block">
              <p className="font-orbitron font-bold uppercase">Deadline: 30 June 2026</p>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Organization/Company
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
              </div>
            </div>

            {/* Startup Information */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">Startup Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Startup Name *
                  </label>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Industry Focus *
                  </label>
                  <select
                    name="industryFocus"
                    value={formData.industryFocus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  >
                    <option value="">Select Industry Focus</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="robotics">Robotics</option>
                    <option value="surgery">Surgery Technology</option>
                    <option value="medtech">Medical Technology</option>
                    <option value="digital-health">Digital Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Stage of Development *
                  </label>
                  <select
                    name="developmentStage"
                    value={formData.developmentStage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  >
                    <option value="">Select Development Stage</option>
                    <option value="concept">Concept/Idea</option>
                    <option value="prototype">Prototype</option>
                    <option value="mvp">MVP/Beta</option>
                    <option value="market">Market Ready</option>
                    <option value="scaling">Scaling</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Elevator Pitch */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">Elevator Pitch</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    1000-Word Elevator Pitch *
                  </label>
                  <p className="text-sm font-roboto-condensed text-gray-600 mb-3">
                    Describe your startup, the problem you're solving, your solution, market opportunity, and why you
                    should win.
                  </p>
                  <textarea
                    name="elevatorPitch"
                    value={formData.elevatorPitch}
                    onChange={handleInputChange}
                    required
                    rows={12}
                    maxLength={1000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448] resize-vertical"
                    placeholder="Tell us about your startup..."
                  />
                  <p className="text-sm text-gray-500 mt-2">{formData.elevatorPitch.length}/1000 words</p>
                </div>
              </div>
            </div>

            {/* Video Upload */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">Video Upload</h3>
              <div className="space-y-4 font-roboto-condensed">
                <p className="text-lg font-semibold">Upload your 1-minute elevator pitch video:</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full px-4 py-3 bg-white text-[#0D1858] rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                  {videoFile && (
                    <p className="text-sm mt-2">
                      Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>
                <p className="text-sm">
                  <strong>Video Requirements:</strong> MP4 format preferred, maximum 1 minute duration, maximum 100MB
                  file size
                </p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-[#85AFFB] focus:ring-[#85AFFB] border-gray-300 rounded"
                />
                <label className="text-sm font-roboto-condensed text-[#0D1858]">
                  I agree to the terms and conditions of the Start-up Grand Prize contest and confirm that all
                  information provided is accurate. *
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
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}