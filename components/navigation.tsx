"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-4">
      <div className="flex justify-between items-center w-full">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-md bg-[#FE6448] mr-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <img src="/ISMIT REAL LOGO 1.svg" alt="iSMIT Logo" className="w-16 h-16 object-contain" />
        </div>
        {/* Desktop Logo - Centered */}
        <div className="hidden md:flex flex-1 justify-center">
            <img src="/ISMIT REAL LOGO 1.svg" alt="iSMIT Logo" className="w-24 h-24 object-contain" />
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex bg-[#FE6448] rounded-lg px-8 py-3 w-full flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 mt-4">
        <Link href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Home</Link>
        <Link href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Registration</Link>
        <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">About</Link>
        <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Program</Link>
        <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Speakers</Link>
        <Link href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Submissions</Link>
        <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Pavilions</Link>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FE6448] rounded-lg px-8 py-3 w-full mt-2">
          <div className="flex flex-col items-center gap-4 p-4">
            <Link href="/" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Home</Link>
            <Link href="/registration" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Registration</Link>
            <Link href="/about" className="text-white text-sm font-orbitron font-black uppercase hover:underline">About</Link>
            <Link href="/program" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Program</Link>
            <Link href="/speakers" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Speakers</Link>
            <Link href="/submissions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Submissions</Link>
            <Link href="/pavilions" className="text-white text-sm font-orbitron font-black uppercase hover:underline">Pavilions</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
