"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
  isActive?: boolean; // Optional prop to highlight the active link
}

interface ResponsiveNavigationProps {
  links: NavLink[];
  logoSrc: string;
  logoAlt: string;
  desktopBgClass: string;
  mobileBgClass: string;
  textColorClass: string;
  activeLinkClass: string;
}

export default function ResponsiveNavigation({
  links,
  logoSrc,
  logoAlt,
  desktopBgClass,
  mobileBgClass,
  textColorClass,
  activeLinkClass,
}: ResponsiveNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 px-4 md:px-8 lg:px-36 pt-0">
      <div className="flex justify-between items-center w-full">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center md:hidden justify-between w-full">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded-md bg-[#FE6448] mr-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <img src={logoSrc} alt={logoAlt} className="w-20 h-20 object-contain" />
        </div>
        {/* Desktop Logo - Centered */}
        <div className="hidden md:flex ml-auto">
            <img src={logoSrc} alt={logoAlt} className="w-24 h-24 object-contain" />
        </div>
      </div>
      {/* Desktop Menu */}
      <div className={`hidden md:flex ${desktopBgClass} rounded-lg px-8 py-3 w-full flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8 mt-0`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${textColorClass} text-sm font-orbitron font-black uppercase hover:underline ${link.isActive ? activeLinkClass : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden ${mobileBgClass} rounded-lg px-8 py-3 w-full mt-2`}>
          <div className="flex flex-col items-center gap-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${textColorClass} text-sm font-orbitron font-black uppercase hover:underline ${link.isActive ? activeLinkClass : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}