import type React from "react"
import type { Metadata } from "next"
import { Roboto_Condensed, Orbitron } from "next/font/google"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "iSMIT 2026 - 37th World Congress",
  description: "19-21 November 2026 Nürnberg, Germany - Disruptive AGE in Medical Technology",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} ${orbitron.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
