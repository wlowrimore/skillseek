"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const box = {
    position: "absolute",
    inset: 0,
    backgroundColor: "#ffffff",
    borderRadius: "2rem",
    transform: "rotate(45deg)",
  };

  return (
    <div className="fixed inset-0 bg-[url('/splash-screen-bg.webp')] flex flex-col items-center justify-center md:hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center flex-center bg-black/80 border-[3px] border-zinc-400 rounded-2xl">
        <div className="relative top-[30%] left-0 flex items-center justify-center">
          {/* Shapes */}
          <div className="absolute right-[3.5rem] top-[-13rem] w-20 h-20 bg-slate-400 border-[3px] border-zinc-400 rounded-full"></div>
          <div className="absolute left-[9rem] top-[-18rem] w-72 h-72 bg-[#B0CBC7] border-[3px] border-zinc-400 rounded-full"></div>
          <div className="absolute left-[7rem] top-[12rem] w-32 h-32 bg-[#275975] border-[3px] border-zinc-400 rounded-full"></div>
          <div className="absolute right-[6rem] bg-[#F29072] border-[3px] w-64 h-64 border-zinc-400 rounded-2xl rotate-45"></div>
          <div className="absolute right-[7rem] top-[20rem] w-96 h-96 bg-[#F1C7A3] border-[3px] border-zinc-400 rounded-full"></div>
          <div className="absolute left-[2rem] top-[34rem] w-44 h-64 bg-[#51819C] border-[3px] border-zinc-400 rounded-4xl -rotate-[45deg]"></div>
          {/* Title */}
          <div className="relative z-50 w-full flex flex-col justify-center items-center">
            <div className="absolute -top-[15rem] z-60 bg-black/70 w-screen h-screen flex flex-col items-center pt-[17rem] px-4 text-zinc-400">
              <h1 className="text-6xl text-center font-bold w-full bg-swirl-pattern bg-clip-text text-transparent opacity-60">
                SkillSeek
              </h1>
              <p className="text-white/80 text-[1.1rem] duration-1000">
                Find the services you need
              </p>
            </div>
            {/* Loading Spinner */}
            <Link href="/" className="absolute h-[80%] top-[8rem] z-70">
              <Loader2 className="w-24 h-24 bg-gradient-to-br from-[#51819C] to-[#F29072] text-[#51819C]/80 rounded-full animate-spin p-4" />
              <div className="relative z-80 bottom-24 w-full">
                <Image
                  src="/brand-logo-new.png"
                  alt="skillseekapp"
                  width={500}
                  height={500}
                  className="w-64 h-auto"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
