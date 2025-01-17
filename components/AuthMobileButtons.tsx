"use client";

import { Work_Sans as WorkSans } from "next/font/google";
import { SignInVerificationWrapper } from "./signInVerification/SignInVerificationWrapper";
import { UserRoundPlus, UserRoundX } from "lucide-react";

const work = WorkSans({ subsets: ["latin"], weight: "500" });

interface AuthButtonProps {
  onSignIn: () => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
}

const MobileAuthButtons = ({
  onSignIn,
  onSignOut,
  isAuthenticated,
}: AuthButtonProps) => {
  return (
    <>
      {isAuthenticated ? (
        <SignInVerificationWrapper>
          <form id="signin-form" onSubmit={onSignIn} className="w-full mt-10">
            <button
              type="submit"
              aria-label="Sign In"
              className="text-neutral-300 bg-[#51819C] py-2 px-4 border border-neutral-300 rounded-xl flex flex-col justify-center items-center w-full mx-auto"
            >
              <UserRoundPlus size={28} />
              <span>SignIn</span>
            </button>
          </form>
        </SignInVerificationWrapper>
      ) : (
        <form>
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign Out"
            className="text-white font-normal w-full text-[1.3rem] bg-black/80 px-5 py-2 mt-4 rounded-xl hover:bg-black transition-hover duration-200"
          >
            <UserRoundX size={52} />
            <span>Yes, Sign Me Out</span>
          </button>
        </form>
      )}
    </>
  );
};

export default MobileAuthButtons;
