"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import SplashScreenColorCircles from "./ui/SplashScreenColorCircles";
import { SignInVerificationWrapper } from "./signInVerification/SignInVerificationWrapper";
import LoadingBar from "./ui/LoadingBar";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [session?.user]);

  const handleAuthentication = () => {
    if (session?.user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleSubmit = () => {
    signIn("google", { callbackUrl: "/" });
  };

  if (!isVisible || isAuthenticated) return null;

  return (
    <div className="fixed z-40 h-screen w-screen left-0 right-0 top-0 bottom-0 bg-[url('/images/splash-screen-bg.webp')] flex flex-col items-center justify-center md:hidden">
      <div className="h-screen flex flex-col items-center flex-center border-[3px] border-zinc-400 rounded-2xl">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          {/* Shapes */}
          <SplashScreenColorCircles />
          {/* Title */}
          <div className="relative z-50 w-full flex flex-col justify-center items-center">
            <div className=" bg-black/80 w-screen h-screen flex flex-col items-center pt-[10rem] px-4 text-zinc-400">
              <h1 className="text-6xl text-center font-bold w-full bg-swirl-pattern bg-clip-text text-transparent opacity-80">
                SkillSeek
              </h1>
              <p className="text-white/80 text-[1.1rem] duration-1000">
                Find the services you need
              </p>
            </div>
            {/* Loading Spinner */}
            <div className="absolute top-[15%] w-44 h-44 z-70">
              <Loader2 className="relative top-[100%] w-44 h-44 bg-gradient-to-br from-[#51819C] to-[#F29072] text-[#51819C]/80 rounded-full animate-spin p-6" />
              <div className="relative z-80  w-full">
                <Image
                  src="/brand-logo-new.png"
                  alt="skillseekapp"
                  width={500}
                  height={500}
                  className="w-44 h-auto border-2 border-white rounded-full"
                  onClick={handleAuthentication}
                />
              </div>
            </div>
            <SignInVerificationWrapper>
              {!session?.user ? (
                <div className="absolute bottom-40 left-0 right-0 z-90 flex justify-center items-end text-zinc-300 text-[1.3rem]">
                  <form
                    onSubmit={handleSubmit}
                    className="text-zinc-200 w-full flex justify-center items-center mx-auto"
                  >
                    <button type="submit">
                      <p className="w-fit text-lg border-b border-zinc-300 flex justify-center items-center">
                        <span>Click Here to Get Started</span>
                      </p>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="absolute bottom-20 left-0 right-0 z-90 flex justify-center items-end text-zinc-300 text-[1.3rem]">
                  <div className="w-full flex flex-col justify-center items-center mx-auto">
                    <h1 className="w-fit text-[0.8rem] pt-6  flex justify-center items-center font-normal tracking-wide">
                      Loading User Account For:
                    </h1>
                    <p className="text-[1.3rem]">{session?.user?.name}</p>
                    {isLoading && <LoadingBar />}
                  </div>
                </div>
              )}
            </SignInVerificationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
