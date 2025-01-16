"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSession, signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import SplashScreenColorCircles from "./ui/SplashScreenColorCircles";
import { SignInVerificationWrapper } from "./signInVerification/SignInVerificationWrapper";
import LoadingBar from "./ui/LoadingBar";

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
    <Suspense fallback={<LoadingBar />}>
      <div className="fixed h-screen left-0 right-0 top-0 bottom-0 bg-[url('/splash-screen-bg.webp')] flex flex-col items-center justify-center md:hidden">
        <div className="h-screen flex flex-col items-center flex-center border-[3px] border-zinc-400 rounded-2xl">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            {/* Shapes */}
            <SplashScreenColorCircles />
            {/* Title */}
            <div className="relative z-50 w-full flex flex-col justify-center items-center">
              <div className=" bg-black/80 w-screen h-screen flex flex-col items-center pt-[17rem] px-4 text-zinc-400">
                <h1 className="text-6xl text-center font-bold w-full bg-swirl-pattern bg-clip-text text-transparent opacity-80">
                  SkillSeek
                </h1>
                <p className="text-white/80 text-[1.1rem] duration-1000">
                  Find the services you need
                </p>
              </div>
              {/* Loading Spinner */}
              <div className="absolute top-[22%] w-44 h-44 z-70">
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
                  <div className="absolute bottom-[34%] left-0 right-0 z-90 flex justify-center items-end text-zinc-300 text-[1.3rem]">
                    {/* <span className="bg-slate-800 relative min-w-[100vw] left-[13%] h-[0.2rem] rounded-full"></span> */}
                    <form
                      onSubmit={handleSubmit}
                      className="text-zinc-200 w-full flex justify-center items-center mx-auto"
                    >
                      <button
                        type="submit"
                        // className="relative flex justify-center right-[49.95vw] items-center top-[1.7rem] z-20 py-2 px-4"
                      >
                        <p className="w-fit text-lg border-b border-zinc-300 pt-2 flex justify-center items-center">
                          <span>Click Here to Get Started</span>
                        </p>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="absolute bottom-[34%] left-0 right-0 z-90 flex justify-center items-end text-zinc-300 text-[1.3rem]">
                    <div className="text-zinc-200 w-full flex justify-center items-center mx-auto">
                      <h1 className="w-fit text-[1.3rem] pt-2 flex justify-center items-center font-normal tracking-wide animate-pulse duration-[2000ms]">
                        Loading User {session?.user?.name}
                      </h1>
                    </div>
                  </div>
                )}
              </SignInVerificationWrapper>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SplashScreen;
