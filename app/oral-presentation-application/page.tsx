"use client"

import type React from "react"

import { Roboto_Condensed, Orbitron } from "next/font/google"
import Link from "next/link"
import { useState } from "react"

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

export default function OralPresentationApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div
        className={`${robotoCondensed.variable} ${orbitron.variable} min-h-screen bg-white flex items-center justify-center`}
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-orbitron font-bold text-[#0D1858] mb-4">Application Submitted!</h1>
          <p className="text-lg font-roboto-condensed text-[#0D1858] mb-6">
            Your oral presentation abstract has been submitted successfully. You will receive a confirmation email
            shortly.
          </p>
          <Link
            href="/submissions"
            className="bg-[#FE6448] text-white px-8 py-3 rounded-lg font-orbitron font-bold uppercase hover:bg-[#e55a42] transition-colors"
          >
            Back to Submissions
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
            Oral Spotlights
          </h1>
          <p className="text-xl md:text-3xl font-roboto-condensed font-medium text-white uppercase mb-4">
            Best Presentation Award Will Be Granted During The Congress
          </p>
          <p className="text-lg md:text-xl font-roboto-condensed font-light text-white">
            Present your research findings in a focused 10-minute presentation
          </p>
        </div>
      </section>

      {/* Evaluation Process Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-6">
              Evaluation Process
            </h2>
            <p className="text-lg font-roboto-condensed text-[#85AFFB] max-w-3xl mx-auto">
              All accepted presentations will be evaluated by a cloud-connected scientific jury desk during the congress. The jury will have access to replay and analyse every presentation on demand.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8">
            <div className="space-y-6">
				<h3 className="text-lg font-orbitron font-bold text-[#0D1858] uppercase mb-4">
                    Presentations will be assessed according to the following criteria:
                  </h3>
                  <ul className="space-y-3 font-roboto-condensed text-[#0D1858]">
                    <li>• Confirmation of acceptance for presentation – abstract approved by the Scientific Committee</li>
                    <li>• Relevance of the topic to the congress – clear alignment with congress themes</li>
                    <li>• Clarity of the hypothesis – well-defined research question or project aim</li>
                    <li>• Methodological rigour – robustness and scientific quality of the methods used</li>
                    <li>• Significance of the results – importance and impact for research or clinical practice</li>
                    <li>• Potential for future research – contribution to ongoing or upcoming studies</li>
                    <li>• Potential for future product or clinical application – feasibility of translation into tools or practice</li>
                    <li>• Clarity of presentation and delivery – logical structure, comprehensibility, and effective delivery</li>
                    <li>• Confirmation of paid participation fee – formal eligibility requirement</li>
                  </ul>
            </div>
          </div>
			<div className="mt-8 p-6 bg-[#85AFFB] rounded-lg text-center">
            <p className="text-white font-roboto-condensed">
              ✨{" "}
              <strong>
                The best presentation, as selected by the Scientific Committee, will be honoured with the official Best
                Presentation Award at the congress closing ceremony.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* How to Submit Section */}
      <section className="bg-[#0D1858] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-white uppercase mb-8">How to Submit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#85AFFB] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">1</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Complete Registration</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Complete the individual online registration form and obtain your registration number
              </p>
            </div>
            <div className="bg-[#FE6448] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">2</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Submit Abstract</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Submit your ≤400 word abstract via email to oralpresentation@ismit2026.com
              </p>
            </div>
            <div className="bg-[#85AFFB] rounded-lg p-6">
              <div className="text-3xl font-orbitron font-bold text-white mb-4">3</div>
              <h3 className="text-lg font-orbitron font-bold text-white uppercase mb-2">Await Confirmation</h3>
              <p className="text-sm font-roboto-condensed text-white">
                Receive acceptance notification and prepare your 10-minute presentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">
              Abstract Submission Form
            </h2>
            <p className="text-lg font-roboto-condensed text-[#0D1858]">
              Submit your abstract for oral presentation consideration
            </p>
          </div>

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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your registration number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                  />
                </div>
              </div>
            </div>

            {/* Abstract Information */}
            <div className="bg-[#f8f9fa] rounded-lg p-8">
              <h3 className="text-xl font-orbitron font-bold text-[#0D1858] uppercase mb-6">Abstract Information</h3>
              <div>
                <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                  Presentation Title *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448]"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-roboto-condensed font-semibold text-[#0D1858] mb-2">
                  Abstract (≤400 words) *
                </label>
                <p className="text-sm font-roboto-condensed text-gray-600 mb-2">
                  Include: Authors, Institution(s), Title, Hypothesis/Objective, Core Methods, Headline Results, Projected
                  Impact
                </p>
                <textarea
                  required
                  rows={12}
                  maxLength={2000}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6448] resize-vertical"
                  placeholder="Enter your abstract here..."
                />
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-[#FE6448] text-white rounded-lg p-6">
              <h3 className="text-lg font-orbitron font-bold uppercase mb-2">Important Notice</h3>
              <p className="text-sm font-roboto-condensed mb-2">
                <strong>Submission Deadline:</strong> 30 June 2026
              </p>
              <p className="text-sm font-roboto-condensed">
                Abstracts must be submitted and must include the registration number
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FE6448] text-white px-12 py-4 rounded-lg font-orbitron font-bold uppercase text-lg hover:bg-[#e55a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Abstract"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
