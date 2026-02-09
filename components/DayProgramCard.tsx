import React from 'react';
import { Roboto_Condensed, Orbitron } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

interface DayProgramCardProps {
  day: number;
  date: string;
  bgColor: string;
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

const DayProgramCard: React.FC<DayProgramCardProps> = ({
  day,
  date,
  bgColor,
  children,
  isActive,
  className,
}) => {
  return (
    <div
      className={`
        ${robotoCondensed.variable} ${orbitron.variable}
        w-full md:w-[615px] relative
        transition-all duration-500 ease-in-out
        ${isActive ? 'z-20' : 'z-10'}
        ${className}
      `}
      style={{
        height: 'auto', // Adjust height dynamically based on content
        minHeight: '499px', // Minimum height to prevent collapse
      }}
    >
      <div className={`w-full h-16 sm:h-11 left-0 top-0 absolute ${bgColor} rounded-[10px]`} />
      <div className="w-full px-4 h-auto left-0 top-[11px] absolute text-center justify-center text-white text-sm md:text-base font-black font-['Orbitron'] uppercase flex items-center justify-center">
        Day {day}: {date}
      </div>
      <div className={`w-full left-0 top-[86px] absolute ${bgColor} rounded-[10px]`} style={{ minHeight: 'calc(100% - 86px)' }} />
      <div className="relative z-10 pt-[86px] pb-4 px-4">
        {children}
      </div>
    </div>
  );
};

export default DayProgramCard;
