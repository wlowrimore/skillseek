"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import SplashScreenColorCircles from "./ui/SplashScreenColorCircles";
import { SignInVerificationWrapper } from "./signInVerification/SignInVerificationWrapper";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAuthenticated, setIsAuthenicated] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [session?.user]);

  const handleAuthentication = () => {
    if (session?.user) {
      setIsAuthenicated(true);
    } else {
      setIsAuthenicated(false);
    }
  };

  const handleSubmit = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!isVisible || isAuthenticated) return null;

  return (
    <div className="fixed inset-0 bg-[url('/splash-screen-bg.webp')] flex flex-col items-center justify-center md:hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center flex-center bg-black/80 border-[3px] border-zinc-400 rounded-2xl">
        <div className="relative top-[30%] left-0 flex items-center justify-center">
          {/* Shapes */}
          <SplashScreenColorCircles />
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
            <div className="absolute h-[80%] top-[8rem] z-70">
              <Loader2 className="w-24 h-24 bg-gradient-to-br from-[#51819C] to-[#F29072] text-[#51819C]/80 rounded-full animate-spin p-4" />
              <div className="relative z-80 bottom-24 w-full">
                <Image
                  src="/brand-logo-new.png"
                  alt="skillseekapp"
                  width={500}
                  height={500}
                  className="w-64 h-auto"
                  onClick={handleAuthentication}
                />
              </div>
            </div>
            <SignInVerificationWrapper>
              {!session?.user ? (
                <div className="absolute z-90 w-screen flex justify-center items-end h-[70vh] text-zinc-300 text-[1.3rem]">
                  <span className="bg-slate-800 relative min-w-[100vw] left-[13%] h-[0.2rem] rounded-full"></span>
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      className="relative flex justify-center right-[49.95vw] items-center top-[1.7rem] z-20 py-2 px-4"
                    >
                      <p className="w-fit px-3 py-0.5 border-[3px] bg-gray-900 border-slate-800 rounded-md flex justify-center items-center">
                        <span>Enter</span>
                      </p>
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <h1 className="relative top-[25vh] text-zinc-200 text-[1.3rem] text-center font-normal tracking-wide w-full animate-pulse duration-[2000ms]">
                    Loading
                  </h1>
                </>
              )}
            </SignInVerificationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
